import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";
import type {
  Idea,
  OverviewStats,
  CreateIdeaInput,
  ReevaluateIdeaInput,
} from "@/types/ideaValidator.types";

const KEYS = {
  list: ["ideas", "list"] as const,
  detail: (id: string) => ["ideas", "detail", id] as const,
  overviewStats: ["ideas", "overview-stats"] as const,
};

export function useIdeas() {
  return useQuery({
    queryKey: KEYS.list,
    queryFn: () => api.get<{ ideas: Idea[] }>("/ideas"),
  });
}

export function useIdea(id: string) {
  return useQuery({
    queryKey: KEYS.detail(id),
    queryFn: () => api.get<{ idea: Idea }>(`/ideas/${id}`),
    enabled: !!id,
  });
}

export function useOverviewStats() {
  return useQuery({
    queryKey: KEYS.overviewStats,
    queryFn: () => api.get<{ stats: OverviewStats }>("/ideas/overview-stats"),
  });
}

export function useCreateIdea() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateIdeaInput) =>
      api.post<{ idea: Idea }>("/ideas", input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.list });
      queryClient.invalidateQueries({ queryKey: KEYS.overviewStats });
    },
  });
}

export function useReevaluateIdea(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ReevaluateIdeaInput) =>
      api.post<{ idea: Idea }>(`/ideas/${id}/reevaluate`, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: KEYS.list });
      queryClient.invalidateQueries({ queryKey: KEYS.overviewStats });
    },
  });
}

export function useDeleteIdea() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete<void>(`/ideas/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.list });
      queryClient.invalidateQueries({ queryKey: KEYS.overviewStats });
    },
  });
}
