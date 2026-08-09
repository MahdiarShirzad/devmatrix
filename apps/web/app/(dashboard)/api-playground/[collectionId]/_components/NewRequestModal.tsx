"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { HttpMethod } from "@/types/playground.types";
import { METHOD_COLORS } from "./constants";

interface NewRequestModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: {
    name: string;
    method: HttpMethod;
    path: string;
  }) => void;
  isPending: boolean;
  isError: boolean;
}

export default function NewRequestModal({
  open,
  onClose,
  onCreate,
  isPending,
  isError,
}: NewRequestModalProps) {
  const [name, setName] = useState("");
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [path, setPath] = useState("");

  if (!open) return null;

  const handleClose = () => {
    setName("");
    setMethod("GET");
    setPath("");
    onClose();
  };

  const handleCreate = () => {
    if (!name.trim() || !path.trim()) return;
    onCreate({ name: name.trim(), method, path: path.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-xl border border-neutral-border bg-neutral-surface-1 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-text-primary">
            New Request
          </h2>
          <button
            onClick={handleClose}
            className="text-neutral-text-secondary hover:text-neutral-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-text-primary mb-1.5">
              Request Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Get User Profile"
              className="w-full rounded-lg border border-neutral-border bg-neutral-surface-2 px-3 py-2.5 text-sm text-neutral-text-primary focus:border-brand-primary focus:outline-none"
            />
          </div>

          <div className="flex gap-2 rounded-lg border border-neutral-border bg-neutral-surface-2 p-1">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as HttpMethod)}
              className={`appearance-none rounded-md bg-transparent py-2 pl-3 pr-6 text-sm font-bold focus:outline-none cursor-pointer hover:bg-neutral-surface-1 transition-colors ${METHOD_COLORS[method]}`}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
            <div className="h-6 w-px bg-neutral-border self-center"></div>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="/users/:id"
              className="flex-1 bg-transparent px-3 py-2 text-sm font-mono text-neutral-text-primary focus:outline-none placeholder:font-sans placeholder:text-neutral-text-secondary/50"
            />
          </div>

          {isError && (
            <p className="text-sm text-error">
              Couldn&apos;t create the request. Try again.
            </p>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-text-secondary hover:bg-neutral-surface-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!name.trim() || !path.trim() || isPending}
            className="rounded-lg bg-brand-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-md disabled:opacity-50"
          >
            {isPending ? "Creating..." : "Create Request"}
          </button>
        </div>
      </div>
    </div>
  );
}
