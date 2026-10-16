/**
 * Minimal structured logger.
 *
 * Emits one JSON object per line so logs remain greppable and machine
 * readable without pulling in an external logging dependency. Sensitive
 * keys are redacted defensively even if a caller forgets.
 */

const SENSITIVE_KEY_PATTERN =
  /(password|passwd|secret|token|authorization|cookie|apikey|api_key|access_?token|refresh_?token|githubaccesstoken)/i;

type LogLevel = "debug" | "info" | "warn" | "error";

const REDACTED = "[REDACTED]";

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Recursively replaces values of sensitive-looking keys. Depth is capped to
 * avoid pathological structures and to keep logging cheap.
 */
export const redact = (value: unknown, depth = 0): unknown => {
  if (depth > 6) return "[Truncated]";
  if (Array.isArray(value)) return value.map((item) => redact(item, depth + 1));
  if (!isPlainObject(value)) return value;

  const output: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) {
    output[key] = SENSITIVE_KEY_PATTERN.test(key)
      ? REDACTED
      : redact(entry, depth + 1);
  }
  return output;
};

const write = (level: LogLevel, message: string, meta?: unknown): void => {
  const record: Record<string, unknown> = {
    level,
    time: new Date().toISOString(),
    message,
  };

  if (meta !== undefined) {
    record.meta = redact(meta);
  }

  const line = JSON.stringify(record);

  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
};

export const logger = {
  debug: (message: string, meta?: unknown) => {
    if (!process.env.DEBUG) return;
    write("debug", message, meta);
  },
  info: (message: string, meta?: unknown) => write("info", message, meta),
  warn: (message: string, meta?: unknown) => write("warn", message, meta),
  error: (message: string, meta?: unknown) => write("error", message, meta),
};

export default logger;
