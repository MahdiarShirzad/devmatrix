import { useCallback, useSyncExternalStore } from "react";
import {
  useDashboardActivity,
  type DashboardActivityItem,
} from "@/hooks/useDashboardActivity";

const STORAGE_KEY = "devmatrix:notifications:lastReadAt";

const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

function readLastReadAt(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? Number(raw) : 0;
    return Number.isFinite(parsed) ? parsed : 0;
  } catch {
    return 0;
  }
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);

  // The `storage` event only fires in *other* tabs; markAllRead emits
  // locally so the current tab updates immediately too.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * Backs the topbar notification bell.
 *
 * Notifications are the real, merged activity feed
 * (GET /dashboard/activity — commits, AI debugging, ideas). "Unread" is
 * tracked client-side against a localStorage timestamp, exposed as an
 * external store so the badge stays in sync across components and tabs
 * without inventing server state.
 */
export function useNotifications(days = "7", limit = 15) {
  const query = useDashboardActivity(days, limit);
  const lastReadAt = useSyncExternalStore(
    subscribe,
    readLastReadAt,
    () => 0,
  );

  const items: DashboardActivityItem[] = query.data?.activity ?? [];

  const unreadCount = items.filter(
    (item) => new Date(item.createdAt).getTime() > lastReadAt,
  ).length;

  const markAllRead = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // Ignore storage failures (private mode, quota) — badge just stays.
    }
    emit();
  }, []);

  const isUnread = useCallback(
    (item: DashboardActivityItem) =>
      new Date(item.createdAt).getTime() > lastReadAt,
    [lastReadAt],
  );

  return {
    items,
    unreadCount,
    isUnread,
    markAllRead,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
