"use client";

import { useMemo } from "react";
import { Bug, GitBranch, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ListCardSkeleton } from "./Skeletons";
import { EmptyState } from "./EmptyState";
import type { CommitsByDay, GithubProject } from "@/types/githubAnalytics.types";
import type { DebugSession } from "@/types/aiDebug.types";
import type { Idea } from "@/types/ideaValidator.types";

interface RecentActivityProps {
  commits?: CommitsByDay[];
  project?: GithubProject | null;
  debugSessions: DebugSession[];
  ideas?: Idea[];
  isLoading: boolean;
}

interface FeedItem {
  key: string;
  category: "AI Debugging" | "GitHub" | "Idea Validator";
  icon: LucideIcon;
  title: string;
  timestamp: Date;
}

export function RecentActivity({
  commits,
  project,
  debugSessions,
  ideas,
  isLoading,
}: RecentActivityProps) {
  const items = useMemo(() => {
    const feed: FeedItem[] = [];

    // GitHub: one item per day with commits > 0 (commit-level messages
    // aren't exposed by CommitsByDay — only date + count).
    for (const c of commits ?? []) {
      if (c.commits <= 0) continue;
      const date = new Date(c.date);
      if (Number.isNaN(date.getTime())) continue;
      feed.push({
        key: `commit-${c.date}`,
        category: "GitHub",
        icon: GitBranch,
        title: `Pushed ${c.commits} commit${c.commits > 1 ? "s" : ""} to ${
          project?.name ?? "project"
        }`,
        timestamp: date,
      });
    }

    // Debug sessions: resolved/failed transitions
    for (const s of debugSessions) {
      const ts = s.resolvedAt ?? s.createdAt;
      if (!ts) continue;
      const date = new Date(ts);
      if (Number.isNaN(date.getTime())) continue;
      const verb =
        s.status === "resolved"
          ? "Resolved"
          : s.status === "failed"
            ? "Failed to resolve"
            : s.status === "in_progress"
              ? "Started debugging"
              : "Queued";
      feed.push({
        key: `debug-${s._id}`,
        category: "AI Debugging",
        icon: Bug,
        title: `${verb} ${s.title || `${s.language} error`}`,
        timestamp: date,
      });
    }

    // Ideas
    for (const idea of ideas ?? []) {
      const date = new Date(idea.updatedAt);
      if (Number.isNaN(date.getTime())) continue;
      feed.push({
        key: `idea-${idea._id}`,
        category: "Idea Validator",
        icon: Rocket,
        title:
          idea.status === "completed"
            ? `Validated "${idea.title}"`
            : idea.status === "failed"
              ? `Validation failed for "${idea.title}"`
              : `"${idea.title}" awaiting review`,
        timestamp: date,
      });
    }

    return feed.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 6);
  }, [commits, project, debugSessions, ideas]);

  if (isLoading) return <ListCardSkeleton rows={4} />;

  return (
    <section className="flex h-full flex-col rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
      </div>

      {items.length === 0 ? (
        <EmptyState message="No recent activity yet" />
      ) : (
        <div className="flex flex-col divide-y divide-[var(--color-neutral-border)]">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-neutral-surface-2)]">
                  <Icon className="h-3.5 w-3.5 text-[var(--color-neutral-text-secondary)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-[var(--color-neutral-text-secondary)]/50">
                    {item.category}
                  </div>
                  <div className="truncate text-sm text-white">{item.title}</div>
                </div>
                <div className="shrink-0 text-xs text-[var(--color-neutral-text-secondary)]/50">
                  {formatRelativeTime(item.timestamp)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function formatRelativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}
