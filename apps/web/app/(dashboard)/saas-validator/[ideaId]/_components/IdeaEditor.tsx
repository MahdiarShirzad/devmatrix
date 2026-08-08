"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

interface IdeaEditorProps {
  initialPitch: string;
  onReEvaluate?: (pitch: string) => void;
}

export default function IdeaEditor({
  initialPitch,
  onReEvaluate,
}: IdeaEditorProps) {
  const [pitch, setPitch] = useState(initialPitch);

  const handleReEvaluate = () => {
    onReEvaluate?.(pitch);
  };

  return (
    <div className="mb-8 rounded-2xl border border-neutral-border bg-neutral-surface-1 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <label
          htmlFor="idea"
          className="text-sm font-semibold text-neutral-text-primary"
        >
          Core Premise & Pitch
        </label>
      </div>
      <textarea
        id="idea"
        rows={3}
        value={pitch}
        onChange={(e) => setPitch(e.target.value)}
        className="w-full resize-none rounded-xl border border-neutral-border bg-[#0d1117] p-4 text-sm leading-relaxed text-neutral-text-primary placeholder:text-neutral-text-secondary focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all"
      />
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={handleReEvaluate}
          className="flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-4 focus:ring-brand-primary/20 active:scale-95"
        >
          <Sparkles size={16} />
          Re-Evaluate Idea
        </button>
      </div>
    </div>
  );
}
