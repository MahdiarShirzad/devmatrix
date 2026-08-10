import Link from "next/link";
import { GitCommit, Activity, MoreVertical } from "lucide-react";
import GithubIcon from "@/app/_utils/GithubIcon";

export interface Project {
  id: string;
  name: string;
  provider: string;
  commitsThisWeek: number;
  lastActivity: string;
  trend: string;
  trendUp: boolean;
  tags: string[];
  activityData: number[];
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/analytics/${project.id}`}
      className="group relative flex flex-col justify-between rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/5"
    >
      {/* هدر کارت پروژه */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-neutral-text-primary group-hover:text-brand-primary transition-colors">
              {project.name}
            </h3>
            <span className="flex items-center gap-1.5 rounded-full border border-neutral-border bg-neutral-surface-2 px-2 py-0.5 text-[11px] font-medium text-neutral-text-secondary">
              {project.provider === "GitHub" ? (
                <GithubIcon width={24} height={24} className="text-black" />
              ) : (
                <GitCommit size={12} />
              )}
              {project.provider}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-brand-primary/10 px-2 py-0.5 text-[11px] font-medium text-brand-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button className="rounded-md p-1.5 text-neutral-text-secondary opacity-0 transition-all hover:bg-neutral-surface-2 hover:text-neutral-text-primary group-hover:opacity-100">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 items-end gap-4 border-t border-neutral-border pt-5">
        {/* اطلاعات فعالیت */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-neutral-text-primary">
            <GitCommit size={16} className="text-brand-highlight" />
            <span className="font-semibold">{project.commitsThisWeek}</span>
            <span className="text-neutral-text-secondary">commits</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-text-secondary">
            <Activity size={14} />
            Active {project.lastActivity}
          </div>
        </div>

        {/* مینی چارت CSS */}
        <div className="flex flex-col items-end gap-2">
          <span
            className={`text-xs font-semibold ${project.trendUp ? "text-success" : "text-error"}`}
          >
            {project.trend}
          </span>
          <div className="flex h-8 items-end gap-1">
            {project.activityData.map((height, i) => (
              <div
                key={i}
                className="w-1.5 rounded-t-sm bg-brand-primary/20 transition-all group-hover:bg-brand-primary"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
