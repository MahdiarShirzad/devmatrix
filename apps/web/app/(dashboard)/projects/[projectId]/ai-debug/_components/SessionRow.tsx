import Link from "next/link";
import { Bug, Clock, CheckCircle2, Loader2, XCircle } from "lucide-react";
import SessionActionsMenu from "./SessionActionsMenu";

import { DebugSession } from "@/types/aiDebug.types";
import { useParams } from "next/navigation";

interface SessionRowProps {
  session: DebugSession;
  isLast: boolean;
}

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    icon: typeof CheckCircle2;
    badgeClass: string;
    iconClass: string;
    spin: boolean;
  }
> = {
  resolved: {
    label: "RESOLVED",
    icon: CheckCircle2,
    badgeClass: "border-success/20 bg-success-bg text-success",
    iconClass: "bg-success-bg text-success",
    spin: false,
  },
  in_progress: {
    label: "IN PROGRESS",
    icon: Loader2,
    badgeClass: "border-warning/20 bg-warning-bg text-warning",
    iconClass: "bg-warning-bg text-warning",
    spin: true,
  },
  failed: {
    label: "FAILED",
    icon: XCircle,
    badgeClass: "border-error/20 bg-error-bg text-error",
    iconClass: "bg-error-bg text-error",
    spin: false,
  },
};

export default function SessionRow({ session, isLast }: SessionRowProps) {
  const { projectId } = useParams<{ projectId: string }>();

  const config = STATUS_CONFIG[session.status] ?? STATUS_CONFIG.in_progress;
  const StatusIcon = config.icon;

  return (
    <Link
      href={`/projects/${projectId}/ai-debug/${session._id}`}
      className={`group flex flex-col items-start gap-4 p-4 transition-colors hover:bg-neutral-surface-2/50 sm:flex-row sm:items-center sm:justify-between ${
        !isLast ? "border-b border-neutral-border" : ""
      }`}
    >
      {/* Left side: Icon & Info */}
      <div className="flex min-w-0 items-start gap-4">
        <div
          className={`mt-1 shrink-0 rounded-lg p-2.5 transition-colors ${config.iconClass}`}
        >
          <Bug size={18} strokeWidth={2} />
        </div>

        <div className="min-w-0 space-y-1.5">
          <h3 className="truncate text-sm font-semibold text-neutral-text-primary transition-colors group-hover:text-brand-primary">
            {session.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium text-neutral-text-secondary">
            <span>{session.language}</span>
            {session.projectId && (
              <>
                <span aria-hidden>&middot;</span>
                <span className="rounded-md border border-neutral-border bg-neutral-surface-2 px-1.5 py-0.5">
                  {session.projectId}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right side: Status, Time, Actions */}
      <div className="ml-14 flex w-full items-center justify-between sm:ml-0 sm:w-auto sm:justify-end sm:gap-6">
        <div className="flex items-center gap-4">
          <span
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${config.badgeClass}`}
          >
            <StatusIcon
              size={12}
              className={config.spin ? "animate-spin" : ""}
            />
            {config.label}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-neutral-text-secondary">
            <Clock size={14} />
            {formatRelativeTime(session.createdAt)}
          </span>
        </div>

        <SessionActionsMenu sessionId={session._id} />
      </div>
    </Link>
  );
}
