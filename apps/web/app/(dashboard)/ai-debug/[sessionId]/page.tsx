"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Play,
  Sparkles,
  ArrowLeft,
  FileCode2,
  Copy,
  Check,
  TerminalSquare,
  Info,
} from "lucide-react";

const TABS = ["Explanation", "Fix", "Diff"] as const;
type Tab = (typeof TABS)[number];

const SAMPLE_CODE = `function getUser(id) {
  const user = users.find(u => u.id === id);
  return user.name;
}`;

export default function DebugSessionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Explanation");
  const [isCopied, setIsCopied] = useState(false);

  // شبیه‌سازی کپی کردن کد
  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-8rem)] flex-col pb-6">
      {/* دکمه بازگشت */}
      <button
        type="button"
        onClick={() => router.push("/ai-debug")}
        className="group mb-6 flex w-fit items-center gap-2 text-sm font-medium text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
      >
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back to sessions
      </button>

      {/* هدر سشن */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-neutral-text-primary">
              Null pointer in auth middleware
            </h1>
            <span className="rounded-full border border-success/20 bg-success-bg px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-success">
              Resolved
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-sm text-neutral-text-secondary">
            <span className="flex items-center gap-1.5">
              <FileCode2 size={14} /> TypeScript
            </span>
            <span>•</span>
            <span>devmatrix-core</span>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-4 focus:ring-brand-primary/20 active:scale-95"
        >
          <Sparkles size={16} />
          Re-Analyze
        </button>
      </div>

      {/* گرید اصلی پنل‌ها */}
      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2 lg:overflow-hidden">
        {/* پنل سمت چپ: ویرایشگر کد */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-border bg-[#0d1117] shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-border/50 bg-[#161b22] px-4 py-3">
            <div className="flex items-center gap-2">
              <TerminalSquare size={14} className="text-brand-accent" />
              <span className="font-mono text-xs text-neutral-300">
                auth.middleware.ts
              </span>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-md bg-success/10 px-3 py-1.5 text-xs font-medium text-success transition-colors hover:bg-success/20"
            >
              <Play size={12} className="fill-current" />
              Run Code
            </button>
          </div>
          <textarea
            defaultValue={SAMPLE_CODE}
            spellCheck={false}
            className="flex-1 resize-none bg-transparent p-5 font-mono text-sm leading-relaxed text-neutral-200 focus:outline-none"
          />
        </div>

        {/* پنل سمت راست: نتایج هوش مصنوعی */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
          {/* هدر تب‌ها */}
          <div className="flex border-b border-neutral-border px-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
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

          {/* محتوای تب‌ها */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* تب Explanation */}
            {activeTab === "Explanation" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex gap-3 rounded-xl border border-warning/20 bg-warning-bg/50 p-4">
                  <Info size={20} className="shrink-0 text-warning" />
                  <p className="text-sm leading-relaxed text-neutral-text-primary">
                    <code className="rounded bg-neutral-surface-2 px-1.5 py-0.5 font-mono text-[13px] text-error">
                      users.find
                    </code>{" "}
                    returns{" "}
                    <code className="font-semibold text-error">undefined</code>{" "}
                    when no user matches the given id. Accessing{" "}
                    <code className="rounded bg-neutral-surface-2 px-1.5 py-0.5 font-mono text-[13px]">
                      user.name
                    </code>{" "}
                    right after without validating throws a{" "}
                    <strong>null pointer exception</strong>.
                  </p>
                </div>
                <div className="px-1 text-sm text-neutral-text-secondary">
                  <h4 className="mb-2 font-semibold text-neutral-text-primary">
                    Suggested Approach:
                  </h4>
                  <ul className="ml-4 list-disc space-y-1.5">
                    <li>Always check if the result of `.find()` is valid.</li>
                    <li>
                      Throw a standard HTTP Error (like 404) if the user is not
                      found.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* تب Fix */}
            {activeTab === "Fix" && (
              <div className="group relative flex h-full flex-col animate-in fade-in duration-300">
                <button
                  onClick={handleCopy}
                  className="absolute right-3 top-3 z-10 rounded-md bg-neutral-surface-2 p-1.5 text-neutral-text-secondary opacity-0 transition-all hover:text-neutral-text-primary group-hover:opacity-100"
                  title="Copy to clipboard"
                >
                  {isCopied ? (
                    <Check size={16} className="text-success" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
                <pre className="h-full overflow-x-auto rounded-xl bg-[#0d1117] p-5 font-mono text-[13px] leading-loose text-neutral-200">
                  {`function getUser(id) {
  const user = users.find(u => u.id === id);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  return user.name;
}`}
                </pre>
              </div>
            )}

            {/* تب Diff */}
            {activeTab === "Diff" && (
              <div className="flex h-full flex-col animate-in fade-in duration-300">
                <pre className="h-full overflow-x-auto rounded-xl border border-neutral-border/50 bg-[#0d1117] py-4 font-mono text-[13px] leading-relaxed">
                  <div className="px-4 text-neutral-500">
                    {"  function getUser(id) {"}
                  </div>
                  <div className="px-4 text-neutral-500">
                    {"    const user = users.find(u => u.id === id);"}
                  </div>
                  <div className="mt-1 w-full bg-success/10 px-4 text-success">
                    {"+   if (!user) {"}
                  </div>
                  <div className="w-full bg-success/10 px-4 text-success">
                    {"+     throw new AppError('User not found', 404);"}
                  </div>
                  <div className="mb-1 w-full bg-success/10 px-4 text-success">
                    {"+   }"}
                  </div>
                  <div className="px-4 text-neutral-500">
                    {"    return user.name;"}
                  </div>
                  <div className="px-4 text-neutral-500">{"  }"}</div>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
