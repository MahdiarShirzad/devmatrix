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

    const user = await User.findById(userId).select("+githubAccessToken");
    const githubConnected = !!user?.githubAccessToken;

    const projects = await GithubProject.find({
      userId,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: projects.length,
      githubConnected,
      projects,
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

    res.status(201).json({
      status: "success",
      project,
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
