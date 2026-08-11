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
    <div className="mb-6 flex flex-col gap-4 border-b border-neutral-border pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-neutral-text-primary">
          API Playground
        </h1>
        <p className="mt-1 text-sm text-neutral-text-secondary">
          Manage your workspaces, collections, and HTTP requests.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onQuickRequestClick}
          className="group flex items-center gap-2 rounded-lg border border-brand-primary/30 bg-brand-primary/10 px-3.5 py-2 text-sm font-medium text-brand-primary transition-colors hover:border-brand-primary/50 hover:bg-brand-primary/15"
        >
          <Zap size={15} className="fill-brand-primary/20" />
          Quick Request
        </button>
        <button
          type="button"
          onClick={onNewCollectionClick}
          className="flex items-center gap-2 rounded-lg bg-brand-primary px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:ring-offset-2 focus:ring-offset-neutral-bg active:scale-[0.98]"
        >
          <Plus size={15} />
          New Collection
        </button>
      </div>
    </div>
  );
}
