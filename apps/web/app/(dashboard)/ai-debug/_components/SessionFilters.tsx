import { DebugSessionStatus } from "@/types/aiDebug.types";

export type StatusFilter = "all" | DebugSessionStatus;

interface SessionFiltersProps {
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  language: string;
  onLanguageChange: (value: string) => void;
  languages: string[];
  projectId: string;
  onProjectIdChange: (value: string) => void;
  projectIds: string[];
}

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "resolved", label: "Resolved" },
  { value: "in_progress", label: "In Progress" },
  { value: "failed", label: "Failed" },
];

const selectClass =
  "rounded-lg border border-neutral-border bg-neutral-surface-1 px-3 py-2 text-xs font-medium text-neutral-text-primary transition-colors focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary";

export default function SessionFilters({
  status,
  onStatusChange,
  language,
  onLanguageChange,
  languages,
  projectId,
  onProjectIdChange,
  projectIds,
}: SessionFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
        className={selectClass}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className={selectClass}
      >
        <option value="all">All Languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      {projectIds.length > 0 && (
        <select
          value={projectId}
          onChange={(e) => onProjectIdChange(e.target.value)}
          className={selectClass}
        >
          <option value="all">All Projects</option>
          {projectIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
