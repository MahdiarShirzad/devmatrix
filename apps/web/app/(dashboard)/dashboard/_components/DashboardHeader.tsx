"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export const TIME_RANGES = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 90 days", value: "90" },
] as const;

export type TimeRangeValue = (typeof TIME_RANGES)[number]["value"];

interface DashboardHeaderProps {
  name: string;
  range: TimeRangeValue;
  onRangeChange: (value: TimeRangeValue) => void;
}

export function DashboardHeader({
  name,
  range,
  onRangeChange,
}: DashboardHeaderProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const greeting = getGreeting();
  const current = TIME_RANGES.find((r) => r.value === range) ?? TIME_RANGES[0];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          {greeting}, {name}
        </h1>
        <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]/70">
          Here&apos;s what&apos;s happening across your development workspace.
        </p>
      </div>

      <div className="relative shrink-0" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] px-3 py-2 text-sm text-white transition-colors hover:border-[var(--color-neutral-text-secondary)]/30"
        >
          {current.label}
          <ChevronDown className="h-3.5 w-3.5 text-[var(--color-neutral-text-secondary)]/60" />
        </button>
        {open && (
          <div className="absolute right-0 z-20 mt-1.5 w-40 overflow-hidden rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] shadow-lg">
            {TIME_RANGES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => {
                  onRangeChange(r.value);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--color-neutral-surface-2)] ${
                  r.value === range
                    ? "text-[var(--color-brand-primary)]"
                    : "text-[var(--color-neutral-text-secondary)]"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
