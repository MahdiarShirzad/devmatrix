interface ResolutionRateProps {
  resolutionRate: number;
  totalSessions: number;
  resolvedSessions: number;
}

export default function ResolutionRate({
  resolutionRate,
  totalSessions,
  resolvedSessions,
}: ResolutionRateProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-neutral-border bg-neutral-surface-1 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-text-primary">
          Resolution Rate
        </h3>
        <span className="text-xs text-neutral-text-secondary">
          {totalSessions > 0
            ? `${resolvedSessions} of ${totalSessions}`
            : "No data"}
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold tabular-nums text-neutral-text-primary">
          {resolutionRate}%
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-surface-2">
        <div
          className="h-full rounded-full bg-success transition-all"
          style={{ width: `${resolutionRate}%` }}
        />
      </div>
    </div>
  );
}
