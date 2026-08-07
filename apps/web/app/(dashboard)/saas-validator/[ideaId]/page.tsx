"use client";

import { Sparkles } from "lucide-react";

const SECTIONS = [
  {
    title: "Market fit",
    score: 82,
    summary:
      "Strong demand signal among small dev teams already paying for similar async tools. Clear willingness to pay in the $10-30/mo range.",
  },
  {
    title: "Competition",
    score: 61,
    summary:
      "A few established players (Geekbot, Standuply) cover the core use case. Differentiation would need to come from AI summarization depth.",
  },
  {
    title: "Risk",
    score: 45,
    summary:
      "Retention risk is high for standup-style tools once a team's engagement habits change. Consider anchoring to a broader workflow.",
  },
];

function barColor(score: number) {
  if (score >= 70) return "bg-success";
  if (score >= 45) return "bg-warning";
  return "bg-error";
}

function textColor(score: number) {
  if (score >= 70) return "text-success";
  if (score >= 45) return "text-warning";
  return "text-error";
}

export default function ValidatorIdeaPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-medium text-neutral-text-primary">
          Async standup bot for remote teams
        </h1>
        <p className="mt-1 text-sm text-neutral-text-secondary">
          Submitted 5 days ago
        </p>
      </div>

      <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5">
        <label
          htmlFor="idea"
          className="mb-1.5 block text-sm text-neutral-text-primary"
        >
          Describe your idea
        </label>
        <textarea
          id="idea"
          rows={4}
          defaultValue="An async standup bot that collects updates via Slack and summarizes team progress daily using AI, so remote teams can skip live meetings."
          className="w-full resize-none rounded-lg border border-neutral-border bg-neutral-surface-2 p-3 text-sm text-neutral-text-primary focus:border-brand-primary focus:outline-none"
        />
        <button
          type="button"
          className="mt-3 flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Sparkles size={16} />
          Validate idea
        </button>
      </div>

      <div className="mt-6 flex items-center gap-4 rounded-xl border border-neutral-border bg-neutral-surface-1 p-5">
        <span className="text-4xl font-medium text-warning">54</span>
        <div>
          <p className="text-sm font-medium text-neutral-text-primary">
            Overall validation score
          </p>
          <p className="text-xs text-neutral-text-secondary">
            Needs review before moving forward
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {SECTIONS.map((section) => (
          <div
            key={section.title}
            className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium text-neutral-text-primary">
                {section.title}
              </h3>
              <span
                className={`text-sm font-medium ${textColor(section.score)}`}
              >
                {section.score}
              </span>
            </div>
            <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-neutral-surface-2">
              <div
                className={`h-full rounded-full ${barColor(section.score)}`}
                style={{ width: `${section.score}%` }}
              />
            </div>
            <p className="text-sm text-neutral-text-secondary">
              {section.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
