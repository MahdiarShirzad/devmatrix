import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";
import type {
  DebugSession,
  CreateDebugSessionInput,
} from "@/types/aiDebug.types";

const KEYS = {
  list: (projectId: string) => ["debug-sessions", "list", projectId] as const,
  detail: (projectId: string, id: string) =>
    ["debug-sessions", "detail", projectId, id] as const,
};

export function useDebugSessions(projectId: string) {
  return useQuery({
    queryKey: KEYS.list(projectId),
    queryFn: () =>
      api.get<{ sessions: DebugSession[] }>(
        `/projects/${projectId}/ai-debug/sessions`,
      ),
    enabled: !!projectId,
  });
}

export function useDebugSession(projectId: string, id: string) {
  return useQuery({
    queryKey: KEYS.detail(projectId, id),
    queryFn: () =>
      api.get<{ session: DebugSession }>(
        `/projects/${projectId}/ai-debug/sessions/${id}`,
      ),
    enabled: !!projectId && !!id,
  });
}

export function useCreateDebugSession(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateDebugSessionInput) =>
      api.post<{ session: DebugSession }>(
        `/projects/${projectId}/ai-debug/sessions`,
        input,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.list(projectId) });
    },
  });
}

export function useReanalyzeDebugSession(projectId: string, id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      api.post<{ session: DebugSession }>(
        `/projects/${projectId}/ai-debug/sessions/${id}/reanalyze`,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: KEYS.detail(projectId, id),
      });
      queryClient.invalidateQueries({ queryKey: KEYS.list(projectId) });
    },
  });
}

export function useDeleteDebugSession(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete<void>(`/projects/${projectId}/ai-debug/sessions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.list(projectId) });
    },
  });
}
