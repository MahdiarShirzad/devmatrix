import AppError from "../utils/appError.js";
import { assertUrlIsSafe } from "../utils/ssrfGuard.js";

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
  truncated: boolean;
}

const ALLOWED_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const TIMEOUT_MS = 10_000;
const MAX_RESPONSE_BYTES = 2 * 1024 * 1024;

/**
 * Reads a response body while enforcing a hard byte cap so a malicious or
 * enormous response cannot exhaust memory.
 */
const readBodyCapped = async (
  response: Response,
  maxBytes: number,
): Promise<{ text: string; sizeBytes: number; truncated: boolean }> => {
  if (!response.body) {
    return { text: "", sizeBytes: 0, truncated: false };
  }

  const reader = response.body.getReader();
  const chunks: Buffer[] = [];
  let sizeBytes = 0;
  let truncated = false;

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      const chunkLength = value.byteLength;
      if (sizeBytes + chunkLength > maxBytes) {
        const remaining = maxBytes - sizeBytes;
        if (remaining > 0) {
          chunks.push(Buffer.from(value.subarray(0, remaining)));
          sizeBytes += remaining;
        }
        truncated = true;
        await reader.cancel();
        break;
      }

      chunks.push(Buffer.from(value));
      sizeBytes += chunkLength;
    }
  } finally {
    reader.releaseLock();
  }

  const text = Buffer.concat(chunks).toString("utf8");
  return { text, sizeBytes, truncated };
};

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

  // Validates protocol allow-list, hostname, and every resolved address.
  const safeUrl = await assertUrlIsSafe(url);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const startedAt = Date.now();

  try {
    const response = await fetch(safeUrl, {
      method: normalizedMethod,
      headers,
      body: normalizedMethod === "GET" ? undefined : body,
      signal: controller.signal,
      // Do NOT follow redirects: a public URL could redirect to an internal
      // address, bypassing the pre-flight SSRF checks. Returning the 3xx
      // response also gives the API-testing user more accurate information.
      redirect: "manual",
    });

    const durationMs = Date.now() - startedAt;

    const { text, sizeBytes, truncated } = await readBodyCapped(
      response,
      MAX_RESPONSE_BYTES,
    );

    const responseBody = truncated
      ? `${text}\n... [truncated]`
      : text;

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return {
      status: response.status,
      headers: responseHeaders,
      body: responseBody,
      durationMs,
      sizeBytes,
      truncated,
    };
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      (err.name === "AbortError" || err.name === "TimeoutError")
    ) {
      throw new AppError("Request timed out", 504);
    }
    throw new AppError(
      `Request failed: ${err instanceof Error ? err.message : "unknown error"}`,
      502,
    );
  } finally {
    clearTimeout(timeout);
  }
}
