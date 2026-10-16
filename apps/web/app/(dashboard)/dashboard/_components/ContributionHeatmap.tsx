"use client";

import { useMemo } from "react";
import { ChartCard } from "./ChartCard";
import { ChartCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type { HeatmapDay } from "@/types/dashboard.types";

interface ContributionHeatmapProps {
  data: HeatmapDay[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const WEEKDAYS = ["Mon", "", "Wed", "", "Fri", "", ""];

function levelFor(commits: number): number {
  if (commits <= 0) return 0;
  if (commits <= 2) return 1;
  if (commits <= 5) return 2;
  if (commits <= 9) return 3;
  return 4;
}

const LEVEL_OPACITY = [0, 0.28, 0.5, 0.75, 1];

export function ContributionHeatmap({
  data,
  isLoading,
  isError,
  onRetry,
}: ContributionHeatmapProps) {
  const { weeks, totalCommits, monthLabels } = useMemo(() => {
    if (data.length === 0) {
      return { weeks: [] as (HeatmapDay | null)[][], totalCommits: 0, monthLabels: [] as { index: number; label: string }[] };
    }

    const total = data.reduce((sum, d) => sum + d.commits, 0);

    const parse = (iso: string) => new Date(`${iso}T00:00:00.000Z`);
    const first = parse(data[0].date);
    // getUTCDay: 0=Sun..6=Sat → offset so Monday is the first row.
    const offset = (first.getUTCDay() + 6) % 7;

    const cells: (HeatmapDay | null)[] = [
      ...Array.from({ length: offset }, () => null),
      ...data,
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    const built: (HeatmapDay | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      built.push(cells.slice(i, i + 7));
    }

    const labels: { index: number; label: string }[] = [];
    let lastMonth = "";
    built.forEach((week, index) => {
      const day = week.find((d): d is HeatmapDay => d !== null);
      if (!day) return;
      const month = parse(day.date).toLocaleDateString(undefined, {
        month: "short",
        timeZone: "UTC",
      });
      if (month !== lastMonth) {
        labels.push({ index, label: month });
        lastMonth = month;
      }
    });

    return { weeks: built, totalCommits: total, monthLabels: labels };
  }, [data]);

  const titleHeader = (
    <span className="text-[10px] text-[var(--color-neutral-text-secondary)]/50">
      {totalCommits.toLocaleString()} commits
    </span>
  );

  if (isLoading) return <ChartCardSkeleton height="h-32" />;

  const hasData = data.some((d) => d.commits > 0);

  return (
    <ChartCard
      title="Contribution Activity"
      headerRight={titleHeader}
      className="h-full"
    >
      {isError ? (
        <ErrorState message="Couldn't load contribution heatmap." onRetry={onRetry} />
      ) : !hasData ? (
        <EmptyState message="No commits in this range" />
      ) : (
        <div className="overflow-x-auto pb-1">
          <div className="inline-flex flex-col gap-1">
            <div className="flex gap-[3px] pl-7">
              {weeks.map((_, index) => {
                const label = monthLabels.find((m) => m.index === index);
                return (
                  <div key={index} className="w-[11px] shrink-0">
                    {label && (
                      <span className="text-[9px] text-[var(--color-neutral-text-secondary)]/50">
                        {label.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-[3px]">
              <div className="mr-1 flex flex-col gap-[3px]">
                {WEEKDAYS.map((day, i) => (
                  <div
                    key={i}
                    className="flex h-[11px] w-5 items-center text-[9px] leading-none text-[var(--color-neutral-text-secondary)]/50"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => {
                    if (!day) {
                      return (
                        <div
                          key={di}
                          className="h-[11px] w-[11px] rounded-[2px]"
                        />
                      );
                    }
                    const level = levelFor(day.commits);
                    return (
                      <div
                        key={di}
                        title={`${day.date}: ${day.commits} commit${day.commits === 1 ? "" : "s"}`}
                        className="h-[11px] w-[11px] rounded-[2px] transition-colors"
                        style={
                          level === 0
                            ? { backgroundColor: "var(--color-neutral-surface-2)" }
                            : {
                                backgroundColor: "var(--color-brand-primary)",
                                opacity: LEVEL_OPACITY[level],
                              }
                        }
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="mt-1 flex items-center justify-end gap-1.5">
              <span className="text-[9px] text-[var(--color-neutral-text-secondary)]/50">
                Less
              </span>
              {LEVEL_OPACITY.map((opacity, i) => (
                <div
                  key={i}
                  className="h-[9px] w-[9px] rounded-[2px]"
                  style={
                    i === 0
                      ? { backgroundColor: "var(--color-neutral-surface-2)" }
                      : {
                          backgroundColor: "var(--color-brand-primary)",
                          opacity,
                        }
                  }
                />
              ))}
              <span className="text-[9px] text-[var(--color-neutral-text-secondary)]/50">
                More
              </span>
            </div>
          </div>
        </div>
      )}
    </ChartCard>
  );
}
