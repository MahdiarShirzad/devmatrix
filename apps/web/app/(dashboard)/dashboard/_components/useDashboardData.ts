import { useMemo } from "react";

import { useDebugSessions } from "@/hooks/useAiDebug";
import { useDebugAnalytics } from "@/hooks/useDebugAnalytics";
import type { DebugSession } from "@/types/aiDebug.types";
import { useIdeas, useOverviewStats } from "@/hooks/useIdea";
import { useGithubProjects } from "@/hooks/useGithubProjects";
import {
  useCommitsByDay,
  useContributors,
  useGithubProject,
  useProjectStats,
} from "@/hooks/useGithubAnalytics";

/**
 * Orchestrates the existing domain hooks for the Dashboard page only.
 * Owns no fetch/query logic itself — every field here is a pass-through
 * or a light client-side derivation (filtering, day-bucketing) of data
 * the underlying hooks already returned. Each slice keeps its own
 * loading/error/refetch so one failing endpoint never blanks the page.
 */
export function useDashboardData(projectId: string | null, days: string) {
  // Workspace-level
  const projectsQuery = useGithubProjects(days);
  const ideasQuery = useIdeas();
  const ideasStatsQuery = useOverviewStats();

  // Project-scoped (selected project from sidebar context)
  const pid = projectId ?? "";
  const projectQuery = useGithubProject(pid);
  const projectStatsQuery = useProjectStats(pid);
  const commitsQuery = useCommitsByDay(pid, Number(days));
  const contributorsQuery = useContributors(pid);

  // Debug sessions: workspace fetch (no project-scoped endpoint exists),
  // filtered client-side by DebugSession.projectId when a project is selected.
  const debugSessionsQuery = useDebugSessions();
  const allSessions = useMemo<DebugSession[]>(
    () => debugSessionsQuery.data?.sessions ?? [],
    [debugSessionsQuery.data],
  );
  const projectSessions = useMemo<DebugSession[]>(
    () =>
      projectId
        ? allSessions.filter((s) => s.projectId === projectId)
        : allSessions,
    [allSessions, projectId],
  );
  const debugAnalytics = useDebugAnalytics(projectSessions);

  return {
    projects: {
      data: projectsQuery.data?.projects,
      githubConnected: projectsQuery.data?.githubConnected ?? false,
      isLoading: projectsQuery.isLoading,
      isError: projectsQuery.isError,
      refetch: projectsQuery.refetch,
    },
    ideas: {
      data: ideasQuery.data?.ideas,
      isLoading: ideasQuery.isLoading,
      isError: ideasQuery.isError,
      refetch: ideasQuery.refetch,
    },
    ideasStats: {
      data: ideasStatsQuery.data?.stats,
      isLoading: ideasStatsQuery.isLoading,
      isError: ideasStatsQuery.isError,
      refetch: ideasStatsQuery.refetch,
    },
    project: {
      data: projectQuery.data?.project,
      isLoading: projectQuery.isLoading,
      isError: projectQuery.isError,
      refetch: projectQuery.refetch,
    },
    projectStats: {
      data: projectStatsQuery.data?.stats,
      isLoading: projectStatsQuery.isLoading,
      isError: projectStatsQuery.isError,
      refetch: projectStatsQuery.refetch,
    },
    commits: {
      data: commitsQuery.data?.data,
      isLoading: commitsQuery.isLoading,
      isError: commitsQuery.isError,
      refetch: commitsQuery.refetch,
    },
    contributors: {
      data: contributorsQuery.data?.contributors,
      isLoading: contributorsQuery.isLoading,
      isError: contributorsQuery.isError,
      refetch: contributorsQuery.refetch,
    },
    debugSessions: {
      data: projectSessions,
      allData: allSessions,
      analytics: debugAnalytics,
      isLoading: debugSessionsQuery.isLoading,
      isError: debugSessionsQuery.isError,
      refetch: debugSessionsQuery.refetch,
    },
  };
}

export type DashboardData = ReturnType<typeof useDashboardData>;
