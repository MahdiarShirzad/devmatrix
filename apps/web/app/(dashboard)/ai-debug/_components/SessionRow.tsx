import Link from "next/link";
import { Bug, Clock, CheckCircle2, CircleDashed } from "lucide-react";
import SessionActionsMenu from "./SessionActionsMenu";

import { DebugSession } from "@/types/aiDebug.types";

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

export default function SessionRow({ session, isLast }: SessionRowProps) {
  const isResolved = session.status === "resolved";

  return (
    <Link
      href={`/ai-debug/${session?._id}`}
      className={`group flex flex-col items-start gap-4 p-4 transition-colors hover:bg-neutral-surface-2/50 sm:flex-row sm:items-center sm:justify-between ${
        !isLast ? "border-b border-neutral-border" : ""
      }`}
    >
      {/* Left side: Icon & Info */}
      <div className="flex items-start gap-4">
        <div
          className={`mt-1 rounded-lg p-2.5 transition-colors ${
            isResolved
              ? "bg-success-bg text-success"
              : "bg-brand-highlight/10 text-brand-highlight"
          }`}
        >
          <Bug size={18} strokeWidth={2} />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-sm font-semibold text-neutral-text-primary group-hover:text-brand-primary transition-colors">
            {session.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium">
            <span className="inline-flex items-center rounded-md border border-neutral-border bg-neutral-surface-2 px-2 py-0.5 text-neutral-text-secondary">
              {/* {session.project} */}
            </span>
            <span className="text-neutral-text-secondary before:mr-2 before:content-['•']">
              {session.language}
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Status, Time, Actions */}
      <div className="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:gap-6 ml-14 sm:ml-0">
        <div className="flex items-center gap-4">
          <span
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
              isResolved
                ? "border-success/20 bg-success-bg text-success"
                : "border-brand-highlight/20 bg-brand-highlight/10 text-brand-highlight"
            }`}
          >
            {isResolved ? (
              <CheckCircle2 size={12} />
            ) : (
              <CircleDashed size={12} className="animate-spin-slow" />
            )}
            {session.status}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-neutral-text-secondary">
            <Clock size={14} />
            {/* {session.time} */}
          </span>
        </div>

        <SessionActionsMenu sessionId={session?._id} />
      </div>
    </Link>
  );
}
