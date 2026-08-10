"use client";

import { Sparkles, Loader2 } from "lucide-react";

interface SubmitSectionProps {
  disabled: boolean;
  isSubmitting?: boolean;
}

export default function SubmitSection({
  disabled,
  isSubmitting,
}: SubmitSectionProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-border pt-6 sm:flex-row">
      <p className="text-xs text-neutral-text-secondary">
        Pro tip: You can also paste error logs directly in the code block.
      </p>
      <button
        type="submit"
        disabled={disabled}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:outline-none focus:ring-4 focus:ring-brand-primary/20 active:scale-95 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Sparkles size={18} />
        )}
        {isSubmitting ? "Analyzing..." : "Analyze Code"}
      </button>
    </div>
  );
}
