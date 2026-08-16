import { api } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { GithubProject } from "@/types/githubAnalytics.types";

export type { GithubProject };

interface GithubProjectsResponse {
  projects: GithubProject[];
  githubConnected?: boolean;
}

export function useGithubProjects(days: string) {
  return useQuery({
    queryKey: ["github-projects", days],
    queryFn: async () => {
      return api.get<GithubProjectsResponse>(`/github-projects?days=${days}`);
    },
  });
}
