import { randomUUID } from "crypto";
import type { Request, Response, NextFunction } from "express";
import { env, isAllowedOrigin } from "../config/env.js";
import logger from "../utils/logger.js";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

declare module "express-serve-static-core" {
  interface Request {
    id?: string;
  }
}

/**
 * Attaches a correlation id to every request so logs across a single
 * request can be stitched together.
 */
export const requestId = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const incoming = req.headers["x-request-id"];
  req.id =
    typeof incoming === "string" && incoming.length > 0
      ? incoming
      : randomUUID();
  res.setHeader("X-Request-Id", req.id);
  next();
};

/**
 * Logs request completion with method, path, status and duration. Query
 * strings and bodies are intentionally omitted to avoid leaking secrets.
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const startedAt = Date.now();

  res.on("finish", () => {
    logger.info("http_request", {
      requestId: req.id,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs: Date.now() - startedAt,
    });
  });

  next();
};

const REFERER_ORIGIN = (referer: string | undefined): string | null => {
  if (!referer) return null;
  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
};

/**
 * CSRF defence for state-changing requests.
 *
 * Browsers always attach an `Origin` header to cross-origin (and most
 * same-origin) unsafe requests, and that header cannot be forged by a
 * third-party page. We therefore require the Origin (falling back to the
 * Origin of the Referer) to be in the configured allow-list. This blocks
 * cross-site request forgery even when cookies use SameSite=None for
 * cross-site deployments, without weakening the existing cookie design.
 */
export const requireTrustedOrigin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (SAFE_METHODS.has(req.method)) {
    next();
    return;
  }

  const origin =
    (typeof req.headers.origin === "string" ? req.headers.origin : undefined) ??
    REFERER_ORIGIN(
      typeof req.headers.referer === "string" ? req.headers.referer : undefined,
    ) ??
    undefined;

  if (isAllowedOrigin(origin)) {
    next();
    return;
  }

  logger.warn("blocked_untrusted_origin", {
    requestId: req.id,
    method: req.method,
    path: req.path,
    origin,
  });

  res.status(403).json({
    status: "fail",
    message: "Request origin is not allowed",
  });
};

export const isProduction = env.isProduction;
