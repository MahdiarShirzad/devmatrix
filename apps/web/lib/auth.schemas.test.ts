import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "./auth.schemas";

describe("loginSchema", () => {
  it("accepts a valid email and password", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "secret123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "secret123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty password", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  const valid = {
    name: "Jane Doe",
    email: "jane@example.com",
    password: "secret123",
  };

  it("accepts a valid registration payload", () => {
    expect(registerSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects a short name", () => {
    expect(registerSchema.safeParse({ ...valid, name: "J" }).success).toBe(
      false,
    );
  });

  it("rejects a password without a number", () => {
    expect(
      registerSchema.safeParse({ ...valid, password: "onlyletters" }).success,
    ).toBe(false);
  });

  it("rejects a password without a letter", () => {
    expect(
      registerSchema.safeParse({ ...valid, password: "12345678" }).success,
    ).toBe(false);
  });

  it("rejects a password shorter than 8 characters", () => {
    expect(
      registerSchema.safeParse({ ...valid, password: "a1b2c3" }).success,
    ).toBe(false);
  });
});
