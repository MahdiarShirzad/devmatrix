"use client";

import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CheckCircle2, Clock, XCircle, Bug } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { ChartCardSkeleton, ListCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type {
  DebuggingAnalyticsResponse,
  DashboardInterval,
} from "@/types/dashboard.types";

interface DebuggingAnalyticsProps {
  data?: DebuggingAnalyticsResponse;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const STATUS_META: Record<string, { label: string; color: string }> = {
  resolved: { label: "Resolved", color: "var(--color-success)" },
  in_progress: { label: "In Progress", color: "var(--color-info)" },
  failed: { label: "Failed", color: "var(--color-error)" },
  pending: { label: "Pending", color: "var(--color-warning)" },
};

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

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Bug;
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-2)]/40 p-3">
      <div className="mb-1.5 flex items-center gap-1.5 text-[var(--color-neutral-text-secondary)]/60">
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        <span className="text-[11px] font-medium">{label}</span>
      </div>
      <div className="text-xl font-semibold" style={tone ? { color: tone } : undefined}>
        <span className={tone ? "" : "text-white"}>{value}</span>
      </div>
    </div>
  );
}

export function DebuggingAnalytics({
  data,
  isLoading,
  isError,
  onRetry,
}: DebuggingAnalyticsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <ChartCardSkeleton height="h-64" />
        <ListCardSkeleton rows={4} />
      </div>
    );
  }

  const totals = data?.totals;
  const hasSessions = !!totals && totals.total > 0;
  const interval = data?.range.interval ?? "day";

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <ChartCard
          title="AI Debugging Analytics"
          headerRight={
            <span className="text-[10px] text-[var(--color-neutral-text-secondary)]/50">
              {hasSessions ? `${totals.total} sessions` : "session volume"}
            </span>
          }
          className="h-full"
        >
          {isError ? (
            <ErrorState message="Couldn't load debugging data." onRetry={onRetry} />
          ) : !hasSessions ? (
            <EmptyState message="No AI debugging sessions in this range" />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat
                  icon={Bug}
                  label="Sessions"
                  value={totals.total.toLocaleString()}
                />
                <Stat
                  icon={CheckCircle2}
                  label="Resolved"
                  value={`${totals.resolutionRate}%`}
                  tone="var(--color-success)"
                />
                <Stat
                  icon={Clock}
                  label="Avg Resolution"
                  value={
                    totals.avgResolutionHours === null
                      ? "—"
                      : totals.avgResolutionHours < 24
                        ? `${totals.avgResolutionHours}h`
                        : `${Math.round(totals.avgResolutionHours / 24)}d`
                  }
                />
                <Stat
                  icon={XCircle}
                  label="Failed"
                  value={totals.failed.toLocaleString()}
                  tone={totals.failed > 0 ? "var(--color-error)" : undefined}
                />
              </div>

              {data.series.length > 1 && (
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data.series.map((s) => ({
                        label: formatBucket(s.bucket, interval),
                        sessions: s.sessions,
                      }))}
                      margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="debugAnalyticsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor="var(--color-info)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--color-info)"
                            stopOpacity={0}
                          />
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
                        tick={{ fill: "#8a8f98", fontSize: 11 }}
                        interval="preserveStartEnd"
                        minTickGap={24}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#8a8f98", fontSize: 11 }}
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
                        dataKey="sessions"
                        name="Sessions"
                        stroke="var(--color-info)"
                        strokeWidth={2}
                        fill="url(#debugAnalyticsGradient)"
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          )}
        </ChartCard>

        <ChartCard
          title="Status Breakdown"
          className="h-full"
        >
          {isError || !hasSessions ? (
            <EmptyState message="No status data yet" />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                {data.statusDistribution.map((row) => {
                  const meta =
                    STATUS_META[row.status] ?? {
                      label: row.status,
                      color: "var(--color-neutral-text-secondary)",
                    };
                  const percent =
                    totals.total > 0
                      ? Math.round((row.count / totals.total) * 100)
                      : 0;
                  return (
                    <div key={row.status} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[var(--color-neutral-text-secondary)]">
                          {meta.label}
                        </span>
                        <span className="text-[var(--color-neutral-text-secondary)]/60">
                          {row.count} · {percent}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-neutral-surface-2)]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: meta.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {data.byLanguage.length > 0 && (
                <div className="border-t border-[var(--color-neutral-border)] pt-3">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[var(--color-neutral-text-secondary)]/50">
                    By language
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {data.byLanguage.slice(0, 5).map((lang) => (
                      <div
                        key={lang.language}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="truncate text-[var(--color-neutral-text-secondary)]">
                          {lang.language}
                        </span>
                        <span className="shrink-0 text-[var(--color-neutral-text-secondary)]/60">
                          {lang.count} · {lang.percent}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </ChartCard>
      </div>

      {hasSessions && data.attention.length > 0 && (
        <ChartCard
          title="Needs Attention"
          headerRight={
            <span className="text-[10px] text-[var(--color-neutral-text-secondary)]/50">
              {data.attention.length} sessions
            </span>
          }
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {data.attention.map((session) => {
              const meta =
                STATUS_META[session.status] ?? {
                  label: session.status,
                  color: "var(--color-neutral-text-secondary)",
                };
              return (
                <Link
                  key={session.id}
                  href={`/projects/${session.projectId}/ai-debug`}
                  className="flex items-start gap-3 rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-2)]/30 p-3 transition-colors hover:border-[var(--color-neutral-text-secondary)]/30"
                >
                  <span
                    className="mt-1 h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: meta.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-white">{session.title}</p>
                    <p className="mt-0.5 truncate text-[11px] text-[var(--color-neutral-text-secondary)]/60">
                      {session.projectName} · {session.language} · {meta.label}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </ChartCard>
      )}
    </div>
  );
}
