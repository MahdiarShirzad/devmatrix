"use client";

import { useState } from "react";
import PlaygroundHeader from "./_components/PlaygroundHeader";
import CollectionSearchToolbar from "./_components/CollectionSearchToolbar";
import CollectionsGrid from "./_components/CollectionsGrid";
import NewCollectionModal from "./_components/NewCollectionModal";
import QuickRequestModal from "./_components/QuickRequestModal";
import { useCollections } from "@/hooks/usePlayground";

export default function ApiPlaygroundPage() {
  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] =
    useState(false);
  const [isQuickRequestModalOpen, setIsQuickRequestModalOpen] = useState(false);

  const { data: collections, isLoading, isError } = useCollections();

  return (
    <div className="flex h-full flex-col">
      <PlaygroundHeader
        onQuickRequestClick={() => setIsQuickRequestModalOpen(true)}
        onNewCollectionClick={() => setIsNewCollectionModalOpen(true)}
      />

      <CollectionSearchToolbar collectionCount={collections?.length ?? 0} />

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {/* 1. Loading State */}
        {isLoading && (
          <div className="flex flex-1 flex-col items-center justify-center py-16">
            <div className="relative mb-4 h-12 w-12">
              <div className="absolute inset-0 rounded-full border-4 border-neutral-surface-2"></div>
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-brand-accent border-t-transparent"></div>
            </div>
            <p className="animate-pulse text-sm font-medium text-neutral-text-secondary">
              Loading collections...
            </p>
          </div>
        )}

        {/* 2. Error State */}
        {isError && (
          <div className="flex flex-1 flex-col items-center justify-center py-16">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-error/10">
              <svg
                className="h-8 w-8 text-error"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-error">
              Couldn&apos;t load collections
            </h3>
            <p className="mb-6 text-sm text-neutral-text-secondary">
              Something went wrong. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg border border-neutral-border px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-surface-2"
            >
              Refresh Page
            </button>
          </div>
        )}

        {/* 3. Empty State */}
        {collections && collections.length === 0 && (
          <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-border bg-neutral-surface-2/30 py-20 px-4 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-surface-2">
              <svg
                className="h-8 w-8 text-neutral-text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium">No collections yet</h3>
            <p className="mb-8 max-w-sm text-sm text-neutral-text-secondary">
              Create your first collection to start organizing and managing your
              API requests.
            </p>
            <button
              onClick={() => setIsNewCollectionModalOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Collection
            </button>
          </div>
        )}

        {/* 4. Loaded Data (Grid) */}
        {collections && collections.length > 0 && (
          <CollectionsGrid
            collections={collections.map((c) => ({
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
