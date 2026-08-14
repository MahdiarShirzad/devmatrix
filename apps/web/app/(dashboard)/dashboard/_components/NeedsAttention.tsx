import { useMemo } from "react";
import { AlertTriangle, Circle, CheckCircle2 } from "lucide-react";
import { ListCardSkeleton } from "./Skeletons";
import type { DebugSession } from "@/types/aiDebug.types";
import type { Idea } from "@/types/ideaValidator.types";
import type { GithubProject } from "@/types/githubAnalytics.types";

interface NeedsAttentionProps {
  attentionSessions: DebugSession[];
  ideas?: Idea[];
  project?: GithubProject | null;
  isLoading: boolean;
}

const STALE_SYNC_HOURS = 24;

export function NeedsAttention({
  attentionSessions,
  ideas,
  project,
  isLoading,
}: NeedsAttentionProps) {
  const items = useMemo(() => {
    const failedCount = attentionSessions.filter((s) => s.status === "failed").length;
    const inProgressCount = attentionSessions.filter(
      (s) => s.status === "in_progress",
    ).length;
    const unresolvedDebugTitle = attentionSessions[0]?.title;

    const pendingIdeas = (ideas ?? []).filter((i) => i.status === "pending");

    /* eslint-disable react-hooks/purity -- staleness is intentionally computed
       against wall-clock time on every render, not cached; this reflects "how
       long ago" the last sync was, which must stay accurate as time passes. */
    const syncStale =
      !!project?.lastSyncedAt &&
      Date.now() - new Date(project.lastSyncedAt).getTime() >
        STALE_SYNC_HOURS * 60 * 60 * 1000;
    /* eslint-enable react-hooks/purity */

    const result: {
      key: string;
      icon: typeof AlertTriangle;
      tone: "warning" | "neutral";
      title: string;
      subtitle: string;
    }[] = [];

    if (failedCount + inProgressCount > 0) {
      result.push({
        key: "debug",
        icon: AlertTriangle,
        tone: "warning",
        title: `${failedCount + inProgressCount} unresolved debugging session${
          failedCount + inProgressCount > 1 ? "s" : ""
        }`,
        subtitle: unresolvedDebugTitle ?? "",
      });
    }

    if (pendingIdeas.length > 0) {
      result.push({
        key: "ideas",
        icon: Circle,
        tone: "neutral",
        title: `${pendingIdeas.length} idea${pendingIdeas.length > 1 ? "s" : ""} waiting for review`,
        subtitle: pendingIdeas[0]?.title ?? "",
      });
    }

    if (syncStale) {
      result.push({
        key: "sync",
        icon: AlertTriangle,
        tone: "warning",
        title: "Project sync needs attention",
        subtitle: project?.name ?? "",
      });
    }

    return result;
  }, [attentionSessions, ideas, project]);

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
              <button
                key={item.key}
                type="button"
                className="flex items-center gap-3 py-3 text-left transition-colors first:pt-0 last:pb-0 hover:opacity-80"
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
                  {item.subtitle && (
                    <div className="truncate text-xs text-[var(--color-neutral-text-secondary)]/60">
                      {item.subtitle}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
