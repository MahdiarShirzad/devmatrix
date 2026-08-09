"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface RenameRequestModalProps {
  open: boolean;
  initialName: string;
  onClose: () => void;
  onRename: (name: string) => void;
  isPending: boolean;
  isError: boolean;
}

export default function RenameRequestModal({
  open,
  initialName,
  onClose,
  onRename,
  isPending,
  isError,
}: RenameRequestModalProps) {
  const [name, setName] = useState(initialName);

  // Reset the field whenever a different request is opened for renaming
  useEffect(() => {
    if (open) setName(initialName);
  }, [open, initialName]);

  if (!open) return null;

  const handleRename = () => {
    if (!name.trim()) return;
    onRename(name.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-xl border border-neutral-border bg-neutral-surface-1 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-text-primary">
            Rename Request
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-text-secondary hover:text-neutral-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRename()}
          autoFocus
          className="w-full rounded-lg border border-neutral-border bg-neutral-surface-2 px-3 py-2.5 text-sm text-neutral-text-primary focus:border-brand-primary focus:outline-none"
        />

        {isError && (
          <p className="mt-3 text-sm text-error">
            Couldn&apos;t rename the request. Try again.
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-text-secondary hover:bg-neutral-surface-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleRename}
            disabled={!name.trim() || isPending}
            className="rounded-lg bg-brand-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-md disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Rename"}
          </button>
        </div>
      </div>
    </div>
  );
}
