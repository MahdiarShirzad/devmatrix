import AppError from "../utils/appError.js";

interface ExecuteParams {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
}

interface ExecuteResult {
  status: number;
  headers: Record<string, string>;
  body: string;
  durationMs: number;
  sizeBytes: number;
}

const ALLOWED_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const TIMEOUT_MS = 10_000;
const MAX_RESPONSE_BYTES = 2 * 1024 * 1024;

const BLOCKED_HOSTNAME_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^0\.0\.0\.0$/,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^192\.168\./,
  /^169\.254\./, // link-local, includes cloud metadata endpoints (169.254.169.254)
  /^::1$/,
  /^fc00:/i,
  /^fe80:/i,
];

function assertUrlIsSafe(rawUrl: string) {
  let parsed: URL;

  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new AppError("Invalid URL", 400);
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new AppError("Only http and https URLs are allowed", 400);
  }

  const hostname = parsed.hostname;

  if (BLOCKED_HOSTNAME_PATTERNS.some((pattern) => pattern.test(hostname))) {
    throw new AppError(
      "Requests to private or internal addresses are not allowed",
      400,
    );
  }
}

export async function runExecuteRequest({
  method,
  url,
  headers,
  body,
}: ExecuteParams): Promise<ExecuteResult> {
  const normalizedMethod = (method || "GET").toUpperCase();

  if (!ALLOWED_METHODS.includes(normalizedMethod)) {
    throw new AppError(`Unsupported method: ${method}`, 400);
  }

  assertUrlIsSafe(url);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const startedAt = Date.now();

  try {
    const response = await fetch(url, {
      method: normalizedMethod,
      headers,
      body: normalizedMethod === "GET" ? undefined : body,
      signal: controller.signal,
      redirect: "follow",
    });

    const durationMs = Date.now() - startedAt;

    // Read as text but cap how much we keep, so a massive body can't blow up memory
    const rawText = await response.text();
    const truncated = Buffer.byteLength(rawText, "utf8") > MAX_RESPONSE_BYTES;
    const responseBody = truncated
      ? rawText.slice(0, MAX_RESPONSE_BYTES) + "\n... [truncated]"
      : rawText;

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return {
      status: response.status,
      headers: responseHeaders,
      body: responseBody,
      durationMs,
      sizeBytes: Buffer.byteLength(rawText, "utf8"),
    };
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new AppError("Request timed out", 504);
    }
    throw new AppError(`Request failed: ${err.message}`, 502);
  } finally {
    clearTimeout(timeout);
  }
}
