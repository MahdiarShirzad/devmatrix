"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Target,
  Swords,
  ShieldAlert,
  Activity,
} from "lucide-react";

const SECTIONS = [
  {
    title: "Market fit",
    icon: Target,
    score: 82,
    summary:
      "Strong demand signal among small dev teams already paying for similar async tools. Clear willingness to pay in the $10-30/mo range.",
  },
  {
    title: "Competition",
    icon: Swords,
    score: 61,
    summary:
      "A few established players (Geekbot, Standuply) cover the core use case. Differentiation would need to come from AI summarization depth.",
  },
  {
    title: "Risk",
    icon: ShieldAlert,
    score: 45,
    summary:
      "Retention risk is high for standup-style tools once a team's engagement habits change. Consider anchoring to a broader workflow.",
  },
];

function barColor(score: number) {
  if (score >= 70)
    return "bg-success shadow-[0_0_8px_rgba(var(--success),0.5)]";
  if (score >= 45)
    return "bg-warning shadow-[0_0_8px_rgba(var(--warning),0.5)]";
  return "bg-error shadow-[0_0_8px_rgba(var(--error),0.5)]";
}

function textColor(score: number) {
  if (score >= 70) return "text-success";
  if (score >= 45) return "text-warning";
  return "text-error";
}

function bgColor(score: number) {
  if (score >= 70) return "bg-success/10 border-success/20";
  if (score >= 45) return "bg-warning/10 border-warning/20";
  return "bg-error/10 border-error/20";
}

export default function ValidatorIdeaPage() {
  return (
    <div className="flex h-full flex-col pb-8">
      {/* دکمه بازگشت */}
      <Link
        href="/saas-validator"
        className="group mb-6 flex w-fit items-center gap-2 text-sm font-medium text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
      >
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back to ideas
      </Link>

      {/* هدر */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
              Async standup bot for remote teams
            </h1>
            <span className="flex items-center gap-1.5 rounded-full border border-warning/20 bg-warning/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-warning">
              <Activity size={12} />
              Needs Review
            </span>
          </div>
          <p className="mt-1.5 text-sm text-neutral-text-secondary">
            Submitted 5 days ago • Productivity Category
          </p>
        </div>
      </div>

      {/* کارت امتیاز کلی */}
      <div className="mb-8 flex items-center gap-5 rounded-2xl border border-warning/20 bg-warning/5 p-6 shadow-sm">
        <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border-4 border-warning/30 bg-neutral-surface-1 shadow-inner">
          <span className="text-3xl font-bold text-warning">54</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-neutral-text-primary">
            Overall Validation Score
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-neutral-text-secondary max-w-2xl">
            This idea has potential but faces significant retention risks and
            strong existing competition. Consider pivoting the core value
            proposition before investing heavy development time.
          </p>
        </div>
      </div>

      {/* بخش ویرایشگر ایده */}
      <div className="mb-8 rounded-2xl border border-neutral-border bg-neutral-surface-1 p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <label
            htmlFor="idea"
            className="text-sm font-semibold text-neutral-text-primary"
          >
            Core Premise & Pitch
          </label>
        </div>
        <textarea
          id="idea"
          rows={3}
          defaultValue="An async standup bot that collects updates via Slack and summarizes team progress daily using AI, so remote teams can skip live meetings."
          className="w-full resize-none rounded-xl border border-neutral-border bg-[#0d1117] p-4 text-sm leading-relaxed text-neutral-text-primary placeholder:text-neutral-text-secondary focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all"
        />
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-4 focus:ring-brand-primary/20 active:scale-95"
          >
            <Sparkles size={16} />
            Re-Evaluate Idea
          </button>
        </div>
      </div>

      {/* جزئیات ارزیابی (بخش‌های ۳ گانه) */}
      <h3 className="mb-4 text-sm font-semibold text-neutral-text-primary">
        Detailed Analysis
      </h3>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {SECTIONS.map((section) => (
          <div
            key={section.title}
            className="group flex flex-col justify-between rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-all hover:border-neutral-border/80 shadow-sm"
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border ${bgColor(section.score)}`}
                  >
                    <section.icon
                      size={16}
                      className={textColor(section.score)}
                    />
                  </div>
                  <h4 className="font-semibold text-neutral-text-primary">
                    {section.title}
                  </h4>
                </div>
                <span
                  className={`text-lg font-bold ${textColor(section.score)}`}
                >
                  {section.score}
                </span>
              </div>

              <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-surface-2">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${barColor(section.score)}`}
                  style={{ width: `${section.score}%` }}
                />
              </div>

              <p className="text-sm leading-relaxed text-neutral-text-secondary">
                {section.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
