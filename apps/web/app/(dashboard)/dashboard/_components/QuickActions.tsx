import Link from "next/link";
import { Plus, Terminal, Bug, BarChart3, Rocket, LucideIcon } from "lucide-react";

interface QuickActionDef {
  label: string;
  href: string;
  icon: LucideIcon;
}

const ACTIONS: QuickActionDef[] = [
  { label: "New Project", href: "/projects/new", icon: Plus },
  { label: "Test API", href: "/api-playground", icon: Terminal },
  { label: "Debug Code", href: "/ai-debug", icon: Bug },
  { label: "Analyze Repository", href: "/analytics", icon: BarChart3 },
  { label: "Validate Idea", href: "/saas-validator", icon: Rocket },
];

export default function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2">
      {ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center gap-1.5 rounded-md border border-neutral-border bg-neutral-surface-1 px-3 py-1.5 text-xs font-medium text-neutral-text-secondary transition-colors hover:border-neutral-text-secondary/30 hover:text-neutral-text-primary"
          >
            <Icon size={13} strokeWidth={2} />
            {action.label}
          </Link>
        );
      })}
    </div>
  );
}
