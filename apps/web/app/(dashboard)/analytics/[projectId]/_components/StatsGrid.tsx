import { GitCommit, GitMerge, Clock, Users, TrendingUp } from "lucide-react";

const STATS = [
  {
    label: "Commits this week",
    value: "24",
    icon: GitCommit,
    color: "text-brand-primary",
    trend: "+12%",
  },
  {
    label: "Open PRs",
    value: "3",
    icon: GitMerge,
    color: "text-brand-accent",
    trend: "-1",
  },
  {
    label: "Avg. merge time",
    value: "1.4d",
    icon: Clock,
    color: "text-warning",
    trend: "-4h",
  },
  {
    label: "Active contributors",
    value: "3",
    icon: Users,
    color: "text-success",
    trend: "0",
  },
];

export default function StatsGrid() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="group rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-colors hover:border-neutral-border/80"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-text-secondary">
              {stat.label}
            </span>
            <stat.icon size={18} className={stat.color} />
          </div>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-3xl font-bold text-neutral-text-primary">
              {stat.value}
            </p>
            <span className="flex items-center text-xs font-medium text-success">
              <TrendingUp size={14} className="mr-1" /> {stat.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
