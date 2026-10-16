export type DashboardInterval = "day" | "week" | "month";

export interface DashboardRange {
  start: string;
  end: string;
  days: number;
  interval: DashboardInterval;
}

export interface DashboardKpis {
  projects: { total: number; active: number };
  commits: { value: number; previous: number; changePct: number };
  mergedPullRequests: { value: number; previous: number; changePct: number };
  debugSessions: {
    value: number;
    previous: number;
    changePct: number;
    resolved: number;
    resolutionRate: number;
  };
  ideas: {
    value: number;
    previous: number;
    changePct: number;
    validated: number;
  };
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
}

export interface DashboardActivityPoint {
  bucket: string;
  commits: number;
  mergedPullRequests: number;
  debugSessions: number;
  ideas: number;
}

export interface ProjectBreakdownItem {
  projectId: string;
  name: string;
  commits: number;
  mergedPullRequests: number;
  debugSessions: number;
  ideas: number;
  totalActivity: number;
  trendPct: number;
  lastSyncedAt: string | null;
}

export interface LanguageSlice {
  language: string;
  bytes: number;
  projects: number;
  percent: number;
}

export interface HeatmapDay {
  date: string;
  commits: number;
}

export interface DashboardAnalyticsResponse {
  status: string;
  empty: boolean;
  range: DashboardRange;
  kpis: DashboardKpis | null;
  activitySeries: DashboardActivityPoint[];
  projectBreakdown: ProjectBreakdownItem[];
  languages: LanguageSlice[];
  heatmap: HeatmapDay[];
}

export interface DebuggingAnalyticsResponse {
  status: string;
  range: DashboardRange;
  totals: {
    total: number;
    resolved: number;
    inProgress: number;
    failed: number;
    pending: number;
    resolutionRate: number;
    avgResolutionHours: number | null;
    resolvedWithTiming: number;
  };
  statusDistribution: { status: string; count: number }[];
  byProject: {
    projectId: string;
    name: string;
    sessions: number;
    resolved: number;
    resolutionRate: number;
  }[];
  byLanguage: { language: string; count: number; percent: number }[];
  series: { bucket: string; sessions: number }[];
  attention: {
    id: string;
    projectId: string;
    projectName: string;
    title: string;
    language: string;
    status: string;
    createdAt: string;
  }[];
}

export interface IdeaAnalyticsResponse {
  status: string;
  range: DashboardRange;
  totals: {
    total: number;
    completed: number;
    pending: number;
    failed: number;
    validated: number;
    successRate: number;
  };
  scores: {
    avgOverall: number | null;
    avgMarketFit: number | null;
    avgCompetition: number | null;
    avgRisk: number | null;
  };
  distribution: { label: string; count: number }[];
  byCategory: { category: string; count: number; avgScore: number | null }[];
  byProject: {
    projectId: string;
    name: string;
    ideas: number;
    validated: number;
    avgScore: number | null;
  }[];
  series: { bucket: string; created: number; validated: number }[];
  recent: {
    id: string;
    projectId: string;
    projectName: string;
    title: string;
    status: string;
    category: string | null;
    overallScore: number | null;
    createdAt: string;
  }[];
}
