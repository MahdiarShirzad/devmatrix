"use client";

import { REQUEST_TABS, RequestTab } from "./constants";

interface RequestBuilderPanelProps {
  activeTab: RequestTab;
  onTabChange: (tab: RequestTab) => void;
}

export default function RequestBuilderPanel({
  activeTab,
  onTabChange,
}: RequestBuilderPanelProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
      <div className="flex border-b border-neutral-border bg-neutral-surface-2/30 px-2 pt-2">
        {REQUEST_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`relative px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "text-brand-primary"
                : "text-neutral-text-secondary hover:text-neutral-text-primary"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-[#0d0c1b]">
        {activeTab === "Params" && (
          <p className="text-sm text-neutral-text-secondary italic">
            No query parameters defined.
          </p>
        )}
        {activeTab === "Headers" && (
          <div className="space-y-2 font-mono text-sm text-neutral-text-primary">
            <div className="flex gap-4">
              <span className="text-brand-accent">Authorization</span>
              <span className="text-success">Bearer eyJhbGciOiJIUzI1NiIsInR5...</span>
            </div>
            <div className="flex gap-4">
              <span className="text-brand-accent">Content-Type</span>
              <span className="text-success">application/json</span>
            </div>
          </div>
        )}
        {activeTab === "Body" && (
          <textarea
            className="h-full w-full resize-none bg-transparent font-mono text-sm text-neutral-text-primary focus:outline-none"
            defaultValue={`{\n  "userId": "usr_7729alx",\n  "flightId": "fl_1092"\n}`}
            spellCheck="false"
          />
        )}
        {activeTab === "Auth" && (
          <p className="text-sm text-neutral-text-secondary italic">
            No authorization configured.
          </p>
        )}
      </div>
    </div>
  );
}
