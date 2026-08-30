import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";

export type DashboardActivityType =
  | "commit"
  | "debug_resolved"
  | "debug_failed"
  | "idea_created"
  | "idea_validated"
  | "api_request";

export interface DashboardActivityItem {
  id: string;
  type: DashboardActivityType;
  projectId?: string;
  projectName?: string;
  title: string;
  description?: string;
  createdAt: string;
}

/**
 * Backs GET /api/dashboard/activity?days=&limit=
 * Merged, sorted feed across commits, AI debugging, and ideas.
 * API Playground activity is intentionally absent — see backend
 * dashboardController.ts comment for why.
 */
export function useDashboardActivity(days: string, limit = 30) {
  return useQuery({
    queryKey: ["dashboard", "activity", days, limit],
    queryFn: () =>
      api.get<{ activity: DashboardActivityItem[] }>(
        `/dashboard/activity?days=${days}&limit=${limit}`,
      ),
  });
}
