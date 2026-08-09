"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { PlaygroundEnv } from "@/types/playground.types";
import { useCreateCollection } from "@/hooks/usePlayground";

interface NewCollectionModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NewCollectionModal({
  open,
  onClose,
}: NewCollectionModalProps) {
  const [name, setName] = useState("");
  const [env, setEnv] = useState<PlaygroundEnv>("Local");
  const createCollection = useCreateCollection();

  if (!open) return null;

  const handleCreate = () => {
    if (!name.trim()) return;

    createCollection.mutate(
      { name, env },
      {
        onSuccess: () => {
          setName("");
          setEnv("Local");
          onClose();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-xl border border-neutral-border bg-neutral-surface-1 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-text-primary">
            Create New Collection
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-text-secondary hover:text-neutral-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-text-primary mb-1.5">
              Collection Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Authentication API"
              className="w-full rounded-lg border border-neutral-border bg-neutral-surface-2 px-3 py-2.5 text-sm text-neutral-text-primary focus:border-brand-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-text-primary mb-1.5">
              Environment
            </label>
            <select
              value={env}
              onChange={(e) => setEnv(e.target.value as PlaygroundEnv)}
              className="w-full rounded-lg border border-neutral-border bg-neutral-surface-2 px-3 py-2.5 text-sm text-neutral-text-primary focus:border-brand-primary focus:outline-none appearance-none"
            >
              <option>Local</option>
              <option>Development</option>
              <option>Production</option>
            </select>
          </div>

          {createCollection.isError && (
            <p className="text-sm text-error">
              Couldn&apos;t create the collection. Try again.
            </p>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-text-secondary hover:bg-neutral-surface-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!name.trim() || createCollection.isPending}
            className="rounded-lg bg-brand-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-md disabled:opacity-50"
          >
            {createCollection.isPending ? "Creating..." : "Create Collection"}
          </button>
        </div>
      </div>
    </div>
  );
}
