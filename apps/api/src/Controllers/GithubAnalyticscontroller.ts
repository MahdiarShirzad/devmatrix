import type { Request, Response, NextFunction } from "express";
import GithubProject from "../Models/GithubProject.js";
import Commit from "../Models/Commit.js";
import PullRequest from "../Models/PullRequest.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const findOwnedProject = async (projectId: string, userId: string) => {
  const project = await GithubProject.findOne({ _id: projectId, userId });
  return project;
};

/**
 * GET /api/github-projects/:id/commits?days=7
 */
export const getCommitsByDay = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const { id } = req.params as { id: string };
    const days = Math.min(Number(req.query.days) || 7, 90);

    const project = await findOwnedProject(id, userId);
    if (!project) {
      return next(new AppError("Project not found.", 404));
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (days - 1));
    startDate.setHours(0, 0, 0, 0);

    const results = await Commit.aggregate([
      {
        $match: {
          projectId: project._id,
          committedAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$committedAt" },
          },
          commits: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Fill days that have no commits with 0 (to keep continuous graph data)
    const resultMap = new Map(results.map((r) => [r._id, r.commits]));
    const filledData: { date: string; commits: number }[] = [];

    for (let i = 0; i < days; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().split("T")[0];
      filledData.push({
        date: key,
        commits: resultMap.get(key) ?? 0,
      });
    }

    res.status(200).json({
      status: "success",
      data: filledData,
    });
  },
);

/**
 * GET /api/github-projects/:id/heatmap?weeks=24
 * شبکه‌ی هفته×روز برای ActivityHeatmap (شبیه GitHub contribution graph)
 */
export const getHeatmap = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const { id } = req.params as { id: string };
    const weeks = Math.min(Number(req.query.weeks) || 24, 52);

    const project = await findOwnedProject(id, userId);
    if (!project) {
      return next(new AppError("Project not found.", 404));
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - weeks * 7);
    startDate.setHours(0, 0, 0, 0);

    const results = await Commit.aggregate([
      {
        $match: {
          projectId: project._id,
          committedAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$committedAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const countMap = new Map(results.map((r) => [r._id, r.count]));

    // Construct weeks x 7 grid (each column is a week, each row is a day of the week)
    const grid: number[][] = [];
    const cursor = new Date(startDate);

    for (let w = 0; w < weeks; w++) {
      const weekLevels: number[] = [];
      for (let d = 0; d < 7; d++) {
        const key = cursor.toISOString().split("T")[0];
        const count = countMap.get(key) ?? 0;
        // Convert raw commit count to level 0-4 (GitHub style)
        const level =
          count === 0
            ? 0
            : count <= 2
              ? 1
              : count <= 5
                ? 2
                : count <= 9
                  ? 3
                  : 4;
        weekLevels.push(level);
        cursor.setDate(cursor.getDate() + 1);
      }
      grid.push(weekLevels);
    }

    res.status(200).json({
      status: "success",
      data: grid,
    });
  },
);

/**
 * GET /api/github-projects/:id/contributors
 * آمار به‌ازای هر contributor — برای ContributorsTable
 */
export const getContributors = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const { id } = req.params as { id: string };

    const project = await findOwnedProject(id, userId);
    if (!project) {
      return next(new AppError("Project not found.", 404));
    }

    const [commitStats, prStats] = await Promise.all([
      Commit.aggregate([
        {
          $match: {
            projectId: project._id,
            authorGithubLogin: { $ne: null },
          },
        },
        {
          $group: {
            _id: "$authorGithubLogin",
            commits: { $sum: 1 },
            linesChanged: { $sum: "$totalChanges" },
            authorName: { $first: "$authorName" },
            authorAvatarUrl: { $first: "$authorAvatarUrl" },
          },
        },
      ]),
      PullRequest.aggregate([
        {
          $match: {
            projectId: project._id,
            state: "merged",
          },
        },
        {
          $group: {
            _id: "$authorGithubLogin",
            prsMerged: { $sum: 1 },
          },
        },
      ]),
    ]);

    const prMap = new Map(prStats.map((p) => [p._id, p.prsMerged]));

    const contributors = commitStats
      .map((c) => ({
        login: c._id,
        name: c.authorName,
        avatarUrl: c.authorAvatarUrl,
        commits: c.commits,
        linesChanged: c.linesChanged,
        prsMerged: prMap.get(c._id) ?? 0,
      }))
      .sort((a, b) => b.commits - a.commits);

    res.status(200).json({
      status: "success",
      results: contributors.length,
      contributors,
    });
  },
);
