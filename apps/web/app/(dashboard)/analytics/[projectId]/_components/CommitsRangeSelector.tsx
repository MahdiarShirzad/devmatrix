"use client";

const OPTIONS: { value: string; label: string }[] = [
  { value: "7", label: "7d" },
  { value: "30", label: "30d" },
  { value: "90", label: "90d" },
  { value: "all", label: "All time" },
];

interface CommitsRangeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CommitsRangeSelector({
  value,
  onChange,
}: CommitsRangeSelectorProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-neutral-border bg-neutral-surface-2 p-0.5">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            value === opt.value
              ? "bg-brand-primary text-neutral-surface-1"
              : "text-neutral-text-secondary hover:text-neutral-text-primary"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
