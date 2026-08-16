"use client";

import { TABS, Tab } from "./constants";
import ExplanationTab from "./ExplanationTab";
import FixTab from "./FixTab";
import DiffTab from "./DiffTab";
import { DebugSession } from "@/types/aiDebug.types";

interface TabsPanelProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  session: DebugSession;
}

export default function TabsPanel({
  activeTab,
  onTabChange,
  session,
}: TabsPanelProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
      <div className="flex border-b border-neutral-border px-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`relative px-4 py-3.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "text-brand-primary"
                : "text-neutral-text-secondary hover:text-neutral-text-primary"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-primary shadow-[0_-2px_8px_rgba(var(--brand-primary),0.5)]"></span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === "Explanation" && <ExplanationTab session={session} />}
        {activeTab === "Fix" && <FixTab session={session} />}
        {activeTab === "Diff" && <DiffTab session={session} />}
      </div>
    </div>
  );
}
