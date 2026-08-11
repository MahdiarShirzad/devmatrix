"use client";

import Link from "next/link";
import AnalyticsHeader from "./_components/AnalyticsHeader";
import OverviewStats from "./_components/OverviewStats";
import ProjectSearchToolbar from "./_components/ProjectSearchToolbar";
import ProjectsGrid from "./_components/ProjectsGrid";
import { Project } from "./_components/ProjectCard";
import { useGithubProjects } from "@/hooks/useGithubAnalytics";
import type { GithubProject } from "@/types/githubAnalytics.types";

// Maps a GithubProject (backend shape) to a Project (current UI shape).
// commitsThisWeek/trend/activityData don't come from this endpoint yet
// (they need a separate /stats call per project) — using neutral
// placeholders for now so the card doesn't break; the project detail
// page shows the real data for these.
function toUiProject(dto: GithubProject): Project {
  return {
    id: dto._id,
    name: dto.name,
    provider: dto.provider === "github" ? "GitHub" : "GitLab",
    commitsThisWeek: 0,
    lastActivity: dto.lastSyncedAt
      ? new Date(dto.lastSyncedAt).toLocaleDateString("en-US")
      : "Not synced yet",
    trend: "0%",
    trendUp: true,
    tags: [],
    activityData: [0, 0, 0, 0, 0, 0, 0],
  };
}

export default function AnalyticsPage() {
  const { data, isLoading, isError, error } = useGithubProjects();
  const projects = (data?.projects ?? []).map(toUiProject);
  const githubConnected = data?.githubConnected ?? true; // avoid flashing the warning before load

  console.log(githubConnected);

  return (
    <div className="flex h-full flex-col pb-8">
      <AnalyticsHeader />
      <OverviewStats />
      <ProjectSearchToolbar projectCount={projects.length} />

      {isLoading && (
        <div className="flex items-center justify-center py-16 text-sm text-neutral-text-secondary">
          Loading projects...
        </div>
      )}

      {!isLoading && isError && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-error/30 bg-error/5 py-12 text-center">
          <p className="text-sm font-medium text-error">
            {error instanceof Error ? error.message : "Failed to load projects"}
          </p>
        </div>
      )}

      {!isLoading && !isError && !githubConnected && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-neutral-border bg-neutral-surface-1 py-16 text-center">
          <p className="text-sm font-medium text-neutral-text-primary">
            GitHub access key required
          </p>
          <p className="text-sm text-neutral-text-secondary">
            To use this part of the app, add your GitHub access key in settings.
          </p>
          <Link
            href="/settings"
            className="mt-2 text-sm font-medium text-primary underline"
          >
            Go to settings
          </Link>
        </div>
      )}

      {!isLoading && !isError && githubConnected && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-neutral-border bg-neutral-surface-1 py-16 text-center">
          <p className="text-sm font-medium text-neutral-text-primary">
            You don't have any linked repositories yet
          </p>
          <p className="text-sm text-neutral-text-secondary">
            Link a GitHub repository to see its analytics.
          </p>
        </div>
      )}

      {!isLoading && !isError && githubConnected && projects.length > 0 && (
        <ProjectsGrid projects={projects} />
      )}
    </div>
  );
}
