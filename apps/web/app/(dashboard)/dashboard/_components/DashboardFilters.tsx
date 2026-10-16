"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, Check, ChevronDown, RefreshCw } from "lucide-react";

export const DASHBOARD_RANGE_OPTIONS = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 90 days", value: "90" },
  { label: "Last 6 months", value: "180" },
  { label: "Last 12 months", value: "365" },
  { label: "Custom range", value: "custom" },
] as const;

export type DashboardRangeValue =
  (typeof DASHBOARD_RANGE_OPTIONS)[number]["value"];

export interface FilterProject {
  _id: string;
  name: string;
}

interface DashboardFiltersProps {
  range: DashboardRangeValue;
  onRangeChange: (value: DashboardRangeValue) => void;
  customFrom: string;
  customTo: string;
  onCustomFromChange: (value: string) => void;
  onCustomToChange: (value: string) => void;
  projects: FilterProject[];
  selectedProjectIds: string[];
  onToggleProject: (id: string) => void;
  onClearProjects: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

function useOutsideClick<T extends HTMLElement>(onOutside: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOutside();
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onOutside]);
  return ref;
}

export function DashboardFilters({
  range,
  onRangeChange,
  customFrom,
  customTo,
  onCustomFromChange,
  onCustomToChange,
  projects,
  selectedProjectIds,
  onToggleProject,
  onClearProjects,
  onRefresh,
  isRefreshing,
}: DashboardFiltersProps) {
  const [rangeOpen, setRangeOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  const rangeRef = useOutsideClick<HTMLDivElement>(() => setRangeOpen(false));
  const projectsRef = useOutsideClick<HTMLDivElement>(() =>
    setProjectsOpen(false),
  );

  const currentRange =
    DASHBOARD_RANGE_OPTIONS.find((r) => r.value === range) ??
    DASHBOARD_RANGE_OPTIONS[1];

  const projectLabel =
    selectedProjectIds.length === 0
      ? "All projects"
      : selectedProjectIds.length === 1
        ? (projects.find((p) => p._id === selectedProjectIds[0])?.name ??
          "1 project")
        : `${selectedProjectIds.length} projects`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative" ref={rangeRef}>
        <button
          type="button"
          onClick={() => setRangeOpen((o) => !o)}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] px-3 py-2 text-sm text-[var(--color-neutral-text-primary)] transition-colors hover:border-[var(--color-neutral-text-secondary)]/40"
        >
          <Calendar className="h-3.5 w-3.5 text-[var(--color-neutral-text-secondary)]/60" />
          {currentRange.label}
          <ChevronDown className="h-3.5 w-3.5 text-[var(--color-neutral-text-secondary)]/60" />
        </button>

        {rangeOpen && (
          <div className="absolute right-0 z-30 mt-1.5 w-44 overflow-hidden rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] shadow-lg">
            {DASHBOARD_RANGE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onRangeChange(option.value);
                  setRangeOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--color-neutral-surface-2)] ${
                  option.value === range
                    ? "text-[var(--color-brand-primary)]"
                    : "text-[var(--color-neutral-text-secondary)]"
                }`}
              >
                {option.label}
                {option.value === range && <Check className="h-3.5 w-3.5" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {range === "custom" && (
        <div className="flex items-center gap-1.5 rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] px-2 py-1">
          <input
            type="date"
            value={customFrom}
            max={customTo || undefined}
            onChange={(e) => onCustomFromChange(e.target.value)}
            className="bg-transparent text-xs text-[var(--color-neutral-text-primary)] outline-none [color-scheme:dark]"
          />
          <span className="text-xs text-[var(--color-neutral-text-secondary)]/50">
            to
          </span>
          <input
            type="date"
            value={customTo}
            min={customFrom || undefined}
            onChange={(e) => onCustomToChange(e.target.value)}
            className="bg-transparent text-xs text-[var(--color-neutral-text-primary)] outline-none [color-scheme:dark]"
          />
        </div>
      )}

      <div className="relative" ref={projectsRef}>
        <button
          type="button"
          onClick={() => setProjectsOpen((o) => !o)}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] px-3 py-2 text-sm text-[var(--color-neutral-text-primary)] transition-colors hover:border-[var(--color-neutral-text-secondary)]/40"
        >
          <span className="max-w-[10rem] truncate">{projectLabel}</span>
          <ChevronDown className="h-3.5 w-3.5 text-[var(--color-neutral-text-secondary)]/60" />
        </button>

        {projectsOpen && (
          <div className="absolute right-0 z-30 mt-1.5 max-h-72 w-60 overflow-auto rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] shadow-lg">
            <button
              type="button"
              onClick={onClearProjects}
              className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--color-neutral-surface-2)] ${
                selectedProjectIds.length === 0
                  ? "text-[var(--color-brand-primary)]"
                  : "text-[var(--color-neutral-text-secondary)]"
              }`}
            >
              All projects
              {selectedProjectIds.length === 0 && (
                <Check className="h-3.5 w-3.5" />
              )}
            </button>

            {projects.length === 0 ? (
              <p className="px-3 py-2 text-xs text-[var(--color-neutral-text-secondary)]/60">
                No linked repositories
              </p>
            ) : (
              projects.map((project) => {
                const checked = selectedProjectIds.includes(project._id);
                return (
                  <button
                    key={project._id}
                    type="button"
                    onClick={() => onToggleProject(project._id)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[var(--color-neutral-text-secondary)] transition-colors hover:bg-[var(--color-neutral-surface-2)]"
                  >
                    <span
                      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${
                        checked
                          ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]"
                          : "border-[var(--color-neutral-border)]"
                      }`}
                    >
                      {checked && <Check className="h-2.5 w-2.5 text-white" />}
                    </span>
                    <span className="truncate">{project.name}</span>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={isRefreshing}
        className="flex items-center gap-2 rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] px-3 py-2 text-sm text-[var(--color-neutral-text-secondary)] transition-colors hover:border-[var(--color-neutral-text-secondary)]/40 hover:text-white disabled:opacity-50"
      >
        <RefreshCw
          className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
        />
        Refresh
      </button>
    </div>
  );
}
