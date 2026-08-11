"use client";

import { GitCommit, GitPullRequest, Activity, TrendingUp } from "lucide-react";
import { useOverviewStats } from "@/hooks/useGithubAnalytics";
import { useAnalyticsRange } from "@/src/context/AnalyticsRangeContext";

export default function OverviewStats() {
  const { range } = useAnalyticsRange();
  const { data, isLoading } = useOverviewStats(range);
  const stats = data?.stats;

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
        <div className="flex items-center gap-3 text-neutral-text-secondary">
          <GitCommit size={18} className="text-brand-primary" />
          <span className="text-sm font-medium">Total Commits</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-3xl font-bold text-neutral-text-primary">
            {isLoading ? "—" : (stats?.totalCommits ?? 0)}
          </span>
          {!isLoading && (stats?.totalCommitsLastWeek ?? 0) > 0 && (
            <span className="flex items-center text-xs font-medium text-success">
              <TrendingUp size={14} className="mr-1" />+
              {stats?.totalCommitsLastWeek} this week
            </span>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
        <div className="flex items-center gap-3 text-neutral-text-secondary">
          <GitPullRequest size={18} className="text-brand-accent" />
          <span className="text-sm font-medium">Merged PRs</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-3xl font-bold text-neutral-text-primary">
            {isLoading ? "—" : (stats?.mergedPrsCount ?? 0)}
          </span>
          {!isLoading && (stats?.mergedPrsLastWeek ?? 0) > 0 && (
            <span className="flex items-center text-xs font-medium text-success">
              <TrendingUp size={14} className="mr-1" />+
              {stats?.mergedPrsLastWeek} this week
            </span>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
        <div className="flex items-center gap-3 text-neutral-text-secondary">
          <Activity size={18} className="text-warning" />
          <span className="text-sm font-medium">Most Active Day</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-xl font-bold text-neutral-text-primary mt-2">
            {isLoading ? "—" : (stats?.mostActiveDay ?? "No data yet")}
          </span>
          {!isLoading && stats?.mostActiveDay && (
            <span className="text-xs text-neutral-text-secondary">
              {stats.mostActiveDayCommits} commits
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
