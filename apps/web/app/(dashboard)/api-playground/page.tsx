"use client";

import { useMemo, useState } from "react";
import { RefreshCw, FolderPlus, AlertTriangle } from "lucide-react";
import PlaygroundHeader from "./_components/PlaygroundHeader";
import CollectionSearchToolbar, {
  EnvFilter,
} from "./_components/CollectionSearchToolbar";
import CollectionsGrid from "./_components/CollectionsGrid";
import NewCollectionModal from "./_components/NewCollectionModal";
import QuickRequestModal from "./_components/QuickRequestModal";
import { useCollections } from "@/hooks/usePlayground";

export default function ApiPlaygroundPage() {
  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] =
    useState(false);
  const [isQuickRequestModalOpen, setIsQuickRequestModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [envFilter, setEnvFilter] = useState<EnvFilter>("All");

  const { data: collections, isLoading, isError, refetch, isRefetching } =
    useCollections();

  const filteredCollections = useMemo(() => {
    if (!collections) return collections;

    return collections.filter((c) => {
      const matchesSearch = c.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesEnv = envFilter === "All" || c.env === envFilter;
      return matchesSearch && matchesEnv;
    });
  }, [collections, search, envFilter]);

  const hasCollections = (collections?.length ?? 0) > 0;
  const hasResults = (filteredCollections?.length ?? 0) > 0;
  const isSearchOrFilterActive = search.trim() !== "" || envFilter !== "All";

  return (
    <div className="flex h-full flex-col">
      <PlaygroundHeader
        onQuickRequestClick={() => setIsQuickRequestModalOpen(true)}
        onNewCollectionClick={() => setIsNewCollectionModalOpen(true)}
      />

      <div className="flex flex-1 flex-col">
        {/* Toolbar only makes sense once we actually have collections to search/filter */}
        {hasCollections && (
          <CollectionSearchToolbar
            collectionCount={filteredCollections?.length ?? 0}
            totalCount={collections?.length ?? 0}
            searchValue={search}
            onSearchChange={setSearch}
            activeFilter={envFilter}
            onFilterChange={setEnvFilter}
          />
        )}

        <div className="mx-auto w-full max-w-6xl flex-1">
          {/* 1. Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-lg border border-neutral-border bg-neutral-surface-1 p-4"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="h-8 w-8 shrink-0 rounded-md bg-neutral-surface-2" />
                    <div className="flex-1 space-y-2 pt-0.5">
                      <div className="h-3.5 w-2/3 rounded bg-neutral-surface-2" />
                      <div className="h-2.5 w-1/2 rounded bg-neutral-surface-2" />
                    </div>
                  </div>
                  <div className="mt-4 border-t border-neutral-border pt-3">
                    <div className="h-4 w-14 rounded bg-neutral-surface-2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. Error State */}
          {!isLoading && isError && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-error-bg">
                <AlertTriangle size={22} className="text-error" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold text-neutral-text-primary">
                Unable to load collections
              </h3>
              <p className="mb-5 max-w-sm text-sm text-neutral-text-secondary">
                Something went wrong while fetching your workspace data.
              </p>
              <button
                onClick={() => refetch()}
                disabled={isRefetching}
                className="flex items-center gap-2 rounded-lg border border-neutral-border px-4 py-2 text-sm font-medium text-neutral-text-primary transition-colors hover:bg-neutral-surface-2 disabled:opacity-50"
              >
                <RefreshCw
                  size={14}
                  className={isRefetching ? "animate-spin" : ""}
                />
                {isRefetching ? "Retrying..." : "Retry"}
              </button>
            </div>
          )}

          {/* 3. Empty State (no collections at all) */}
          {!isLoading && !isError && !hasCollections && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-border py-20 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-surface-2">
                <FolderPlus size={20} className="text-neutral-text-secondary" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold text-neutral-text-primary">
                No collections yet
              </h3>
              <p className="mb-5 max-w-sm text-sm text-neutral-text-secondary">
                Create your first collection to organize your API requests.
              </p>
              <button
                onClick={() => setIsNewCollectionModalOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary/90"
              >
                <FolderPlus size={15} />
                New Collection
              </button>
            </div>
          )}

          {/* 4. No results for current search/filter, but collections exist */}
          {!isLoading &&
            !isError &&
            hasCollections &&
            !hasResults &&
            isSearchOrFilterActive && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <h3 className="mb-1.5 text-sm font-semibold text-neutral-text-primary">
                  No matching collections
                </h3>
                <p className="mb-5 max-w-sm text-sm text-neutral-text-secondary">
                  Try a different search term or clear the active filter.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setEnvFilter("All");
                  }}
                  className="rounded-lg border border-neutral-border px-4 py-2 text-sm font-medium text-neutral-text-primary transition-colors hover:bg-neutral-surface-2"
                >
                  Clear search &amp; filters
                </button>
              </div>
            )}

          {/* 5. Loaded Data (Grid) */}
          {!isLoading && !isError && hasResults && (
            <CollectionsGrid
              collections={(filteredCollections ?? []).map((c) => ({
                id: c._id,
                name: c.name,
                requestCount: c.requestCount,
                lastUsed: new Date(c.updatedAt).toLocaleDateString(),
                env: c.env,
                envColor: ENV_COLORS[c.env],
              }))}
            />
          )}
        </div>
      </div>

      <NewCollectionModal
        open={isNewCollectionModalOpen}
        onClose={() => setIsNewCollectionModalOpen(false)}
      />

      <QuickRequestModal
        open={isQuickRequestModalOpen}
        onClose={() => setIsQuickRequestModalOpen(false)}
      />
    </div>
  );
}

const ENV_COLORS: Record<string, string> = {
  Local:
    "text-neutral-text-secondary bg-neutral-surface-2 border-neutral-border",
  Development: "text-brand-accent bg-brand-accent/10 border-brand-accent/20",
  Production: "text-success bg-success-bg border-success/20",
};
