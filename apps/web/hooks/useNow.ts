"use client";

import { useSyncExternalStore } from "react";

/**
 * Shared clock updated once a minute.
 *
 * Reading `Date.now()` during render is flagged by react-hooks/purity, and
 * setting state from an effect causes cascading renders. A tiny external
 * store keeps the value stable during render while still refreshing it for
 * time-relative UI (e.g. "synced 3 hours ago").
 */
const TICK_MS = 60_000;

let currentTime = Date.now();
let timer: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  if (!timer) {
    timer = setInterval(() => {
      currentTime = Date.now();
      listeners.forEach((l) => l());
    }, TICK_MS);
  }

  // Refresh on subscribe so a newly mounted consumer isn't stuck with the
  // value captured at module load time.
  currentTime = Date.now();

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

const getSnapshot = (): number => currentTime;

export function useNow(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
