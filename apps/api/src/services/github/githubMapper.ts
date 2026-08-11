import type { Types } from "mongoose";

interface RawGithubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name?: string | null;
      email?: string | null;
      date?: string | null;
    } | null;
  };
  author: {
    login?: string;
    avatar_url?: string;
  } | null;
}

interface RawGithubPullRequest {
  number: number;
  title: string;
  state: string; // "open" | "closed"
  merged_at: string | null;
  closed_at: string | null;
  created_at: string;
  user: {
    login?: string;
    avatar_url?: string;
  } | null;
}

export interface MappedCommit {
  projectId: Types.ObjectId;
  sha: string;
  authorGithubLogin: string | null;
  authorName: string;
  authorEmail: string;
  authorAvatarUrl: string | null;
  message: string;
  additions: number;
  deletions: number;
  totalChanges: number;
  committedAt: Date;
}

export interface MappedPullRequest {
  projectId: Types.ObjectId;
  githubPrNumber: number;
  title: string;
  authorGithubLogin: string;
  authorAvatarUrl: string | null;
  state: "open" | "closed" | "merged";
  additions: number;
  deletions: number;
  changedFiles: number;
  mergedAt: Date | null;
  closedAt: Date | null;
}

export const mapCommit = (
  raw: RawGithubCommit,
  projectId: Types.ObjectId,
): MappedCommit => {
  const committedAtStr = raw.commit.author?.date;

  return {
    projectId,
    sha: raw.sha,
    authorGithubLogin: raw.author?.login ?? null,
    authorName: raw.commit.author?.name ?? "Unknown",
    authorEmail: raw.commit.author?.email ?? "",
    authorAvatarUrl: raw.author?.avatar_url ?? null,
    message: raw.commit.message,
    additions: 0,
    deletions: 0,
    totalChanges: 0,
    committedAt: committedAtStr ? new Date(committedAtStr) : new Date(),
  };
};

export const mapCommits = (
  rawCommits: RawGithubCommit[],
  projectId: Types.ObjectId,
): MappedCommit[] => rawCommits.map((c) => mapCommit(c, projectId));

const resolvePrState = (
  raw: RawGithubPullRequest,
): "open" | "closed" | "merged" => {
  if (raw.merged_at) return "merged";
  if (raw.state === "closed") return "closed";
  return "open";
};

export const mapPullRequest = (
  raw: RawGithubPullRequest,
  projectId: Types.ObjectId,
): MappedPullRequest => {
  return {
    projectId,
    githubPrNumber: raw.number,
    title: raw.title,
    authorGithubLogin: raw.user?.login ?? "unknown",
    authorAvatarUrl: raw.user?.avatar_url ?? null,
    state: resolvePrState(raw),
    additions: 0,
    deletions: 0,
    changedFiles: 0,
    mergedAt: raw.merged_at ? new Date(raw.merged_at) : null,
    closedAt: raw.closed_at ? new Date(raw.closed_at) : null,
  };
};

export const mapPullRequests = (
  rawPrs: RawGithubPullRequest[],
  projectId: Types.ObjectId,
): MappedPullRequest[] => rawPrs.map((pr) => mapPullRequest(pr, projectId));
