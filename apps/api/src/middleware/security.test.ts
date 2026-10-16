import express from "express";
import request from "supertest";
import { describe, it, expect } from "vitest";
import { requireTrustedOrigin, requestId } from "./security.js";

const buildApp = () => {
  const app = express();
  app.use(requestId);
  app.use(express.json());
  app.use(requireTrustedOrigin);
  app.get("/resource", (_req, res) => res.json({ ok: true }));
  app.post("/resource", (_req, res) => res.json({ ok: true }));
  return app;
};

describe("requestId", () => {
  it("echoes an inbound request id and otherwise generates one", async () => {
    const app = buildApp();

    const withHeader = await request(app)
      .get("/resource")
      .set("x-request-id", "abc-123");
    expect(withHeader.headers["x-request-id"]).toBe("abc-123");

    const generated = await request(app).get("/resource");
    expect(generated.headers["x-request-id"]).toMatch(/[0-9a-f-]{36}/);
  });
});

describe("requireTrustedOrigin (CSRF guard)", () => {
  it("blocks a state-changing request with a foreign Origin", async () => {
    const res = await request(buildApp())
      .post("/resource")
      .set("Origin", "https://evil.example.com")
      .send({});
    expect(res.status).toBe(403);
  });

  it("blocks a state-changing request with no Origin/Referer", async () => {
    const res = await request(buildApp()).post("/resource").send({});
    expect(res.status).toBe(403);
  });

  it("allows an allow-listed Origin", async () => {
    const res = await request(buildApp())
      .post("/resource")
      .set("Origin", "http://localhost:3000")
      .send({});
    expect(res.status).toBe(200);
  });

  it("falls back to the Referer origin", async () => {
    const res = await request(buildApp())
      .post("/resource")
      .set("Referer", "http://localhost:3000/settings")
      .send({});
    expect(res.status).toBe(200);
  });

  it("allows safe methods regardless of origin", async () => {
    const res = await request(buildApp())
      .get("/resource")
      .set("Origin", "https://evil.example.com");
    expect(res.status).toBe(200);
  });
});
