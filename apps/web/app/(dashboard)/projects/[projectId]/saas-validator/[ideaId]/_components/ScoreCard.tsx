interface ScoreCardProps {
  score: number;
  description: string;
}

export default function ScoreCard({ score, description }: ScoreCardProps) {
  return (
    <div className="mb-8 flex items-center gap-5 rounded-2xl border border-warning/20 bg-warning/5 p-6 shadow-sm">
      <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border-4 border-warning/30 bg-neutral-surface-1 shadow-inner">
        <span className="text-3xl font-bold text-warning">{score}</span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-neutral-text-primary">
          Overall Validation Score
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-neutral-text-secondary max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
}
