import Link from "next/link";
import { Activity } from "lucide-react";
import type { Idea } from "@/types/ideaValidator.types";

interface IdeaCardProps {
  idea: Idea;
}

// از overallScore عددی، برچسب وضعیت نمایشی رو مشتق می‌کنه
function getDisplayStatus(idea: Idea): string {
  if (idea.status === "failed") return "failed";
  if (idea.status === "pending" || idea.overallScore === undefined)
    return "analyzing";
  if (idea.overallScore >= 70) return "validated";
  if (idea.overallScore >= 45) return "needs review";
  return "high risk";
}

function getScoreStyle(score?: number) {
  if (score === undefined)
    return "text-neutral-text-secondary border-neutral-border bg-neutral-surface-2";
  if (score >= 70) return "text-success border-success/20 bg-success/10";
  if (score >= 45) return "text-warning border-warning/20 bg-warning/10";
  return "text-error border-error/20 bg-error/10";
}

function getStatusBadge(status: string) {
  switch (status) {
    case "validated":
      return "bg-success/10 text-success border-success/20";
    case "needs review":
      return "bg-warning/10 text-warning border-warning/20";
    case "high risk":
    case "failed":
      return "bg-error/10 text-error border-error/20";
    default:
      return "bg-neutral-surface-2 text-neutral-text-secondary border-neutral-border";
  }
}

function formatTimeAgo(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "today";
  if (diffDays === 1) return "1d ago";
  if (diffDays < 7) return `${diffDays}d ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths}mo ago`;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const displayStatus = getDisplayStatus(idea);

  return (
    <Link
      href={`/saas-validator/${idea._id}`}
      className="group relative flex flex-col justify-between rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/5"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="w-fit rounded-md bg-neutral-surface-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-text-secondary">
              {idea.category ?? "Uncategorized"}
            </span>
            <h3 className="font-semibold leading-tight text-neutral-text-primary transition-colors group-hover:text-brand-primary">
              {idea.title}
            </h3>
          </div>

          {/* دایره امتیاز */}
          <div
            className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full border-2 ${getScoreStyle(idea.overallScore)}`}
          >
            <span className="text-lg font-bold leading-none">
              {idea.overallScore ?? "—"}
            </span>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-neutral-text-secondary line-clamp-2">
          {idea.description}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-neutral-border pt-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize ${getStatusBadge(displayStatus)}`}
        >
          <Activity size={12} />
          {displayStatus}
        </span>
        <span className="text-xs text-neutral-text-secondary">
          {formatTimeAgo(idea.createdAt)}
        </span>
      </div>
    </Link>
  );
}
