import { TerminalSquare } from "lucide-react";
import { DebugSession } from "@/types/aiDebug.types";

interface CodeEditorPanelProps {
  session: DebugSession;
}

export default function CodeEditorPanel({ session }: CodeEditorPanelProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-border bg-[#0d1117] shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-border/50 bg-[#161b22] px-4 py-3">
        <div className="flex items-center gap-2">
          <TerminalSquare size={14} className="text-brand-accent" />
          <span className="font-mono text-xs text-neutral-300">
            {session.language}
          </span>
        </div>
      </div>
      <textarea
        defaultValue={session.sourceCode}
        readOnly
        spellCheck={false}
        className="flex-1 resize-none bg-transparent p-5 font-mono text-sm leading-relaxed text-neutral-200 focus:outline-none"
      />
    </div>
  );
}
