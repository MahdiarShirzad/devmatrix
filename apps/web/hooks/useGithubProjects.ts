import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";
import type {
  GithubProject,
  ProjectStats,
  CommitsByDay,
  Heatmap,
  Contributor,
  AvailableRepo,
  SyncResult,
  LinkProjectInput,
  OverviewStats,
} from "@/types/githubAnalytics.types";

/**
 * CANONICAL useGithubProjects + related hooks.
 *
 * This file replaces two previously-diverging implementations that used
 * different query keys for the same endpoint:
 *   - ["github-projects", "list", days]   (this file, kept)
 *   - ["github-projects", days]           (deleted — was in a second,
 *                                           separate useGithubProjects.ts)
 *
 * Delete the second file entirely. Any import of the old one
 * (`from "@/hooks/useGithubProjects"` pointing at the duplicate) should
 * resolve to this file instead — same import path, one implementation.
 */

const KEYS = {
  list: (days?: string) => ["github-projects", "list", days ?? "all"] as const,
  detail: (id: string) => ["github-projects", "detail", id] as const,
  stats: (id: string) => ["github-projects", "stats", id] as const,
  commits: (id: string, days: number) =>
    ["github-projects", "commits", id, days] as const,
  heatmap: (id: string, weeks: number) =>
    ["github-projects", "heatmap", id, weeks] as const,
  contributors: (id: string) =>
    ["github-projects", "contributors", id] as const,
  availableRepos: ["github-projects", "available-repos"] as const,
  overviewStats: (days: string) => ["overview-stats", days] as const,
};

export function useGithubProjects(days?: string) {
  return useQuery({
    queryKey: KEYS.list(days),
    queryFn: () =>
      api.get<{
        results: number;
        githubConnected: boolean;
        projects: GithubProject[];
      }>(days ? `/github-projects?days=${days}` : "/github-projects"),
  });
}

export function useGithubProject(id: string) {
  return useQuery({
    queryKey: KEYS.detail(id),
    queryFn: () =>
      api.get<{ project: GithubProject }>(`/github-projects/${id}`),
    enabled: !!id,
  });
}

export function useProjectStats(id: string) {
  return useQuery({
    queryKey: KEYS.stats(id),
    queryFn: () =>
      api.get<{ stats: ProjectStats }>(`/github-projects/${id}/stats`),
    enabled: !!id,
  });
}

export function useCommitsByDay(id: string, days: number = 7) {
  return useQuery({
    queryKey: KEYS.commits(id, days),
    queryFn: () =>
      api.get<{ data: CommitsByDay[] }>(
        `/github-projects/${id}/commits?days=${days}`,
      ),
    enabled: !!id,
  });
}

export function useHeatmap(id: string, weeks = 24) {
  return useQuery({
    queryKey: KEYS.heatmap(id, weeks),
    queryFn: () =>
      api.get<{ data: Heatmap }>(
        `/github-projects/${id}/heatmap?weeks=${weeks}`,
      ),
    enabled: !!id,
  });
}

export function useContributors(id: string) {
  return useQuery({
    queryKey: KEYS.contributors(id),
    queryFn: () =>
      api.get<{ contributors: Contributor[] }>(
        `/github-projects/${id}/contributors`,
      ),
    enabled: !!id,
  });
}

export function useAvailableRepos(enabled = true) {
  return useQuery({
    queryKey: KEYS.availableRepos,
    queryFn: () =>
      api.get<{ repos: AvailableRepo[] }>("/github-projects/available-repos"),
    enabled,
  });
}

export function useLinkGithubProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: LinkProjectInput) =>
      api.post<{ project: GithubProject }>("/github-projects", input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["github-projects", "list"] });
    },
  });
}

export function useUnlinkGithubProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete<void>(`/github-projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["github-projects", "list"] });
    },
  });
}

export function useSyncGithubProject(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      api.post<{ result: SyncResult }>(`/github-projects/${id}/sync`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: KEYS.stats(id) });
      queryClient.invalidateQueries({
        queryKey: ["github-projects", "commits", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["github-projects", "heatmap", id],
      });
      queryClient.invalidateQueries({ queryKey: KEYS.contributors(id) });
      queryClient.invalidateQueries({ queryKey: ["github-projects", "list"] });
    },
  });
}

export function useSetGithubAccessToken() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (token: string) =>
      api.patch<{ githubConnected: boolean; message: string }>(
        "/github-projects/access-token",
        { token },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["github-projects", "list"] });
    },
  });
}

export function useRemoveGithubAccessToken() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      api.delete<{ githubConnected: boolean; message: string }>(
        "/github-projects/access-token",
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["github-projects", "list"] });
    },
  });
}

export function useOverviewStats(days: string) {
  return useQuery({
    queryKey: KEYS.overviewStats(days),
    queryFn: () =>
      api.get<{ stats: OverviewStats }>(
        `/github-projects/overview-stats?days=${days}`,
      ),
  });
}
