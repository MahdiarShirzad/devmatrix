import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";
import { DebugSession, CreateDebugSessionInput } from "@/types/aiDebug.types";

const KEYS = {
  list: ["ai-debug", "sessions"] as const,
  detail: (id: string) => ["ai-debug", "sessions", id] as const,
};

export function useDebugSessions() {
  return useQuery({
    queryKey: KEYS.list,
    queryFn: () => api.get<{ sessions: DebugSession[] }>("/ai-debug/sessions"),
  });
}

export function useDebugSession(id: string) {
  return useQuery({
    queryKey: KEYS.detail(id),
    queryFn: () =>
      api.get<{ session: DebugSession }>(`/ai-debug/sessions/${id}`),
    enabled: !!id,
  });
}

export function useCreateDebugSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateDebugSessionInput) =>
      api.post<{ session: DebugSession }>("/ai-debug/sessions", input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.list });
    },
  });
}

export function useReanalyzeSession(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      api.post<{ session: DebugSession }>(`/ai-debug/sessions/${id}/reanalyze`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: KEYS.list });
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete<void>(`/ai-debug/sessions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.list });
    },
  });
}
