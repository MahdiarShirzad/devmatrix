import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import AppError from "../utils/appError.js";

/**
 * Validates and normalizes `req.body` against a zod schema. Unknown keys
 * are stripped by zod's default object behavior, and parse errors are
 * surfaced as 400s through the global error handler.
 */
export const validateBody =
  (schema: ZodType) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body ?? {});

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => {
          const path = issue.path.join(".");
          return path ? `${path}: ${issue.message}` : issue.message;
        })
        .join("; ");

      next(new AppError(message || "Validation failed", 400));
      return;
    }

    req.body = result.data;
    next();
  };
