import type { RangeInterval } from "./parseRange.js";

/**
 * UTC-based day bucketing helpers.
 *
 * Everything here works in UTC so a commit at 23:30 local time cannot land
 * in a different day bucket depending on where the API happens to run.
 */

export const toDayKey = (date: Date): string =>
  date.toISOString().slice(0, 10);

const startOfUtcDay = (date: Date): Date =>
  new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );

const startOfUtcWeek = (date: Date): Date => {
  const d = startOfUtcDay(date);
  const day = d.getUTCDay(); // 0 = Sunday
  const diff = (day + 6) % 7; // Monday = 0
  d.setUTCDate(d.getUTCDate() - diff);
  return d;
};

const startOfUtcMonth = (date: Date): Date =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));

export const bucketStart = (date: Date, interval: RangeInterval): Date => {
  switch (interval) {
    case "week":
      return startOfUtcWeek(date);
    case "month":
      return startOfUtcMonth(date);
    default:
      return startOfUtcDay(date);
  }
};

export const bucketKey = (date: Date, interval: RangeInterval): string =>
  toDayKey(bucketStart(date, interval));

/**
 * Returns every bucket start from `start` through `end` (inclusive) for the
 * given interval, so charts render a continuous timeline with gaps as zero
 * rather than jumping between non-adjacent dates.
 */
export const enumerateBuckets = (
  start: Date,
  end: Date,
  interval: RangeInterval,
): Date[] => {
  const buckets: Date[] = [];
  const cursor = bucketStart(start, interval);
  const last = bucketStart(end, interval);

  const advance = (d: Date): void => {
    if (interval === "month") {
      d.setUTCMonth(d.getUTCMonth() + 1);
    } else if (interval === "week") {
      d.setUTCDate(d.getUTCDate() + 7);
    } else {
      d.setUTCDate(d.getUTCDate() + 1);
    }
  };

  // Guard against pathological ranges (MAX_DAYS caps this at ~10 years).
  let guard = 0;
  while (cursor.getTime() <= last.getTime() && guard < 4000) {
    buckets.push(new Date(cursor));
    advance(cursor);
    guard += 1;
  }

  return buckets;
};

/**
 * Rolls a `YYYY-MM-DD -> count` daily map up into interval buckets.
 */
export const rollupDaily = (
  dailyMap: Map<string, number>,
  buckets: Date[],
  interval: RangeInterval,
): number[] =>
  buckets.map((bucket) => {
    const key = bucketKey(bucket, interval);
    if (interval === "day") return dailyMap.get(key) ?? 0;

    // Sum every day that belongs to this week/month bucket.
    let sum = 0;
    for (const [dayKey, count] of dailyMap) {
      if (bucketKey(new Date(`${dayKey}T00:00:00.000Z`), interval) === key) {
        sum += count;
      }
    }
    return sum;
  });
