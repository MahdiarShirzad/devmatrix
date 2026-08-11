import { Bug, GitFork, Terminal, BarChart3, Rocket, LucideIcon } from "lucide-react";
import { mockRecentActivity, ModuleName } from "./mockData";

const MODULE_ICON: Record<ModuleName, LucideIcon> = {
  "AI Debugging": Bug,
  GitHub: GitFork,
  "API Playground": Terminal,
  Analytics: BarChart3,
  "Idea Validator": Rocket,
};

export default function RecentActivity() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-neutral-border bg-neutral-surface-1 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-text-primary">
          Recent Activity
        </h2>
        <button
          type="button"
          className="text-xs font-medium text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
        >
          View all →
        </button>
      </div>

      <div className="mt-3 flex-1 divide-y divide-neutral-border">
        {mockRecentActivity.map((item) => {
          const Icon = MODULE_ICON[item.module];
          return (
            <div key={item.id} className="flex items-start gap-3 py-2.5 first:pt-0">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neutral-surface-2 text-neutral-text-secondary">
                <Icon size={13} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-neutral-text-secondary">
                    {item.module}
                  </span>
                  <span className="shrink-0 text-[11px] text-neutral-text-secondary">
                    {item.timestamp}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-sm text-neutral-text-primary">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
