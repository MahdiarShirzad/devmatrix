import { useMemo } from "react";
import { DebugSession } from "@/types/aiDebug.types";

export interface DayActivity {
  key: string; // yyyy-mm-dd
  label: string; // e.g. "Mon"
  fullLabel: string; // e.g. "Mon, Aug 11"
  count: number;
}

export interface LanguageSlice {
  language: string;
  count: number;
  percent: number;
}

export interface DebugAnalytics {
  totalSessions: number;
  resolvedSessions: number;
  inProgressSessions: number;
  failedSessions: number;
  resolutionRate: number; // 0-100, based on total sessions that have a terminal-or-active outcome
  activityByDay: DayActivity[];
  languageBreakdown: LanguageSlice[];
  attentionSessions: DebugSession[];
  languages: string[];
  projectIds: string[];
}

const DAY_LABEL = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const FULL_DAY_LABEL = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function useDebugAnalytics(
  sessions: DebugSession[] | undefined,
): DebugAnalytics {
  return useMemo(() => {
    const list = sessions ?? [];

    const totalSessions = list.length;
    const resolvedSessions = list.filter(
      (s) => s.status === "resolved",
    ).length;
    const inProgressSessions = list.filter(
      (s) => s.status === "in_progress",
    ).length;
    const failedSessions = list.filter((s) => s.status === "failed").length;

    const resolutionRate =
      totalSessions > 0
        ? Math.round((resolvedSessions / totalSessions) * 100)
        : 0;

    // Build last 7 days (including today), oldest -> newest
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days: DayActivity[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      days.push({
        key: dayKey(d),
        label: DAY_LABEL.format(d),
        fullLabel: FULL_DAY_LABEL.format(d),
        count: 0,
      });
    }
    const dayIndex = new Map(days.map((d, i) => [d.key, i]));
    for (const session of list) {
      if (!session.createdAt) continue;
      const created = new Date(session.createdAt);
      if (Number.isNaN(created.getTime())) continue;
      const key = dayKey(
        new Date(created.getFullYear(), created.getMonth(), created.getDate()),
      );
      const idx = dayIndex.get(key);
      if (idx !== undefined) {
        days[idx].count += 1;
      }
    }

    // Language breakdown
    const langCounts = new Map<string, number>();
    for (const session of list) {
      const lang = session.language || "Unknown";
      langCounts.set(lang, (langCounts.get(lang) ?? 0) + 1);
    }
    const languageBreakdown: LanguageSlice[] = Array.from(
      langCounts.entries(),
    )
      .map(([language, count]) => ({
        language,
        count,
        percent: totalSessions > 0 ? Math.round((count / totalSessions) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Attention: failed + in_progress, most recent first (list is already
    // sorted desc by createdAt from the backend, so preserve that order)
    const attentionSessions = list.filter(
      (s) => s.status === "failed" || s.status === "in_progress",
    );

    const languages = Array.from(langCounts.keys()).sort();
    const projectIds = Array.from(
      new Set(list.map((s) => s.projectId).filter((p): p is string => !!p)),
    ).sort();

    return {
      totalSessions,
      resolvedSessions,
      inProgressSessions,
      failedSessions,
      resolutionRate,
      activityByDay: days,
      languageBreakdown,
      attentionSessions,
      languages,
      projectIds,
    };
  }, [sessions]);
}
