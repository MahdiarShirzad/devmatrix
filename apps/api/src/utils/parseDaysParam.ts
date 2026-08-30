/**
 * Shared by any controller that accepts a ?days= query param for
 * time-range filtering (github-projects, ai-debug, ideas, dashboard).
 *
 * "all" skips the lower bound entirely (all-time mode). Any other value
 * is clamped to [1, 3650] days and used to compute a rangeStart Date.
 */
export const parseDaysParam = (
  rawDays: unknown,
): { isAllTime: boolean; rangeStart: Date | null; days: number | null } => {
  if (rawDays === "all") {
    return { isAllTime: true, rangeStart: null, days: null };
  }

  const days = Math.min(Math.max(Number(rawDays) || 7, 1), 3650);
  const rangeStart = new Date();
  rangeStart.setDate(rangeStart.getDate() - days);

  return { isAllTime: false, rangeStart, days };
};
