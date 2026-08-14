import { api } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export interface GithubProject {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

// 1. Update the response interface to reflect what useDashboardData expects
interface GithubProjectsResponse {
  projects: GithubProject[];
  githubConnected?: boolean;
}

export function useGithubProjects(days: string) {
  return useQuery({
    queryKey: ["github-projects", days],
    queryFn: async () => {
      return api.get<GithubProjectsResponse>(
        `/api/github-projects?days=${days}`,
      );
    },
  });
}
