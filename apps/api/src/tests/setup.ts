/**
 * Global test setup. Sets the environment variables the auth layer reads at
 * import time so the app can be imported without a real .env file.
 */
process.env.NODE_ENV = "test";
process.env.ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "test-access-secret";
process.env.REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "test-refresh-secret";
process.env.FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
process.env.CORS_ORIGINS =
  process.env.CORS_ORIGINS || "http://localhost:3000";
