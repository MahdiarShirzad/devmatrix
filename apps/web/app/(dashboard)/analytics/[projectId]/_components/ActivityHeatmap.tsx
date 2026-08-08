function heatColor(level: number) {
  switch (level) {
    case 0:
      return "bg-neutral-surface-2/50";
    case 1:
      return "bg-brand-primary/20";
    case 2:
      return "bg-brand-primary/40";
    case 3:
      return "bg-brand-primary/70";
    default:
      return "bg-brand-primary shadow-[0_0_8px_rgba(var(--brand-primary),0.4)]";
  }
}

interface ActivityHeatmapProps {
  data: number[][];
}

export default function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  return (
    <>
      <div className="flex flex-1 items-center justify-center min-w-max">
        <div className="flex gap-2 text-[10px] text-neutral-text-secondary mr-3 flex-col justify-between py-1 h-[116px]">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        <div className="flex gap-1.5">
          {data.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1.5">
              {week.map((level, di) => (
                <div
                  key={di}
                  className={`h-3 w-3 rounded-[3px] transition-colors hover:ring-2 hover:ring-neutral-400 hover:ring-offset-1 hover:ring-offset-neutral-surface-1 ${heatColor(level)}`}
                  title={`${level} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-2 text-xs text-neutral-text-secondary">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`h-3 w-3 rounded-[3px] ${heatColor(level)}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </>
  );
}
