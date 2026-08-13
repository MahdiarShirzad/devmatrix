import Link from "next/link";
import { AlertTriangle, RefreshCcw, ChevronRight } from "lucide-react";
import { DebugSession } from "@/types/aiDebug.types";

interface NeedsAttentionProps {
  sessions: DebugSession[];
}

export default function NeedsAttention({ sessions }: NeedsAttentionProps) {
  if (sessions.length === 0) return null;

  const failed = sessions.filter((s) => s.status === "failed");
  const inProgress = sessions.filter((s) => s.status === "in_progress");

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-border bg-neutral-surface-1 p-4">
      <h3 className="text-sm font-semibold text-neutral-text-primary">
        Needs Attention
      </h3>

      <div className="flex flex-col gap-2">
        {failed.length > 0 && (
          <Link
            href={`/ai-debug/${failed[0]._id}`}
            className="flex items-center gap-2.5 rounded-lg border border-error/20 bg-error-bg px-3 py-2.5 text-sm transition-colors hover:bg-error/15"
          >
            <AlertTriangle size={15} className="shrink-0 text-error" />
            <span className="flex-1 text-neutral-text-primary">
              {failed.length} failed debugging{" "}
              {failed.length === 1 ? "session" : "sessions"}
            </span>
            <ChevronRight size={14} className="shrink-0 text-neutral-text-secondary" />
          </Link>
        )}

        {inProgress.length > 0 && (
          <Link
            href={`/ai-debug/${inProgress[0]._id}`}
            className="flex items-center gap-2.5 rounded-lg border border-warning/20 bg-warning-bg px-3 py-2.5 text-sm transition-colors hover:bg-warning/15"
          >
            <RefreshCcw size={15} className="shrink-0 text-warning" />
            <span className="flex-1 text-neutral-text-primary">
              {inProgress.length}{" "}
              {inProgress.length === 1 ? "session" : "sessions"} currently
              being reanalyzed
            </span>
            <ChevronRight size={14} className="shrink-0 text-neutral-text-secondary" />
          </Link>
        )}
      </div>
    </div>
  );
}
