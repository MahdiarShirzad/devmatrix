import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import AppError from "../utils/appError.js";
import logger from "../utils/logger.js";
import { env } from "../config/env.js";

interface ErrorBody {
  status: "fail" | "error";
  message: string;
  errors?: unknown;
}

const normalizeError = (
  err: unknown,
): { statusCode: number; body: ErrorBody; isOperational: boolean } => {
  if (err instanceof AppError) {
    return {
      statusCode: err.statusCode,
      body: { status: err.status, message: err.message },
      isOperational: true,
    };
  }

  // Invalid ObjectId / cast failures -> 400 rather than 500.
  if (err instanceof mongoose.Error.CastError) {
    return {
      statusCode: 400,
      body: { status: "fail", message: "Invalid identifier" },
      isOperational: true,
    };
  }

  // Mongoose schema validation -> 400 with field details.
  if (err instanceof mongoose.Error.ValidationError) {
    return {
      statusCode: 400,
      body: {
        status: "fail",
        message: "Validation failed",
        errors: Object.values(err.errors).map((e) => e.message),
      },
      isOperational: true,
    };
  }

  // Duplicate key (e.g. email already registered).
  if (
    typeof err === "object" &&
    err !== null &&
    (err as { code?: number }).code === 11000
  ) {
    return {
      statusCode: 409,
      body: { status: "fail", message: "Resource already exists" },
      isOperational: true,
    };
  }

  // JSON body parse failures surfaced by express.json().
  if (err instanceof SyntaxError && "body" in err) {
    return {
      statusCode: 400,
      body: { status: "fail", message: "Invalid JSON payload" },
      isOperational: true,
    };
  }

  // jsonwebtoken errors.
  if (
    typeof err === "object" &&
    err !== null &&
    ["JsonWebTokenError", "TokenExpiredError", "NotBeforeError"].includes(
      (err as { name?: string }).name ?? "",
    )
  ) {
    return {
      statusCode: 401,
      body: { status: "fail", message: "Invalid or expired token" },
      isOperational: true,
    };
  }

  return {
    statusCode: 500,
    body: {
      status: "error",
      message: "Something went wrong. Please try again later.",
    },
    isOperational: false,
  };
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    status: "fail",
    message: `Route not found: ${req.method} ${req.path}`,
  });
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  const { statusCode, body, isOperational } = normalizeError(err);

  if (!isOperational) {
    logger.error("unhandled_error", {
      requestId: req.id,
      method: req.method,
      path: req.path,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
  } else if (statusCode >= 500) {
    logger.error("operational_error", {
      requestId: req.id,
      method: req.method,
      path: req.path,
      error: err instanceof Error ? err.message : String(err),
    });
  }

  const responseBody: ErrorBody = { ...body };

  // Only expose stack traces in non-production when the error is unknown.
  if (!env.isProduction && !isOperational && err instanceof Error) {
    responseBody.message = err.message || responseBody.message;
    (responseBody as unknown as Record<string, unknown>).stack = err.stack;
  }

  res.status(statusCode).json(responseBody);
};
