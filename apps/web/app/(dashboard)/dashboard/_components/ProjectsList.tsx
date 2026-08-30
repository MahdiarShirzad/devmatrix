"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ListCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type { GithubProject } from "@/types/githubAnalytics.types";
import type { DebugSession } from "@/types/aiDebug.types";

interface ProjectsListProps {
  projects?: GithubProject[];
  allDebugSessions: DebugSession[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const STALE_SYNC_HOURS = 24;

/**
 * Clicking a project now navigates to /projects/:id (its own
 * project-scoped page) instead of calling onSelectProject to swap the
 * whole Dashboard's context — the old behavior this replaces was the
 * root cause of the Dashboard silently becoming a single-project view.
 */
export function ProjectsList({
  projects,
  allDebugSessions,
  isLoading,
  isError,
  onRetry,
}: ProjectsListProps) {
  const rows = useMemo(() => {
    const now = Date.now();
    return (projects ?? []).map((p) => {
      const projectSessions = allDebugSessions.filter(
        (s) => s.projectId === p._id,
      );
      const unresolvedCount = projectSessions.filter(
        (s) => s.status === "failed" || s.status === "in_progress",
      ).length;
      const staleSync =
        !!p.lastSyncedAt &&
        now - new Date(p.lastSyncedAt).getTime() >
          STALE_SYNC_HOURS * 60 * 60 * 1000;
      const status: "Healthy" | "Attention" =
        unresolvedCount > 0 || staleSync ? "Attention" : "Healthy";

      return {
        id: p._id,
        name: p.name,
        status,
        commits: p.commitsThisWeek,
        unresolvedCount,
        staleSync,
        lastSyncedAt: p.lastSyncedAt,
      };
    });
  }, [projects, allDebugSessions]);

  if (isLoading) return <ListCardSkeleton rows={3} />;

  return (
    <section className="rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">Your Projects</h3>
      </div>

      {isError ? (
        <ErrorState message="Couldn't load projects." onRetry={onRetry} />
      ) : rows.length === 0 ? (
        <EmptyState message="No projects linked yet" />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <Link
              key={row.id}
              href={`/projects/${row.id}`}
              className="flex flex-col gap-2 rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-2)]/40 p-3.5 text-left transition-colors hover:border-[var(--color-neutral-text-secondary)]/30"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-white">
                  {row.name}
                </span>
                <span
                  className={`flex shrink-0 items-center gap-1.5 text-xs ${
                    row.status === "Healthy"
                      ? "text-[var(--color-success)]"
                      : "text-[var(--color-warning)]"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor:
                        row.status === "Healthy"
                          ? "var(--color-success)"
                          : "var(--color-warning)",
                    }}
                  />
                  {row.status}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-[var(--color-neutral-text-secondary)]/70">
                <span>
                  {typeof row.commits === "number"
                    ? `${row.commits} commits`
                    : "— commits"}
                </span>
                <span>
                  {row.unresolvedCount > 0
                    ? `${row.unresolvedCount} unresolved bug${row.unresolvedCount > 1 ? "s" : ""}`
                    : "0 unresolved bugs"}
                </span>
              </div>

              <div className="text-[11px] text-[var(--color-neutral-text-secondary)]/50">
                {row.staleSync
                  ? "Sync stale"
                  : `Updated ${formatRelativeTime(row.lastSyncedAt)}`}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

function formatRelativeTime(iso: string | null): string {
  if (!iso) return "never";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "unknown";
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}
