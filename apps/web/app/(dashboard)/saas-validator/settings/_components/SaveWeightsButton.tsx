"use client";

import { Save, CheckCircle2, Loader2 } from "lucide-react";

interface SaveWeightsButtonProps {
  isValid: boolean;
  isSaving: boolean;
  isSaved: boolean;
  onSave: () => void;
}

export default function SaveWeightsButton({
  isValid,
  isSaving,
  isSaved,
  onSave,
}: SaveWeightsButtonProps) {
  return (
    <div className="flex items-center justify-end border-t border-neutral-border pt-6">
      <button
        type="button"
        onClick={onSave}
        disabled={!isValid || isSaving || isSaved}
        className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all sm:w-auto active:scale-95 ${
          isSaved
            ? "bg-success shadow-lg shadow-success/20"
            : "bg-brand-primary shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 focus:ring-4 focus:ring-brand-primary/20"
        } disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none`}
      >
        {isSaving ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Saving Settings...
          </>
        ) : isSaved ? (
          <>
            <CheckCircle2 size={18} />
            Settings Saved!
          </>
        ) : (
          <>
            <Save size={18} />
            Save Algorithm Weights
          </>
        )}
      </button>
    </div>
  );
}
