import { useMemo } from "react";
import { useGithubProjects, useOverviewStats } from "@/hooks/useGithubProjects";
import { useAllDebugSessions } from "@/hooks/useAllDebugSessions";
import { useDebugAnalytics } from "@/hooks/useDebugAnalytics";
import { useAllIdeasOverviewStats } from "@/hooks/useAllIdeasOverviewStats";
import { useDashboardActivity } from "@/hooks/useDashboardActivity";
import type { TimeRangeValue } from "@/app/(dashboard)/dashboard/_components/DashboardHeader";

/**
 * Workspace-level Dashboard data hook.
 *
 * Replaces the old useDashboardData(projectId, days) which required a
 * selectedProjectId and never produced a true global aggregate (its
 * "all projects" mode passed pid="" to project-scoped hooks, which are
 * `enabled: !!projectId` and therefore just... didn't run).
 *
 * Every hook called here is genuinely workspace-wide:
 *   - useGithubProjects(range)        → GET /github-projects (no id)
 *   - useOverviewStats(range)         → GET /github-projects/overview-stats
 *   - useAllDebugSessions(range)      → GET /ai-debug/sessions (new)
 *   - useAllIdeasOverviewStats(range) → GET /ideas/overview-stats (new)
 *   - useDashboardActivity(range)     → GET /dashboard/activity (new)
 *
 * No projectId is threaded through anywhere in this file. Project-scoped
 * pages (Analytics, AI Debug, Idea Validator, API Playground detail
 * views) continue to use their own project-scoped hooks directly — this
 * hook is Dashboard-only.
 */
export function useDashboard(range: TimeRangeValue) {
  const projectsQuery = useGithubProjects(range);
  const overviewStatsQuery = useOverviewStats(range);
  const debugSessionsQuery = useAllDebugSessions(range);
  const ideasStatsQuery = useAllIdeasOverviewStats(range);
  const activityQuery = useDashboardActivity(range);

  const allSessions = useMemo(
    () => debugSessionsQuery.data?.sessions ?? [],
    [debugSessionsQuery.data],
  );

  // useDebugAnalytics buckets activityByDay against `days` — pass the
  // selected range through so it stops hardcoding a 7-day window
  // regardless of what the Dashboard's selector says.
  const debugAnalytics = useDebugAnalytics(allSessions, Number(range));

  return {
    projects: {
      data: projectsQuery.data?.projects,
      githubConnected: projectsQuery.data?.githubConnected ?? false,
      isLoading: projectsQuery.isLoading,
      isError: projectsQuery.isError,
      refetch: projectsQuery.refetch,
    },
    overviewStats: {
      data: overviewStatsQuery.data?.stats,
      isLoading: overviewStatsQuery.isLoading,
      isError: overviewStatsQuery.isError,
      refetch: overviewStatsQuery.refetch,
    },
    debugSessions: {
      data: allSessions,
      analytics: debugAnalytics,
      isLoading: debugSessionsQuery.isLoading,
      isError: debugSessionsQuery.isError,
      refetch: debugSessionsQuery.refetch,
    },
    ideasStats: {
      data: ideasStatsQuery.data?.stats,
      isLoading: ideasStatsQuery.isLoading,
      isError: ideasStatsQuery.isError,
      refetch: ideasStatsQuery.refetch,
    },
    activity: {
      data: activityQuery.data?.activity,
      isLoading: activityQuery.isLoading,
      isError: activityQuery.isError,
      refetch: activityQuery.refetch,
    },
  };
}

export type DashboardData = ReturnType<typeof useDashboard>;
