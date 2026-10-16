import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";
import type {
  DashboardAnalyticsResponse,
  DashboardInterval,
  DebuggingAnalyticsResponse,
  IdeaAnalyticsResponse,
} from "@/types/dashboard.types";

export interface DashboardQueryParams {
  days?: string;
  from?: string;
  to?: string;
  projectIds?: string[];
  interval?: DashboardInterval;
}

export function buildDashboardQuery(params: DashboardQueryParams): string {
  const search = new URLSearchParams();
  if (params.from && params.to) {
    search.set("from", params.from);
    search.set("to", params.to);
  } else if (params.days) {
    search.set("days", params.days);
  }
  if (params.interval) search.set("interval", params.interval);
  for (const id of params.projectIds ?? []) {
    search.append("projectId", id);
  }
  return search.toString();
}

const suffix = (qs: string) => (qs ? `?${qs}` : "");

export function useDashboardAnalytics(params: DashboardQueryParams) {
  const qs = buildDashboardQuery(params);
  return useQuery({
    queryKey: ["dashboard", "analytics", qs],
    queryFn: () =>
      api.get<DashboardAnalyticsResponse>(`/dashboard/analytics${suffix(qs)}`),
  });
}

export function useDebuggingAnalytics(params: DashboardQueryParams) {
  const qs = buildDashboardQuery(params);
  return useQuery({
    queryKey: ["dashboard", "debugging", qs],
    queryFn: () =>
      api.get<DebuggingAnalyticsResponse>(`/dashboard/debugging${suffix(qs)}`),
  });
}

export function useIdeaAnalytics(params: DashboardQueryParams) {
  const qs = buildDashboardQuery(params);
  return useQuery({
    queryKey: ["dashboard", "ideas", qs],
    queryFn: () => api.get<IdeaAnalyticsResponse>(`/dashboard/ideas${suffix(qs)}`),
  });
}
