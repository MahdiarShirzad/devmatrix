import Link from "next/link";
import { Bug, BarChart3, Terminal, Rocket, ArrowRight } from "lucide-react";

const MODULES = [
  {
    href: "/ai-debug",
    icon: Bug,
    title: "AI debugging assistant",
    description: "Analyze code and get AI-suggested fixes with explanations.",
    metric: "3 active sessions",
  },
  {
    href: "/analytics",
    icon: BarChart3,
    title: "Developer analytics",
    description: "Track commits, activity, and productivity across projects.",
    metric: "2 connected repos",
  },
  {
    href: "/api-playground",
    icon: Terminal,
    title: "API playground",
    description:
      "Send requests and inspect responses, organized by collection.",
    metric: "5 collections",
  },
  {
    href: "/saas-validator",
    icon: Rocket,
    title: "Idea validator",
    description: "Evaluate startup ideas against market and risk signals.",
    metric: "1 idea in review",
  },
];

const RECENT_ACTIVITY = [
  {
    module: "AI debugging",
    text: "Fixed null pointer in auth middleware",
    time: "2h ago",
  },
  {
    module: "API playground",
    text: "New request added to Payments collection",
    time: "5h ago",
  },
  {
    module: "Analytics",
    text: "Weekly report generated for devmatrix-api",
    time: "1d ago",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-medium text-neutral-text-primary">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-neutral-text-secondary">
          Here&apos;s what&apos;s happening across your workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link
              key={mod.href}
              href={mod.href}
              className="group rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-colors hover:border-brand-primary"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-brand-primary/10 p-2.5 text-brand-primary">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <ArrowRight
                  size={16}
                  className="text-neutral-text-secondary opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>

              <h3 className="mt-4 text-sm font-medium text-neutral-text-primary">
                {mod.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-text-secondary">
                {mod.description}
              </p>
              <p className="mt-3 text-xs text-brand-accent">{mod.metric}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-medium text-neutral-text-primary">
          Recent activity
        </h2>
        <div className="divide-y divide-neutral-border rounded-xl border border-neutral-border bg-neutral-surface-1">
          {RECENT_ACTIVITY.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3"
            >
              <div>
                <span className="text-xs text-brand-accent">{item.module}</span>
                <p className="text-sm text-neutral-text-primary">{item.text}</p>
              </div>
              <span className="text-xs text-neutral-text-secondary">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
