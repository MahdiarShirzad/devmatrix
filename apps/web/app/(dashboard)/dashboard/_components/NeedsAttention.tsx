"use client";

import { useMemo } from "react";
import Link from "next/link";
import { AlertTriangle, Circle, CheckCircle2, ChevronRight } from "lucide-react";
import { ListCardSkeleton } from "./Skeletons";
import type { DebugSession } from "@/types/aiDebug.types";
import type { GithubProject } from "@/types/githubAnalytics.types";
import type { AllIdeasOverviewStats } from "@/hooks/useAllIdeasOverviewStats";

interface NeedsAttentionProps {
  attentionSessions: DebugSession[];
  ideasStats?: AllIdeasOverviewStats;
  projects?: GithubProject[];
  isLoading: boolean;
}

const STALE_SYNC_HOURS = 24;

interface AttentionRow {
  key: string;
  icon: typeof AlertTriangle;
  tone: "warning" | "neutral";
  title: string;
  subtitle: string;
  href: string;
}

/**
 * Workspace-wide attention list. Unlike the old version (which read a
 * single `project` and its `ideas`), this scans across every linked
 * project for stale syncs and groups debug attention by project so each
 * row can link somewhere real instead of a dead <button>.
 */
export function NeedsAttention({
  attentionSessions,
  ideasStats,
  projects,
  isLoading,
}: NeedsAttentionProps) {
  const items = useMemo<AttentionRow[]>(() => {
    const result: AttentionRow[] = [];
    const now = Date.now();

    // Group unresolved debug sessions by project so each project gets
    // one actionable row instead of one giant "N unresolved" blob.
    const byProject = new Map<string, DebugSession[]>();
    for (const s of attentionSessions) {
      const pid = s.projectId ?? "unknown";
      if (!byProject.has(pid)) byProject.set(pid, []);
      byProject.get(pid)!.push(s);
    }

    for (const [pid, sessions] of byProject) {
      const project = projects?.find((p) => p._id === pid);
      const count = sessions.length;
      result.push({
        key: `debug-${pid}`,
        icon: AlertTriangle,
        tone: "warning",
        title: `${count} unresolved debugging session${count > 1 ? "s" : ""}`,
        subtitle: project?.name ?? "Unknown project",
        href: project ? `/projects/${pid}/ai-debug` : "/ai-debug",
      });
    }

    if (ideasStats && ideasStats.pendingCount > 0) {
      result.push({
        key: "ideas",
        icon: Circle,
        tone: "neutral",
        title: `${ideasStats.pendingCount} idea${
          ideasStats.pendingCount > 1 ? "s" : ""
        } waiting for review`,
        subtitle: "Across your projects",
        href: "/saas-validator",
      });
    }

    for (const project of projects ?? []) {
      const staleSync =
        !!project.lastSyncedAt &&
        now - new Date(project.lastSyncedAt).getTime() >
          STALE_SYNC_HOURS * 60 * 60 * 1000;
      if (staleSync) {
        result.push({
          key: `sync-${project._id}`,
          icon: AlertTriangle,
          tone: "warning",
          title: "GitHub sync needs attention",
          subtitle: project.name,
          href: `/analytics/${project._id}`,
        });
      }
    }

    return result;
  }, [attentionSessions, ideasStats, projects]);

  if (isLoading) return <ListCardSkeleton rows={3} />;

  return (
    <section className="flex h-full flex-col rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">Needs Attention</h3>
        {items.length > 0 && (
          <span className="rounded-full bg-[var(--color-warning-bg)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-brand-primary)]">
            {items.length}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-1.5 py-4 text-center">
          <CheckCircle2 className="h-5 w-5 text-[var(--color-success)]" />
          <p className="text-sm font-medium text-white">Everything looks good</p>
          <p className="text-xs text-[var(--color-neutral-text-secondary)]/60">
            No issues need your attention.
          </p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-[var(--color-neutral-border)]">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                href={item.href}
                className="group flex items-center gap-3 py-3 text-left transition-colors first:pt-0 last:pb-0 hover:opacity-80"
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    item.tone === "warning"
                      ? "text-[var(--color-warning)]"
                      : "text-[var(--color-neutral-text-secondary)]/50"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-white">{item.title}</div>
                  <div className="truncate text-xs text-[var(--color-neutral-text-secondary)]/60">
                    {item.subtitle}
                  </div>
                </div>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[var(--color-neutral-text-secondary)]/40 transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
