const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

interface RequestOptions extends RequestInit {
  json?: unknown;
}

/**
 * Base fetch wrapper. Sends httpOnly cookies (credentials: "include") since
 * auth uses cookie-based access/refresh tokens, not Authorization headers.
 */
async function apiFetch<T>(
  path: string,
  { json, ...options }: RequestOptions = {},
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: json !== undefined ? JSON.stringify(json) : options.body,
  });

  // 204 No Content has no body to parse
  if (res.status === 204) {
    return undefined as T;
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message || `Request failed with ${res.status}`;
    throw new ApiError(message, res.status);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string) => apiFetch<T>(path, { method: "GET" }),
  post: <T>(path: string, json?: unknown) =>
    apiFetch<T>(path, { method: "POST", json }),
  patch: <T>(path: string, json?: unknown) =>
    apiFetch<T>(path, { method: "PATCH", json }),
  delete: <T>(path: string) => apiFetch<T>(path, { method: "DELETE" }),
};
