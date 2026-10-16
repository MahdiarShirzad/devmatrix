import { z } from "zod";

/**
 * Request-body schemas. Validated at the route boundary so controllers can
 * trust their inputs and malformed payloads never reach the database or the
 * AI services.
 */

const httpMethod = z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]);

const headerMap = z.record(z.string().max(200), z.string().max(8000));

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(254),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(/[A-Za-z]/, "Password must contain a letter")
    .regex(/\d/, "Password must contain a number"),
});

export const loginSchema = z.object({
  email: z.email().max(254),
  password: z.string().min(1).max(128),
});

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2).max(80),
});

export const createIdeaSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(4000),
});

export const reevaluateIdeaSchema = z.object({
  description: z.string().trim().min(1).max(4000),
});

export const createSessionSchema = z.object({
  language: z.string().trim().min(1).max(50),
  sourceCode: z.string().min(1).max(20000),
  userDescription: z.string().trim().max(2000).optional(),
});

export const createCollectionSchema = z.object({
  name: z.string().trim().min(1).max(120),
  env: z.enum(["Local", "Development", "Production"]),
  baseUrl: z.string().trim().max(2048).optional(),
});

export const createRequestSchema = z.object({
  name: z.string().trim().min(1).max(120),
  method: httpMethod,
  path: z.string().trim().min(1).max(2048),
  headers: headerMap.optional(),
  body: z.string().max(1_000_000).optional(),
  params: z.record(z.string().max(200), z.string().max(2000)).optional(),
});

export const updateRequestSchema = createRequestSchema.partial();

export const executeRequestSchema = z.object({
  method: httpMethod,
  url: z.string().trim().min(1).max(2048),
  headers: headerMap.optional(),
  body: z.string().max(1_000_000).optional(),
  requestId: z.string().trim().max(64).optional(),
});

export const setAccessTokenSchema = z.object({
  token: z.string().trim().min(1).max(512),
});

export const linkProjectSchema = z.object({
  fullName: z
    .string()
    .trim()
    .max(200)
    .regex(
      /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/,
      "The fullName format must be 'owner/repo'",
    ),
});
