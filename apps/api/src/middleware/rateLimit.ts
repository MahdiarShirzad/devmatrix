import { rateLimit } from "express-rate-limit";
import { env } from "../config/env.js";

const isTest = env.nodeEnv === "test";

const jsonMessage = {
  status: "fail" as const,
  message: "Too many requests from this address. Please try again later.",
};

/**
 * Strict limiter for credential + token endpoints to slow down brute force
 * and credential-stuffing attacks.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isTest,
  message: jsonMessage,
});

/**
 * Limiter for endpoints that call out to the (paid) AI providers.
 */
export const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isTest,
  message: jsonMessage,
});

/**
 * Coarse limiter applied to the whole API surface.
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 600,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isTest,
  message: jsonMessage,
});
