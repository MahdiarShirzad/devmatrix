import { GitCommit, GitMerge, GitPullRequest, Users } from "lucide-react";
import type { ProjectStats } from "@/types/githubAnalytics.types";

interface StatsGridProps {
  stats: ProjectStats | undefined;
  isLoading: boolean;
}

export default function StatsGrid({ stats, isLoading }: StatsGridProps) {
  const items = [
    {
      label: "Commits this week",
      value: stats?.commitsThisWeek,
      icon: GitCommit,
      color: "text-brand-primary",
    },
    {
      label: "Open PRs",
      value: stats?.openPrsCount,
      icon: GitMerge,
      color: "text-brand-accent",
    },
    {
      label: "Merged PRs",
      value: stats?.mergedPrsCount,
      icon: GitPullRequest,
      color: "text-warning",
    },
    {
      label: "Active contributors",
      value: stats?.activeContributors,
      icon: Users,
      color: "text-success",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((stat) => (
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
              {isLoading ? "—" : (stat.value ?? 0)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
