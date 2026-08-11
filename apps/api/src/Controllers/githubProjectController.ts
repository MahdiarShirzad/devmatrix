import type { Request, Response, NextFunction } from "express";
import GithubProject from "../Models/GithubProject.js";
import User from "../Models/User.js";
import Commit from "../Models/Commit.js";
import PullRequest from "../Models/PullRequest.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { listUserRepos, getRepo } from "../services/github/githubClient.js";
import { syncProjectData } from "../services/github/syncProject.js";

/**
 * GET /api/github-projects/available-repos
 */
export const getAvailableRepos = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;

    const user = await User.findById(userId).select("+githubAccessToken");
    if (!user || !user.githubAccessToken) {
      return next(
        new AppError(
          "GitHub account not connected. Please connect it first.",
          401,
        ),
      );
    }

    const repos = await listUserRepos(user.githubAccessToken);

    res.status(200).json({
      status: "success",
      repos: repos.map((r) => ({
        githubRepoId: r.id,
        fullName: r.full_name,
        name: r.name,
        ownerLogin: r.owner.login,
        isPrivate: r.private,
        defaultBranch: r.default_branch,
      })),
    });
  },
);

/**
 * GET /api/github-projects
 */
export const listProjects = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).userId;
    const days = Math.min(Math.max(Number(req.query.days) || 7, 1), 365);

    const user = await User.findById(userId).select("+githubAccessToken");
    const githubConnected = !!user?.githubAccessToken;

    const projects = await GithubProject.find({
      userId,
      isActive: true,
    }).sort({ createdAt: -1 });

    if (projects.length === 0) {
      res.status(200).json({
        status: "success",
        results: 0,
        githubConnected,
        projects: [],
      });
      return;
    }

    const projectIds = projects.map((p) => p._id);

    const now = new Date();
    const rangeStart = new Date(now);
    rangeStart.setDate(rangeStart.getDate() - days);
    const prevRangeStart = new Date(now);
    prevRangeStart.setDate(prevRangeStart.getDate() - days * 2);

    const activityPoints = 7;
    const bucketSizeDays = Math.max(1, Math.ceil(days / activityPoints));
    const activityStart = new Date(now);
    activityStart.setHours(0, 0, 0, 0);
    activityStart.setDate(
      activityStart.getDate() - bucketSizeDays * activityPoints + 1,
    );

    const [thisRangeAgg, prevRangeAgg, mergedPrAgg, dailyAgg] =
      await Promise.all([
        Commit.aggregate([
          {
            $match: {
              projectId: { $in: projectIds },
              committedAt: { $gte: rangeStart },
            },
          },
          { $group: { _id: "$projectId", count: { $sum: 1 } } },
        ]),
        Commit.aggregate([
          {
            $match: {
              projectId: { $in: projectIds },
              committedAt: { $gte: prevRangeStart, $lt: rangeStart },
            },
          },
          { $group: { _id: "$projectId", count: { $sum: 1 } } },
        ]),
        PullRequest.aggregate([
          {
            $match: {
              projectId: { $in: projectIds },
              state: "merged",
            },
          },
          { $group: { _id: "$projectId", count: { $sum: 1 } } },
        ]),
        Commit.aggregate([
          {
            $match: {
              projectId: { $in: projectIds },
              committedAt: { $gte: activityStart },
            },
          },
          {
            $group: {
              _id: {
                projectId: "$projectId",
                day: {
                  $dateToString: { format: "%Y-%m-%d", date: "$committedAt" },
                },
              },
              count: { $sum: 1 },
            },
          },
        ]),
      ]);

    const toMap = (agg: { _id: unknown; count: number }[]) =>
      new Map(agg.map((a) => [String(a._id), a.count]));

    const thisRangeMap = toMap(thisRangeAgg);
    const prevRangeMap = toMap(prevRangeAgg);
    const mergedPrMap = toMap(mergedPrAgg);

    const dailyMap = new Map<string, Map<string, number>>();
    for (const row of dailyAgg as {
      _id: { projectId: unknown; day: string };
      count: number;
    }[]) {
      const pid = String(row._id.projectId);
      if (!dailyMap.has(pid)) dailyMap.set(pid, new Map());
      dailyMap.get(pid)!.set(row._id.day, row.count);
    }

    // ساخت bucketها برای گراف (activityPoints تا نقطه)
    const buckets: { start: string; end: string }[] = [];
    for (let i = 0; i < activityPoints; i++) {
      const bStart = new Date(activityStart);
      bStart.setDate(bStart.getDate() + i * bucketSizeDays);
      const bEnd = new Date(bStart);
      bEnd.setDate(bEnd.getDate() + bucketSizeDays - 1);
      buckets.push({
        start: bStart.toISOString().slice(0, 10),
        end: bEnd.toISOString().slice(0, 10),
      });
    }

    const projectsWithStats = projects.map((project) => {
      const pid = String(project._id);
      const commitsThisRange = thisRangeMap.get(pid) ?? 0;
      const commitsPrevRange = prevRangeMap.get(pid) ?? 0;
      const mergedPrsCount = mergedPrMap.get(pid) ?? 0;

      let trendPercent = 0;
      if (commitsPrevRange > 0) {
        trendPercent = Math.round(
          ((commitsThisRange - commitsPrevRange) / commitsPrevRange) * 100,
        );
      } else if (commitsThisRange > 0) {
        trendPercent = 100;
      }

      const dayCounts = dailyMap.get(pid);
      const rawActivity = buckets.map((b) => {
        let sum = 0;
        const cursor = new Date(b.start);
        const end = new Date(b.end);
        while (cursor <= end) {
          const key = cursor.toISOString().slice(0, 10);
          sum += dayCounts?.get(key) ?? 0;
          cursor.setDate(cursor.getDate() + 1);
        }
        return sum;
      });
      const maxActivity = Math.max(...rawActivity, 1);
      const activityData = rawActivity.map((c) =>
        c === 0 ? 4 : Math.max(10, Math.round((c / maxActivity) * 100)),
      );

      return {
        ...project.toObject(),
        commitsThisWeek: commitsThisRange, // نام فیلد رو نگه داشتم، ولی الان معنیش «کل بازه»‌ست
        mergedPrsCount,
        trend: `${trendPercent >= 0 ? "+" : ""}${trendPercent}%`,
        trendUp: trendPercent >= 0,
        activityData,
      };
    });

    res.status(200).json({
      status: "success",
      results: projectsWithStats.length,
      githubConnected,
      projects: projectsWithStats,
    });
  },
);

