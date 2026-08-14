/**
 * TODO(REMOVE-MOCK): Temporary mock data for the Dashboard's project-detail
 * sections (project stats, commits, contributors, activity distribution).
 *
 * Why this exists: the real backend only exposes a plain project list
 * (see hooks/useGithubProjects.ts — id, name, description, html_url,
 * stargazers_count, forks_count, language, updated_at). There is currently
 * no API for per-project stats, commit history, or contributors, so the
 * richer Dashboard sections (Project Overview, Development Activity,
 * Contributors, Project Activity, per-project bug/commit counts in
 * "Your Projects") have nothing real to render.
 *
 * This file provides a small, realistic, hand-written mock dataset so the
 * Dashboard UI/design can be previewed end-to-end. It is NOT wired to
 * useGithubProjects or any other real hook, and real API responses are
 * never merged with this data.
 *
 * REMOVE THIS FILE (and its usages in useDashboardData.ts) once the
 * project-management / per-project-analytics API actually exists, and
 * replace with real hook calls at that point.
 */

import type { DebugSession } from "@/types/aiDebug.types";

export interface MockProject {
  id: string;
  name: string;
  description: string;
  htmlUrl: string;
  defaultBranch: string;
  isPrivate: boolean;
  lastSyncedAt: string; // ISO — ("last activity" stand-in; real API has no equivalent yet)
  commitsThisWeek: number;
  openPrsCount: number;
  mergedPrsCount: number;
  activeContributors: number;
}

export interface MockCommitDay {
  date: string; // yyyy-mm-dd
  commits: number;
}

export interface MockContributor {
  login: string;
  name: string;
  avatarUrl: string | null;
  commits: number;
  linesChanged: number;
  prsMerged: number;
}

export interface MockProjectStats {
  commitsThisWeek: number;
  openPrsCount: number;
  mergedPrsCount: number;
  activeContributors: number;
}

function isoDaysAgo(days: number, hours = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hours, 0, 0, 0);
  return d.toISOString();
}

export const MOCK_PROJECTS: MockProject[] = [
  {
    id: "mock-my-trip",
    name: "my-trip",
    description: "AI-assisted trip planning and itinerary builder.",
    htmlUrl: "https://github.com/mahdiar/my-trip",
    defaultBranch: "main",
    isPrivate: false,
    lastSyncedAt: isoDaysAgo(0, 0.2), // ~12 min ago
    commitsThisWeek: 12,
    openPrsCount: 2,
    mergedPrsCount: 9,
    activeContributors: 4,
  },
  {
    id: "mock-devmatrix",
    name: "devmatrix",
    description: "Core DevMatrix platform — API, dashboard, and tooling.",
    htmlUrl: "https://github.com/mahdiar/devmatrix",
    defaultBranch: "main",
    isPrivate: true,
    lastSyncedAt: isoDaysAgo(0, 2), // 2 hours ago
    commitsThisWeek: 34,
    openPrsCount: 5,
    mergedPrsCount: 21,
    activeContributors: 6,
  },
  {
    id: "mock-portfolio",
    name: "portfolio",
    description: "Personal portfolio and case-study site.",
    htmlUrl: "https://github.com/mahdiar/portfolio",
    defaultBranch: "main",
    isPrivate: false,
    lastSyncedAt: isoDaysAgo(1, 0), // yesterday
    commitsThisWeek: 8,
    openPrsCount: 1,
    mergedPrsCount: 14,
    activeContributors: 2,
  },
];

function buildCommitDays(pattern: number[]): MockCommitDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return pattern.map((commits, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (pattern.length - 1 - i));
    return { date: d.toISOString().slice(0, 10), commits };
  });
}

export const MOCK_COMMITS_BY_PROJECT: Record<string, MockCommitDay[]> = {
  "mock-my-trip": buildCommitDays([2, 4, 1, 3, 5, 1, 2]),
  "mock-devmatrix": buildCommitDays([5, 7, 6, 9, 8, 4, 6]),
  "mock-portfolio": buildCommitDays([1, 0, 2, 1, 3, 0, 1]),
};

export const MOCK_CONTRIBUTORS_BY_PROJECT: Record<string, MockContributor[]> = {
  "mock-my-trip": [
    { login: "mahdiar", name: "Mahdiar", avatarUrl: null, commits: 7, linesChanged: 812, prsMerged: 5 },
    { login: "ali-dev", name: "Ali", avatarUrl: null, commits: 3, linesChanged: 240, prsMerged: 2 },
    { login: "sara-k", name: "Sara", avatarUrl: null, commits: 2, linesChanged: 96, prsMerged: 1 },
  ],
  "mock-devmatrix": [
    { login: "mahdiar", name: "Mahdiar", avatarUrl: null, commits: 18, linesChanged: 2140, prsMerged: 11 },
    { login: "ali-dev", name: "Ali", avatarUrl: null, commits: 9, linesChanged: 980, prsMerged: 6 },
    { login: "reza-t", name: "Reza", avatarUrl: null, commits: 5, linesChanged: 410, prsMerged: 3 },
    { login: "sara-k", name: "Sara", avatarUrl: null, commits: 2, linesChanged: 150, prsMerged: 1 },
  ],
  "mock-portfolio": [
    { login: "mahdiar", name: "Mahdiar", avatarUrl: null, commits: 8, linesChanged: 305, prsMerged: 4 },
  ],
};

// Mock debug sessions per project, shaped exactly like the real DebugSession
// type so downstream components (useDebugAnalytics, NeedsAttention, etc.)
// work unmodified against this data.
export const MOCK_DEBUG_SESSIONS: DebugSession[] = [
  {
    _id: "mock-debug-1",
    userId: "mock-user",
    projectId: "mock-my-trip",
    title: "TypeScript error in auth module",
    language: "TypeScript",
    sourceCode: "// mock",
    status: "resolved",
    createdAt: isoDaysAgo(0, 0.4),
    resolvedAt: isoDaysAgo(0, 0.35),
  },
  {
    _id: "mock-debug-2",
    userId: "mock-user",
    projectId: "mock-my-trip",
    title: "Unhandled promise rejection in flight search",
    language: "TypeScript",
    sourceCode: "// mock",
    status: "in_progress",
    createdAt: isoDaysAgo(1, 1),
  },
  {
    _id: "mock-debug-3",
    userId: "mock-user",
    projectId: "mock-devmatrix",
    title: "Null pointer in stats aggregator",
    language: "JavaScript",
    sourceCode: "// mock",
    status: "failed",
    createdAt: isoDaysAgo(2, 3),
  },
  {
    _id: "mock-debug-4",
    userId: "mock-user",
    projectId: "mock-devmatrix",
    title: "Slow query in dashboard endpoint",
    language: "SQL",
    sourceCode: "// mock",
    status: "resolved",
    createdAt: isoDaysAgo(3, 0),
    resolvedAt: isoDaysAgo(2, 20),
  },
  {
    _id: "mock-debug-5",
    userId: "mock-user",
    projectId: "mock-portfolio",
    title: "CSS layout shift on load",
    language: "CSS",
    sourceCode: "// mock",
    status: "pending",
    createdAt: isoDaysAgo(1, 4),
  },
];
