"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartCard } from "./ChartCard";
import { ChartCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type { CommitsByDay } from "@/types/githubAnalytics.types";
import type { DebugSession } from "@/types/aiDebug.types";

interface DevelopmentActivityChartProps {
  commits?: CommitsByDay[];
  commitsLoading: boolean;
  commitsError: boolean;
  onRetryCommits: () => void;
  debugSessions: DebugSession[];
  debugLoading: boolean;
}

const DAY_LABEL = new Intl.DateTimeFormat("en-US", { weekday: "short" });

// Bucket debug sessions by day to line up with the commits series.
// (Co-located here rather than extracted to a shared util, since this
// task is scoped to files inside the dashboard folder only.)
function bucketSessionsByDate(
  sessions: DebugSession[],
  dates: string[],
): Map<string, number> {
  const counts = new Map(dates.map((d) => [d, 0]));
  for (const s of sessions) {
    if (!s.createdAt) continue;
    const key = s.createdAt.slice(0, 10);
    if (counts.has(key)) {
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  return counts;
}

export function DevelopmentActivityChart({
  commits,
  commitsLoading,
  commitsError,
  onRetryCommits,
  debugSessions,
  debugLoading,
}: DevelopmentActivityChartProps) {
  const chartData = useMemo(() => {
    if (!commits || commits.length === 0) return [];
    const sorted = [...commits].sort((a, b) => a.date.localeCompare(b.date));
    const dates = sorted.map((c) => c.date.slice(0, 10));
    const sessionCounts = bucketSessionsByDate(debugSessions, dates);

    return sorted.map((c) => {
      const dateKey = c.date.slice(0, 10);
      const d = new Date(dateKey);
      return {
        date: dateKey,
        label: Number.isNaN(d.getTime()) ? dateKey : DAY_LABEL.format(d),
        commits: c.commits,
        debugSessions: sessionCounts.get(dateKey) ?? 0,
      };
    });
  }, [commits, debugSessions]);

  if (commitsLoading) {
    return <ChartCardSkeleton height="h-72" />;
  }

  return (
    <ChartCard title="Development Activity" className="h-full">
      {commitsError ? (
        <ErrorState message="Couldn't load commit activity." onRetry={onRetryCommits} />
      ) : chartData.length === 0 ? (
        <EmptyState message="No commit activity yet" />
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="commitsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-brand-primary)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-brand-primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="debugGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-info)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--color-info)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-neutral-border)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8a8f98", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8a8f98", fontSize: 12 }}
                allowDecimals={false}
                width={28}
              />
              <Tooltip
                contentStyle={{
                  background: "#0d1117",
                  border: "1px solid rgba(229,229,229,0.12)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "#fff", marginBottom: 4 }}
                itemStyle={{ padding: 0 }}
              />
              <Area
                type="monotone"
                dataKey="commits"
                name="Commits"
                stroke="var(--color-brand-primary)"
                strokeWidth={2}
                fill="url(#commitsGradient)"
              />
              <Area
                type="monotone"
                dataKey="debugSessions"
                name="Debug Sessions"
                stroke="var(--color-info)"
                strokeWidth={2}
                fill="url(#debugGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className="mt-3 flex items-center gap-4 text-xs text-[var(--color-neutral-text-secondary)]/70">
        <LegendDot color="var(--color-brand-primary)" label="Commits" />
        <LegendDot color="var(--color-info)" label="Debug Sessions" />
        {debugLoading && <span className="text-[10px]">(syncing debug data…)</span>}
      </div>
    </ChartCard>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}
