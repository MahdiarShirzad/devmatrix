import { describe, expect, it } from "vitest";
import {
  changePercent,
  parseRange,
  previousRange,
} from "./parseRange.js";
import { bucketKey, enumerateBuckets, rollupDaily, toDayKey } from "./timeBuckets.js";

describe("parseRange", () => {
  it("defaults to the fallback window when nothing is provided", () => {
    const range = parseRange({}, 30);
    expect(range.days).toBe(30);
    expect(range.interval).toBe("day");
    expect(range.end.getTime()).toBeGreaterThan(range.start.getTime());
  });

  it("derives the bucket interval from the window length", () => {
    expect(parseRange({ days: "30" }).interval).toBe("day");
    expect(parseRange({ days: "90" }).interval).toBe("week");
    expect(parseRange({ days: "365" }).interval).toBe("month");
  });

  it("prefers an explicit from/to range and computes its length", () => {
    const range = parseRange({ from: "2025-01-01", to: "2025-01-10", days: "7" });
    expect(toDayKey(range.start)).toBe("2025-01-01");
    expect(toDayKey(range.end)).toBe("2025-01-10");
    expect(range.days).toBe(10);
    expect(range.interval).toBe("day");
  });

  it("falls back to days when the custom range is invalid", () => {
    const range = parseRange({ from: "not-a-date", to: "2025-01-10", days: "7" });
    expect(range.days).toBe(7);
  });

  it("clamps absurd day counts", () => {
    expect(parseRange({ days: "99999" }).days).toBe(3650);
    expect(parseRange({ days: "-5" }, 30).days).toBe(1);
    // "0" is falsy, so it falls back to the default window.
    expect(parseRange({ days: "0" }, 30).days).toBe(30);
  });
});

describe("previousRange", () => {
  it("returns the adjacent equal-length window", () => {
    const range = parseRange({ days: "10" });
    const prev = previousRange(range);
    expect(prev.end.getTime()).toBe(range.start.getTime() - 1);
    const span = range.end.getTime() - range.start.getTime();
    expect(prev.end.getTime() - prev.start.getTime()).toBe(span);
  });
});

describe("changePercent", () => {
  it("handles growth, decline and zero baselines", () => {
    expect(changePercent(10, 5)).toBe(100);
    expect(changePercent(5, 10)).toBe(-50);
    expect(changePercent(0, 0)).toBe(0);
    expect(changePercent(3, 0)).toBe(100);
  });
});

describe("time bucketing", () => {
  it("enumerates continuous buckets without gaps", () => {
    const start = new Date("2025-01-01T00:00:00.000Z");
    const end = new Date("2025-01-10T23:59:59.999Z");
    const buckets = enumerateBuckets(start, end, "day");
    expect(buckets).toHaveLength(10);
    expect(toDayKey(buckets[0])).toBe("2025-01-01");
    expect(toDayKey(buckets[9])).toBe("2025-01-10");
  });

  it("rolls daily counts up into weekly buckets", () => {
    const daily = new Map<string, number>([
      ["2025-01-06", 1],
      ["2025-01-07", 2],
      ["2025-01-13", 3],
    ]);
    const buckets = enumerateBuckets(
      new Date("2025-01-06T00:00:00.000Z"),
      new Date("2025-01-19T00:00:00.000Z"),
      "week",
    );
    const rolled = rollupDaily(daily, buckets, "week");
    expect(rolled[0]).toBe(3); // week of Jan 6
    expect(rolled[1]).toBe(3); // week of Jan 13
  });

  it("assigns days to the correct month bucket", () => {
    expect(bucketKey(new Date("2025-03-17T12:00:00.000Z"), "month")).toBe(
      "2025-03-01",
    );
  });
});
