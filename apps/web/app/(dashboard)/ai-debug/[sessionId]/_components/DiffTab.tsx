import { diffLines } from "diff";
import { DebugSession } from "@/types/aiDebug.types";

interface DiffTabProps {
  session: DebugSession;
}

export default function DiffTab({ session }: DiffTabProps) {
  if (!session.fixedCode) {
    return (
      <p className="text-sm text-neutral-text-secondary">
        دیفی برای نمایش موجود نیست.
      </p>
    );
  }

  const changes = diffLines(session.sourceCode, session.fixedCode);

  return (
    <div className="flex h-full flex-col animate-in fade-in duration-300">
      <pre className="h-full overflow-x-auto rounded-xl border border-neutral-border/50 bg-[#0d1117] py-4 font-mono text-[13px] leading-relaxed">
        {changes.map((part, i) => {
          const lines = part.value.replace(/\n$/, "").split("\n");
          const bg = part.added
            ? "bg-success/10 text-success"
            : part.removed
              ? "bg-error/10 text-error"
              : "text-neutral-500";
          const prefix = part.added ? "+ " : part.removed ? "- " : "  ";

          return lines.map((line, j) => (
            <div key={`${i}-${j}`} className={`px-4 ${bg}`}>
              {prefix}
              {line}
            </div>
          ));
        })}
      </pre>
    </div>
  );
}
