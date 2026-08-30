"use client";

import Link from "next/link";
import { GitCommit, Bug, Lightbulb, Terminal } from "lucide-react";
import { ListCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type {
  DashboardActivityItem,
  DashboardActivityType,
} from "@/hooks/useDashboardActivity";

interface RecentActivityProps {
  items?: DashboardActivityItem[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const TYPE_META: Record<
  DashboardActivityType,
  { icon: typeof GitCommit; color: string; module: string }
> = {
  commit: { icon: GitCommit, color: "var(--color-brand-primary)", module: "GitHub" },
  debug_resolved: { icon: Bug, color: "var(--color-success)", module: "AI Debugging" },
  debug_failed: { icon: Bug, color: "var(--color-error)", module: "AI Debugging" },
  idea_created: { icon: Lightbulb, color: "var(--color-info)", module: "Idea Validator" },
  idea_validated: { icon: Lightbulb, color: "var(--color-success)", module: "Idea Validator" },
  api_request: { icon: Terminal, color: "var(--color-brand-accent)", module: "API Playground" },
};

function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

/**
 * Backed by GET /dashboard/activity — real merged data from commits,
 * AI debugging, and ideas. No hardcoded RECENT_ACTIVITY mock.
 * API Playground entries will appear once execution history is tracked
 * server-side (see dashboardController.ts comment).
 */
export function RecentActivity({
  items,
  isLoading,
  isError,
  onRetry,
}: RecentActivityProps) {
  if (isLoading) return <ListCardSkeleton rows={5} />;

  return (
    <section className="flex h-full flex-col rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
      </div>

      {isError ? (
        <ErrorState message="Couldn't load recent activity." onRetry={onRetry} />
      ) : !items || items.length === 0 ? (
        <EmptyState message="No activity in this range yet" />
      ) : (
        <div className="flex flex-col divide-y divide-[var(--color-neutral-border)]">
          {items.slice(0, 8).map((item) => {
            const meta = TYPE_META[item.type];
            const Icon = meta.icon;
            const content = (
              <div className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: `${meta.color}1A` }}
                >
                  <Icon className="h-3 w-3" style={{ color: meta.color }} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-neutral-text-secondary)]/60">
                      {meta.module}
                      {item.projectName ? ` · ${item.projectName}` : ""}
                    </span>
                    <span className="shrink-0 text-[11px] text-[var(--color-neutral-text-secondary)]/50">
                      {formatRelativeTime(item.createdAt)}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-white">
                    {item.title}
                  </p>
                </div>
              </div>
            );

            return item.projectId ? (
              <Link
                key={item.id}
                href={`/projects/${item.projectId}`}
                className="transition-colors hover:opacity-80"
              >
                {content}
              </Link>
            ) : (
              <div key={item.id}>{content}</div>
            );
          })}
        </div>
      )}
    </section>
  );
}
