"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BackToSessionsButton from "./_components/BackToSessionsButton";
import SessionHeaderBar from "./_components/SessionHeaderBar";
import CodeEditorPanel from "./_components/CodeEditorPanel";
import TabsPanel from "./_components/TabsPanel";
import { Tab } from "./_components/constants";
import { useDebugSession } from "@/hooks/useAiDebug";

export default function DebugSessionPage() {
  const router = useRouter();
  const params = useParams<{ sessionId: string }>();
  const [activeTab, setActiveTab] = useState<Tab>("Explanation");

  const { data, isLoading, isError } = useDebugSession(params.sessionId);
  const session = data?.session;

  if (isLoading) {
    return (
      <p className="p-6 text-sm text-neutral-text-secondary">
        در حال بارگذاری...
      </p>
    );
  }

  if (isError || !session) {
    return <p className="p-6 text-sm text-error">سشن پیدا نشد</p>;
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-8rem)] flex-col pb-6">
      <BackToSessionsButton onClick={() => router.push("/ai-debug")} />

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
  );
}
