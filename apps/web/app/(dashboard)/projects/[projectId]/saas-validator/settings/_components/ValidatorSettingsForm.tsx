import { SlidersHorizontal } from "lucide-react";

export default function ValidatorSettingsForm() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-border bg-neutral-surface-1/20 py-20 text-center">
      <SlidersHorizontal size={32} className="mb-4 text-neutral-text-secondary/40" />
      <h3 className="text-lg font-medium text-neutral-text-primary">
        Coming Soon
      </h3>
      <p className="mt-1 max-w-sm text-sm text-neutral-text-secondary">
        Configurable scoring weights aren&apos;t available yet. Ideas are
        currently scored with the default weighting.
      </p>
    </div>
  );
}
