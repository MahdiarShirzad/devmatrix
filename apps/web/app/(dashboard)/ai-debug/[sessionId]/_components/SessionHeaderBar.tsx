"use client";

import { Sparkles, FileCode2, Loader2 } from "lucide-react";
import { DebugSession } from "@/types/aiDebug.types";
import { useReanalyzeSession } from "@/hooks/useAiDebug";

const STATUS_STYLES: Record<DebugSession["status"], string> = {
  resolved: "border-success/20 bg-success-bg text-success",
  in_progress:
    "border-brand-highlight/20 bg-brand-highlight/10 text-brand-highlight",
  pending:
    "border-brand-highlight/20 bg-brand-highlight/10 text-brand-highlight",
  failed: "border-error/20 bg-error-bg text-error",
};

const STATUS_LABELS: Record<DebugSession["status"], string> = {
  resolved: "Resolved",
  in_progress: "In Progress",
  pending: "Pending",
  failed: "Failed",
};

interface SessionHeaderBarProps {
  session: DebugSession;
}

export default function SessionHeaderBar({ session }: SessionHeaderBarProps) {
  const reanalyze = useReanalyzeSession(session._id);

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight text-neutral-text-primary">
            {session.title}
          </h1>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${STATUS_STYLES[session.status]}`}
          >
            {STATUS_LABELS[session.status]}
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-sm text-neutral-text-secondary">
          <span className="flex items-center gap-1.5">
            <FileCode2 size={14} /> {session.language}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => reanalyze.mutate()}
        disabled={reanalyze.isPending}
        className="flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-4 focus:ring-brand-primary/20 active:scale-95 disabled:opacity-50"
      >
        {reanalyze.isPending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Sparkles size={16} />
        )}
        Re-Analyze
      </button>
    </div>
  );
}
