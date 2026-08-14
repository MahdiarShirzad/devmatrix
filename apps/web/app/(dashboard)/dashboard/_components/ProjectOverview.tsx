import { GitBranch } from "lucide-react";
import { ListCardSkeleton } from "./Skeletons";
import { ErrorState, EmptyState } from "./EmptyState";
import type { GithubProject, ProjectStats } from "@/types/githubAnalytics.types";

interface ProjectOverviewProps {
  project?: GithubProject | null;
  projectLoading: boolean;
  projectError: boolean;
  stats?: ProjectStats;
  statsLoading: boolean;
  statsError: boolean;
  debugSessionCount: number;
  debugLoading: boolean;
  onRetry: () => void;
}

export function ProjectOverview({
  project,
  projectLoading,
  projectError,
  stats,
  statsLoading,
  statsError,
  debugSessionCount,
  debugLoading,
  onRetry,
}: ProjectOverviewProps) {
  const isLoading = projectLoading || statsLoading;

  if (isLoading) return <ListCardSkeleton rows={4} />;

  return (
    <section className="flex h-full flex-col rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">Project Overview</h3>
        {project && (
          <span className="rounded-md bg-[var(--color-neutral-surface-2)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-neutral-text-secondary)]">
            {project.name}
          </span>
        )}
      </div>

      {projectError ? (
        <ErrorState message="Couldn't load project details." onRetry={onRetry} />
      ) : !project ? (
        <EmptyState message="No project selected" />
      ) : (
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-[var(--color-neutral-text-secondary)]">
              <GitBranch className="h-3.5 w-3.5" />
              GitHub
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
              Connected
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-[var(--color-neutral-border)] pt-4">
            <Stat
              label="Commits"
              value={
                statsError ? "—" : String(stats?.commitsThisWeek ?? 0)
              }
            />
            <Stat
              label="Contributors"
              value={statsError ? "—" : String(stats?.activeContributors ?? 0)}
            />
            <Stat
              label="Debug Sessions"
              value={debugLoading ? "…" : String(debugSessionCount)}
            />
            <Stat
              label="Last Activity"
              value={formatRelativeTime(project.lastSyncedAt)}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] text-[var(--color-neutral-text-secondary)]/60">
        {label}
      </div>
      <div className="mt-0.5 text-base font-semibold text-white">{value}</div>
    </div>
  );
}

function formatRelativeTime(iso: string | null): string {
  if (!iso) return "Never synced";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unknown";
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}
