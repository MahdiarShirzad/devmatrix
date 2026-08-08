import { Clock, RefreshCw } from "lucide-react";
import GithubIcon from "@/app/_utils/GithubIcon";

export default function ProjectHeaderBar() {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-border pb-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
            devmatrix-api
          </h1>
          <span className="flex items-center gap-1.5 rounded-full border border-neutral-border bg-neutral-surface-2 px-2.5 py-1 text-[11px] font-medium text-neutral-text-secondary">
            <GithubIcon width={25} height={25} className=" text-white" />
            GitHub
          </span>
        </div>
        <p className="mt-1.5 flex items-center gap-2 text-sm text-neutral-text-secondary">
          <Clock size={14} />
          Last synced 12 minutes ago
        </p>
      </div>

      <button className="flex items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-1 px-4 py-2 text-sm font-medium text-neutral-text-primary transition-all hover:bg-neutral-surface-2 active:scale-95">
        <RefreshCw size={16} />
        Sync Data
      </button>
    </div>
  );
}
