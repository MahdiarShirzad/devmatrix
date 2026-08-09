"use client";

import { AlertTriangle, X } from "lucide-react";

interface DeleteRequestDialogProps {
  open: boolean;
  requestName: string;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

export default function DeleteRequestDialog({
  open,
  requestName,
  onClose,
  onConfirm,
  isPending,
}: DeleteRequestDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-xl border border-neutral-border bg-neutral-surface-1 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-error">
            <AlertTriangle size={18} />
            <h2 className="text-lg font-semibold">Delete Request</h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-text-secondary hover:text-neutral-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-neutral-text-secondary">
          Are you sure you want to delete{" "}
          <span className="font-medium text-neutral-text-primary">
            {requestName}
          </span>
          ? This can&apos;t be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-text-secondary hover:bg-neutral-surface-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="rounded-lg bg-error px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-md disabled:opacity-50"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
