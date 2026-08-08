import { Search } from "lucide-react";

interface SessionSearchToolbarProps {
  sessionCount: number;
}

export default function SessionSearchToolbar({
  sessionCount,
}: SessionSearchToolbarProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="relative w-full max-w-md">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-text-secondary"
        />
        <input
          type="text"
          placeholder="Search sessions, errors, or projects..."
          className="w-full rounded-lg border border-neutral-border bg-neutral-surface-1 py-2 pl-9 pr-3 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary transition-colors focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
      </div>

      <div className="hidden text-sm font-medium text-neutral-text-secondary md:block">
        {sessionCount} Recent Sessions
      </div>
    </div>
  );
}
