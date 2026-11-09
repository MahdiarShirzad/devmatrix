"use client";

import Link from "next/link";
import { Bug, GitCommit, Lightbulb, Terminal, CheckCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
  DashboardActivityItem,
  DashboardActivityType,
} from "@/hooks/useDashboardActivity";

interface NotificationsPanelProps {
  items: DashboardActivityItem[];
  isUnread: (item: DashboardActivityItem) => boolean;
  unreadCount: number;
  onMarkAllRead: () => void;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onNavigate: () => void;
}

const TYPE_META: Record<
  DashboardActivityType,
  { icon: LucideIcon; color: string; module: string }
> = {
  commit: { icon: GitCommit, color: "var(--color-brand-primary)", module: "GitHub" },
  debug_resolved: { icon: Bug, color: "var(--color-success)", module: "AI Debugging" },
  debug_failed: { icon: Bug, color: "var(--color-error)", module: "AI Debugging" },
  idea_created: { icon: Lightbulb, color: "var(--color-info)", module: "Idea Validator" },
  idea_validated: { icon: Lightbulb, color: "var(--color-success)", module: "Idea Validator" },
  api_request: { icon: Terminal, color: "var(--color-brand-accent)", module: "API Playground" },
};

function hrefFor(item: DashboardActivityItem): string {
  if (!item.projectId) return "/dashboard";
  switch (item.type) {
    case "commit":
      return `/analytics/${item.projectId}`;
    case "debug_resolved":
    case "debug_failed":
      return `/projects/${item.projectId}/ai-debug`;
    case "idea_created":
    case "idea_validated":
      return `/projects/${item.projectId}/saas-validator`;
    case "api_request":
      return `/projects/${item.projectId}/api-playground`;
    default:
      return "/dashboard";
  }
}

function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

export default function NotificationsPanel({
  items,
  isUnread,
  unreadCount,
  onMarkAllRead,
  isLoading,
  isError,
  onRetry,
  onNavigate,
}: NotificationsPanelProps) {
  return (
    <div className="absolute right-0 z-50 mt-2 w-80 origin-top-right overflow-hidden rounded-lg border border-neutral-border bg-neutral-surface-1 shadow-2xl ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-neutral-border px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-neutral-text-primary">
            Notifications
          </span>
          {unreadCount > 0 && (
            <span className="rounded-full bg-brand-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-brand-primary">
              {unreadCount} new
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
          >
            <CheckCheck size={12} />
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col gap-3 p-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-7 w-7 shrink-0 animate-pulse rounded-md bg-neutral-surface-2" />
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-surface-2" />
                  <div className="h-2.5 w-1/3 animate-pulse rounded bg-neutral-surface-2" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center gap-2 px-3 py-6 text-center">
            <p className="text-xs text-red-500">
              Couldn&apos;t load notifications.
            </p>
            <button
              type="button"
              onClick={onRetry}
              className="rounded-md border border-neutral-border px-2.5 py-1 text-[11px] text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
            >
              Retry
            </button>
          </div>
        ) : items.length === 0 ? (
          <p className="px-3 py-6 text-center text-sm text-neutral-text-secondary">
            You&apos;re all caught up.
          </p>
        ) : (
          <div className="flex flex-col">
            {items.map((item) => {
              const meta = TYPE_META[item.type] ?? TYPE_META.commit;
              const Icon = meta.icon;
              const unread = isUnread(item);
              return (
                <Link
                  key={item.id}
                  href={hrefFor(item)}
                  onClick={onNavigate}
                  className="flex items-start gap-3 border-b border-neutral-border/60 px-3 py-2.5 transition-colors last:border-b-0 hover:bg-neutral-surface-2"
                >
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                    style={{ backgroundColor: `${meta.color}1A` }}
                  >
                    <Icon size={14} style={{ color: meta.color }} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[10px] font-medium uppercase tracking-wide text-neutral-text-secondary">
                        {meta.module}
                        {item.projectName ? ` · ${item.projectName}` : ""}
                      </span>
                      <span className="shrink-0 text-[10px] text-neutral-text-secondary">
                        {formatRelativeTime(item.createdAt)}
                      </span>
                    </div>
                    <p
                      className={`mt-0.5 truncate text-sm ${
                        unread
                          ? "font-medium text-neutral-text-primary"
                          : "text-neutral-text-secondary"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>

                  {unread && (
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
