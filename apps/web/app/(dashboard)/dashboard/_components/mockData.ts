import {
  FolderGit2,
  GitCommitHorizontal,
  Terminal,
  Bug,
  Rocket,
  LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* KPI Summary                                                         */
/* ------------------------------------------------------------------ */

export type TrendDirection = "up" | "down" | "neutral";

export interface KPIStat {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  trend: {
    direction: TrendDirection;
    label: string;
  };
}

export const mockDashboardStats: KPIStat[] = [
  {
    id: "projects",
    label: "Projects",
    value: "3",
    icon: FolderGit2,
    trend: { direction: "up", label: "+1 this month" },
  },
  {
    id: "commits",
    label: "Commits",
    value: "47",
    icon: GitCommitHorizontal,
    trend: { direction: "up", label: "+12% vs last week" },
  },
  {
    id: "api-requests",
    label: "API Requests",
    value: "128",
    icon: Terminal,
    trend: { direction: "up", label: "+18% vs last week" },
  },
  {
    id: "debug-sessions",
    label: "Debug Sessions",
    value: "12",
    icon: Bug,
    trend: { direction: "neutral", label: "9 resolved" },
  },
  {
    id: "ideas",
    label: "Ideas",
    value: "4",
    icon: Rocket,
    trend: { direction: "neutral", label: "2 in review" },
  },
];

/* ------------------------------------------------------------------ */
/* Development Activity (chart)                                        */
/* ------------------------------------------------------------------ */

export type ActivityMetric = "commits" | "pullRequests" | "apiRequests" | "debugging";

export interface ActivityPoint {
  label: string;
  value: number;
}

export const mockDevelopmentActivity: Record<ActivityMetric, ActivityPoint[]> = {
  commits: [
    { label: "Mon", value: 8 },
    { label: "Tue", value: 14 },
    { label: "Wed", value: 10 },
    { label: "Thu", value: 18 },
    { label: "Fri", value: 13 },
    { label: "Sat", value: 7 },
    { label: "Sun", value: 11 },
  ],
  pullRequests: [
    { label: "Mon", value: 2 },
    { label: "Tue", value: 3 },
    { label: "Wed", value: 1 },
    { label: "Thu", value: 4 },
    { label: "Fri", value: 2 },
    { label: "Sat", value: 0 },
    { label: "Sun", value: 1 },
  ],
  apiRequests: [
    { label: "Mon", value: 22 },
    { label: "Tue", value: 31 },
    { label: "Wed", value: 18 },
    { label: "Thu", value: 40 },
    { label: "Fri", value: 27 },
    { label: "Sat", value: 12 },
    { label: "Sun", value: 19 },
  ],
  debugging: [
    { label: "Mon", value: 1 },
    { label: "Tue", value: 3 },
    { label: "Wed", value: 2 },
    { label: "Thu", value: 4 },
    { label: "Fri", value: 1 },
    { label: "Sat", value: 0 },
    { label: "Sun", value: 1 },
  ],
};

export const activityMetricOptions: { id: ActivityMetric; label: string }[] = [
  { id: "commits", label: "Commits" },
  { id: "pullRequests", label: "Pull Requests" },
  { id: "apiRequests", label: "API Requests" },
  { id: "debugging", label: "Debugging" },
];

/* ------------------------------------------------------------------ */
/* Project Health                                                      */
/* ------------------------------------------------------------------ */

export type HealthStatus = "healthy" | "warning" | "error" | "neutral";

export interface HealthRow {
  label: string;
  status: HealthStatus;
  detail: string;
}

export interface ProjectHealthData {
  projectName: string;
  overallHealth: number; // 0-100
  rows: HealthRow[];
  lastActivity: string;
}

export const mockProjectHealth: ProjectHealthData = {
  projectName: "my-trip",
  overallHealth: 87,
  rows: [
    { label: "API", status: "healthy", detail: "Healthy" },
    { label: "GitHub", status: "healthy", detail: "Connected" },
    { label: "Debugging", status: "warning", detail: "2 unresolved" },
    { label: "Activity", status: "healthy", detail: "Active" },
  ],
  lastActivity: "12 minutes ago",
};

/* ------------------------------------------------------------------ */
/* Recent Activity                                                     */
/* ------------------------------------------------------------------ */

export type ModuleName =
  | "AI Debugging"
  | "GitHub"
  | "API Playground"
  | "Analytics"
  | "Idea Validator";

export interface RecentActivityItem {
  id: string;
  module: ModuleName;
  description: string;
  timestamp: string;
}

export const mockRecentActivity: RecentActivityItem[] = [
  {
    id: "act-1",
    module: "AI Debugging",
    description: "Resolved TypeScript error in auth module",
    timestamp: "22 min ago",
  },
  {
    id: "act-2",
    module: "GitHub",
    description: "Pushed 4 commits to deep-coding-backend",
    timestamp: "2 hours ago",
  },
  {
    id: "act-3",
    module: "API Playground",
    description: "Tested GET /api/flights",
    timestamp: "2 hours ago",
  },
  {
    id: "act-4",
    module: "Analytics",
    description: "Weekly productivity report generated",
    timestamp: "Yesterday",
  },
  {
    id: "act-5",
    module: "Idea Validator",
    description: 'Started validation for "AI Travel Assistant"',
    timestamp: "Yesterday",
  },
];

/* ------------------------------------------------------------------ */
/* Needs Attention                                                     */
/* ------------------------------------------------------------------ */

export type AttentionSeverity = "warning" | "info";

export interface AttentionItem {
  id: string;
  severity: AttentionSeverity;
  title: string;
  subtitle: string;
}

export const mockAttentionItems: AttentionItem[] = [
  {
    id: "attn-1",
    severity: "warning",
    title: "2 API requests failing",
    subtitle: "my-trip · /api/flights",
  },
  {
    id: "attn-2",
    severity: "warning",
    title: "1 unresolved debugging session",
    subtitle: "auth middleware",
  },
  {
    id: "attn-3",
    severity: "info",
    title: "Idea waiting for review",
    subtitle: "AI Travel Assistant",
  },
  {
    id: "attn-4",
    severity: "warning",
    title: "GitHub connection needs attention",
    subtitle: "deep-coding-backend",
  },
];

/* ------------------------------------------------------------------ */
/* Projects Overview                                                   */
/* ------------------------------------------------------------------ */

export type ProjectStatus = "healthy" | "attention";

export interface ProjectSummary {
  id: string;
  name: string;
  status: ProjectStatus;
  statusLabel: string;
  commits: number;
  issuesLabel: string;
  updatedLabel: string;
}

export const mockProjects: ProjectSummary[] = [
  {
    id: "my-trip",
    name: "my-trip",
    status: "healthy",
    statusLabel: "Healthy",
    commits: 12,
    issuesLabel: "2 API issues",
    updatedLabel: "Updated 12 min ago",
  },
  {
    id: "deep-coding",
    name: "deep-coding",
    status: "healthy",
    statusLabel: "Healthy",
    commits: 34,
    issuesLabel: "0 issues",
    updatedLabel: "Updated 2 hours ago",
  },
  {
    id: "portfolio",
    name: "portfolio",
    status: "attention",
    statusLabel: "Attention",
    commits: 8,
    issuesLabel: "1 unresolved bug",
    updatedLabel: "Updated yesterday",
  },
];

/* ------------------------------------------------------------------ */
/* Quick Actions                                                       */
/* ------------------------------------------------------------------ */

export interface QuickAction {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}
