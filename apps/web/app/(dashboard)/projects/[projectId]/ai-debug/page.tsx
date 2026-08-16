"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Loader2,
  AlertTriangle,
  TerminalSquare,
  RefreshCw,
  Plus,
  FolderGit2,
} from "lucide-react";

import AiDebugHeader from "./_components/AiDebugHeader";
import SessionSearchToolbar from "./_components/SessionSearchToolbar";
import SessionsList from "./_components/SessionsList";

import { useDebugSessions } from "@/hooks/useAiDebug";
import { useDebugAnalytics } from "@/hooks/useDebugAnalytics";
import { StatusFilter } from "./_components/SessionFilters";
import DebuggingStats from "./_components/DebuggingStats";
import DebuggingActivityChart from "./_components/DebuggingActivityChart";
import ResolutionRate from "./_components/ResolutionRate";
import LanguageBreakdown from "./_components/LanguageBreakdown";
import NeedsAttention from "./_components/NeedsAttention";

export default function AiDebugPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const { data, isLoading, isError, refetch } = useDebugSessions(projectId);
  const sessions = useMemo(() => data?.sessions ?? [], [data]);
  const hasSessions = sessions.length > 0;

  const analytics = useDebugAnalytics(sessions);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [language, setLanguage] = useState("all");
  const [selectedProjectId, setSelectedProjectId] = useState(projectId);

  const filteredSessions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sessions.filter((session) => {
      if (status !== "all" && session.status !== status) return false;
      if (language !== "all" && session.language !== language) return false;
      if (query) {
        const haystack = [session.title, session.language]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [sessions, search, status, language]);

  if (projectId === "none") {
    return (
      <div className="flex h-full flex-col gap-6">
        <AiDebugHeader />
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-neutral-border bg-neutral-surface-1 p-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-surface-2 text-neutral-text-secondary ring-1 ring-neutral-border">
            <FolderGit2 className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-text-primary">
            No project linked yet
          </h3>
          <p className="mt-1.5 max-w-md text-sm text-neutral-text-secondary">
            AI Debugging sessions belong to a project. Link a GitHub repository
            from Analytics Platform first, then come back here.
          </p>
          <Link
            href="/analytics"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-primary/25 transition-all hover:bg-brand-primary/90 active:scale-95"
          >
            Go to Analytics Platform
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-6">
      <AiDebugHeader />

      {isLoading && <WorkspaceSkeleton />}

      {isError && !isLoading && (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-neutral-border bg-neutral-surface-1 p-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error-bg text-error ring-1 ring-error/30">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-text-primary">
            Unable to load debugging sessions
          </h3>
          <p className="mt-1.5 max-w-md text-sm text-neutral-text-secondary">
            We couldn&apos;t reach the AI debugging service. Check your
            connection and try again.
          </p>
          {refetch && (
            <button
              onClick={() => refetch()}
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-2 px-4 py-2.5 text-sm font-medium text-neutral-text-primary transition-all hover:bg-neutral-border/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          )}
        </div>
      )}

      {!isLoading && !isError && !hasSessions && (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-neutral-border bg-neutral-surface-1 p-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-surface-2 text-neutral-text-secondary ring-1 ring-neutral-border">
            <TerminalSquare className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-text-primary">
            No debugging sessions yet
          </h3>
          <p className="mt-1.5 max-w-md text-sm text-neutral-text-secondary">
            Start your first AI debugging session by submitting code and
            describing the issue.
          </p>
          <Link
            href={`/projects/${projectId}/ai-debug/new`}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-primary/25 transition-all hover:bg-brand-primary/90 active:scale-95"
          >
            <Plus size={16} />
            New Session
          </Link>
        </div>
      )}

      {!isLoading && !isError && hasSessions && (
        <div className="flex flex-col gap-6">
          <DebuggingStats
            totalSessions={analytics.totalSessions}
            resolvedSessions={analytics.resolvedSessions}
            inProgressSessions={analytics.inProgressSessions}
            failedSessions={analytics.failedSessions}
            resolutionRate={analytics.resolutionRate}
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <DebuggingActivityChart data={analytics.activityByDay} />
            </div>
            <div className="flex flex-col gap-4">
              <ResolutionRate
                resolutionRate={analytics.resolutionRate}
                totalSessions={analytics.totalSessions}
                resolvedSessions={analytics.resolvedSessions}
              />
              <LanguageBreakdown languages={analytics.languageBreakdown} />
            </div>
          </div>

          {analytics.attentionSessions.length > 0 && (
            <NeedsAttention sessions={analytics.attentionSessions} />
          )}

          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-neutral-text-primary">
              Recent Debug Sessions
            </h2>

            <SessionSearchToolbar
              sessionCount={sessions.length}
              filteredCount={filteredSessions.length}
              searchValue={search}
              onSearchChange={setSearch}
              status={status}
              onStatusChange={setStatus}
              language={language}
              onLanguageChange={setLanguage}
              languages={analytics.languages}
              projectId={selectedProjectId}
              onProjectIdChange={setSelectedProjectId}
              projectIds={[projectId]}
            />

            {filteredSessions.length > 0 ? (
              <SessionsList sessions={filteredSessions} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-border bg-neutral-surface-1 p-10 text-center">
                <p className="text-sm text-neutral-text-secondary">
                  No sessions match your current search and filters.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function WorkspaceSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-xl border border-neutral-border bg-neutral-surface-1"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="h-64 animate-pulse rounded-xl border border-neutral-border bg-neutral-surface-1 lg:col-span-2" />
        <div className="flex flex-col gap-4">
          <div className="h-28 animate-pulse rounded-xl border border-neutral-border bg-neutral-surface-1" />
          <div className="h-32 animate-pulse rounded-xl border border-neutral-border bg-neutral-surface-1" />
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-neutral-text-secondary">
        <Loader2 className="h-4 w-4 animate-spin text-brand-primary" />
        Loading debug sessions...
      </div>
      <div className="flex flex-col rounded-xl border border-neutral-border bg-neutral-surface-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`h-20 animate-pulse ${
              i !== 3 ? "border-b border-neutral-border" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
