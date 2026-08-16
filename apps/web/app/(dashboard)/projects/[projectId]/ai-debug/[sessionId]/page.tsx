"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BackToSessionsButton from "./_components/BackToSessionsButton";
import SessionHeaderBar from "./_components/SessionHeaderBar";
import CodeEditorPanel from "./_components/CodeEditorPanel";
import TabsPanel from "./_components/TabsPanel";
import { Tab } from "./_components/constants";
import { useDebugSession } from "@/hooks/useAiDebug";
import { Loader2, ServerCrash, FileQuestion } from "lucide-react";

export default function DebugSessionPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const router = useRouter();
  const params = useParams<{ sessionId: string }>();
  const [activeTab, setActiveTab] = useState<Tab>("Explanation");

  const { data, isLoading, isError } = useDebugSession(
    projectId,
    params.sessionId,
  );
  const session = data?.session;

  return (
    <div className="flex h-full min-h-[calc(100vh-8rem)] flex-col gap-6 pb-6">
      {/* 1. Universal Navigation Context 
          (Always kept visible so the user is never trapped during an error) */}
      <div className="shrink-0">
        <BackToSessionsButton onClick={() => router.push("/ai-debug")} />
      </div>

      {/* 2. Loading State */}
      {isLoading ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-2xl">
          <Loader2 className="mb-3 h-8 w-8 animate-spin text-brand-primary" />
          <p className="text-base font-medium text-neutral-text-primary">
            Loading Workspace Context...
          </p>
          <p className="mt-1 text-xs text-neutral-text-secondary">
            Retrieving execution traces and telemetry data
          </p>
        </div>
      ) : /* 3. API Error State */
      isError ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-neutral-border bg-neutral-surface-1 p-8 text-center shadow-2xl">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error-bg text-error ring-1 ring-error/30">
            <ServerCrash className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-text-primary">
            Session Retrieval Failed
          </h3>
          <p className="mt-1.5 max-w-md text-sm text-neutral-text-secondary">
            We encountered a network error while attempting to fetch this debug
            session. The service might be temporarily unavailable.
          </p>
        </div>
      ) : /* 4. Not Found State (Request succeeded, but no session returned) */
      !session ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-neutral-border bg-neutral-surface-1 p-8 text-center shadow-2xl">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-surface-2 text-neutral-text-secondary ring-1 ring-neutral-border">
            <FileQuestion className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-text-primary">
            Session Not Found
          </h3>
          <p className="mt-1.5 max-w-md text-sm text-neutral-text-secondary">
            The requested session ID ({params.sessionId}) does not match any
            records in the database. It may have been expired or deleted.
          </p>
        </div>
      ) : (
        /* 5. Success State (Render actual session) */
        <div className="flex flex-1 flex-col gap-6">
          <SessionHeaderBar session={session} />

          <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2 lg:overflow-hidden">
            <CodeEditorPanel session={session} />
            <TabsPanel
              activeTab={activeTab}
              onTabChange={setActiveTab}
              session={session}
            />
          </div>
        </div>
      )}
    </div>
  );
}
