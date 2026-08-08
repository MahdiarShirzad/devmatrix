import { Info } from "lucide-react";

export default function ExplanationTab() {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex gap-3 rounded-xl border border-warning/20 bg-warning-bg/50 p-4">
        <Info size={20} className="shrink-0 text-warning" />
        <p className="text-sm leading-relaxed text-neutral-text-primary">
          <code className="rounded bg-neutral-surface-2 px-1.5 py-0.5 font-mono text-[13px] text-error">
            users.find
          </code>{" "}
          returns{" "}
          <code className="font-semibold text-error">undefined</code> when no
          user matches the given id. Accessing{" "}
          <code className="rounded bg-neutral-surface-2 px-1.5 py-0.5 font-mono text-[13px]">
            user.name
          </code>{" "}
          right after without validating throws a{" "}
          <strong>null pointer exception</strong>.
        </p>
      </div>
      <div className="px-1 text-sm text-neutral-text-secondary">
        <h4 className="mb-2 font-semibold text-neutral-text-primary">
          Suggested Approach:
        </h4>
        <ul className="ml-4 list-disc space-y-1.5">
          <li>Always check if the result of `.find()` is valid.</li>
          <li>Throw a standard HTTP Error (like 404) if the user is not found.</li>
        </ul>
      </div>
    </div>
  );
}
