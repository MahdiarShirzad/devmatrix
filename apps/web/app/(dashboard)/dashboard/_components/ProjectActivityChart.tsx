"use client";

import { useMemo } from "react";
import { ChartCard } from "./ChartCard";
import { ChartCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type { GithubProject } from "@/types/githubAnalytics.types";

interface ProjectActivityChartProps {
  projects?: GithubProject[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const BAR_COLOR = "var(--color-brand-primary)";

function activityScore(p: GithubProject): number {
  // commitsThisWeek is populated by listProjects for the *selected*
  // range (field name kept for backward compat — see
  // githubProjectController.ts comment), so this is range-aware even
  // though the name says "week".
  return typeof p.commitsThisWeek === "number" ? p.commitsThisWeek : 0;
}

/**
 * Replaces the old pie chart per the redesign brief — horizontal bars
 * are easier to compare at a glance than pie slices, especially once
 * there are more than 3-4 projects.
 */
export function ProjectActivityChart({
  projects,
  isLoading,
  isError,
  onRetry,
}: ProjectActivityChartProps) {
  const rows = useMemo(() => {
    const list = projects ?? [];
    const scored = list
      .map((p) => ({ id: p._id, name: p.name, value: activityScore(p) }))
      .filter((p) => p.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    const total = scored.reduce((sum, p) => sum + p.value, 0);
    return scored.map((s) => ({
      ...s,
      percent: total > 0 ? Math.round((s.value / total) * 100) : 0,
    }));
  }, [projects]);

  const maxValue = Math.max(...rows.map((r) => r.value), 1);

  if (isLoading) return <ChartCardSkeleton height="h-56" />;

  return (
    <ChartCard
      title="Project Activity"
      headerRight={
        <span className="text-[10px] text-[var(--color-neutral-text-secondary)]/50">
          commits across projects
        </span>
      }
      className="h-full"
    >
      {isError ? (
        <ErrorState message="Couldn't load project activity." onRetry={onRetry} />
      ) : rows.length === 0 ? (
        <EmptyState message="No project activity in this range" />
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((row) => (
            <div key={row.id} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="truncate text-[var(--color-neutral-text-secondary)]">
                  {row.name}
                </span>
                <span className="shrink-0 font-medium text-white">
                  {row.value} · {row.percent}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-neutral-surface-2)]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max(4, (row.value / maxValue) * 100)}%`,
                    backgroundColor: BAR_COLOR,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </ChartCard>
  );
}
