import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";

/**
 * Workspace-wide (all-project) idea stats for the current user.
 * Backs GET /api/ideas/overview-stats?days=
 *
 * Distinct from useOverviewStats(projectId) in useIdea.ts, which is
 * project-scoped and hits /projects/:projectId/ideas/overview-stats.
 * Named differently here to avoid colliding with that import.
 */
export interface AllIdeasOverviewStats {
  totalIdeas: number;
  validatedCount: number;
  pendingCount: number;
  failedCount: number;
  avgScore: number;
}

export function useAllIdeasOverviewStats(days: string) {
  return useQuery({
    queryKey: ["ideas", "overview-stats", "all", days],
    queryFn: () =>
      api.get<{ stats: AllIdeasOverviewStats }>(
        `/ideas/overview-stats?days=${days}`,
      ),
  });
}
