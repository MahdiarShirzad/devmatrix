import { Lightbulb, CheckCircle2, Target } from "lucide-react";

export default function OverviewStats() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
        <div className="flex items-center gap-3 text-neutral-text-secondary">
          <Lightbulb size={18} className="text-brand-primary" />
          <span className="text-sm font-medium">Total Ideas</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-3xl font-bold text-neutral-text-primary">
            24
          </span>
          <span className="text-xs text-neutral-text-secondary">
            +3 this month
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
        <div className="flex items-center gap-3 text-neutral-text-secondary">
          <CheckCircle2 size={18} className="text-success" />
          <span className="text-sm font-medium">Validated</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-3xl font-bold text-neutral-text-primary">
            6
          </span>
          <span className="text-xs text-neutral-text-secondary">
            25% win rate
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
        <div className="flex items-center gap-3 text-neutral-text-secondary">
          <Target size={18} className="text-brand-accent" />
          <span className="text-sm font-medium">Avg. Score</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-3xl font-bold text-neutral-text-primary">
            54.3
          </span>
          <span className="text-xs text-neutral-text-secondary">
            Out of 100
          </span>
        </div>
      </div>
    </div>
  );
}
