"use client";

import AiDebugHeader from "./_components/AiDebugHeader";
import SessionSearchToolbar from "./_components/SessionSearchToolbar";
import SessionsList from "./_components/SessionsList";
import { useDebugSessions } from "@/hooks/useAiDebug";
import {
  Loader2,
  AlertTriangle,
  TerminalSquare,
  RefreshCw,
} from "lucide-react";

export default function AiDebugPage() {
  const { data, isLoading, isError, refetch } = useDebugSessions();
  const sessions = data?.sessions ?? [];
  const hasSessions = sessions.length > 0;

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Header Controls */}
      <div className="flex flex-col gap-4">
        <AiDebugHeader />
        <SessionSearchToolbar sessionCount={sessions.length} />
      </div>

      {/* Main Display Area matching DevMatrix Surface Design */}
      <div className="relative flex min-h-[420px] flex-1 flex-col rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-2xl overflow-hidden">
        {/* 1. Loading State */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-surface-1/90 backdrop-blur-md">
            <Loader2 className="mb-3 h-8 w-8 animate-spin text-brand-primary" />
            <p className="text-base font-medium text-neutral-text-primary">
              Fetching Debug Sessions...
            </p>
            <p className="mt-1 text-xs text-neutral-text-secondary">
              Connecting to DevMatrix execution runtime
            </p>
          </div>
        )}

        {/* 2. Error State */}
        {isError && !isLoading && (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error-bg text-error ring-1 ring-error/30">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-text-primary">
              Failed to Fetch Sessions
            </h3>
            <p className="mt-1.5 max-w-md text-sm text-neutral-text-secondary">
              We couldn&apos;t establish a connection to the AI telemetry
              service. Verify your system status or try re-authenticating.
            </p>
            {refetch && (
              <button
                onClick={() => refetch()}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-neutral-surface-2 px-4 py-2.5 text-sm font-medium text-neutral-text-primary border border-neutral-border transition-all hover:bg-neutral-border/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              >
                <RefreshCw className="h-4 w-4" />
                Retry Request
              </button>
            )}
          </div>
        )}

        {/* 3. Empty State (No Data Available) */}
        {!isLoading && !isError && !hasSessions && (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-surface-2 text-neutral-text-secondary ring-1 ring-neutral-border">
              <TerminalSquare className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-text-primary">
              No Active Debug Sessions
            </h3>
            <p className="mt-1.5 max-w-md text-sm text-neutral-text-secondary">
              There are currently no recorded execution logs or telemetry
              sessions. Trigger an AI prompt execution to populate logs here.
            </p>
          </div>
        )}

        {/* 4. Active Sessions List */}
        {!isLoading && !isError && hasSessions && (
          <div className="flex-1 overflow-auto p-4">
            <SessionsList sessions={sessions} />
          </div>
        )}
      </div>
    </div>
  );
}
