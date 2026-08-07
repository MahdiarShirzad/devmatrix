import Link from "next/link";
import { Plus, Settings } from "lucide-react";

const IDEAS = [
  {
    id: "idea_1",
    title: "AI-powered changelog generator",
    score: 78,
    status: "validated",
    time: "2d ago",
  },
  {
    id: "idea_2",
    title: "Async standup bot for remote teams",
    score: 54,
    status: "needs review",
    time: "5d ago",
  },
  {
    id: "idea_3",
    title: "Invoice reconciliation for freelancers",
    score: 31,
    status: "high risk",
    time: "1w ago",
  },
];

function scoreColor(score: number) {
  if (score >= 70) return "text-success";
  if (score >= 45) return "text-warning";
  return "text-error";
}

export default function SaasValidatorPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium text-neutral-text-primary">
            Idea validator
          </h1>
          <p className="mt-1 text-sm text-neutral-text-secondary">
            Evaluate startup ideas against market and risk signals.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/saas-validator/settings"
            aria-label="Validator settings"
            className="rounded-lg border border-neutral-border p-2.5 text-neutral-text-secondary hover:text-neutral-text-primary"
          >
            <Settings size={16} />
          </Link>
          <Link
            href="/saas-validator/new"
            className="flex items-center gap-2 rounded-lg bg-brand-highlight px-4 py-2 text-sm font-medium text-neutral-bg transition-opacity hover:opacity-90"
          >
            <Plus size={16} />
            New idea
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {IDEAS.map((idea) => (
          <Link
            key={idea.id}
            href={`/saas-validator/${idea.id}`}
            className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-colors hover:border-brand-primary"
          >
            <div className="flex items-start justify-between">
              <h3 className="pr-3 text-sm font-medium text-neutral-text-primary">
                {idea.title}
              </h3>
              <span
                className={`text-2xl font-medium ${scoreColor(idea.score)}`}
              >
                {idea.score}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs capitalize text-neutral-text-secondary">
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
