import Link from "next/link";
import {
  Bug,
  BarChart3,
  Terminal,
  Rocket,
  ArrowRight,
  Activity,
} from "lucide-react";

const MODULES = [
  {
    href: "/api-playground",
    icon: Terminal,
    title: "API Playground",
    description: "Send requests, inspect responses, and manage collections.",
    metric: "5 collections",
    color: "text-brand-accent",
    bg: "bg-brand-accent/10",
    borderHover: "hover:border-brand-accent/50",
  },
  {
    href: "/ai-debug",
    icon: Bug,
    title: "AI Debugging Assistant",
    description: "Analyze stack traces and get AI-suggested code fixes.",
    metric: "3 active sessions",
    color: "text-brand-primary",
    bg: "bg-brand-primary/10",
    borderHover: "hover:border-brand-primary/50",
  },
  {
    href: "/analytics",
    icon: BarChart3,
    title: "Developer Analytics",
    description: "Track commits, velocity, and productivity metrics.",
    metric: "2 connected repos",
    color: "text-brand-highlight",
    bg: "bg-brand-highlight/10",
    borderHover: "hover:border-brand-highlight/50",
  },
  {
    href: "/saas-validator",
    icon: Rocket,
    title: "SaaS Idea Validator",
    description: "Evaluate startup ideas against market and risk signals.",
    metric: "1 idea in review",
    color: "text-success",
    bg: "bg-success-bg",
    borderHover: "hover:border-success/50",
  },
];

const RECENT_ACTIVITY = [
  {
    module: "AI Debugging",
    text: "Resolved TypeScript casing compile error in auth module",
    time: "22 mins ago",
    indicator: "bg-brand-primary",
  },
  {
    module: "API Playground",
    text: "Tested GET /api/flights in my-trip workspace",
    time: "2 hours ago",
    indicator: "bg-brand-accent",
  },
  {
    module: "Analytics",
    text: "Weekly productivity report generated for deep-coding-backend",
    time: "1 day ago",
    indicator: "bg-brand-highlight",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
            Welcome back, Mahdiar
          </h1>
          <p className="mt-1.5 text-sm text-neutral-text-secondary">
            Here&apos;s an overview of your active workspaces and recent system
            events.
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-success md:mt-0 bg-success-bg px-3 py-1.5 rounded-full border border-success/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          All systems operational
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link
              key={mod.href}
              href={mod.href}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${mod.borderHover}`}
            >
              {/* Subtle background glow effect on hover */}
              <div
                className={`absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-20 ${mod.bg}`}
              />

              <div>
                <div className="flex items-start justify-between">
                  <div className={`rounded-lg p-2.5 ${mod.bg} ${mod.color}`}>
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-neutral-text-secondary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-neutral-text-primary"
                  />
                </div>

                <h3 className="mt-4 text-base font-semibold text-neutral-text-primary">
                  {mod.title}
                </h3>
                <p className="mt-1.5 text-xs text-neutral-text-secondary leading-relaxed">
                  {mod.description}
                </p>
              </div>

              <div className="mt-5 inline-flex w-fit items-center rounded-md bg-neutral-surface-2 px-2 py-1 text-[11px] font-medium text-neutral-text-primary border border-neutral-border">
                {mod.metric}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Activity Logs */}
      <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 overflow-hidden">
        <div className="flex items-center gap-2 border-b border-neutral-border bg-neutral-surface-2/50 px-5 py-4">
          <Activity size={16} className="text-neutral-text-secondary" />
          <h2 className="text-sm font-semibold text-neutral-text-primary">
            System Activity Logs
          </h2>
        </div>

        <div className="divide-y divide-neutral-border">
          {RECENT_ACTIVITY.map((item, i) => (
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
    </div>
  );
}
