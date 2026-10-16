import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { MetricSparkline } from "./MetricSparkline";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  changePct?: number;
  changeLabel?: string;
  sparkline?: number[];
  sparklineColor?: string;
}

export function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
  changePct,
  changeLabel = "vs previous period",
  sparkline,
  sparklineColor,
}: MetricCardProps) {
  const hasChange = typeof changePct === "number";
  const isPositive = hasChange && changePct > 0;
  const isNegative = hasChange && changePct < 0;

  const changeColor = isPositive
    ? "text-[var(--color-success)]"
    : isNegative
      ? "text-[var(--color-error)]"
      : "text-[var(--color-neutral-text-secondary)]/60";
  const ChangeIcon = isPositive ? ArrowUpRight : isNegative ? ArrowDownRight : Minus;

  return (
    <div className="flex flex-col rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] p-4">
      <div className="mb-3 flex items-center gap-1.5 text-[var(--color-neutral-text-secondary)]/70">
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        <span className="text-xs font-medium">{label}</span>
      </div>

      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="text-2xl font-semibold text-white">{value}</div>
          <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs">
            {hasChange && (
              <span className={`inline-flex items-center gap-0.5 ${changeColor}`}>
                <ChangeIcon className="h-3 w-3" />
                {changePct > 0 ? "+" : ""}
                {changePct}%
              </span>
            )}
            {sub && (
              <span className="text-[var(--color-neutral-text-secondary)]/60">
                {hasChange ? changeLabel : sub}
              </span>
            )}
          </div>
        </div>

        {sub && hasChange && (
          <span className="shrink-0 text-xs text-[var(--color-neutral-text-secondary)]/60">
            {sub}
          </span>
        )}
      </div>

      {sparkline && sparkline.length > 1 && (
        <div className="mt-3 border-t border-[var(--color-neutral-border)] pt-2">
          <MetricSparkline data={sparkline} color={sparklineColor} />
        </div>
      )}
    </div>
  );
}
