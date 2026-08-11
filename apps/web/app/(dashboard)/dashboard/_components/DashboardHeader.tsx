"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const RANGE_OPTIONS = ["Last 7 days", "Last 30 days", "Last 90 days"];

export default function DashboardHeader() {
  const [range, setRange] = useState(RANGE_OPTIONS[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-neutral-text-primary sm:text-2xl">
          Good morning, Mahdiar
        </h1>
        <p className="mt-1 text-sm text-neutral-text-secondary">
          Here&apos;s what&apos;s happening across your development workspace.
        </p>
      </div>

      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 rounded-md border border-neutral-border bg-neutral-surface-1 px-3 py-1.5 text-sm text-neutral-text-primary transition-colors hover:bg-neutral-surface-2"
        >
          {range}
          <ChevronDown size={14} className="text-neutral-text-secondary" />
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            />
            <div className="absolute right-0 z-20 mt-1.5 w-40 overflow-hidden rounded-md border border-neutral-border bg-neutral-surface-1 shadow-lg shadow-black/40">
              {RANGE_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setRange(option);
                    setOpen(false);
                  }}
                  className={`block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-neutral-surface-2 ${
                    option === range
                      ? "text-neutral-text-primary"
                      : "text-neutral-text-secondary"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
