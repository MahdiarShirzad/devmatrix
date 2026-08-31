import Link from "next/link";
import { Settings, Plus } from "lucide-react";
import { useParams } from "next/navigation";

export default function ValidatorHeader() {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-neutral-border pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
          Idea Validator
        </h1>
        <p className="mt-1.5 text-sm text-neutral-text-secondary">
          Evaluate and score startup ideas against market demand and risk
          signals.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* <Link
          href="/saas-validator/settings"
          aria-label="Validator settings"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-border bg-neutral-surface-1 text-neutral-text-secondary transition-all hover:bg-neutral-surface-2 hover:text-neutral-text-primary active:scale-95"
        >
          <Settings size={18} />
        </Link> */}
        <Link
          href={`/projects/${projectId}/saas-validator/new`}
          className="flex h-10 items-center gap-2 rounded-lg bg-brand-primary px-4 font-medium text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-neutral-bg active:scale-95"
        >
          <Plus size={18} />
          <span className="text-sm">New Idea</span>
        </Link>
      </div>
    </div>
  );
}
