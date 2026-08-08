import type { AnalysisSectionData } from "./analysis-types";

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

export default function AnalysisSection({
  title,
  icon: Icon,
  score,
  summary,
}: AnalysisSectionData) {
  return (
    <div className="group flex flex-col justify-between rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-all hover:border-neutral-border/80 shadow-sm">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg border ${bgColor(score)}`}
            >
              <Icon size={16} className={textColor(score)} />
            </div>
            <h4 className="font-semibold text-neutral-text-primary">
              {title}
            </h4>
          </div>
          <span className={`text-lg font-bold ${textColor(score)}`}>
            {score}
          </span>
        </div>

        <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-surface-2">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${barColor(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>

        <p className="text-sm leading-relaxed text-neutral-text-secondary">
          {summary}
        </p>
      </div>
    </div>
  );
}
