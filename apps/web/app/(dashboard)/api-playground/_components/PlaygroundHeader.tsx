"use client";

import { Zap, Plus } from "lucide-react";

interface PlaygroundHeaderProps {
  onQuickRequestClick: () => void;
  onNewCollectionClick: () => void;
}

export default function PlaygroundHeader({
  onQuickRequestClick,
  onNewCollectionClick,
}: PlaygroundHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-neutral-border pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
          API Playground
        </h1>
        <p className="mt-1.5 text-sm text-neutral-text-secondary">
          Manage your workspaces, collections, and HTTP requests.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onQuickRequestClick}
          className="group flex items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-1 px-4 py-2 text-sm font-medium text-neutral-text-primary transition-all hover:border-brand-primary/50 hover:bg-neutral-surface-2"
        >
          <Zap
            size={16}
            className="text-brand-highlight group-hover:animate-pulse"
          />
          Quick Request
        </button>
        <button
          type="button"
          onClick={onNewCollectionClick}
          className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-neutral-bg active:scale-95"
        >
          <Plus size={16} />
          New Collection
        </button>
      </div>
    </div>
  );
}
