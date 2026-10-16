import "../utils/loadEnv.js";

type SameSite = "lax" | "strict" | "none";

const isProduction = process.env.NODE_ENV === "production";

const parseList = (value: string | undefined): string[] =>
  (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const unique = (values: string[]): string[] => Array.from(new Set(values));

/**
 * Comma-separated allow-list of frontend origins permitted to make
 * credentialed cross-origin requests. Falls back to FRONTEND_URL and then
 * to the local dev origin. Never falls back to a wildcard.
 */
const corsOrigins = (() => {
  const configured = parseList(process.env.CORS_ORIGINS);
  if (configured.length > 0) return configured;

  if (process.env.FRONTEND_URL) return [process.env.FRONTEND_URL];

  return isProduction ? [] : ["http://localhost:3000"];
})();

const sameSite = (() => {
  const raw = (process.env.COOKIE_SAME_SITE ?? "").toLowerCase();
  if (raw === "none" || raw === "strict" || raw === "lax") {
    return raw as SameSite;
  }

  // In production the web app (e.g. *.vercel.app) and the API live on
  // different sites, so the auth cookies are third-party cookies. Browsers
  // only store and return them on cross-origin requests when they are
  // SameSite=None (which itself requires Secure — enforced below). CSRF is
  // still enforced independently by requireTrustedOrigin, so None is safe
  // here. Local development keeps Lax since web and API share a site.
  return (isProduction ? "none" : "lax") as SameSite;
})();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction,
  port: Number(process.env.PORT) || 3001,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  corsOrigins,
  cookie: {
    sameSite,
    // Secure is required for SameSite=None, and always on in production.
    secure: isProduction || sameSite === "none",
    domain: process.env.COOKIE_DOMAIN || undefined,
    accessTokenMaxAgeMs: 15 * 60 * 1000,
    refreshTokenMaxAgeMs: 30 * 24 * 60 * 60 * 1000,
    refreshTokenPath: "/api/auth/refresh",
  },
} as const;

export const isAllowedOrigin = (origin: string | undefined): boolean => {
  if (!origin) return false;
  return env.corsOrigins.includes(origin);
};

export { parseList, unique };
