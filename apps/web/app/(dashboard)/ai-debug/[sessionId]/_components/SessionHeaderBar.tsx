import { Sparkles, FileCode2 } from "lucide-react";

export default function SessionHeaderBar() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight text-neutral-text-primary">
            Null pointer in auth middleware
          </h1>
          <span className="rounded-full border border-success/20 bg-success-bg px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-success">
            Resolved
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-sm text-neutral-text-secondary">
          <span className="flex items-center gap-1.5">
            <FileCode2 size={14} /> TypeScript
          </span>
          <span>•</span>
          <span>devmatrix-core</span>
        </div>
      </div>

      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-4 focus:ring-brand-primary/20 active:scale-95"
      >
        <Sparkles size={16} />
        Re-Analyze
      </button>
    </div>
  );
}
