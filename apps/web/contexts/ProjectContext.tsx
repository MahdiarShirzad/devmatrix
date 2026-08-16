"use client";

import { createContext, useContext, useMemo } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useGithubProjects } from "@/hooks/useGithubAnalytics";
import type { GithubProject } from "@/types/githubAnalytics.types";

interface ProjectContextValue {
  /** The current project, resolved from the :projectId URL segment. */
  project: GithubProject | undefined;
  projectId: string | undefined;
  /** All of the user's linked (active) projects, for the switcher dropdown. */
  projects: GithubProject[];
  isLoading: boolean;
  isError: boolean;
  githubConnected: boolean;
  /**
   * Navigates to the same tool for a different project.
   */
  switchProject: (nextProjectId: string) => void;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const params = useParams<{ projectId?: string }>();
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading, isError } = useGithubProjects("all");
  const projects = useMemo(() => data?.projects ?? [], [data]);

  const projectId = params?.projectId;
  const project = useMemo(
    () => projects.find((p) => p._id === projectId),
    [projects, projectId],
  );

  const switchProject = (nextProjectId: string) => {
    if (!projectId || !pathname) return;
    const nextPath = pathname.replace(
      `/projects/${projectId}`,
      `/projects/${nextProjectId}`,
    );
    router.push(nextPath);
  };

  const value: ProjectContextValue = {
    project,
    projectId,
    projects,
    isLoading,
    isError,
    githubConnected: data?.githubConnected ?? false,
    switchProject,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjectContext() {
  const ctx = useContext(ProjectContext);
  if (!ctx) {
    throw new Error("useProjectContext must be used within ProjectProvider");
  }
  return ctx;
}