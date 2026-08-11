export interface GithubProject {
  _id: string;
  userId: string;
  provider: "github" | "gitlab";
  githubRepoId: number;
  fullName: string;
  name: string;
  ownerLogin: string;
  defaultBranch: string;
  isPrivate: boolean;
  isActive: boolean;
  lastSyncedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectStats {
  commitsThisWeek: number;
  openPrsCount: number;
  mergedPrsCount: number;
  activeContributors: number;
}

export interface CommitsByDay {
  date: string;
  commits: number;
}

export type Heatmap = number[][];

export interface Contributor {
  login: string;
  name: string;
  avatarUrl: string | null;
  commits: number;
  linesChanged: number;
  prsMerged: number;
}

export interface AvailableRepo {
  githubRepoId: number;
  fullName: string;
  name: string;
  ownerLogin: string;
  isPrivate: boolean;
  defaultBranch: string;
}

export interface SyncResult {
  commitsUpserted: number;
  pullRequestsUpserted: number;
  syncedAt: string;
}

export interface LinkProjectInput {
  fullName: string;
}

export interface GithubProjectsListResponse {
  status: string;
  results: number;
  githubConnected: boolean;
  projects: GithubProject[];
}

export interface OverviewStats {
  totalCommits: number;
  totalCommitsLastWeek: number;
  mergedPrsCount: number;
  mergedPrsLastWeek: number;
  mostActiveDay: string | null;
  mostActiveDayCommits: number;
}

export interface GithubProject {
  _id: string;
  provider: "github" | "gitlab";
  name: string;
  fullName: string;
  lastSyncedAt: string | null;
  commitsThisWeek?: number;
  mergedPrsCount?: number;
  trend?: string;
  trendUp?: boolean;
  activityData?: number[];
}
