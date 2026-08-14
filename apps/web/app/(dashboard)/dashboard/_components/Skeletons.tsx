function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[var(--color-neutral-surface-2)] ${className}`}
    />
  );
}

export function KpiCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] p-4">
      <Shimmer className="h-3.5 w-20" />
      <Shimmer className="h-7 w-16" />
      <Shimmer className="h-3 w-24" />
    </div>
  );
}

export function ChartCardSkeleton({ height = "h-64" }: { height?: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] p-4 md:p-5">
      <Shimmer className="mb-4 h-4 w-32" />
      <Shimmer className={`w-full ${height}`} />
    </div>
  );
}

export function ListCardSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] p-4 md:p-5">
      <Shimmer className="mb-4 h-4 w-28" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Shimmer className="h-8 w-8 shrink-0 rounded-lg" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Shimmer className="h-3 w-2/3" />
              <Shimmer className="h-2.5 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
