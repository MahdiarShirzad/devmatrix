"use client";

import { useMemo } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { ChartCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type { ProjectBreakdownItem } from "@/types/dashboard.types";

interface ProjectRankingChartProps {
  projects: ProjectBreakdownItem[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

export function ProjectRankingChart({
  projects,
  isLoading,
  isError,
  onRetry,
}: ProjectRankingChartProps) {
  const rows = useMemo(() => {
    const active = projects
      .filter((p) => p.totalActivity > 0)
      .sort((a, b) => b.commits - a.commits || b.totalActivity - a.totalActivity)
      .slice(0, 7);
    const max = Math.max(...active.map((p) => p.commits), 1);
    return { active, max };
  }, [projects]);

  if (isLoading) return <ChartCardSkeleton height="h-64" />;

  return (
    <ChartCard
      title="Project Ranking"
      headerRight={
        <span className="text-[10px] text-[var(--color-neutral-text-secondary)]/50">
          by commits
        </span>
      }
      className="h-full"
    >
      {isError ? (
        <ErrorState message="Couldn't load project ranking." onRetry={onRetry} />
      ) : rows.active.length === 0 ? (
        <EmptyState message="No project activity in this range" />
      ) : (
        <div className="flex flex-col gap-3.5">
          {rows.active.map((project, index) => (
            <div key={project.projectId} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-[10px] font-medium text-[var(--color-neutral-text-secondary)]/50">
                    {index + 1}
                  </span>
                  <span className="truncate text-[var(--color-neutral-text-secondary)]">
                    {project.name}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5">
                  <span className="font-medium text-white">
                    {project.commits.toLocaleString()}
                  </span>
                  {project.trendPct !== 0 && (
                    <span
                      className={`inline-flex items-center ${
                        project.trendPct > 0
                          ? "text-[var(--color-success)]"
                          : "text-[var(--color-error)]"
                      }`}
                    >
                      {project.trendPct > 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(project.trendPct)}%
                    </span>
                  )}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-neutral-surface-2)]">
                <div
                  className="h-full rounded-full bg-[var(--color-brand-primary)]"
                  style={{
                    width: `${Math.max(3, (project.commits / rows.max) * 100)}%`,
                  }}
                />
              </div>
              <div className="flex gap-3 text-[10px] text-[var(--color-neutral-text-secondary)]/50">
                <span>{project.mergedPullRequests} PRs</span>
                <span>{project.debugSessions} debug</span>
                <span>{project.ideas} ideas</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </ChartCard>
  );
}