/**
 * POST /api/github-projects
 */
export const linkProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const { fullName } = req.body;

    if (!fullName || typeof fullName !== "string") {
      return next(
        new AppError("Repository full name (fullName) is required.", 400),
      );
    }

    const user = await User.findById(userId).select("+githubAccessToken");
    if (!user || !user.githubAccessToken) {
      return next(
        new AppError(
          "GitHub account not connected. Please connect it first.",
          401,
        ),
      );
    }

    const [owner, repo] = fullName.split("/");
    if (!owner || !repo) {
      return next(
        new AppError("The fullName format must be 'owner/repo'.", 400),
      );
    }

    const existing = await GithubProject.findOne({ userId, fullName });
    if (existing) {
      return next(new AppError("This project has already been linked.", 409));
    }

    const repoData = await getRepo(user.githubAccessToken, owner, repo);

    const project = await GithubProject.create({
      userId,
      provider: "github",
      githubRepoId: repoData.id,
      fullName: repoData.full_name,
      name: repoData.name,
      ownerLogin: repoData.owner.login,
      defaultBranch: repoData.default_branch,
      isPrivate: repoData.private,
    });

    // سینک اولیه‌ی synchronous: منتظر می‌مونیم تا کامیت‌ها/PRها بیان،
    // اگه سینک شکست بخوره پروژه رو حذف نمی‌کنیم (خودش لینک شده)،
    // فقط خطا رو لاگ می‌کنیم تا کاربر بعداً دستی سینک کنه.
    let syncFailed = false;
    try {
      await syncProjectData((project._id as any).toString(), userId);
    } catch (err) {
      syncFailed = true;
      console.error(
        `Initial sync failed for project ${project._id} (${fullName}):`,
        err,
      );
    }

    // پروژه رو با آخرین نسخه از دیتابیس برمی‌گردونیم چون syncProjectData
    // احتمالاً فیلدهایی مثل lastSyncedAt رو آپدیت کرده.
    const freshProject = await GithubProject.findById(project._id);

    res.status(201).json({
      status: "success",
      project: freshProject ?? project,
      syncFailed,
    });
  },
);

/**
 * GET /api/github-projects/:id
 */
export const getProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const { id } = req.params as { id: string };

    const project = await GithubProject.findOne({ _id: id, userId });

    if (!project) {
      return next(new AppError("Project not found.", 404));
    }

    res.status(200).json({
      status: "success",
      project,
    });
  },
);

/**
 * POST /api/github-projects/:id/sync
 */
export const syncProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const { id } = req.params as { id: string };

    const result = await syncProjectData(id, userId);

    res.status(200).json({
      status: "success",
      message: "Synchronization completed successfully.",
      result,
    });
  },
);

/**
 * DELETE /api/github-projects/:id
 */
export const unlinkProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const { id } = req.params as { id: string };

    const project = await GithubProject.findOne({ _id: id, userId });
    if (!project) {
      return next(new AppError("Project not found.", 404));
    }

    project.isActive = false;
    await project.save();

    res.status(200).json({
      status: "success",
      message: "Project unlinked successfully.",
    });
  },
);

