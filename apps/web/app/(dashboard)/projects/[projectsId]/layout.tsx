"use client";

import { useParams } from "next/navigation";
import { Loader2, FolderX } from "lucide-react";
import { ProjectProvider, useProjectContext } from "@/contexts/ProjectContext";

function ProjectGate({ children }: { children: React.ReactNode }) {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, projects, isLoading, isError } = useProjectContext();

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
        <p className="text-sm text-neutral-text-secondary">
          Loading project...
        </p>
      </div>
    );
  }

  if (isError || (!isLoading && projects.length > 0 && !project)) {
    return (
      <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error-bg text-error ring-1 ring-error/30">
          <FolderX className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-text-primary">
          Project not found
        </h3>
        <p className="max-w-md text-sm text-neutral-text-secondary">
          This project doesn&apos;t exist or you don&apos;t have access to it.
          It may have been unlinked.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

export default function ProjectScopedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProjectProvider>
      <ProjectGate>{children}</ProjectGate>
    </ProjectProvider>
  );
}
