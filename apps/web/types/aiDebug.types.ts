export type DebugSessionStatus =
  | "pending"
  | "in_progress"
  | "resolved"
  | "failed";

export interface DebugSession {
  _id: string;
  userId: string;
  projectId?: string;
  title: string;
  language: string;
  sourceCode: string;
  userDescription?: string;
  status: DebugSessionStatus;
  explanation?: string;
  fixedCode?: string;
  errorMessage?: string;
  createdAt: string; // ISO date
  resolvedAt?: string;
}

export interface CreateDebugSessionInput {
  language: string;
  sourceCode: string;
  userDescription?: string;
  projectId?: string;
}
