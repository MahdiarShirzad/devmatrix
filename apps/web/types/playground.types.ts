export type PlaygroundEnv = "Local" | "Development" | "Production";
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface Collection {
  _id: string;
  name: string;
  userId: string;
  env: PlaygroundEnv;
  baseUrl?: string;
  requestCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SavedRequest {
  _id: string;
  collectionId: string;
  name: string;
  method: HttpMethod;
  path: string;
  headers: Record<string, string>;
  body?: string;
  params: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface ExecuteResult {
  status: number;
  headers: Record<string, string>;
  body: string;
  durationMs: number;
  sizeBytes: number;
}

export interface ExecuteParams {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  body?: string;
}
