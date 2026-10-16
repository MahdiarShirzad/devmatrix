/**
 * Shared, framework-agnostic type definitions used across the DevMatrix
 * web and API apps. Keep this package type-only so it can be consumed by
 * both without a build step.
 */

export interface ApiErrorResponse {
  status: "fail" | "error";
  message: string;
  errors?: unknown;
}

export interface ApiSuccessResponse<T> {
  status: "success";
  data: T;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  githubUsername?: string;
  hasGithubToken: boolean;
}

export type GithubProjectRole = "owner" | "member";

export interface GithubProjectSummary {
  id: string;
  fullName: string;
  defaultBranch: string;
  private: boolean;
  role: GithubProjectRole;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
}
