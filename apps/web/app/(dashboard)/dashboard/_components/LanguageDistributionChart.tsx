"use client";

import { ChartCard } from "./ChartCard";
import { ChartCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type { LanguageSlice } from "@/types/dashboard.types";

interface LanguageDistributionChartProps {
  languages: LanguageSlice[];
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
  "#a78bfa",
  "#f472b6",
];

export function LanguageDistributionChart({
  languages,
  isLoading,
  isError,
  onRetry,
}: LanguageDistributionChartProps) {
  if (isLoading) return <ChartCardSkeleton height="h-40" />;

  const top = languages.slice(0, 8);

  return (
    <ChartCard
      title="Language Distribution"
      headerRight={
        <span className="text-[10px] text-[var(--color-neutral-text-secondary)]/50">
          by repository bytes
        </span>
      }
      className="h-full"
    >
      {isError ? (
        <ErrorState message="Couldn't load languages." onRetry={onRetry} />
      ) : top.length === 0 ? (
        <EmptyState message="Language data appears after the next repository sync" />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-[var(--color-neutral-surface-2)]">
            {top.map((language, index) => (
              <div
                key={language.language}
                title={`${language.language} · ${language.percent}%`}
                style={{
                  width: `${Math.max(language.percent, 0.5)}%`,
                  backgroundColor: PALETTE[index % PALETTE.length],
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {top.map((language, index) => (
              <div
                key={language.language}
                className="flex items-center justify-between gap-2 text-xs"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-sm"
                    style={{
                      backgroundColor: PALETTE[index % PALETTE.length],
                    }}
                  />
                  <span className="truncate text-[var(--color-neutral-text-secondary)]">
                    {language.language}
                  </span>
                </span>
                <span className="shrink-0 text-[var(--color-neutral-text-secondary)]/60">
                  {language.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ChartCard>
  );
}
