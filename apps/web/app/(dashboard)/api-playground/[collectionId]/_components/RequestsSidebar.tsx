"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { METHOD_COLORS } from "./constants";
import type { SavedRequest } from "@/types/playground.types";

interface RequestsSidebarProps {
  collectionName: string;
  requests: SavedRequest[];
  activeRequestId: string | null;
  onSelectRequest: (id: string) => void;
  onAddRequest: () => void;
  onRenameRequest: (request: SavedRequest) => void;
  onDeleteRequest: (request: SavedRequest) => void;
}

export default function RequestsSidebar({
  collectionName,
  requests,
  activeRequestId,
  onSelectRequest,
  onAddRequest,
  onRenameRequest,
  onDeleteRequest,
}: RequestsSidebarProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu on outside click
  useEffect(() => {
    if (!openMenuId) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  return (
    <div className="flex w-64 shrink-0 flex-col overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-border bg-neutral-surface-2/50 px-4 py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-text-primary">
          {collectionName}
        </span>
        <button
          type="button"
          onClick={onAddRequest}
          className="rounded p-1 text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {requests.length === 0 && (
          <p className="px-2 py-4 text-center text-xs text-neutral-text-secondary">
            No requests yet — add one to get started.
          </p>
        )}

        {requests.map((req) => (
          <div key={req._id} className="group relative">
            <button
              type="button"
              onClick={() => onSelectRequest(req._id)}
              className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
                activeRequestId === req._id
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

              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === req._id ? null : req._id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === req._id ? null : req._id);
                  }
                }}
                className={`shrink-0 rounded p-1 text-neutral-text-secondary opacity-0 transition-opacity hover:bg-neutral-surface-1 hover:text-neutral-text-primary group-hover:opacity-100 ${
                  activeRequestId === req._id ? "opacity-60" : ""
                } ${openMenuId === req._id ? "!opacity-100" : ""}`}
              >
                <MoreVertical size={14} />
              </span>
            </button>

            {openMenuId === req._id && (
              <div
                ref={menuRef}
                className="absolute right-2 top-full z-10 mt-1 w-36 overflow-hidden rounded-lg border border-neutral-border bg-neutral-surface-1 shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenuId(null);
                    onRenameRequest(req);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-neutral-text-primary transition-colors hover:bg-neutral-surface-2"
                >
                  <Pencil size={14} />
                  Rename
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenuId(null);
                    onDeleteRequest(req);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-error transition-colors hover:bg-error/10"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
