"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Trash2, Loader2 } from "lucide-react";
import { useDeleteSession } from "@/hooks/useAiDebug";

interface SessionActionsMenuProps {
  sessionId: string;
}

export default function SessionActionsMenu({
  sessionId,
}: SessionActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const deleteSession = useDeleteSession();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setConfirming(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
    setConfirming(false);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirming) {
      setConfirming(true);
      return;
    }
    deleteSession.mutate(sessionId, {
      onSuccess: () => {
        setIsOpen(false);
        setConfirming(false);
      },
    });
  };

  return (
    <div ref={containerRef} className="relative z-10 hidden sm:block">
      <button
        onClick={handleToggle}
        className="rounded-md p-1.5 text-neutral-text-secondary opacity-0 transition-all hover:bg-neutral-surface-2 hover:text-neutral-text-primary group-hover:opacity-100"
        aria-label="Session actions"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-40 overflow-hidden rounded-lg border border-neutral-border bg-neutral-surface-1 shadow-xl">
          <button
            onClick={handleDeleteClick}
            disabled={deleteSession.isPending}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs text-error transition-colors hover:bg-error/10 disabled:opacity-60"
          >
            {deleteSession.isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            {confirming ? "Confirm delete" : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}
