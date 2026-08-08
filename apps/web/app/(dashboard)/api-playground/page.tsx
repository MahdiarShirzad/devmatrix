"use client";

import { useState } from "react";
import PlaygroundHeader from "./_components/PlaygroundHeader";
import CollectionSearchToolbar from "./_components/CollectionSearchToolbar";
import CollectionsGrid from "./_components/CollectionsGrid";
import NewCollectionModal from "./_components/NewCollectionModal";
import QuickRequestModal from "./_components/QuickRequestModal";
import { Collection } from "./_components/CollectionCard";

const COLLECTIONS: Collection[] = [
  {
    id: "coll_1",
    name: "devmatrix-core",
    requestCount: 32,
    lastUsed: "Just now",
    env: "Local",
    envColor:
      "text-neutral-text-secondary bg-neutral-surface-2 border-neutral-border",
  },
  {
    id: "coll_2",
    name: "my-trip-full",
    requestCount: 18,
    lastUsed: "2h ago",
    env: "Development",
    envColor: "text-brand-accent bg-brand-accent/10 border-brand-accent/20",
  },
  {
    id: "coll_3",
    name: "deep-coding-backend",
    requestCount: 45,
    lastUsed: "1d ago",
    env: "Production",
    envColor: "text-success bg-success-bg border-success/20",
  },
];

export default function ApiPlaygroundPage() {
  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] =
    useState(false);
  const [isQuickRequestModalOpen, setIsQuickRequestModalOpen] =
    useState(false);

  return (
    <div className="flex h-full flex-col">
      <PlaygroundHeader
        onQuickRequestClick={() => setIsQuickRequestModalOpen(true)}
        onNewCollectionClick={() => setIsNewCollectionModalOpen(true)}
      />

      <CollectionSearchToolbar collectionCount={COLLECTIONS.length} />

      <CollectionsGrid collections={COLLECTIONS} />

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
