import { GitCommitHorizontal, TriangleAlert } from "lucide-react";
import { ProjectSummary } from "./mockData";
import StatusDot from "./StatusDot";

interface ProjectCardProps {
  project: ProjectSummary;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const status = project.status === "healthy" ? "healthy" : "warning";

  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-neutral-border bg-neutral-surface-1 p-4 transition-colors hover:border-neutral-text-secondary/30">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-text-primary">
          {project.name}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-neutral-text-secondary">
          <StatusDot status={status} />
          {project.statusLabel}
        </span>
      </div>

      <div className="flex items-center gap-3 text-xs text-neutral-text-secondary">
        <span className="flex items-center gap-1">
          <GitCommitHorizontal size={12} />
          {project.commits} commits
        </span>
        <span className="flex items-center gap-1">
          <TriangleAlert size={12} />
          {project.issuesLabel}
        </span>
      </div>

      <div className="text-[11px] text-neutral-text-secondary">
        {project.updatedLabel}
      </div>
    </div>
  );
}
