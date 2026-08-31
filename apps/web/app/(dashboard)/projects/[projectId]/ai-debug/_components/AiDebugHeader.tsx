import Link from "next/link";
import { Plus, TerminalSquare } from "lucide-react";
import { useParams } from "next/navigation";

export default function AiDebugHeader() {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-neutral-border pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
          AI Debugging Assistant
        </h1>
        <p className="mt-1.5 text-sm text-neutral-text-secondary">
          Paste code, describe the issue, and get an AI-explained fix.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="group flex items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-1 px-4 py-2 text-sm font-medium text-neutral-text-primary transition-all hover:border-brand-primary/50 hover:bg-neutral-surface-2"
        >
          <TerminalSquare
            size={16}
            className="text-neutral-text-secondary group-hover:text-neutral-text-primary"
          />
          CLI Usage
        </button>
        <Link
          href={`/projects/${projectId}/ai-debug/new`}
          className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-neutral-bg active:scale-95"
        >
          <Plus size={16} />
          New Session
        </Link>
      </div>
    </div>
  );
}
