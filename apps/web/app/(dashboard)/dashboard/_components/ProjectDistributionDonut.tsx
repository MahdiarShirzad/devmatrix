"use client";

import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartCard } from "./ChartCard";
import { ChartCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type { ProjectBreakdownItem } from "@/types/dashboard.types";

interface ProjectDistributionDonutProps {
  projects: ProjectBreakdownItem[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const PALETTE = [
  "var(--color-brand-primary)",
  "var(--color-brand-accent)",
  "var(--color-brand-highlight)",
  "var(--color-info)",
  "var(--color-success)",
  "var(--color-warning)",
];

export function ProjectDistributionDonut({
  projects,
  isLoading,
  isError,
  onRetry,
}: ProjectDistributionDonutProps) {
  const { slices, total } = useMemo(() => {
    const active = projects
      .filter((p) => p.commits > 0)
      .sort((a, b) => b.commits - a.commits);

    const top = active.slice(0, 5).map((p) => ({
      name: p.name,
      value: p.commits,
    }));
    const rest = active
      .slice(5)
      .reduce((sum, p) => sum + p.commits, 0);
    if (rest > 0) top.push({ name: "Other", value: rest });

    return {
      slices: top,
      total: active.reduce((sum, p) => sum + p.commits, 0),
    };
  }, [projects]);

  if (isLoading) return <ChartCardSkeleton height="h-56" />;

  return (
    <ChartCard
      title="Commit Distribution"
      headerRight={
        <span className="text-[10px] text-[var(--color-neutral-text-secondary)]/50">
          {total.toLocaleString()} commits
        </span>
      }
      className="h-full"
    >
      {isError ? (
        <ErrorState
          message="Couldn't load distribution."
          onRetry={onRetry}
        />
      ) : slices.length === 0 ? (
        <EmptyState message="No commits in this range" />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slices}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={44}
                  outerRadius={64}
                  paddingAngle={2}
                  stroke="none"
                  isAnimationActive={false}
                >
                  {slices.map((slice, index) => (
                    <Cell
                      key={slice.name}
                      fill={PALETTE[index % PALETTE.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0d1117",
                    border: "1px solid rgba(229,229,229,0.12)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#fff", marginBottom: 4 }}
                  itemStyle={{ padding: 0 }}
                  formatter={(value) => [
                    `${Number(value).toLocaleString()} commits`,
                    "",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex w-full flex-col gap-1.5">
            {slices.map((slice, index) => (
              <div
                key={slice.name}
                className="flex items-center justify-between text-xs"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-sm"
                    style={{ backgroundColor: PALETTE[index % PALETTE.length] }}
                  />
                  <span className="truncate text-[var(--color-neutral-text-secondary)]">
                    {slice.name}
                  </span>
                </span>
                <span className="shrink-0 text-[var(--color-neutral-text-secondary)]/60">
                  {total > 0 ? Math.round((slice.value / total) * 100) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ChartCard>
  );
}
