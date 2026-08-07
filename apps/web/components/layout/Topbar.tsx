import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b border-neutral-border bg-neutral-bg px-6">
      <div className="relative w-full max-w-sm">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-text-secondary"
        />
        <input
          type="text"
          placeholder="Search projects, sessions, ideas..."
          className="w-full rounded-lg border border-neutral-border bg-neutral-surface-1 py-2 pl-9 pr-3 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary focus:border-brand-primary focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="text-neutral-text-secondary hover:text-neutral-text-primary"
        >
          <Bell size={18} />
        </button>
        <div className="h-8 w-8 rounded-full bg-brand-primary/20 text-center text-sm leading-8 text-brand-primary">
          M
        </div>
      </div>
    </header>
  );
}
