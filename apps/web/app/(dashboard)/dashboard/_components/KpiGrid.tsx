import {
  Bug,
  Flame,
  FolderGit2,
  GitCommitHorizontal,
  GitPullRequest,
  Lightbulb,
} from "lucide-react";
import { MetricCard } from "./MetricCard";
import { KpiCardSkeleton } from "./Skeletons";
import type {
  DashboardActivityPoint,
  DashboardKpis,
} from "@/types/dashboard.types";

interface KpiGridProps {
  kpis: DashboardKpis | null;
  series: DashboardActivityPoint[];
  isLoading: boolean;
}

const formatNumber = (value: number): string => value.toLocaleString();

const EMPTY_KPIS: DashboardKpis = {
  projects: { total: 0, active: 0 },
  commits: { value: 0, previous: 0, changePct: 0 },
  mergedPullRequests: { value: 0, previous: 0, changePct: 0 },
  debugSessions: {
    value: 0,
    previous: 0,
    changePct: 0,
    resolved: 0,
    resolutionRate: 0,
  },
  ideas: { value: 0, previous: 0, changePct: 0, validated: 0 },
  activeDays: 0,
  currentStreak: 0,
  longestStreak: 0,
};

export function KpiGrid({ kpis, series, isLoading }: KpiGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <KpiCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const resolved = kpis ?? EMPTY_KPIS;
  const commits = series.map((p) => p.commits);
  const prs = series.map((p) => p.mergedPullRequests);
  const debug = series.map((p) => p.debugSessions);
  const ideas = series.map((p) => p.ideas);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      <MetricCard
        icon={FolderGit2}
        label="Projects"
        value={formatNumber(resolved.projects.total)}
        sub={`${resolved.projects.active} active`}
      />

      <MetricCard
        icon={GitCommitHorizontal}
        label="Commits"
        value={formatNumber(resolved.commits.value)}
        changePct={resolved.commits.changePct}
        sparkline={commits}
        sparklineColor="var(--color-brand-primary)"
      />

      <MetricCard
        icon={GitPullRequest}
        label="Merged PRs"
        value={formatNumber(resolved.mergedPullRequests.value)}
        changePct={resolved.mergedPullRequests.changePct}
        sparkline={prs}
        sparklineColor="var(--color-brand-accent)"
      />

      <MetricCard
        icon={Bug}
        label="Debug Sessions"
        value={formatNumber(resolved.debugSessions.value)}
        changePct={resolved.debugSessions.changePct}
        sub={`${resolved.debugSessions.resolutionRate}% resolved`}
        sparkline={debug}
        sparklineColor="var(--color-info)"
      />

      <MetricCard
        icon={Lightbulb}
        label="Ideas"
        value={formatNumber(resolved.ideas.value)}
        changePct={resolved.ideas.changePct}
        sub={`${resolved.ideas.validated} validated`}
        sparkline={ideas}
        sparklineColor="var(--color-success)"
      />

      <MetricCard
        icon={Flame}
        label="Active Days"
        value={formatNumber(resolved.activeDays)}
        sub={`${resolved.currentStreak}d streak · best ${resolved.longestStreak}d`}
      />
    </div>
  );
}
