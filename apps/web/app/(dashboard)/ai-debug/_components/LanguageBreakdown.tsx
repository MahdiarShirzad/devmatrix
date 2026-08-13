import { LanguageSlice } from "../_hooks/useDebugAnalytics";

interface LanguageBreakdownProps {
  languages: LanguageSlice[];
}

// Deterministic, subtle color per row (uses semantic + brand tones already in the palette)
const ROW_COLORS = [
  "var(--color-brand-primary)",
  "var(--color-info)",
  "var(--color-success)",
  "var(--color-neutral-text-secondary)",
  "var(--color-warning)",
];

export default function LanguageBreakdown({
  languages,
}: LanguageBreakdownProps) {
  const top = languages.slice(0, 5);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-border bg-neutral-surface-1 p-4">
      <h3 className="text-sm font-semibold text-neutral-text-primary">
        Languages
      </h3>

      {top.length === 0 ? (
        <p className="py-4 text-xs text-neutral-text-secondary">
          Language breakdown will appear once you have debugging sessions.
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {top.map((item, i) => (
            <div key={item.language} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-neutral-text-primary">
                  {item.language}
                </span>
                <span className="text-neutral-text-secondary tabular-nums">
                  {item.percent}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-surface-2">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${item.percent}%`,
                    backgroundColor: ROW_COLORS[i % ROW_COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
