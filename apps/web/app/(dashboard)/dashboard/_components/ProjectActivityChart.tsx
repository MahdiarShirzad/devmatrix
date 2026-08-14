"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
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

const PALETTE = [
  "var(--color-brand-primary)",
  "var(--color-info)",
  "var(--color-success)",
  "#a78bfa",
  "#f472b6",
  "#38bdf8",
];

function activityScore(p: GithubProject): number {
  if (typeof p.commitsThisWeek === "number") return p.commitsThisWeek;
  if (Array.isArray(p.activityData)) {
    return p.activityData.reduce((sum, n) => sum + n, 0);
  }
  return 0;
}

export function ProjectActivityChart({
  projects,
  isLoading,
  isError,
  onRetry,
}: ProjectActivityChartProps) {
  const { slices, hasUsableData } = useMemo(() => {
    const list = projects ?? [];
    const scored = list.map((p) => ({
      id: p._id,
      name: p.name,
      value: activityScore(p),
    }));
    const total = scored.reduce((sum, p) => sum + p.value, 0);
    const hasUsableData = list.length > 0 && total > 0;
    const slices = scored
      .filter((s) => s.value > 0)
      .sort((a, b) => b.value - a.value)
      .map((s, i) => ({
        ...s,
        percent: total > 0 ? Math.round((s.value / total) * 100) : 0,
        color: PALETTE[i % PALETTE.length],
      }));
    return { slices, hasUsableData };
  }, [projects]);

  if (isLoading) return <ChartCardSkeleton height="h-56" />;

  return (
    <ChartCard
      title="Project Activity"
      headerRight={
        <span className="text-[10px] text-[var(--color-neutral-text-secondary)]/50">
          across your projects
        </span>
      }
      className="h-full"
    >
      {isError ? (
        <ErrorState message="Couldn't load project activity." onRetry={onRetry} />
      ) : !hasUsableData ? (
        <EmptyState message="No project activity available" />
      ) : (
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-44 w-44 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slices}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="0%"
                  outerRadius="100%"
                  paddingAngle={1}
                  strokeWidth={0}
                >
                  {slices.map((s) => (
                    <Cell key={s.id} fill={s.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0d1117",
                    border: "1px solid rgba(229,229,229,0.12)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(value, name) => [`${value} commits`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto">
            {slices.slice(0, 6).map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-4 text-xs">
                <span className="flex items-center gap-1.5 truncate text-[var(--color-neutral-text-secondary)]">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="truncate">{s.name}</span>
                </span>
                <span className="shrink-0 font-medium text-white">{s.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ChartCard>
  );
}
