import Link from "next/link";
import { Plus, Terminal, Bug, BarChart3, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ACTIONS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "New Project", href: "/dashboard?action=link-project", icon: Plus },
  { label: "Test API", href: "/api-playground", icon: Terminal },
  { label: "Debug Code", href: "/ai-debug", icon: Bug },
  { label: "Analyze Repository", href: "/analytics", icon: BarChart3 },
  { label: "Validate Idea", href: "/saas-validator", icon: Rocket },
];

export function QuickActions() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {ACTIONS.map((action) => {
        const Icon = action.icon;
        const isPrimary = action.label === "New Project";
        return (
          <Link
            key={action.label}
            href={action.href}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
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
