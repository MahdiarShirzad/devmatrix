"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartCard } from "./ChartCard";
import { ChartCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type { DebugSession } from "@/types/aiDebug.types";

interface DebugSessionsDonutProps {
  sessions: DebugSession[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const STATUS_META = {
  resolved: { label: "Resolved", color: "var(--color-success)" },
  in_progress: { label: "Processing", color: "var(--color-info)" },
  pending: { label: "Pending", color: "var(--color-brand-primary)" },
  failed: { label: "Failed", color: "var(--color-error)" },
} as const;

export function DebugSessionsDonut({
  sessions,
  isLoading,
  isError,
  onRetry,
}: DebugSessionsDonutProps) {
  const { slices, total } = useMemo(() => {
    const counts: Record<string, number> = {
      resolved: 0,
      in_progress: 0,
      pending: 0,
      failed: 0,
    };
    for (const s of sessions) {
      if (s.status in counts) counts[s.status] += 1;
    }
    const total = sessions.length;
    const slices = (Object.keys(STATUS_META) as (keyof typeof STATUS_META)[])
      .map((key) => ({
        key,
        label: STATUS_META[key].label,
        color: STATUS_META[key].color,
        count: counts[key],
        percent: total > 0 ? Math.round((counts[key] / total) * 100) : 0,
      }))
      .filter((s) => s.count > 0);
    return { slices, total };
  }, [sessions]);

  if (isLoading) return <ChartCardSkeleton height="h-56" />;

  return (
    <ChartCard title="Debug Sessions" className="h-full">
      {isError ? (
        <ErrorState message="Couldn't load debug sessions." onRetry={onRetry} />
      ) : total === 0 ? (
        <EmptyState message="No debugging sessions yet" />
      ) : (
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative h-44 w-44 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slices}
                  dataKey="count"
                  nameKey="label"
                  innerRadius="68%"
                  outerRadius="100%"
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {slices.map((s) => (
                    <Cell key={s.key} fill={s.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0d1117",
                    border: "1px solid rgba(229,229,229,0.12)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(value, name) => [`${value}`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold text-white">{total}</span>
              <span className="text-[10px] text-[var(--color-neutral-text-secondary)]/60">
                total
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto">
            {slices.map((s) => (
              <div key={s.key} className="flex items-center justify-between gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-[var(--color-neutral-text-secondary)]">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  {s.label}
                </span>
                <span className="font-medium text-white">
                  {s.count} <span className="text-[var(--color-neutral-text-secondary)]/50">({s.percent}%)</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ChartCard>
  );
}
