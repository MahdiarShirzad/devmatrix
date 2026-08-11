import { KPIStat } from "./mockData";

const TREND_COLOR: Record<KPIStat["trend"]["direction"], string> = {
  up: "text-success",
  down: "text-error",
  neutral: "text-neutral-text-secondary",
};

interface KPIStatCardProps {
  stat: KPIStat;
}

export default function KPIStatCard({ stat }: KPIStatCardProps) {
  const Icon = stat.icon;

  return (
    <div className="flex flex-col justify-between rounded-lg border border-neutral-border bg-neutral-surface-1 px-4 py-3.5">
      <div className="flex items-center gap-1.5 text-neutral-text-secondary">
        <Icon size={14} strokeWidth={2} />
        <span className="text-xs font-medium">{stat.label}</span>
      </div>

      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2xl font-semibold tracking-tight text-neutral-text-primary">
          {stat.value}
        </span>
        <span className={`text-[11px] font-medium ${TREND_COLOR[stat.trend.direction]}`}>
          {stat.trend.label}
        </span>
      </div>
    </div>
  );
}
