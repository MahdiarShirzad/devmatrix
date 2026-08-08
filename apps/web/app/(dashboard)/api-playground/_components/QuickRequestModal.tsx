"use client";

import { X, Zap } from "lucide-react";

interface QuickRequestModalProps {
  open: boolean;
  onClose: () => void;
}

export default function QuickRequestModal({
  open,
  onClose,
}: QuickRequestModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-xl border border-neutral-border bg-neutral-surface-1 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-text-primary flex items-center gap-2">
            <Zap size={18} className="text-brand-highlight" />
            Quick Request
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-text-secondary hover:text-neutral-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-neutral-text-secondary mb-4">
          Test an endpoint quickly without saving it to a collection.
        </p>

        <div className="flex items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-2 p-1">
          <select className="appearance-none rounded-md bg-transparent py-2 pl-3 pr-6 text-sm font-bold text-success focus:outline-none cursor-pointer hover:bg-neutral-surface-1 transition-colors">
            <option className="text-success">GET</option>
            <option className="text-brand-accent">POST</option>
            <option className="text-warning">PUT</option>
            <option className="text-error">DELETE</option>
          </select>
          <div className="h-6 w-px bg-neutral-border"></div>
          <input
            type="text"
            placeholder="https://api.example.com/v1/..."
            className="flex-1 bg-transparent px-3 py-2 text-sm font-mono text-neutral-text-primary focus:outline-none placeholder:font-sans placeholder:text-neutral-text-secondary/50"
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-text-secondary hover:bg-neutral-surface-2 transition-colors"
          >
            Cancel
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-md">
            Open in Playground
          </button>
        </div>
      </div>
    </div>
  );
}
