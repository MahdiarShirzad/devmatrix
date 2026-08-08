import { Play, TerminalSquare } from "lucide-react";
import { SAMPLE_CODE } from "./constants";

export default function CodeEditorPanel() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-border bg-[#0d1117] shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-border/50 bg-[#161b22] px-4 py-3">
        <div className="flex items-center gap-2">
          <TerminalSquare size={14} className="text-brand-accent" />
          <span className="font-mono text-xs text-neutral-300">
            auth.middleware.ts
          </span>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md bg-success/10 px-3 py-1.5 text-xs font-medium text-success transition-colors hover:bg-success/20"
        >
          <Play size={12} className="fill-current" />
          Run Code
        </button>
      </div>
      <textarea
        defaultValue={SAMPLE_CODE}
        spellCheck={false}
        className="flex-1 resize-none bg-transparent p-5 font-mono text-sm leading-relaxed text-neutral-200 focus:outline-none"
      />
    </div>
  );
}
