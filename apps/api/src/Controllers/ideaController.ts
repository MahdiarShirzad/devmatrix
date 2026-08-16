import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { validateIdea } from "../services/ideaValidatorService.js";
import { Idea } from "../Models/Idea.js";
import GithubProject from "../Models/GithubProject.js";

/**
 * Ideas are always scoped to a project, so every route below expects a
 * :projectId route param and verifies the user actually owns that project
 * before touching any ideas under it.
 */
const findOwnedProject = async (projectId: string, userId: string) => {
  return GithubProject.findOne({ _id: projectId, userId });
};

/**
 * POST /api/projects/:projectId/ideas
 */
export const createIdea = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;
    const { title, description } = req.body;

    if (!title || !description) {
      return next(new AppError("Title and description are required", 400));
    }

    const project = await findOwnedProject(projectId, userId);
    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    let result;

    try {
      result = await validateIdea({ title, description });
    } catch (err) {
      await Idea.create({
        userId,
        projectId,
        title,
        description,
        status: "failed",
        errorMessage: err instanceof Error ? err.message : "Unknown error",
      });
      throw err;
    }

    const idea = await Idea.create({
      userId,
      projectId,
      title,
      description,
      status: "completed",
      category: result.category,
      overallScore: result.overallScore,
      overallSummary: result.overallSummary,
      marketFitScore: result.marketFitScore,
      marketFitSummary: result.marketFitSummary,
      competitionScore: result.competitionScore,
      competitionSummary: result.competitionSummary,
      riskScore: result.riskScore,
      riskSummary: result.riskSummary,
    });

    res.status(201).json({ status: "success", idea });
  },
);

/**
 * GET /api/projects/:projectId/ideas
 */
export const listIdeas = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;

    const project = await findOwnedProject(projectId, userId);
    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    const ideas = await Idea.find({ userId, projectId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: "success",
      ideas,
    });
  },
);

/**
 * GET /api/projects/:projectId/ideas/overview-stats
 */
export const getOverviewStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;

    const project = await findOwnedProject(projectId, userId);
    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    const stats = await Idea.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          projectId: new mongoose.Types.ObjectId(projectId),
        },
      },
      {
        $group: {
          _id: null,
          totalIdeas: { $sum: 1 },
          validatedCount: {
            $sum: {
              $cond: [{ $gte: ["$overallScore", 70] }, 1, 0],
            },
          },
          avgScore: { $avg: "$overallScore" },
        },
      },
    ]);

    const result = stats[0] || {
      totalIdeas: 0,
      validatedCount: 0,
      avgScore: 0,
    };

    res.status(200).json({
      status: "success",
      stats: {
        totalIdeas: result.totalIdeas,
        validatedCount: result.validatedCount,
        avgScore: result.avgScore ? Math.round(result.avgScore * 10) / 10 : 0,
      },
    });
  },
);

/**
 * GET /api/projects/:projectId/ideas/:id
 */
export const getIdea = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;
    const id = req.params.id as string;

    const idea = await Idea.findOne({ _id: id, userId, projectId });
    if (!idea) {
      return next(new AppError("Idea not found", 404));
    }

    res.status(200).json({
      status: "success",
      idea,
    });
  },
);

/**
 * POST /api/projects/:projectId/ideas/:id/reevaluate
 */
export const reevaluateIdea = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;
    const id = req.params.id as string;
    const { description } = req.body;

    if (!description) {
      return next(new AppError("Description is required", 400));
    }

    const idea = await Idea.findOne({ _id: id, userId, projectId });
    if (!idea) {
      return next(new AppError("Idea not found", 404));
    }

    let result;
    try {
      result = await validateIdea({ title: idea.title, description });
    } catch (err) {
      idea.status = "failed";
      idea.errorMessage = err instanceof Error ? err.message : "Unknown error";
      await idea.save();
      throw err;
    }

    idea.description = description;
    idea.status = "completed";
    idea.category = result.category;
    idea.overallScore = result.overallScore;
    idea.overallSummary = result.overallSummary;
    idea.marketFitScore = result.marketFitScore;
    idea.marketFitSummary = result.marketFitSummary;
    idea.competitionScore = result.competitionScore;
    idea.competitionSummary = result.competitionSummary;
    idea.riskScore = result.riskScore;
    idea.riskSummary = result.riskSummary;
    idea.errorMessage = undefined;
    await idea.save();

    res.status(200).json({ status: "success", idea });
  },
);

/**
 * DELETE /api/projects/:projectId/ideas/:id
 */
export const deleteIdea = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;
    const id = req.params.id as string;

    const idea = await Idea.findOneAndDelete({ _id: id, userId, projectId });
    if (!idea) {
      return next(new AppError("Idea not found", 404));
    }

    res
      .status(200)
      .json({ status: "success", message: "Idea deleted successfully" });
  },
);
