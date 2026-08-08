import { SlidersHorizontal } from "lucide-react";

export default function SettingsHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-neutral-border pb-6 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
            <SlidersHorizontal size={20} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
            Validator Settings
          </h1>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-neutral-text-secondary">
          Adjust how the AI weighs each factor when scoring your ideas.
          <strong className="font-semibold text-neutral-text-primary">
            {" "}
            The total must equal 100%.
          </strong>
        </p>
      </div>
    </div>
  );
}
