import Link from "next/link";
import { GitCommit, Activity } from "lucide-react";

const PROJECTS = [
  {
    id: "proj_1",
    name: "devmatrix-api",
    provider: "GitHub",
    commitsThisWeek: 24,
    lastActivity: "1h ago",
  },
  {
    id: "proj_2",
    name: "devmatrix-web",
    provider: "GitHub",
    commitsThisWeek: 18,
    lastActivity: "3h ago",
  },
  {
    id: "proj_3",
    name: "internal-tools",
    provider: "Jira",
    commitsThisWeek: 6,
    lastActivity: "2d ago",
  },
];

export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-medium text-neutral-text-primary">
          Developer analytics
        </h1>
        <p className="mt-1 text-sm text-neutral-text-secondary">
          Track commits, activity, and productivity by project.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <Link
            key={project.id}
            href={`/analytics/${project.id}`}
            className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-colors hover:border-brand-primary"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-neutral-text-primary">
                {project.name}
              </h3>
              <span className="rounded-full bg-neutral-surface-2 px-2 py-0.5 text-xs text-neutral-text-secondary">
                {project.provider}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-neutral-text-secondary">
                <GitCommit size={14} />
                {project.commitsThisWeek} commits this week
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-text-secondary">
              <Activity size={14} />
              Active {project.lastActivity}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
