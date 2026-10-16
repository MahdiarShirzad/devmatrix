"use client";

import type { ReactNode } from "react";

interface DashboardHeaderProps {
  name: string;
  children?: ReactNode;
}

export function DashboardHeader({ name, children }: DashboardHeaderProps) {
  const greeting = getGreeting();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-neutral-text-primary)]">
          {greeting}, {name}
        </h1>
        <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]/70">
          Here&apos;s what&apos;s happening across your development workspace.
        </p>
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
