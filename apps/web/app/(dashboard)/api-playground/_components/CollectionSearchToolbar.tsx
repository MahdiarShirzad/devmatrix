"use client";

import { Search } from "lucide-react";
import type { PlaygroundEnv } from "@/types/playground.types";

export type EnvFilter = "All" | PlaygroundEnv;

const FILTERS: EnvFilter[] = ["All", "Local", "Development", "Production"];

interface CollectionSearchToolbarProps {
  collectionCount: number;
  totalCount: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeFilter: EnvFilter;
  onFilterChange: (filter: EnvFilter) => void;
}

export default function CollectionSearchToolbar({
  collectionCount,
  totalCount,
  searchValue,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: CollectionSearchToolbarProps) {
  const isFiltered = collectionCount !== totalCount;

  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-text-secondary/60"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search collections..."
            className="w-full rounded-lg border border-neutral-border bg-neutral-surface-1 py-2 pl-9 pr-3 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary/50 transition-colors focus:border-brand-primary/60 focus:outline-none focus:ring-1 focus:ring-brand-primary/40"
          />
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-neutral-border bg-neutral-surface-1 p-1">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange(filter)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-neutral-surface-2 text-neutral-text-primary"
                  : "text-neutral-text-secondary hover:text-neutral-text-primary"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs font-medium text-neutral-text-secondary whitespace-nowrap">
        {isFiltered ? (
          <span>
            {collectionCount} of {totalCount} Collections
          </span>
        ) : (
          <span>
            {totalCount} {totalCount === 1 ? "Collection" : "Collections"}
          </span>
        )}
      </div>
    </div>
  );
}
