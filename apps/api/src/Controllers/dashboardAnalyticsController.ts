import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import GithubProject from "../Models/GithubProject.js";
import Commit from "../Models/Commit.js";
import PullRequest from "../Models/PullRequest.js";
import { DebugSession } from "../Models/DebugSession.js";
import { Idea } from "../Models/Idea.js";
import {
  changePercent,
  parseInterval,
  parseRange,
  previousRange,
} from "../utils/parseRange.js";
import {
  bucketKey,
  enumerateBuckets,
  rollupDaily,
  toDayKey,
} from "../utils/timeBuckets.js";

interface ScopedProject {
  _id: mongoose.Types.ObjectId;
  name: string;
  languages?: Record<string, number>;
  lastSyncedAt?: Date | null;
}

interface Scope {
  projects: ScopedProject[];
  projectIds: mongoose.Types.ObjectId[];
  nameById: Map<string, string>;
  filtered: boolean;
}

/**
 * Normalizes the `projectId` query param, which may arrive as:
 *   - undefined / ""            → whole workspace
 *   - "abc"                     → single project
 *   - "abc,def"                 → comma-separated
 *   - ["abc", "def"]            → repeated query params
 */
const normalizeProjectIds = (raw: unknown): string[] => {
  const values = Array.isArray(raw) ? raw : [raw];
  return values
    .flatMap((v) => (typeof v === "string" ? v.split(",") : []))
    .map((s) => s.trim())
    .filter(Boolean);
};

const resolveScope = async (
  userId: string,
  projectIdParam: unknown,
): Promise<Scope> => {
  const requested = normalizeProjectIds(projectIdParam);

  if (requested.length > 0) {
    const unique = Array.from(new Set(requested));
    if (!unique.every((id) => mongoose.isValidObjectId(id))) {
      throw new AppError("Invalid project id", 400);
    }
    const projects = await GithubProject.find({
      _id: { $in: unique },
      userId,
      isActive: true,
    }).select("_id name languages lastSyncedAt");

    // Reject if any requested project isn't owned by this user, rather than
    // silently dropping it (avoids leaking which ids exist).
    if (projects.length !== unique.length) {
      throw new AppError("Project not found", 404);
    }

    const scoped = projects.map((p) => ({
      _id: p._id as mongoose.Types.ObjectId,
      name: p.name,
      languages: (p.languages as Record<string, number>) ?? {},
      lastSyncedAt: p.lastSyncedAt,
    }));

    return {
      projects: scoped,
      projectIds: scoped.map((p) => p._id),
      nameById: new Map(scoped.map((p) => [String(p._id), p.name])),
      filtered: true,
    };
  }

  const projects = await GithubProject.find({ userId, isActive: true }).select(
    "_id name languages lastSyncedAt",
  );

  const scoped = projects.map((p) => ({
    _id: p._id as mongoose.Types.ObjectId,
    name: p.name,
    languages: (p.languages as Record<string, number>) ?? {},
    lastSyncedAt: p.lastSyncedAt,
  }));

  return {
    projects: scoped,
    projectIds: scoped.map((p) => p._id),
    nameById: new Map(scoped.map((p) => [String(p._id), p.name])),
    filtered: false,
  };
};

const userObjectId = (userId: string): mongoose.Types.ObjectId =>
  new mongoose.Types.ObjectId(userId);

/** daily `YYYY-MM-DD -> count` map from a `{_id, count}` date aggregation. */
const toDailyMap = (
  rows: { _id: string | null; count: number }[],
): Map<string, number> => {
  const map = new Map<string, number>();
  for (const row of rows) {
    if (row._id) map.set(row._id, row.count);
  }
  return map;
};

const sumMap = (map: Map<string, number>): number => {
  let total = 0;
  for (const value of map.values()) total += value;
  return total;
};

