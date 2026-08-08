import { Activity } from "lucide-react";
import { ActivityLogItem } from "./constants";

interface ActivityLogsProps {
  items: ActivityLogItem[];
}

export default function ActivityLogs({ items }: ActivityLogsProps) {
  return (
    <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 overflow-hidden">
      <div className="flex items-center gap-2 border-b border-neutral-border bg-neutral-surface-2/50 px-5 py-4">
        <Activity size={16} className="text-neutral-text-secondary" />
        <h2 className="text-sm font-semibold text-neutral-text-primary">
          System Activity Logs
        </h2>
      </div>

      <div className="divide-y divide-neutral-border">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-neutral-surface-2/30"
          >
            {/* Timeline Indicator */}
            <div className="mt-1.5 flex flex-col items-center">
              <div className={`h-2 w-2 rounded-full ${item.indicator}`} />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-neutral-text-secondary uppercase tracking-wider">
                  {item.module}
                </span>
                <span className="text-[11px] text-neutral-text-secondary whitespace-nowrap">
                  {item.time}
                </span>
              </div>
              <p className="text-sm text-neutral-text-primary">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
