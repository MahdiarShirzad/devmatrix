"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit2, Copy, Trash2 } from "lucide-react";

interface CollectionMenuProps {
  collectionId: string;
}

export default function CollectionMenu({ collectionId }: CollectionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleRename = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Handle rename for collectionId
    setIsOpen(false);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Handle duplicate for collectionId
    setIsOpen(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Handle delete for collectionId
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative z-10 shrink-0">
      <button
        onClick={handleToggle}
        className="rounded-md p-1 text-neutral-text-secondary/60 opacity-0 transition-colors group-hover:opacity-100 hover:bg-neutral-surface-2 hover:text-neutral-text-primary focus:opacity-100"
        aria-label="Collection actions"
      >
        <MoreVertical size={15} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-lg border border-neutral-border bg-neutral-surface-1 shadow-xl animate-in fade-in zoom-in-95 duration-100">
          <button
            onClick={handleRename}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs text-neutral-text-primary transition-colors hover:bg-neutral-surface-2"
          >
            <Edit2 size={13} /> Rename
          </button>
          <button
            onClick={handleDuplicate}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs text-neutral-text-primary transition-colors hover:bg-neutral-surface-2"
          >
            <Copy size={13} /> Duplicate
          </button>
          <div className="h-px bg-neutral-border" />
          <button
            onClick={handleDelete}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs text-error transition-colors hover:bg-error/10"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
