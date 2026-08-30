import Link from "next/link";
import { Plus, Terminal, Bug, BarChart3, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ACTIONS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "New Project", href: "/dashboard?action=link-project", icon: Plus },
  { label: "Debug Code", href: "/ai-debug", icon: Bug },
  { label: "Analyze Repository", href: "/analytics", icon: BarChart3 },
  { label: "Test API", href: "/api-playground", icon: Terminal },
  { label: "Validate Idea", href: "/saas-validator", icon: Rocket },
];

/**
 * Project-scoped actions (everything except New Project) intentionally
 * link to the tool's own landing page rather than a specific project —
 * those pages already handle "no project selected yet" guidance. This
 * avoids Dashboard fabricating a fake global project context.
 */
export function QuickActions() {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
      {ACTIONS.map((action) => {
        const Icon = action.icon;
        const isPrimary = action.label === "New Project";
        return (
          <Link
            key={action.label}
            href={action.href}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isPrimary
                ? "bg-[var(--color-brand-primary)] text-black hover:opacity-90"
                : "border border-[var(--color-neutral-border)] text-[var(--color-neutral-text-secondary)] hover:border-[var(--color-neutral-text-secondary)]/30 hover:text-white"
            }`}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            {action.label}
          </Link>
        );
      })}
    </div>
  );
}
