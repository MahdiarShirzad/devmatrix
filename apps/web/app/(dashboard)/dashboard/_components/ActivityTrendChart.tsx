"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "./ChartCard";
import { ChartCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type {
  DashboardActivityPoint,
  DashboardInterval,
} from "@/types/dashboard.types";

interface ActivityTrendChartProps {
  series: DashboardActivityPoint[];
  interval: DashboardInterval;
  rangeLabel: string;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

type MetricKey = "commits" | "mergedPullRequests" | "debugSessions" | "ideas";

const METRICS: {
  key: MetricKey;
  label: string;
  color: string;
}[] = [
  { key: "commits", label: "Commits", color: "var(--color-brand-primary)" },
  {
    key: "mergedPullRequests",
    label: "Merged PRs",
    color: "var(--color-brand-accent)",
  },
  { key: "debugSessions", label: "Debug", color: "var(--color-info)" },
  { key: "ideas", label: "Ideas", color: "var(--color-success)" },
];

const formatBucket = (iso: string, interval: DashboardInterval): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  if (interval === "month") {
    return date.toLocaleDateString(undefined, {
      month: "short",
      year: "2-digit",
      timeZone: "UTC",
    });
  }
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
};

export function ActivityTrendChart({
  series,
  interval,
  rangeLabel,
  isLoading,
  isError,
  onRetry,
}: ActivityTrendChartProps) {
  const [active, setActive] = useState<MetricKey[]>([
    "commits",
    "mergedPullRequests",
    "debugSessions",
  ]);

  const toggle = (key: MetricKey) => {
    setActive((prev) => {
      if (prev.includes(key)) {
        return prev.length > 1 ? prev.filter((k) => k !== key) : prev;
      }
      return [...prev, key];
    });
  };

  const data = useMemo(
    () =>
      series.map((point) => ({
        label: formatBucket(point.bucket, interval),
        ...point,
      })),
    [series, interval],
  );

  const hasActivity = series.some(
    (p) =>
      p.commits + p.mergedPullRequests + p.debugSessions + p.ideas > 0,
  );

  if (isLoading) return <ChartCardSkeleton height="h-72" />;

  return (
    <ChartCard
      title="Activity Trend"
      headerRight={
        <div className="flex flex-wrap items-center gap-1.5">
          {METRICS.map((metric) => {
            const on = active.includes(metric.key);
            return (
              <button
                key={metric.key}
                type="button"
                onClick={() => toggle(metric.key)}
                className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] transition-colors ${
                  on
                    ? "border-[var(--color-neutral-border)] text-white"
                    : "border-transparent text-[var(--color-neutral-text-secondary)]/50 hover:text-[var(--color-neutral-text-secondary)]"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: on ? metric.color : "transparent",
                    border: on ? "none" : `1px solid ${metric.color}`,
                  }}
                />
                {metric.label}
              </button>
            );
          })}
        </div>
      }
      className="h-full"
      footer={
        <p className="mt-3 border-t border-[var(--color-neutral-border)] pt-3 text-[11px] text-[var(--color-neutral-text-secondary)]/50">
          {rangeLabel} · bucketed by {interval}
        </p>
      }
    >
      {isError ? (
        <ErrorState
          message="Couldn't load activity trend."
          onRetry={onRetry}
        />
      ) : !hasActivity ? (
        <EmptyState message="No activity in this range" />
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
              <defs>
                {METRICS.map((metric) => (
                  <linearGradient
                    key={metric.key}
                    id={`trend-${metric.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={metric.color}
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="100%"
                      stopColor={metric.color}
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}
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
              {METRICS.filter((m) => active.includes(m.key)).map((metric) => (
                <Area
                  key={metric.key}
                  type="monotone"
                  dataKey={metric.key}
                  name={metric.label}
                  stroke={metric.color}
                  strokeWidth={2}
                  fill={`url(#trend-${metric.key})`}
                  isAnimationActive={false}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  );
}
