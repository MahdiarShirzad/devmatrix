import { describe, it, expect } from "vitest";
import {
  linkProjectSchema,
  loginSchema,
  registerSchema,
  createIdeaSchema,
  executeRequestSchema,
  createCollectionSchema,
} from "../validation/schemas.js";

describe("registerSchema", () => {
  it("accepts a valid registration", () => {
    const result = registerSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "secret123",
    });
    expect(result.success).toBe(true);
  });

  it.each([
    { name: "A", email: "ada@example.com", password: "secret123" },
    { name: "Ada", email: "not-an-email", password: "secret123" },
    { name: "Ada", email: "ada@example.com", password: "short" },
    { name: "Ada", email: "ada@example.com", password: "allletters" },
    { name: "Ada", email: "ada@example.com", password: "12345678" },
  ])("rejects invalid registration %#", (payload) => {
    expect(registerSchema.safeParse(payload).success).toBe(false);
  });

  it("strips unknown keys", () => {
    const result = registerSchema.parse({
      name: "Ada",
      email: "ada@example.com",
      password: "secret123",
      isAdmin: true,
    });
    expect(result).not.toHaveProperty("isAdmin");
  });
});

describe("loginSchema", () => {
  it("accepts existing-style (weak) passwords without strength rules", () => {
    expect(
      loginSchema.safeParse({ email: "ada@example.com", password: "x" }).success,
    ).toBe(true);
  });

  it("rejects an empty password", () => {
    expect(
      loginSchema.safeParse({ email: "ada@example.com", password: "" }).success,
    ).toBe(false);
  });
});

describe("createIdeaSchema", () => {
  it("enforces description max length matching the model", () => {
    expect(
      createIdeaSchema.safeParse({ title: "t", description: "x".repeat(4001) })
        .success,
    ).toBe(false);
  });
});

describe("createCollectionSchema", () => {
  it("only allows the model's env values", () => {
    expect(
      createCollectionSchema.safeParse({ name: "c", env: "Production" }).success,
    ).toBe(true);
    expect(
      createCollectionSchema.safeParse({ name: "c", env: "prod" }).success,
    ).toBe(false);
  });
});

describe("executeRequestSchema", () => {
  it("only allows supported methods", () => {
    expect(
      executeRequestSchema.safeParse({
        method: "GET",
        url: "https://example.com",
      }).success,
    ).toBe(true);
    expect(
      executeRequestSchema.safeParse({
        method: "TRACE",
        url: "https://example.com",
      }).success,
    ).toBe(false);
  });
});

describe("linkProjectSchema", () => {
  it("requires owner/repo format", () => {
    expect(linkProjectSchema.safeParse({ fullName: "octocat/Hello-World" }).success).toBe(
      true,
    );
    expect(linkProjectSchema.safeParse({ fullName: "octocat" }).success).toBe(
      false,
    );
    expect(
      linkProjectSchema.safeParse({ fullName: "octo cat/repo" }).success,
    ).toBe(false);
  });
});
