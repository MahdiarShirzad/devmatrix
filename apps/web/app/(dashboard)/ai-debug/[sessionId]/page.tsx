"use client";

import { useState } from "react";
import { Play, Sparkles } from "lucide-react";

const TABS = ["Explanation", "Fix", "Diff"] as const;
type Tab = (typeof TABS)[number];

const SAMPLE_CODE = `function getUser(id) {
  const user = users.find(u => u.id === id);
  return user.name;
}`;

export default function DebugSessionPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Explanation");

  return (
    <div className="flex h-[calc(100vh-56px-48px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-neutral-text-primary">
            Null pointer in auth middleware
          </h1>
          <p className="text-xs text-neutral-text-secondary">TypeScript</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Sparkles size={16} />
          Analyze code
        </button>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-2">
        {/* Code editor panel */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1">
          <div className="flex items-center justify-between border-b border-neutral-border px-4 py-2.5">
            <span className="text-xs text-neutral-text-secondary">
              auth.middleware.ts
            </span>
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs text-neutral-text-secondary hover:text-neutral-text-primary"
            >
              <Play size={12} />
              Run
            </button>
          </div>
          <textarea
            defaultValue={SAMPLE_CODE}
            spellCheck={false}
            className="flex-1 resize-none bg-transparent p-4 font-mono text-sm text-neutral-text-primary focus:outline-none"
          />
        </div>

        {/* AI result panel */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1">
          <div className="flex border-b border-neutral-border px-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 px-3 py-2.5 text-sm transition-colors ${
                  activeTab === tab
                    ? "border-brand-primary text-brand-primary"
                    : "border-transparent text-neutral-text-secondary hover:text-neutral-text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "Explanation" && (
              <p className="text-sm leading-relaxed text-neutral-text-primary">
                <code className="rounded bg-neutral-surface-2 px-1.5 py-0.5 text-xs">
                  users.find
                </code>{" "}
                returns <code className="text-error">undefined</code> when no
                user matches the given id. Accessing{" "}
                <code className="rounded bg-neutral-surface-2 px-1.5 py-0.5 text-xs">
                  user.name
                </code>{" "}
                right after throws a null pointer exception instead of returning
                a clear error.
              </p>
            )}

            {activeTab === "Fix" && (
              <pre className="overflow-x-auto rounded-lg bg-neutral-surface-2 p-3 font-mono text-xs text-neutral-text-primary">
                {`function getUser(id) {
  const user = users.find(u => u.id === id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user.name;
}`}
              </pre>
            )}

            {activeTab === "Diff" && (
              <pre className="overflow-x-auto rounded-lg bg-neutral-surface-2 p-3 font-mono text-xs">
                <span className="block text-neutral-text-secondary">
                  {"  function getUser(id) {"}
                </span>
                <span className="block text-neutral-text-secondary">
                  {"    const user = users.find(u => u.id === id);"}
                </span>
                <span className="block bg-success-bg text-success">
                  {"+   if (!user) {"}
                </span>
                <span className="block bg-success-bg text-success">
                  {"+     throw new AppError('User not found', 404);"}
                </span>
                <span className="block bg-success-bg text-success">
                  {"+   }"}
                </span>
                <span className="block text-neutral-text-secondary">
                  {"    return user.name;"}
                </span>
                <span className="block text-neutral-text-secondary">
                  {"  }"}
                </span>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
