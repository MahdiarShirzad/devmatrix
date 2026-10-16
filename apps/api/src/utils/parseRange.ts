/**
 * Resolves a dashboard time range from query params.
 *
 * Precedence:
 *   1. Explicit `from`/`to` ISO dates (custom range) when both parse and
 *      from <= to.
 *   2. `days=N` (presets). `days=all` is treated as a 3650-day window for
 *      analytics endpoints, because an unbounded daily series is neither
 *      useful nor safe to return — KPIs remain effectively all-time.
 *
 * All boundaries are computed in UTC so day bucketing is stable regardless
 * of the server's local timezone.
 */
export type RangeInterval = "day" | "week" | "month";

export interface ResolvedRange {
  start: Date;
  end: Date;
  days: number;
  interval: RangeInterval;
}

const MAX_DAYS = 3650;

const startOfUtcDay = (d: Date): Date =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

const endOfUtcDay = (d: Date): Date =>
  new Date(
    Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      23,
      59,
      59,
      999,
    ),
  );

const parseDate = (value: unknown): Date | null => {
  if (typeof value !== "string" || value.trim() === "") return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const defaultIntervalForDays = (days: number): RangeInterval => {
  if (days > 180) return "month";
  if (days > 60) return "week";
  return "day";
};

export const parseInterval = (value: unknown): RangeInterval | null => {
  return value === "day" || value === "week" || value === "month"
    ? value
    : null;
};

export const parseRange = (
  query: Record<string, unknown>,
  fallbackDays = 30,
): ResolvedRange => {
  const from = parseDate(query.from);
  const to = parseDate(query.to);

  if (from && to && from.getTime() <= to.getTime()) {
    const start = startOfUtcDay(from);
    const end = endOfUtcDay(to);
    const days = Math.min(
      Math.max(
        Math.round((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)),
        1,
      ),
      MAX_DAYS,
    );
    return { start, end, days, interval: defaultIntervalForDays(days) };
  }

  const raw = query.days;
  const isAllTime = raw === "all";
  const requested = isAllTime
    ? MAX_DAYS
    : Math.min(Math.max(Number(raw) || fallbackDays, 1), MAX_DAYS);

  const end = endOfUtcDay(new Date());
  const start = startOfUtcDay(new Date());
  start.setUTCDate(start.getUTCDate() - (requested - 1));

  return {
    start,
    end,
    days: requested,
    interval: defaultIntervalForDays(requested),
  };
};

/**
 * The immediately preceding window of equal length, for period-over-period
 * comparisons.
 */
export const previousRange = (
  range: ResolvedRange,
): { start: Date; end: Date } => {
  const spanMs = range.end.getTime() - range.start.getTime();
  const end = new Date(range.start.getTime() - 1);
  const start = new Date(end.getTime() - spanMs);
  return { start, end };
};

export const changePercent = (current: number, previous: number): number => {
  if (previous > 0) {
    return Math.round(((current - previous) / previous) * 100);
  }
  return current > 0 ? 100 : 0;
};
