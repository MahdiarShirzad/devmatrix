"use client";

import { Clock, RefreshCw } from "lucide-react";
import GithubIcon from "@/app/_utils/GithubIcon";
import { useSyncGithubProject } from "@/hooks/useGithubAnalytics";

interface ProjectHeaderBarProps {
  projectId: string;
  name: string;
  provider: "github" | "gitlab";
  lastSyncedAt: string | null;
}

function formatLastSynced(lastSyncedAt: string | null): string {
  if (!lastSyncedAt) return "Never synced";

  const diffMs = Date.now() - new Date(lastSyncedAt).getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;

  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
}

export default function ProjectHeaderBar({
  projectId,
  name,
  provider,
  lastSyncedAt,
}: ProjectHeaderBarProps) {
  const sync = useSyncGithubProject(projectId);

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-border pb-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
            {name}
          </h1>
          <span className="flex items-center gap-1.5 rounded-full border border-neutral-border bg-neutral-surface-2 px-2.5 py-1 text-[11px] font-medium text-neutral-text-secondary">
            <GithubIcon width={25} height={25} className=" text-black" />
            {provider === "github" ? "GitHub" : "GitLab"}
          </span>
        </div>
        <p className="mt-1.5 flex items-center gap-2 text-sm text-neutral-text-secondary">
          <Clock size={14} />
          Last synced {formatLastSynced(lastSyncedAt)}
        </p>
      </div>

      <button
        onClick={() => sync.mutate()}
        disabled={sync.isPending}
        className="flex items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-1 px-4 py-2 text-sm font-medium text-neutral-text-primary transition-all hover:bg-neutral-surface-2 active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
      >
        <RefreshCw size={16} className={sync.isPending ? "animate-spin" : ""} />
        {sync.isPending ? "Syncing..." : "Sync Data"}
      </button>
    </div>
  );
}
