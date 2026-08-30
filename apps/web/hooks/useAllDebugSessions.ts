import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";
import type { DebugSession } from "@/types/aiDebug.types";

/**
 * Workspace-wide (all-project) debug sessions for the current user.
 * Backs GET /api/ai-debug/sessions?days=
 *
 * Distinct from useDebugSessions(projectId) in useAiDebug.ts, which is
 * project-scoped and hits /projects/:projectId/ai-debug/sessions.
 */
export function useAllDebugSessions(days: string) {
  return useQuery({
    queryKey: ["ai-debug", "sessions", "all", days],
    queryFn: () =>
      api.get<{ sessions: DebugSession[] }>(`/ai-debug/sessions?days=${days}`),
  });
}
