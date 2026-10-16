import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * Regression coverage for the production authentication failure.
 *
 * The web app (Vercel) and the API (VPS) are on different sites, so auth
 * cookies are third-party cookies. If they are issued with SameSite=Lax the
 * browser refuses to send them on the cross-origin /auth/me (and /auth/refresh)
 * requests, so the session never restores even though login returned 200.
 *
 * These tests import the real `env` module after resetting the module registry
 * so the import-time SameSite logic is evaluated for each scenario.
 */
const loadEnv = async () => {
  vi.resetModules();
  return import("./env.js");
};

describe("cookie SameSite configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("defaults to SameSite=None + Secure in production (cross-site deployment)", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("COOKIE_SAME_SITE", "");

    const { env } = await loadEnv();

    expect(env.cookie.sameSite).toBe("none");
    expect(env.cookie.secure).toBe(true);
  });

  it("defaults to SameSite=Lax outside production (same-site local dev)", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("COOKIE_SAME_SITE", "");

    const { env } = await loadEnv();

    expect(env.cookie.sameSite).toBe("lax");
  });

  it("honours an explicit COOKIE_SAME_SITE override", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("COOKIE_SAME_SITE", "lax");

    const { env } = await loadEnv();

    expect(env.cookie.sameSite).toBe("lax");
    expect(env.cookie.secure).toBe(true);
  });
});
