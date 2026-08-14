import { FolderGit2, GitCommitHorizontal, Bug, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { KpiCardSkeleton } from "./Skeletons";
import type { GithubProject, CommitsByDay } from "@/types/githubAnalytics.types";
import type { DebugAnalytics } from "@/hooks/useDebugAnalytics";
import type { OverviewStats as IdeasOverviewStats } from "@/types/ideaValidator.types";

interface KpiCardsProps {
  projects: {
    data?: GithubProject[];
    isLoading: boolean;
    isError: boolean;
  };
  commits: {
    data?: CommitsByDay[];
    isLoading: boolean;
    isError: boolean;
  };
  debugAnalytics: DebugAnalytics;
  debugLoading: boolean;
  debugError: boolean;
  ideasStats: {
    data?: IdeasOverviewStats;
    isLoading: boolean;
    isError: boolean;
  };
}

export function KpiCards({
  projects,
  commits,
  debugAnalytics,
  debugLoading,
  debugError,
  ideasStats,
}: KpiCardsProps) {
  const commitTotal = commits.data?.reduce((sum, d) => sum + d.commits, 0);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {projects.isLoading ? (
        <KpiCardSkeleton />
      ) : (
        <KpiCard
          icon={FolderGit2}
          label="Projects"
          value={
            projects.isError
              ? "—"
              : String(projects.data?.length ?? 0)
          }
          sub={projects.isError ? "Couldn't load" : "Linked repositories"}
          subTone={projects.isError ? "error" : "neutral"}
        />
      )}

      {commits.isLoading ? (
        <KpiCardSkeleton />
      ) : (
        <KpiCard
          icon={GitCommitHorizontal}
          label="Commits"
          value={commits.isError ? "—" : String(commitTotal ?? 0)}
          sub={commits.isError ? "Couldn't load" : "Selected period"}
          subTone={commits.isError ? "error" : "neutral"}
        />
      )}

      {debugLoading ? (
        <KpiCardSkeleton />
      ) : (
        <KpiCard
          icon={Bug}
          label="Debug Sessions"
          value={debugError ? "—" : String(debugAnalytics.totalSessions)}
          sub={
            debugError
              ? "Couldn't load"
              : `${debugAnalytics.resolvedSessions} resolved`
          }
          subTone={debugError ? "error" : "success"}
        />
      )}

      {ideasStats.isLoading ? (
        <KpiCardSkeleton />
      ) : (
        <KpiCard
          icon={Lightbulb}
          label="Ideas"
          value={ideasStats.isError ? "—" : String(ideasStats.data?.totalIdeas ?? 0)}
          sub={
            ideasStats.isError
              ? "Couldn't load"
              : `${ideasStats.data?.validatedCount ?? 0} validated`
          }
          subTone={ideasStats.isError ? "error" : "neutral"}
        />
      )}
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  subTone = "neutral",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  subTone?: "neutral" | "success" | "error";
}) {
  const subColor =
    subTone === "success"
      ? "text-[var(--color-success)]"
      : subTone === "error"
        ? "text-[var(--color-error)]"
        : "text-[var(--color-neutral-text-secondary)]/60";

  return (
    <div className="rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] p-4">
      <div className="mb-3 flex items-center gap-1.5 text-[var(--color-neutral-text-secondary)]/70">
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className={`mt-1 text-xs ${subColor}`}>{sub}</div>
    </div>
  );
}
