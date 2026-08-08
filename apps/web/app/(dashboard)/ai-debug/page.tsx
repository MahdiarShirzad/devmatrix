"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Bug,
  Clock,
  Search,
  TerminalSquare,
  MoreVertical,
  Trash2,
  Share2,
  CheckCircle2,
  CircleDashed,
} from "lucide-react";

// داده‌های غنی‌تر و نزدیک‌تر به پروژه‌های واقعی
const SESSIONS = [
  {
    id: "sess_1",
    title: "TypeScript casing compile error in GitHub OAuth",
    project: "devmatrix",
    language: "TypeScript",
    status: "resolved",
    time: "Just now",
  },
  {
    id: "sess_2",
    title: "MongoDB connection timeout in flight search API",
    project: "my-trip-full",
    language: "Node.js",
    status: "in progress",
    time: "2h ago",
  },
  {
    id: "sess_3",
    title: "Unhandled Promise Rejection in Express error middleware",
    project: "deep-coding-backend",
    language: "Express",
    status: "resolved",
    time: "1d ago",
  },
];

export default function AiDebugPage() {
  // استیت برای مدیریت باز و بسته شدن منوی سه‌نقطه سشن‌ها
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleToggleDropdown = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div
      className="flex h-full flex-col"
      onClick={() => setActiveDropdown(null)}
    >
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-4 border-b border-neutral-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
            AI Debugging Assistant
          </h1>
          <p className="mt-1.5 text-sm text-neutral-text-secondary">
            Paste code, describe the issue, and get an AI-explained fix.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="group flex items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-1 px-4 py-2 text-sm font-medium text-neutral-text-primary transition-all hover:border-brand-primary/50 hover:bg-neutral-surface-2"
          >
            <TerminalSquare
              size={16}
              className="text-neutral-text-secondary group-hover:text-neutral-text-primary"
            />
            CLI Usage
          </button>
          <Link
            href="/ai-debug/new"
            className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-neutral-bg active:scale-95"
          >
            <Plus size={16} />
            New Session
          </Link>
        </div>
      </div>

      {/* Toolbar & Search */}
      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-text-secondary"
          />
          <input
            type="text"
            placeholder="Search sessions, errors, or projects..."
            className="w-full rounded-lg border border-neutral-border bg-neutral-surface-1 py-2 pl-9 pr-3 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary transition-colors focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>

        <div className="hidden text-sm font-medium text-neutral-text-secondary md:block">
          {SESSIONS.length} Recent Sessions
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex flex-col rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
        {SESSIONS.map((session, index) => (
          <Link
            key={session.id}
            href={`/ai-debug/${session.id}`}
            className={`group flex flex-col items-start gap-4 p-4 transition-colors hover:bg-neutral-surface-2/50 sm:flex-row sm:items-center sm:justify-between ${
              index !== SESSIONS.length - 1
                ? "border-b border-neutral-border"
                : ""
            }`}
          >
            {/* Left side: Icon & Info */}
            <div className="flex items-start gap-4">
              <div
                className={`mt-1 rounded-lg p-2.5 transition-colors ${
                  session.status === "resolved"
                    ? "bg-success-bg text-success"
                    : "bg-brand-highlight/10 text-brand-highlight"
                }`}
              >
                <Bug size={18} strokeWidth={2} />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-neutral-text-primary group-hover:text-brand-primary transition-colors">
                  {session.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium">
                  <span className="inline-flex items-center rounded-md border border-neutral-border bg-neutral-surface-2 px-2 py-0.5 text-neutral-text-secondary">
                    {session.project}
                  </span>
                  <span className="text-neutral-text-secondary before:mr-2 before:content-['•']">
                    {session.language}
                  </span>
                </div>
              </div>
            </div>

            {/* Right side: Status, Time, Actions */}
            <div className="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:gap-6 ml-14 sm:ml-0">
              <div className="flex items-center gap-4">
                <span
                  className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                    session.status === "resolved"
                      ? "border-success/20 bg-success-bg text-success"
                      : "border-brand-highlight/20 bg-brand-highlight/10 text-brand-highlight"
                  }`}
                >
                  {session.status === "resolved" ? (
                    <CheckCircle2 size={12} />
                  ) : (
                    <CircleDashed size={12} className="animate-spin-slow" />
                  )}
                  {session.status}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-neutral-text-secondary">
                  <Clock size={14} />
                  {session.time}
                </span>
              </div>

              {/* Action Menu */}
              <div className="relative z-10 hidden sm:block">
                <button
                  onClick={(e) => handleToggleDropdown(e, session.id)}
                  className="rounded-md p-1.5 text-neutral-text-secondary opacity-0 transition-all hover:bg-neutral-surface-2 hover:text-neutral-text-primary group-hover:opacity-100"
                >
                  <MoreVertical size={16} />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === session.id && (
                  <div className="absolute right-0 top-full mt-1 w-36 overflow-hidden rounded-lg border border-neutral-border bg-neutral-surface-1 shadow-xl animate-in fade-in zoom-in-95 duration-100">
                    <button
                      onClick={(e) => {
                        e.preventDefault(); /* Handle share */
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-xs text-neutral-text-primary transition-colors hover:bg-neutral-surface-2"
                    >
                      <Share2 size={14} /> Share
                    </button>
                    <div className="h-px bg-neutral-border"></div>
                    <button
                      onClick={(e) => {
                        e.preventDefault(); /* Handle delete */
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-xs text-error transition-colors hover:bg-error/10"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