// ---------------------------------------------------------------------------
// GET /api/dashboard/analytics
// ---------------------------------------------------------------------------
export const getAnalytics = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).userId;
    const scope = await resolveScope(userId, req.query.projectId);
    const range = parseRange(req.query as Record<string, unknown>, 30);
    const interval =
      parseInterval(req.query.interval) ?? range.interval;
    const prev = previousRange(range);
    const commitDayExpr = {
      $dateToString: { format: "%Y-%m-%d", date: "$committedAt" },
    };
    const prDayExpr = {
      $dateToString: { format: "%Y-%m-%d", date: "$mergedAt" },
    };

    if (scope.projectIds.length === 0) {
      res.status(200).json({
        status: "success",
        empty: true,
        range: {
          start: range.start.toISOString(),
          end: range.end.toISOString(),
          days: range.days,
          interval,
        },
        kpis: null,
        activitySeries: [],
        projectBreakdown: [],
        languages: [],
        heatmap: [],
      });
      return;
    }

    const currentMatch = {
      projectId: { $in: scope.projectIds },
      committedAt: { $gte: range.start, $lte: range.end },
    };
    const prevMatch = {
      projectId: { $in: scope.projectIds },
      committedAt: { $gte: prev.start, $lte: prev.end },
    };
    const prMatch = {
      projectId: { $in: scope.projectIds },
      state: "merged" as const,
      mergedAt: { $gte: range.start, $lte: range.end },
    };
    const prPrevMatch = {
      projectId: { $in: scope.projectIds },
      state: "merged" as const,
      mergedAt: { $gte: prev.start, $lte: prev.end },
    };
    const debugMatch = {
      userId: userObjectId(userId),
      projectId: { $in: scope.projectIds },
      createdAt: { $gte: range.start, $lte: range.end },
    };
    const debugPrevMatch = {
      userId: userObjectId(userId),
      projectId: { $in: scope.projectIds },
      createdAt: { $gte: prev.start, $lte: prev.end },
    };
    const ideaMatch = {
      userId: userObjectId(userId),
      projectId: { $in: scope.projectIds },
      createdAt: { $gte: range.start, $lte: range.end },
    };
    const ideaPrevMatch = {
      userId: userObjectId(userId),
      projectId: { $in: scope.projectIds },
      createdAt: { $gte: prev.start, $lte: prev.end },
    };

    const oneYearAgo = new Date(range.end);
    oneYearAgo.setUTCDate(oneYearAgo.getUTCDate() - 365);

    const [
      commitDailyByProject,
      commitPrevByProject,
      prDailyByProject,
      prPrevByProject,
      debugDailyByProject,
      debugStatusAgg,
      debugPrevTotal,
      ideaDailyByProject,
      ideaAgg,
      ideaPrevTotal,
      commitActiveDays,
    ] = await Promise.all([
      Commit.aggregate([
        { $match: currentMatch },
        {
          $group: {
            _id: { project: "$projectId", day: commitDayExpr },
            count: { $sum: 1 },
          },
        },
      ]),
      Commit.aggregate([
        { $match: prevMatch },
        { $group: { _id: "$projectId", count: { $sum: 1 } } },
      ]),
      PullRequest.aggregate([
        { $match: prMatch },
        {
          $group: {
            _id: { project: "$projectId", day: prDayExpr },
            count: { $sum: 1 },
          },
        },
      ]),
      PullRequest.aggregate([
        { $match: prPrevMatch },
        { $group: { _id: "$projectId", count: { $sum: 1 } } },
      ]),
      DebugSession.aggregate([
        { $match: debugMatch },
        {
          $group: {
            _id: {
              project: "$projectId",
              day: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
            },
            count: { $sum: 1 },
          },
        },
      ]),
      DebugSession.aggregate([
        { $match: debugMatch },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      DebugSession.countDocuments(debugPrevMatch),
      Idea.aggregate([
        { $match: ideaMatch },
        {
          $group: {
            _id: {
              project: "$projectId",
              day: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
            },
            count: { $sum: 1 },
          },
        },
      ]),
      Idea.aggregate([
        { $match: ideaMatch },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            validated: {
              $sum: { $cond: [{ $gte: ["$overallScore", 70] }, 1, 0] },
            },
          },
        },
      ]),
      Idea.countDocuments(ideaPrevMatch),
      Commit.aggregate([
        {
          $match: {
            projectId: { $in: scope.projectIds },
            committedAt: { $gte: oneYearAgo, $lte: range.end },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$committedAt" },
            },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    // --- fold the per-project daily aggregations into totals + flat maps ---
    const perProjectCount = <T extends { _id: { project: unknown } }>(
      rows: T[],
      pick: (row: T) => number,
    ): Map<string, number> => {
      const map = new Map<string, number>();
      for (const row of rows) {
        const pid = String(row._id.project);
        map.set(pid, (map.get(pid) ?? 0) + pick(row));
      }
      return map;
    };

    const commitsByProject = perProjectCount(
      commitDailyByProject as any,
      (r: any) => r.count,
    );
    const prsByProject = perProjectCount(
      prDailyByProject as any,
      (r: any) => r.count,
    );
    const debugByProject = perProjectCount(
      debugDailyByProject as any,
      (r: any) => r.count,
    );
    const ideasByProject = perProjectCount(
      ideaDailyByProject as any,
      (r: any) => r.count,
    );

    const commitsPrevByProject = new Map(
      (commitPrevByProject as any[]).map((r) => [String(r._id), r.count]),
    );
    const prsPrevByProject = new Map(
      (prPrevByProject as any[]).map((r) => [String(r._id), r.count]),
    );

    const toDailyFromProjectRows = (
      rows: { _id: { project: unknown; day: string }; count: number }[],
    ): Map<string, number> => {
      const map = new Map<string, number>();
      for (const row of rows) {
        map.set(row._id.day, (map.get(row._id.day) ?? 0) + row.count);
      }
      return map;
    };

    const commitDaily = toDailyFromProjectRows(commitDailyByProject as any);
    const prDaily = toDailyFromProjectRows(prDailyByProject as any);
    const debugDaily = toDailyFromProjectRows(debugDailyByProject as any);
    const ideaDaily = toDailyFromProjectRows(ideaDailyByProject as any);

    const totalCommits = sumMap(commitDaily);
    const totalPrs = sumMap(prDaily);
    const totalDebug = sumMap(debugDaily);
    const debugStatus = new Map(
      (debugStatusAgg as any[]).map((r) => [r._id as string, r.count as number]),
    );
    const debugResolved = debugStatus.get("resolved") ?? 0;
    const totalDebugPrev = debugPrevTotal as number;

    const ideaTotals = (ideaAgg as any[])[0] ?? { total: 0, validated: 0 };
    const totalIdeas = ideaTotals.total as number;
    const validatedIdeas = ideaTotals.validated as number;

    const totalCommitsPrev = sumMap(
      new Map(
        (commitPrevByProject as any[]).map((r) => [String(r._id), r.count]),
      ),
    );
    const totalPrsPrev = sumMap(
      new Map((prPrevByProject as any[]).map((r) => [String(r._id), r.count])),
    );

    // --- series (rolled up + gap-filled) ---
    const buckets = enumerateBuckets(range.start, range.end, interval);
    const commitSeries = rollupDaily(commitDaily, buckets, interval);
    const prSeries = rollupDaily(prDaily, buckets, interval);
    const debugSeries = rollupDaily(debugDaily, buckets, interval);
    const ideaSeries = rollupDaily(ideaDaily, buckets, interval);

    const activitySeries = buckets.map((bucket, i) => ({
      bucket: bucket.toISOString(),
      commits: commitSeries[i],
      mergedPullRequests: prSeries[i],
      debugSessions: debugSeries[i],
      ideas: ideaSeries[i],
    }));

    // --- active days + streak (from daily commit activity) ---
    const activeDaySet = new Set<string>();
    for (const [day, count] of commitDaily) {
      if (count > 0) activeDaySet.add(day);
    }
    const activeDays = activeDaySet.size;

    const streakDays = (commitActiveDays as any[])
      .map((r) => r._id as string)
      .filter(Boolean)
      .sort();
    const streakSet = new Set(streakDays);
    const { currentStreak, longestStreak } = computeStreaks(
      streakSet,
      range.end,
    );

    // --- project breakdown ---
    const projectBreakdown = scope.projects
      .map((p) => {
        const pid = String(p._id);
        const commits = commitsByProject.get(pid) ?? 0;
        const mergedPullRequests = prsByProject.get(pid) ?? 0;
        const debugSessions = debugByProject.get(pid) ?? 0;
        const ideas = ideasByProject.get(pid) ?? 0;
        const prevCommits = commitsPrevByProject.get(pid) ?? 0;
        return {
          projectId: pid,
          name: p.name,
          commits,
          mergedPullRequests,
          debugSessions,
          ideas,
          totalActivity: commits + mergedPullRequests + debugSessions + ideas,
          trendPct: changePercent(commits, prevCommits),
          lastSyncedAt: p.lastSyncedAt ? p.lastSyncedAt.toISOString() : null,
        };
      })
      .sort((a, b) => b.commits - a.commits || b.totalActivity - a.totalActivity);

    const activeProjects = projectBreakdown.filter(
      (p) => p.totalActivity > 0,
    ).length;

    // --- languages (real repo metadata; may be empty) ---
    const languageBytes = new Map<string, number>();
    const languageRepos = new Map<string, number>();
    for (const project of scope.projects) {
      const langs = project.languages ?? {};
      for (const [language, bytes] of Object.entries(langs)) {
        if (typeof bytes !== "number" || bytes <= 0) continue;
        languageBytes.set(language, (languageBytes.get(language) ?? 0) + bytes);
        languageRepos.set(language, (languageRepos.get(language) ?? 0) + 1);
      }
    }
    const totalBytes = sumMap(languageBytes);
    const languages = Array.from(languageBytes.entries())
      .map(([language, bytes]) => ({
        language,
        bytes,
        projects: languageRepos.get(language) ?? 0,
        percent: totalBytes > 0 ? Math.round((bytes / totalBytes) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.bytes - a.bytes);

    // --- heatmap (daily commits; capped to one year of days) ---
    const heatmapDays = Math.min(range.days, 366);
    const heatmapStart = new Date(range.end);
    heatmapStart.setUTCDate(heatmapStart.getUTCDate() - (heatmapDays - 1));
    const heatmap: { date: string; commits: number }[] = [];
    for (let i = 0; i < heatmapDays; i++) {
      const d = new Date(heatmapStart);
      d.setUTCDate(d.getUTCDate() + i);
      const key = toDayKey(d);
      heatmap.push({ date: key, commits: commitDaily.get(key) ?? 0 });
    }

    res.status(200).json({
      status: "success",
      empty: scope.projects.length === 0,
      range: {
        start: range.start.toISOString(),
        end: range.end.toISOString(),
        days: range.days,
        interval,
      },
      kpis: {
        projects: {
          total: scope.projects.length,
          active: activeProjects,
        },
        commits: {
          value: totalCommits,
          previous: totalCommitsPrev,
          changePct: changePercent(totalCommits, totalCommitsPrev),
        },
        mergedPullRequests: {
          value: totalPrs,
          previous: totalPrsPrev,
          changePct: changePercent(totalPrs, totalPrsPrev),
        },
        debugSessions: {
          value: totalDebug,
          previous: totalDebugPrev,
          changePct: changePercent(totalDebug, totalDebugPrev),
          resolved: debugResolved,
          resolutionRate:
            totalDebug > 0 ? Math.round((debugResolved / totalDebug) * 100) : 0,
        },
        ideas: {
          value: totalIdeas,
          previous: ideaPrevTotal,
          changePct: changePercent(totalIdeas, ideaPrevTotal as number),
          validated: validatedIdeas,
        },
        activeDays,
        currentStreak,
        longestStreak,
      },
      activitySeries,
      projectBreakdown,
      languages,
      heatmap,
    });
  },
);

// ---------------------------------------------------------------------------
// GET /api/dashboard/debugging
// ---------------------------------------------------------------------------
export const getDebuggingAnalytics = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).userId;
    const scope = await resolveScope(userId, req.query.projectId);
    const range = parseRange(req.query as Record<string, unknown>, 30);
    const interval = parseInterval(req.query.interval) ?? range.interval;

    const baseMatch = {
      userId: userObjectId(userId),
      projectId: { $in: scope.projectIds },
    };
    const match = { ...baseMatch, createdAt: { $gte: range.start, $lte: range.end } };

    const [statusAgg, byProjectAgg, byLanguageAgg, dailyAgg, resolutionAgg, attention] =
      await Promise.all([
        DebugSession.aggregate([
          { $match: match },
          { $group: { _id: "$status", count: { $sum: 1 } } },
        ]),
        DebugSession.aggregate([
          { $match: match },
          {
            $group: {
              _id: "$projectId",
              sessions: { $sum: 1 },
              resolved: {
                $sum: { $cond: [{ $eq: ["$status", "resolved"] }, 1, 0] },
              },
            },
          },
        ]),
        DebugSession.aggregate([
          { $match: match },
          { $group: { _id: "$language", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]),
        DebugSession.aggregate([
          { $match: match },
          {
            $group: {
              _id: {
                day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              },
              count: { $sum: 1 },
            },
          },
        ]),
        // Average resolution time — only over sessions that actually recorded a
        // resolvedAt, so a session created but never resolved can't skew it.
        DebugSession.aggregate([
          { $match: { ...baseMatch, resolvedAt: { $ne: null } } },
          {
            $group: {
              _id: null,
              avgMs: { $avg: { $subtract: ["$resolvedAt", "$createdAt"] } },
              count: { $sum: 1 },
            },
          },
        ]),
        DebugSession.find({
          ...baseMatch,
          status: { $in: ["failed", "in_progress", "pending"] },
        })
          .sort({ createdAt: -1 })
          .limit(8)
          .select("title language status createdAt projectId"),
      ]);

    const statusMap = new Map(
      (statusAgg as any[]).map((r) => [r._id as string, r.count as number]),
    );
    const resolved = statusMap.get("resolved") ?? 0;
    const inProgress = statusMap.get("in_progress") ?? 0;
    const failed = statusMap.get("failed") ?? 0;
    const pending = statusMap.get("pending") ?? 0;
    const total = resolved + inProgress + failed + pending;

    const dailyMap = toDailyMap(
      (dailyAgg as any[]).map((r) => ({ _id: r._id.day, count: r.count })),
    );
    const buckets = enumerateBuckets(range.start, range.end, interval);
    const series = rollupDaily(dailyMap, buckets, interval).map((count, i) => ({
      bucket: buckets[i].toISOString(),
      sessions: count,
    }));

    const resolution = (resolutionAgg as any[])[0];
    const avgResolutionHours =
      resolution && resolution.avgMs > 0
        ? Math.round((resolution.avgMs / (60 * 60 * 1000)) * 10) / 10
        : null;

    res.status(200).json({
      status: "success",
      range: {
        start: range.start.toISOString(),
        end: range.end.toISOString(),
        days: range.days,
        interval,
      },
      totals: {
        total,
        resolved,
        inProgress,
        failed,
        pending,
        resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0,
        avgResolutionHours,
        resolvedWithTiming: resolution?.count ?? 0,
      },
      statusDistribution: [
        { status: "resolved", count: resolved },
        { status: "in_progress", count: inProgress },
        { status: "failed", count: failed },
        { status: "pending", count: pending },
      ],
      byProject: (byProjectAgg as any[])
        .map((r) => ({
          projectId: String(r._id),
          name: scope.nameById.get(String(r._id)) ?? "Unknown project",
          sessions: r.sessions as number,
          resolved: r.resolved as number,
          resolutionRate:
            r.sessions > 0 ? Math.round((r.resolved / r.sessions) * 100) : 0,
        }))
        .sort((a, b) => b.sessions - a.sessions),
      byLanguage: (byLanguageAgg as any[])
        .map((r) => ({
          language: (r._id as string) || "Unknown",
          count: r.count as number,
          percent: total > 0 ? Math.round((r.count / total) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count),
      series,
      attention: attention.map((s) => ({
        id: String(s._id),
        projectId: String(s.projectId),
        projectName: scope.nameById.get(String(s.projectId)) ?? "Unknown project",
        title: s.title,
        language: s.language,
        status: s.status,
        createdAt: (s.createdAt as Date).toISOString(),
      })),
    });
  },
);

// ---------------------------------------------------------------------------
// GET /api/dashboard/ideas
// ---------------------------------------------------------------------------
export const getIdeaAnalytics = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).userId;
    const scope = await resolveScope(userId, req.query.projectId);
    const range = parseRange(req.query as Record<string, unknown>, 30);
    const interval = parseInterval(req.query.interval) ?? range.interval;

    const baseMatch = {
      userId: userObjectId(userId),
      projectId: { $in: scope.projectIds },
    };
    const match = { ...baseMatch, createdAt: { $gte: range.start, $lte: range.end } };

    const [totalsAgg, byCategoryAgg, byProjectAgg, dailyAgg, recent] =
      await Promise.all([
        Idea.aggregate([
          { $match: match },
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              completed: {
                $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
              },
              pending: {
                $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
              },
              failed: {
                $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] },
              },
              validated: {
                $sum: { $cond: [{ $gte: ["$overallScore", 70] }, 1, 0] },
              },
              avgOverall: { $avg: "$overallScore" },
              avgMarketFit: { $avg: "$marketFitScore" },
              avgCompetition: { $avg: "$competitionScore" },
              avgRisk: { $avg: "$riskScore" },
            },
          },
        ]),
        Idea.aggregate([
          { $match: match },
          {
            $group: {
              _id: { $ifNull: ["$category", "Uncategorized"] },
              count: { $sum: 1 },
              avgScore: { $avg: "$overallScore" },
            },
          },
          { $sort: { count: -1 } },
        ]),
        Idea.aggregate([
          { $match: match },
          {
            $group: {
              _id: "$projectId",
              ideas: { $sum: 1 },
              validated: {
                $sum: { $cond: [{ $gte: ["$overallScore", 70] }, 1, 0] },
              },
              avgScore: { $avg: "$overallScore" },
            },
          },
        ]),
        Idea.aggregate([
          { $match: match },
          {
            $group: {
              _id: {
                day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              },
              created: { $sum: 1 },
              validated: {
                $sum: { $cond: [{ $gte: ["$overallScore", 70] }, 1, 0] },
              },
            },
          },
        ]),
        Idea.find(match)
          .sort({ createdAt: -1 })
          .limit(8)
          .select("title status category overallScore createdAt projectId"),
      ]);

    const totals = (totalsAgg as any[])[0] ?? {
      total: 0,
      completed: 0,
      pending: 0,
      failed: 0,
      validated: 0,
      avgOverall: null,
      avgMarketFit: null,
      avgCompetition: null,
      avgRisk: null,
    };

    const round1 = (v: number | null | undefined): number | null =>
      typeof v === "number" ? Math.round(v * 10) / 10 : null;

    // Fetch all scored ideas in range to build the distribution histogram.
    const scored = await Idea.find({
      ...match,
      overallScore: { $gte: 0 },
    }).select("overallScore");
    const bucketsDef: { label: string; min: number; max: number }[] = [
      { label: "0–39", min: 0, max: 39 },
      { label: "40–59", min: 40, max: 59 },
      { label: "60–79", min: 60, max: 79 },
      { label: "80–100", min: 80, max: 100 },
    ];
    const distribution = bucketsDef.map((b) => ({
      label: b.label,
      count: scored.filter(
        (i) =>
          typeof i.overallScore === "number" &&
          i.overallScore >= b.min &&
          i.overallScore <= b.max,
      ).length,
    }));

    const dailyMap = new Map<string, { created: number; validated: number }>();
    for (const row of dailyAgg as any[]) {
      if (row._id.day) {
        dailyMap.set(row._id.day, {
          created: row.created,
          validated: row.validated,
        });
      }
    }
    const dayBuckets = enumerateBuckets(range.start, range.end, interval);
    const series = dayBuckets.map((bucket) => {
      const key = bucketKey(bucket, interval);
      let created = 0;
      let validated = 0;
      for (const [day, v] of dailyMap) {
        if (bucketKey(new Date(`${day}T00:00:00.000Z`), interval) === key) {
          created += v.created;
          validated += v.validated;
        }
      }
      return { bucket: bucket.toISOString(), created, validated };
    });

    const total = totals.total as number;
    const validated = totals.validated as number;

    res.status(200).json({
      status: "success",
      range: {
        start: range.start.toISOString(),
        end: range.end.toISOString(),
        days: range.days,
        interval,
      },
      totals: {
        total,
        completed: totals.completed,
        pending: totals.pending,
        failed: totals.failed,
        validated,
        successRate:
          total > 0 ? Math.round((validated / total) * 100) : 0,
      },
      scores: {
        avgOverall: round1(totals.avgOverall),
        avgMarketFit: round1(totals.avgMarketFit),
        avgCompetition: round1(totals.avgCompetition),
        avgRisk: round1(totals.avgRisk),
      },
      distribution,
      byCategory: (byCategoryAgg as any[]).map((r) => ({
        category: r._id as string,
        count: r.count as number,
        avgScore: round1(r.avgScore),
      })),
      byProject: (byProjectAgg as any[])
        .map((r) => ({
          projectId: String(r._id),
          name: scope.nameById.get(String(r._id)) ?? "Unknown project",
          ideas: r.ideas as number,
          validated: r.validated as number,
          avgScore: round1(r.avgScore),
        }))
        .sort((a, b) => b.ideas - a.ideas),
      series,
      recent: recent.map((i) => ({
        id: String(i._id),
        projectId: String(i.projectId),
        projectName: scope.nameById.get(String(i.projectId)) ?? "Unknown project",
        title: i.title,
        status: i.status,
        category: i.category ?? null,
        overallScore: typeof i.overallScore === "number" ? i.overallScore : null,
        createdAt: (i.createdAt as Date).toISOString(),
      })),
    });
  },
);

/**
 * Given the set of days (UTC `YYYY-MM-DD`) that had commit activity, compute
 * the current streak (ending today or yesterday) and the longest run.
 */
const computeStreaks = (
  activeDays: Set<string>,
  referenceEnd: Date,
): { currentStreak: number; longestStreak: number } => {
  if (activeDays.size === 0) return { currentStreak: 0, longestStreak: 0 };

  const dayMs = 24 * 60 * 60 * 1000;
  const sorted = Array.from(activeDays).sort();

  let longest = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(`${sorted[i - 1]}T00:00:00.000Z`).getTime();
    const cur = new Date(`${sorted[i]}T00:00:00.000Z`).getTime();
    if (cur - prev === dayMs) {
      run += 1;
    } else {
      run = 1;
    }
    if (run > longest) longest = run;
  }

  // Current streak: walk backwards from the reference day. Allow the streak to
  // still be "current" if the most recent active day is today OR yesterday
  // (so it doesn't reset just because today's commits haven't happened yet).
  let cursor = new Date(
    Date.UTC(
      referenceEnd.getUTCFullYear(),
      referenceEnd.getUTCMonth(),
      referenceEnd.getUTCDate(),
    ),
  );
  const cursorKey = (d: Date) => d.toISOString().slice(0, 10);
  if (!activeDays.has(cursorKey(cursor))) {
    cursor = new Date(cursor.getTime() - dayMs);
  }
  let current = 0;
  while (activeDays.has(cursorKey(cursor))) {
    current += 1;
    cursor = new Date(cursor.getTime() - dayMs);
  }

  return { currentStreak: current, longestStreak: longest };
};
