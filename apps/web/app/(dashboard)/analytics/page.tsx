"use client";

import Link from "next/link";
import { AlertCircle, RefreshCw, Key } from "lucide-react";
import { useGithubProjects } from "@/hooks/useGithubAnalytics";
import { useAnalyticsRange } from "@/src/context/AnalyticsRangeContext";
import type { GithubProject } from "@/types/githubAnalytics.types";
import { Project } from "./_components/ProjectCard";
import AnalyticsHeader from "./_components/AnalyticsHeader";
import OverviewStats from "./_components/OverviewStats";
import ProjectSearchToolbar from "./_components/ProjectSearchToolbar";
import AvailableReposList from "./[projectId]/_components/AvailableReposList";
import ProjectsGrid from "./_components/ProjectsGrid";

function toUiProject(dto: GithubProject): Project {
  return {
    id: dto._id,
    name: dto.name,
    provider: dto.provider === "github" ? "GitHub" : "GitLab",
    commitsThisWeek: dto.commitsThisWeek ?? 0,
    lastActivity: dto.lastSyncedAt
      ? new Date(dto.lastSyncedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Not synced yet",
    trend: dto.trend ?? "0%",
    trendUp: dto.trendUp ?? true,
    tags: [],
    activityData: dto.activityData ?? [0, 0, 0, 0, 0, 0, 0],
  };
}

export default function AnalyticsPage() {
  const { range } = useAnalyticsRange();
  const { data, isLoading, isError, error, refetch } = useGithubProjects(range);

  const rawProjects = data?.projects ?? [];
  const projects = rawProjects.map(toUiProject);
  const githubConnected = data?.githubConnected ?? true;

  return (
    <div className="flex h-full flex-col space-y-8 pb-12 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <AnalyticsHeader />
      <OverviewStats />
      {/* GitHub Authentication Warning */}
      {!isLoading && !isError && !githubConnected && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-neutral-border bg-neutral-surface-1 py-12 px-4 text-center shadow-sm">
          <div className="rounded-full bg-neutral-surface-2 p-3 text-neutral-text-secondary">
            <Key className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-neutral-text-primary">
              GitHub Access Required
            </h3>
            <p className="text-sm text-neutral-text-secondary max-w-sm">
              Add your GitHub access key in settings to link repositories and
              track analytics.
            </p>
          </div>
          <Link
            href="/settings"
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Configure Settings
          </Link>
        </div>
      )}

      {/* Always Visible Repositories Section */}
      {!isLoading && !isError && githubConnected && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-text-secondary">
              Available Repositories
            </h2>
          </div>
          <AvailableReposList />
        </section>
      )}

      {/* Connected Projects Grid */}
      <section className="space-y-4">
        <ProjectSearchToolbar projectCount={projects.length} />

        {isLoading && <ProjectsSkeletonGrid />}

        {!isLoading && isError && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-error/20 bg-error/5 py-12 px-4 text-center">
            <AlertCircle className="h-8 w-8 text-error shrink-0" />
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-neutral-text-primary">
                Failed to load projects
              </h3>
              <p className="text-sm text-neutral-text-secondary max-w-md">
                {error instanceof Error
                  ? error.message
                  : "An unexpected error occurred while fetching your projects."}
              </p>
            </div>
            <button
              onClick={() => refetch()}
              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-1 px-3 py-1.5 text-xs font-medium text-neutral-text-primary hover:bg-neutral-surface-2 transition-colors"
            >
              <RefreshCw size={14} />
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && githubConnected && (
          <>
            {projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-border bg-neutral-surface-1 py-12 px-4 text-center">
                <p className="text-base font-medium text-neutral-text-primary">
                  No linked projects yet
                </p>
                <p className="text-sm text-neutral-text-secondary max-w-sm">
                  Click &quot;Link&quot; on any available repository above to
                  display its analytics card here.
                </p>
              </div>
            ) : (
              <ProjectsGrid projects={projects} />
            )}
          </>
        )}
      </section>
    </div>
  );
}

function ProjectsSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-48 animate-pulse rounded-xl border border-neutral-border bg-neutral-surface-1/50"
        />
      ))}
    </div>
  );
}
