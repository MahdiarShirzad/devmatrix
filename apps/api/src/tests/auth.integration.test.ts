import express from "express";
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} from "vitest";

let mongod: MongoMemoryServer;
let app: express.Express;

const ORIGIN = "http://localhost:3000";

const extractCookies = (res: request.Response): string[] =>
  (res.headers["set-cookie"] as unknown as string[]) ?? [];

const registerUser = async (email: string, password = "secret123") => {
  const res = await request(app)
    .post("/api/auth/register")
    .set("Origin", ORIGIN)
    .send({ name: "Test User", email, password });
  return res;
};

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  app = (await import("../app.js")).default;
});

afterEach(async () => {
  const collections = await mongoose.connection.db!.collections();
  await Promise.all(collections.map((c) => c.deleteMany({})));
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("auth flow", () => {
  it("rejects registration without a trusted origin (CSRF)", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Test", email: "csrf@example.com", password: "secret123" });
    expect(res.status).toBe(403);
  });

  it("rejects a weak password", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .set("Origin", ORIGIN)
      .send({ name: "Test", email: "weak@example.com", password: "short" });
    expect(res.status).toBe(400);
  });

  it("registers, sets hardened cookies and authenticates /me", async () => {
    const res = await registerUser("a@example.com");
    expect(res.status).toBe(201);

    const cookies = extractCookies(res);
    const accessCookie = cookies.find((c) => c.startsWith("accessToken="));
    expect(accessCookie).toBeDefined();
    expect(accessCookie).toMatch(/HttpOnly/i);
    expect(accessCookie).toMatch(/SameSite=Lax/i);

    const me = await request(app).get("/api/auth/me").set("Cookie", cookies);
    expect(me.status).toBe(200);
    expect(me.body.user.email).toBe("a@example.com");
  });

  it("updates the profile name via PATCH /me", async () => {
    const registered = await registerUser("profile@example.com");
    const cookies = extractCookies(registered);

    const updated = await request(app)
      .patch("/api/auth/me")
      .set("Origin", ORIGIN)
      .set("Cookie", cookies)
      .send({ name: "New Name" });

    expect(updated.status).toBe(200);
    expect(updated.body.user.name).toBe("New Name");

    const me = await request(app).get("/api/auth/me").set("Cookie", cookies);
    expect(me.body.user.name).toBe("New Name");
  });

  it("rejects a profile update without a trusted origin (CSRF)", async () => {
    const registered = await registerUser("csrf-profile@example.com");
    const cookies = extractCookies(registered);

    const res = await request(app)
      .patch("/api/auth/me")
      .set("Cookie", cookies)
      .send({ name: "Hacked" });

    expect(res.status).toBe(403);
  });

  it("rejects /me without a token", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });

  it("logs in an existing user and rejects a wrong password", async () => {
    await registerUser("b@example.com");

    const ok = await request(app)
      .post("/api/auth/login")
      .set("Origin", ORIGIN)
      .send({ email: "b@example.com", password: "secret123" });
    expect(ok.status).toBe(200);

    const bad = await request(app)
      .post("/api/auth/login")
      .set("Origin", ORIGIN)
      .send({ email: "b@example.com", password: "wrongpass1" });
    expect(bad.status).toBe(401);
  });
});

describe("authorization / IDOR", () => {
  it("does not expose another user's playground collection", async () => {
    const GithubProject = (await import("../Models/GithubProject.js")).default;
    const Collection = (await import("../Models/Collection.js")).default;

    const first = await registerUser("owner@example.com");
    const firstId = first.body.user.id;

    const project = await GithubProject.create({
      userId: firstId,
      githubRepoId: 1,
      fullName: "owner/repo",
      name: "repo",
      ownerLogin: "owner",
    });

    const collection = await Collection.create({
      name: "Owner Collection",
      env: "Local",
      userId: firstId,
      projectId: project._id,
    });

    const second = await registerUser("intruder@example.com");
    const intruderCookies = extractCookies(second);

    const res = await request(app)
      .get(`/api/projects/${project._id}/playground/collections/${collection._id}`)
      .set("Cookie", intruderCookies);

    expect(res.status).toBe(404);
  });
});
