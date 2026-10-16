"use client";

import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Lightbulb, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { ChartCardSkeleton, ListCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type { IdeaAnalyticsResponse } from "@/types/dashboard.types";

interface IdeaAnalyticsProps {
  data?: IdeaAnalyticsResponse;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const SCORE_COLORS = [
  "var(--color-error)",
  "var(--color-warning)",
  "var(--color-info)",
  "var(--color-success)",
];

const STATUS_META: Record<string, { label: string; color: string }> = {
  completed: { label: "Completed", color: "var(--color-success)" },
  pending: { label: "Pending", color: "var(--color-warning)" },
  failed: { label: "Failed", color: "var(--color-error)" },
};

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Lightbulb;
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
      <div className="text-xl font-semibold text-white" style={tone ? { color: tone } : undefined}>
        {value}
      </div>
    </div>
  );
}

export function IdeaAnalytics({
  data,
  isLoading,
  isError,
  onRetry,
}: IdeaAnalyticsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <ChartCardSkeleton height="h-64" />
        <ListCardSkeleton rows={4} />
      </div>
    );
  }

  const totals = data?.totals;
  const hasIdeas = !!totals && totals.total > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <ChartCard
          title="Idea Validation Analytics"
          headerRight={
            <span className="text-[10px] text-[var(--color-neutral-text-secondary)]/50">
              {hasIdeas ? `${totals.total} ideas` : "validation results"}
            </span>
          }
          className="h-full"
        >
          {isError ? (
            <ErrorState message="Couldn't load idea data." onRetry={onRetry} />
          ) : !hasIdeas ? (
            <EmptyState message="No ideas validated in this range" />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat
                  icon={Lightbulb}
                  label="Ideas"
                  value={totals.total.toLocaleString()}
                />
                <Stat
                  icon={ShieldCheck}
                  label="Validated"
                  value={`${totals.successRate}%`}
                  tone="var(--color-success)"
                />
                <Stat
                  icon={Sparkles}
                  label="Avg Score"
                  value={
                    data.scores.avgOverall === null
                      ? "—"
                      : String(data.scores.avgOverall)
                  }
                />
                <Stat
                  icon={Clock}
                  label="Pending"
                  value={totals.pending.toLocaleString()}
                />
              </div>

              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.distribution}
                    margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
                  >
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
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#8a8f98", fontSize: 11 }}
                      allowDecimals={false}
                      width={28}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(229,229,229,0.05)" }}
                      contentStyle={{
                        background: "#0d1117",
                        border: "1px solid rgba(229,229,229,0.12)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      labelStyle={{ color: "#fff", marginBottom: 4 }}
                    />
                    <Bar dataKey="count" name="Ideas" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                      {data.distribution.map((_, i) => (
                        <Cell key={i} fill={SCORE_COLORS[i % SCORE_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </ChartCard>

        <ChartCard title="Score Breakdown" className="h-full">
          {isError || !hasIdeas ? (
            <EmptyState message="No scores yet" />
          ) : (
            <div className="flex flex-col gap-3">
              {(
                [
                  ["Market Fit", data.scores.avgMarketFit],
                  ["Competition", data.scores.avgCompetition],
                  ["Risk", data.scores.avgRisk],
                  ["Overall", data.scores.avgOverall],
                ] as [string, number | null][]
              ).map(([label, score]) => (
                <div key={label} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--color-neutral-text-secondary)]">
                      {label}
                    </span>
                    <span className="text-[var(--color-neutral-text-secondary)]/60">
                      {score === null ? "—" : score}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-neutral-surface-2)]">
                    <div
                      className="h-full rounded-full bg-[var(--color-brand-primary)]"
                      style={{ width: `${score ?? 0}%` }}
                    />
                  </div>
                </div>
              ))}

              {data.byCategory.length > 0 && (
                <div className="border-t border-[var(--color-neutral-border)] pt-3">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[var(--color-neutral-text-secondary)]/50">
                    By category
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {data.byCategory.slice(0, 5).map((category) => (
                      <div
                        key={category.category}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="truncate text-[var(--color-neutral-text-secondary)]">
                          {category.category}
                        </span>
                        <span className="shrink-0 text-[var(--color-neutral-text-secondary)]/60">
                          {category.count} · avg {category.avgScore ?? "—"}
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

      {hasIdeas && (
        <ChartCard
          title="Recent Ideas"
          headerRight={
            <span className="text-[10px] text-[var(--color-neutral-text-secondary)]/50">
              newest first
            </span>
          }
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {data.recent.map((idea) => {
              const meta =
                STATUS_META[idea.status] ?? {
                  label: idea.status,
                  color: "var(--color-neutral-text-secondary)",
                };
              return (
                <Link
                  key={idea.id}
                  href={`/projects/${idea.projectId}/saas-validator`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-2)]/30 p-3 transition-colors hover:border-[var(--color-neutral-text-secondary)]/30"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white">{idea.title}</p>
                    <p className="mt-0.5 truncate text-[11px] text-[var(--color-neutral-text-secondary)]/60">
                      {idea.projectName}
                      {idea.category ? ` · ${idea.category}` : ""}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {idea.overallScore !== null && (
                      <span className="text-sm font-semibold text-white">
                        {idea.overallScore}
                      </span>
                    )}
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: meta.color }}
                      title={meta.label}
                    />
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
