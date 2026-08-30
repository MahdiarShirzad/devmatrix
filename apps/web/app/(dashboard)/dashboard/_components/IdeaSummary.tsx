"use client";

import { ChartCard } from "./ChartCard";
import { ChartCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type { AllIdeasOverviewStats } from "@/hooks/useAllIdeasOverviewStats";

interface IdeaSummaryProps {
  stats?: AllIdeasOverviewStats;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

export function IdeaSummary({
  stats,
  isLoading,
  isError,
  onRetry,
}: IdeaSummaryProps) {
  if (isLoading) return <ChartCardSkeleton height="h-36" />;

  const hasIdeas = !!stats && stats.totalIdeas > 0;

  return (
    <ChartCard title="Idea Validator" className="h-full">
      {isError ? (
        <ErrorState message="Couldn't load idea data." onRetry={onRetry} />
      ) : !hasIdeas ? (
        <EmptyState message="No ideas submitted yet" />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="text-2xl font-semibold text-white">
            {stats.totalIdeas}
            <span className="ml-1.5 text-xs font-normal text-[var(--color-neutral-text-secondary)]/60">
              ideas
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-[var(--color-success)]">
              {stats.validatedCount} validated
            </span>
            <span className="text-[var(--color-neutral-text-secondary)]/70">
              {stats.pendingCount} pending
            </span>
            {stats.failedCount > 0 && (
              <span className="text-[var(--color-error)]">
                {stats.failedCount} failed
              </span>
            )}
          </div>

          {stats.pendingCount > 0 && (
            <div className="rounded-lg bg-[var(--color-warning-bg)] px-3 py-2 text-xs text-[var(--color-brand-primary)]">
              {stats.pendingCount} idea{stats.pendingCount > 1 ? "s" : ""} need
              review
            </div>
          )}
        </div>
      )}
    </ChartCard>
  );
}
