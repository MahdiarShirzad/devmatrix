"use client";

import { Plus, MoreVertical } from "lucide-react";
import { REQUESTS, METHOD_COLORS } from "./constants";

interface RequestsSidebarProps {
  activeRequest: string;
  onSelectRequest: (id: string) => void;
}

export default function RequestsSidebar({
  activeRequest,
  onSelectRequest,
}: RequestsSidebarProps) {
  return (
    <div className="flex w-64 shrink-0 flex-col overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-border bg-neutral-surface-2/50 px-4 py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-text-primary">
          my-trip API
        </span>
        <button
          type="button"
          className="rounded p-1 text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {REQUESTS.map((req) => (
          <button
            key={req.id}
            type="button"
            onClick={() => onSelectRequest(req.id)}
            className={`group flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
              activeRequest === req.id
                ? "bg-brand-primary/10 text-neutral-text-primary"
                : "text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
            }`}
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span
                className={`w-10 shrink-0 text-[10px] font-bold tracking-wide ${METHOD_COLORS[req.method]}`}
              >
                {req.method}
              </span>
              <span className="truncate text-sm font-medium">{req.name}</span>
            </div>
            {activeRequest === req.id && (
              <MoreVertical
                size={14}
                className="shrink-0 text-brand-primary opacity-50 transition-opacity hover:opacity-100"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
