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
import type { DebugAnalytics } from "@/hooks/useDebugAnalytics";

interface DevelopmentActivityChartProps {
  debugAnalytics: DebugAnalytics;
  debugLoading: boolean;
  debugError: boolean;
  onRetryDebug: () => void;
  totalCommitsInRange?: number;
  rangeLabel: string;
}

/**
 * IMPORTANT DATA LIMITATION — read before "fixing" this to add a commits
 * line back in.
 *
 * The backend has NO workspace-wide day-by-day commit series. What exists:
 *   - GET /github-projects/:id/commits?days=N  → per-PROJECT daily buckets
 *   - GET /github-projects/overview-stats       → workspace TOTAL (a single
 *                                                  number for the whole range,
 *                                                  not bucketed by day)
 *
 * Building a real workspace-wide daily commit series would mean either:
 *   (a) N+1 fetching commits for every linked project and merging by day
 *       client-side, or
 *   (b) a new backend aggregate endpoint (e.g. commits bucketed by day
 *       across all of a user's projectIds, similar to how
 *       getCommitsByDay already aggregates per-project).
 *
 * Neither is implemented yet. Faking a commits-per-day line from the
 * single overview-stats total would violate the "no fake data" rule, so
 * this chart currently plots ONLY AI debugging session activity per day
 * (which IS real, from useAllDebugSessions + useDebugAnalytics), and
 * shows the commit total as a static KPI line underneath instead of a
 * chart series. Wire in a real per-day commit series once (a) or (b)
 * above exists.
 */
export function DevelopmentActivityChart({
  debugAnalytics,
  debugLoading,
  debugError,
  onRetryDebug,
  totalCommitsInRange,
  rangeLabel,
}: DevelopmentActivityChartProps) {
  const chartData = useMemo(
    () =>
      debugAnalytics.activityByDay.map((d) => ({
        label: d.label,
        fullLabel: d.fullLabel,
        debugSessions: d.count,
      })),
    [debugAnalytics.activityByDay],
  );

  const hasAnyActivity = debugAnalytics.totalSessions > 0;

  if (debugLoading) {
    return <ChartCardSkeleton height="h-72" />;
  }

  return (
    <ChartCard
      title="Development Activity"
      headerRight={
        <span className="text-[10px] text-[var(--color-neutral-text-secondary)]/50">
          {rangeLabel}
        </span>
      }
      className="h-full"
    >
      {debugError ? (
        <ErrorState
          message="Couldn't load debugging activity."
          onRetry={onRetryDebug}
        />
      ) : !hasAnyActivity ? (
        <EmptyState message="No AI debugging activity yet" />
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
              <defs>
                <linearGradient id="debugGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-info)"
                    stopOpacity={0.3}
                  />
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
                interval="preserveStartEnd"
                minTickGap={24}
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

      <div className="mt-3 flex items-center justify-between border-t border-[var(--color-neutral-border)] pt-3">
        <span className="flex items-center gap-1.5 text-xs text-[var(--color-neutral-text-secondary)]/70">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-info)" }} />
          AI Debugging Sessions
        </span>
        {typeof totalCommitsInRange === "number" && (
          <span className="text-xs text-[var(--color-neutral-text-secondary)]/70">
            <span className="font-medium text-white">{totalCommitsInRange}</span>{" "}
            commits {rangeLabel.toLowerCase()}
          </span>
        )}
      </div>
    </ChartCard>
  );
}
