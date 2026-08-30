import { FolderGit2, GitCommitHorizontal, Bug, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { KpiCardSkeleton } from "./Skeletons";
import type { GithubProject, OverviewStats } from "@/types/githubAnalytics.types";
import type { DebugAnalytics } from "@/hooks/useDebugAnalytics";
import type { AllIdeasOverviewStats } from "@/hooks/useAllIdeasOverviewStats";
import type { TimeRangeValue } from "./DashboardHeader";

interface KpiCardsProps {
  range: TimeRangeValue;
  projects: { data?: GithubProject[]; isLoading: boolean; isError: boolean };
  overviewStats: {
    data?: OverviewStats;
    isLoading: boolean;
    isError: boolean;
  };
  debugAnalytics: DebugAnalytics;
  debugLoading: boolean;
  debugError: boolean;
  ideasStats: {
    data?: AllIdeasOverviewStats;
    isLoading: boolean;
    isError: boolean;
  };
}

const RANGE_LABEL: Record<TimeRangeValue, string> = {
  "7": "Last 7 days",
  "30": "Last 30 days",
  "90": "Last 90 days",
};

export function KpiCards({
  range,
  projects,
  overviewStats,
  debugAnalytics,
  debugLoading,
  debugError,
  ideasStats,
}: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {projects.isLoading ? (
        <KpiCardSkeleton />
      ) : (
        <KpiCard
          icon={FolderGit2}
          label="Projects"
          value={projects.isError ? "—" : String(projects.data?.length ?? 0)}
          sub={projects.isError ? "Couldn't load" : "Linked repositories"}
          subTone={projects.isError ? "error" : "neutral"}
        />
      )}

      {overviewStats.isLoading ? (
        <KpiCardSkeleton />
      ) : (
        <KpiCard
          icon={GitCommitHorizontal}
          label="Commits"
          value={
            overviewStats.isError
              ? "—"
              : String(overviewStats.data?.totalCommits ?? 0)
          }
          sub={overviewStats.isError ? "Couldn't load" : RANGE_LABEL[range]}
          subTone={overviewStats.isError ? "error" : "neutral"}
        />
      )}

      {debugLoading ? (
        <KpiCardSkeleton />
      ) : (
        <KpiCard
          icon={Bug}
          label="AI Debugging"
          value={debugError ? "—" : String(debugAnalytics.totalSessions)}
          sub={
            debugError
              ? "Couldn't load"
              : debugAnalytics.totalSessions > 0
                ? `${debugAnalytics.resolutionRate}% resolved`
                : "No sessions yet"
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
          value={
            ideasStats.isError ? "—" : String(ideasStats.data?.totalIdeas ?? 0)
          }
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
