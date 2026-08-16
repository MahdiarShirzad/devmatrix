import { Search } from "lucide-react";
import SessionFilters, { StatusFilter } from "./SessionFilters";

export interface SessionSearchToolbarProps {
  sessionCount: number;
  filteredCount: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  language: string;
  onLanguageChange: (value: string) => void;
  languages: string[];
  projectId: string;
  onProjectIdChange: (value: string) => void;
  projectIds: string[];
}

export default function SessionSearchToolbar({
  sessionCount,
  filteredCount,
  searchValue,
  onSearchChange,
  status,
  onStatusChange,
  language,
  onLanguageChange,
  languages,
  projectId,
  onProjectIdChange,
  projectIds,
}: SessionSearchToolbarProps) {
  const isFiltered = filteredCount !== sessionCount;

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-text-secondary"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search sessions, language, or project..."
            className="w-full rounded-lg border border-neutral-border bg-neutral-surface-1 py-2 pl-9 pr-3 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary transition-colors focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>

        <SessionFilters
          status={status}
          onStatusChange={onStatusChange}
          language={language}
          onLanguageChange={onLanguageChange}
          languages={languages}
          projectId={projectId}
          onProjectIdChange={onProjectIdChange}
          projectIds={projectIds}
        />
      </div>

      <div className="text-sm font-medium text-neutral-text-secondary">
        {isFiltered
          ? `${filteredCount} of ${sessionCount} sessions`
          : `${sessionCount} recent sessions`}
      </div>
    </div>
  );
}
