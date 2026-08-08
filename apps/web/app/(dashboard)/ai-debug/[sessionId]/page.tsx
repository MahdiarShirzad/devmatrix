"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackToSessionsButton from "./_components/BackToSessionsButton";
import SessionHeaderBar from "./_components/SessionHeaderBar";
import CodeEditorPanel from "./_components/CodeEditorPanel";
import TabsPanel from "./_components/TabsPanel";
import { Tab } from "./_components/constants";

export default function DebugSessionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Explanation");

  return (
    <div className="flex h-full min-h-[calc(100vh-8rem)] flex-col pb-6">
      <BackToSessionsButton onClick={() => router.push("/ai-debug")} />

      <SessionHeaderBar />

      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2 lg:overflow-hidden">
        <CodeEditorPanel />
        <TabsPanel activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
