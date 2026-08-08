"use client";

import Link from "next/link";
import {
  Plus,
  Settings,
  Lightbulb,
  Target,
  CheckCircle2,
  Search,
  Filter,
  Activity,
} from "lucide-react";

// داده‌های غنی‌تر برای نمایش بهتر UI
const IDEAS = [
  {
    id: "idea_1",
    title: "AI-powered changelog generator",
    description:
      "Automatically generate release notes from git commits using LLMs.",
    category: "DevTools",
    score: 78,
    status: "validated",
    time: "2d ago",
  },
  {
    id: "idea_2",
    title: "Async standup bot for remote teams",
    description:
      "Slack integration to replace daily syncs with smart async updates.",
    category: "Productivity",
    score: 54,
    status: "needs review",
    time: "5d ago",
  },
  {
    id: "idea_3",
    title: "Invoice reconciliation for freelancers",
    description:
      "Connect bank accounts to match incoming payments with sent invoices.",
    category: "Fintech",
    score: 31,
    status: "high risk",
    time: "1w ago",
  },
];

// توابع کمکی برای استایل‌دهی داینامیک
function getScoreStyle(score: number) {
  if (score >= 70) return "text-success border-success/20 bg-success/10";
  if (score >= 45) return "text-warning border-warning/20 bg-warning/10";
  return "text-error border-error/20 bg-error/10";
}

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "validated":
      return "bg-success/10 text-success border-success/20";
    case "needs review":
      return "bg-warning/10 text-warning border-warning/20";
    case "high risk":
      return "bg-error/10 text-error border-error/20";
    default:
      return "bg-neutral-surface-2 text-neutral-text-secondary border-neutral-border";
  }
}

export default function SaasValidatorPage() {
  return (
    <div className="flex h-full flex-col pb-8">
      {/* هدر صفحه */}
      <div className="mb-8 flex flex-col gap-4 border-b border-neutral-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
            Idea Validator
          </h1>
          <p className="mt-1.5 text-sm text-neutral-text-secondary">
            Evaluate and score startup ideas against market demand and risk
            signals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/saas-validator/settings"
            aria-label="Validator settings"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-border bg-neutral-surface-1 text-neutral-text-secondary transition-all hover:bg-neutral-surface-2 hover:text-neutral-text-primary active:scale-95"
          >
            <Settings size={18} />
          </Link>
          <Link
            href="/saas-validator/new"
            className="flex h-10 items-center gap-2 rounded-lg bg-brand-primary px-4 font-medium text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-neutral-bg active:scale-95"
          >
            <Plus size={18} />
            <span className="text-sm">New Idea</span>
          </Link>
        </div>
      </div>

      {/* بخش Overview (آمار کلی) */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
          <div className="flex items-center gap-3 text-neutral-text-secondary">
            <Lightbulb size={18} className="text-brand-primary" />
            <span className="text-sm font-medium">Total Ideas</span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-3xl font-bold text-neutral-text-primary">
              24
            </span>
            <span className="text-xs text-neutral-text-secondary">
              +3 this month
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
          <div className="flex items-center gap-3 text-neutral-text-secondary">
            <CheckCircle2 size={18} className="text-success" />
            <span className="text-sm font-medium">Validated</span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-3xl font-bold text-neutral-text-primary">
              6
            </span>
            <span className="text-xs text-neutral-text-secondary">
              25% win rate
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
          <div className="flex items-center gap-3 text-neutral-text-secondary">
            <Target size={18} className="text-brand-accent" />
            <span className="text-sm font-medium">Avg. Score</span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-3xl font-bold text-neutral-text-primary">
              54.3
            </span>
            <span className="text-xs text-neutral-text-secondary">
              Out of 100
            </span>
          </div>
        </div>
      </div>

      {/* نوار جستجو و فیلتر */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-text-secondary"
          />
          <input
            type="text"
            placeholder="Search ideas..."
            className="w-full rounded-lg border border-neutral-border bg-neutral-surface-1 py-2 pl-9 pr-3 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary transition-colors focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>

        <button className="flex w-fit items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-1 px-4 py-2 text-sm font-medium text-neutral-text-primary transition-all hover:bg-neutral-surface-2">
          <Filter size={16} className="text-neutral-text-secondary" />
          Filter Ideas
        </button>
      </div>

      {/* گرید ایده‌ها */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {IDEAS.map((idea) => (
          <Link
            key={idea.id}
            href={`/saas-validator/${idea.id}`}
            className="group relative flex flex-col justify-between rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/5"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="w-fit rounded-md bg-neutral-surface-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-text-secondary">
                    {idea.category}
                  </span>
                  <h3 className="font-semibold leading-tight text-neutral-text-primary transition-colors group-hover:text-brand-primary">
                    {idea.title}
                  </h3>
                </div>

                {/* دایره امتیاز */}
                <div
                  className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full border-2 ${getScoreStyle(idea.score)}`}
                >
                  <span className="text-lg font-bold leading-none">
                    {idea.score}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-neutral-text-secondary line-clamp-2">
                {idea.description}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-neutral-border pt-4">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize ${getStatusBadge(idea.status)}`}
              >
                <Activity size={12} />
                {idea.status}
              </span>
              <span className="text-xs text-neutral-text-secondary">
                {idea.time}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
