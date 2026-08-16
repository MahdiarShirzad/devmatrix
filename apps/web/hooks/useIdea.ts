import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";
import type {
  Idea,
  OverviewStats,
  CreateIdeaInput,
  ReevaluateIdeaInput,
} from "@/types/ideaValidator.types";

const KEYS = {
  list: (projectId: string) => ["ideas", "list", projectId] as const,
  detail: (projectId: string, id: string) =>
    ["ideas", "detail", projectId, id] as const,
  overviewStats: (projectId: string) =>
    ["ideas", "overview-stats", projectId] as const,
};

export function useIdeas(projectId: string) {
  return useQuery({
    queryKey: KEYS.list(projectId),
    queryFn: () => api.get<{ ideas: Idea[] }>(`/projects/${projectId}/ideas`),
    enabled: !!projectId,
  });
}

export function useIdea(projectId: string, id: string) {
  return useQuery({
    queryKey: KEYS.detail(projectId, id),
    queryFn: () =>
      api.get<{ idea: Idea }>(`/projects/${projectId}/ideas/${id}`),
    enabled: !!projectId && !!id,
  });
}

export function useOverviewStats(projectId: string) {
  return useQuery({
    queryKey: KEYS.overviewStats(projectId),
    queryFn: () =>
      api.get<{ stats: OverviewStats }>(
        `/projects/${projectId}/ideas/overview-stats`,
      ),
    enabled: !!projectId,
  });
}

export function useCreateIdea(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateIdeaInput) =>
      api.post<{ idea: Idea }>(`/projects/${projectId}/ideas`, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.list(projectId) });
      queryClient.invalidateQueries({
        queryKey: KEYS.overviewStats(projectId),
      });
    },
  });
}

export function useReevaluateIdea(projectId: string, id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ReevaluateIdeaInput) =>
      api.post<{ idea: Idea }>(
        `/projects/${projectId}/ideas/${id}/reevaluate`,
        input,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: KEYS.detail(projectId, id),
      });
      queryClient.invalidateQueries({ queryKey: KEYS.list(projectId) });
      queryClient.invalidateQueries({
        queryKey: KEYS.overviewStats(projectId),
      });
    },
  });
}

export function useDeleteIdea(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete<void>(`/projects/${projectId}/ideas/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.list(projectId) });
      queryClient.invalidateQueries({
        queryKey: KEYS.overviewStats(projectId),
      });
    },
  });
}
