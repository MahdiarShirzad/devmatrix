"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { ChartCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type { DebugAnalytics } from "@/hooks/useDebugAnalytics";

interface AiDebuggingSummaryProps {
  analytics: DebugAnalytics;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

/**
 * Replaces DebugSessionsDonut — the old donut spent a lot of visual
 * space for what boils down to 4 numbers and a resolution rate. This
 * packs the same real data (from useDebugAnalytics, workspace-wide)
 * into a denser layout per the redesign brief.
 */
export function AiDebuggingSummary({
  analytics,
  isLoading,
  isError,
  onRetry,
}: AiDebuggingSummaryProps) {
  const topLanguage = analytics.languageBreakdown[0];

  if (isLoading) return <ChartCardSkeleton height="h-44" />;

  return (
    <ChartCard title="AI Debugging" className="h-full">
      {isError ? (
        <ErrorState message="Couldn't load debugging data." onRetry={onRetry} />
      ) : analytics.totalSessions === 0 ? (
        <EmptyState message="No debugging sessions yet" />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-semibold text-white">
                {analytics.totalSessions}
              </div>
              <div className="text-xs text-[var(--color-neutral-text-secondary)]/60">
                sessions
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-[var(--color-brand-primary)]">
                {analytics.resolutionRate}%
              </div>
              <div className="text-xs text-[var(--color-neutral-text-secondary)]/60">
                resolution rate
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-[var(--color-neutral-border)] pt-3 text-xs">
            <StatusStat
              icon={CheckCircle2}
              color="var(--color-success)"
              label="Resolved"
              value={analytics.resolvedSessions}
            />
            <StatusStat
              icon={Clock}
              color="var(--color-info)"
              label="In Progress"
              value={analytics.inProgressSessions}
            />
            <StatusStat
              icon={XCircle}
              color="var(--color-error)"
              label="Failed"
              value={analytics.failedSessions}
            />
          </div>

          {topLanguage && (
            <div className="flex items-center justify-between border-t border-[var(--color-neutral-border)] pt-3 text-xs">
              <span className="text-[var(--color-neutral-text-secondary)]/60">
                Most analyzed
              </span>
              <span className="font-medium text-white">
                {topLanguage.language} · {topLanguage.percent}%
              </span>
            </div>
          )}
        </div>
      )}
    </ChartCard>
  );
}

function StatusStat({
  icon: Icon,
  color,
  label,
  value,
}: {
  icon: typeof CheckCircle2;
  color: string;
  label: string;
  value: number;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg bg-[var(--color-neutral-surface-2)]/40 py-2.5">
      <Icon className="h-3.5 w-3.5" style={{ color }} />
      <span className="font-semibold text-white">{value}</span>
      <span className="text-[10px] text-[var(--color-neutral-text-secondary)]/60">
        {label}
      </span>
    </div>
  );
}
