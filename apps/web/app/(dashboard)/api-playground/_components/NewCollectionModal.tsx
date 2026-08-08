"use client";

import { X } from "lucide-react";

interface NewCollectionModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NewCollectionModal({
  open,
  onClose,
}: NewCollectionModalProps) {
  if (!open) return null;

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
              placeholder="e.g. Authentication API"
              className="w-full rounded-lg border border-neutral-border bg-neutral-surface-2 px-3 py-2.5 text-sm text-neutral-text-primary focus:border-brand-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-text-primary mb-1.5">
              Environment
            </label>
            <select className="w-full rounded-lg border border-neutral-border bg-neutral-surface-2 px-3 py-2.5 text-sm text-neutral-text-primary focus:border-brand-primary focus:outline-none appearance-none">
              <option>Local</option>
              <option>Development</option>
              <option>Production</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-text-secondary hover:bg-neutral-surface-2 transition-colors"
          >
            Cancel
          </button>
          <button className="rounded-lg bg-brand-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-md">
            Create Collection
          </button>
        </div>
      </div>
    </div>
  );
}