/**
 * GET /api/github-projects/:id/stats
 */
export const getProjectStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const { id } = req.params as { id: string };

    const project = await GithubProject.findOne({ _id: id, userId });
    if (!project) {
      return next(new AppError("Project not found.", 404));
    }

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const [commitsThisWeek, openPrsCount, mergedPrsCount, contributorsCount] =
      await Promise.all([
        Commit.countDocuments({
          projectId: project._id,
          committedAt: { $gte: oneWeekAgo },
        }),
        PullRequest.countDocuments({ projectId: project._id, state: "open" }),
        PullRequest.countDocuments({
          projectId: project._id,
          state: "merged",
        }),
        Commit.distinct("authorGithubLogin", { projectId: project._id }),
      ]);

    res.status(200).json({
      status: "success",
      stats: {
        commitsThisWeek,
        openPrsCount,
        mergedPrsCount,
        activeContributors: contributorsCount.filter(Boolean).length,
      },
    });
  },
);

/**
 * PATCH /api/github-projects/access-token
 * Body: { token: string }
 */
export const setAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const { token } = req.body;

    if (!token || typeof token !== "string" || token.trim().length === 0) {
      return next(new AppError("GitHub access token is required.", 400));
    }

    // Validate the token actually works before saving it, so we don't
    // store garbage and silently break the analytics page.
    try {
      await listUserRepos(token.trim());
    } catch {
      return next(
        new AppError(
          "This GitHub access token is invalid or lacks the required permissions.",
          400,
        ),
      );
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { githubAccessToken: token.trim() },
      { new: true },
    ).select("+githubAccessToken");

    if (!user) {
      return next(new AppError("User not found.", 404));
    }

    res.status(200).json({
      status: "success",
      message: "GitHub access token saved successfully.",
      githubConnected: true,
    });
  },
);

/**
 * DELETE /api/github-projects/access-token
 * Removes a manually-set GitHub access token.
 */
export const removeAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;

    const user = await User.findByIdAndUpdate(
      userId,
      { $unset: { githubAccessToken: "" } },
      { new: true },
    );

    if (!user) {
      return next(new AppError("User not found.", 404));
    }

    res.status(200).json({
      status: "success",
      message: "GitHub access token removed.",
      githubConnected: false,
    });
  },
);

/**
 * GET /api/github-projects/overview-stats
 * Aggregates commits/PRs across all of the user's linked projects.
 */
export const getOverviewStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const days = Math.min(Math.max(Number(req.query.days) || 7, 1), 365);

    const projects = await GithubProject.find({
      userId,
      isActive: true,
    }).select("_id");

    const projectIds = projects.map((p) => p._id);

    if (projectIds.length === 0) {
      res.status(200).json({
        status: "success",
        stats: {
          totalCommits: 0,
          totalCommitsLastWeek: 0,
          mergedPrsCount: 0,
          mergedPrsLastWeek: 0,
          mostActiveDay: null,
          mostActiveDayCommits: 0,
        },
      });
      return;
    }

    const rangeStart = new Date();
    rangeStart.setDate(rangeStart.getDate() - days);

    const prevRangeStart = new Date();
    prevRangeStart.setDate(prevRangeStart.getDate() - days * 2);

    const [
      totalCommits,
      totalCommitsLastWeek,
      mergedPrsCount,
      mergedPrsLastWeek,
      dayOfWeekAgg,
    ] = await Promise.all([
      Commit.countDocuments({
        projectId: { $in: projectIds },
        committedAt: { $gte: rangeStart },
      }),
      Commit.countDocuments({
        projectId: { $in: projectIds },
        committedAt: { $gte: prevRangeStart, $lt: rangeStart },
      }),
      PullRequest.countDocuments({
        projectId: { $in: projectIds },
        state: "merged",
        mergedAt: { $gte: rangeStart },
      }),
      PullRequest.countDocuments({
        projectId: { $in: projectIds },
        state: "merged",
        mergedAt: { $gte: prevRangeStart, $lt: rangeStart },
      }),
      Commit.aggregate([
        {
          $match: {
            projectId: { $in: projectIds },
            committedAt: { $gte: rangeStart },
          },
        },
        {
          $group: {
            _id: { $dayOfWeek: "$committedAt" },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ]),
    ]);

    const WEEKDAY_NAMES = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const topDay = dayOfWeekAgg[0];
    const mostActiveDay = topDay ? WEEKDAY_NAMES[topDay._id - 1] : null;

    res.status(200).json({
      status: "success",
      stats: {
        totalCommits,
        totalCommitsLastWeek: totalCommitsLastWeek,
        mergedPrsCount,
        mergedPrsLastWeek,
        mostActiveDay,
        mostActiveDayCommits: topDay?.count ?? 0,
      },
    });
  },
);
