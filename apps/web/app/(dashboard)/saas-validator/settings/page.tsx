const CRITERIA = [
  {
    label: "Market fit weight",
    description: "How much market demand signals affect the overall score.",
    value: 40,
  },
  {
    label: "Competition weight",
    description: "How much existing competitors reduce the overall score.",
    value: 30,
  },
  {
    label: "Risk weight",
    description:
      "How much retention and execution risk affect the overall score.",
    value: 30,
  },
];

export default function ValidatorSettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-medium text-neutral-text-primary">
          Validator settings
        </h1>
        <p className="mt-1 text-sm text-neutral-text-secondary">
          Adjust how the AI weighs each factor when scoring your ideas.
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-neutral-border bg-neutral-surface-1 p-5">
        {CRITERIA.map((criterion) => (
          <div
            key={criterion.label}
            className="border-b border-neutral-border pb-4 last:border-0 last:pb-0"
          >
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm text-neutral-text-primary">
                {criterion.label}
              </label>
              <span className="text-sm text-brand-accent">
                {criterion.value}%
              </span>
            </div>
            <p className="mb-2 text-xs text-neutral-text-secondary">
              {criterion.description}
            </p>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={criterion.value}
              className="w-full accent-brand-primary"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Save changes
      </button>
    </div>
  );
}
