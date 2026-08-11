import { AlertTriangle, Circle, ChevronRight } from "lucide-react";
import { mockAttentionItems, AttentionSeverity } from "./mockData";

const SEVERITY_ICON: Record<
  AttentionSeverity,
  { icon: typeof AlertTriangle; className: string }
> = {
  warning: { icon: AlertTriangle, className: "text-warning" },
  info: { icon: Circle, className: "text-neutral-text-secondary" },
};

export default function NeedsAttention() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-neutral-border bg-neutral-surface-1 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-text-primary">
          Needs Attention
        </h2>
        <span className="rounded-full bg-warning-bg px-2 py-0.5 text-[11px] font-medium text-warning">
          {mockAttentionItems.length}
        </span>
      </div>

      <div className="mt-3 flex-1 divide-y divide-neutral-border">
        {mockAttentionItems.map((item) => {
          const { icon: Icon, className } = SEVERITY_ICON[item.severity];
          return (
            <button
              key={item.id}
              type="button"
              className="flex w-full items-center gap-3 py-2.5 text-left transition-colors first:pt-0 hover:bg-neutral-surface-2/50"
            >
              <Icon size={15} className={`shrink-0 ${className}`} strokeWidth={2} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-neutral-text-primary">
                  {item.title}
                </p>
                <p className="truncate text-xs text-neutral-text-secondary">
                  {item.subtitle}
                </p>
              </div>
              <ChevronRight
                size={14}
                className="shrink-0 text-neutral-text-secondary"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
