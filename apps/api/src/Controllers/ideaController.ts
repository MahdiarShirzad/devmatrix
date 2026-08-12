import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { validateIdea } from "../services/ideaValidatorService.js";
import { Idea } from "../Models/Idea.js";

/**
 * POST /api/ideas
 */
export const createIdea = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).userId;
    const { title, description, projectId } = req.body;

    if (!title || !description) {
      return next(new AppError("title and description are required", 400));
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
        errorMessage: err instanceof Error ? err.message : "err ?!",
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
 * GET api/ideas
 */
export const listIdeas = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).userId;

    const ideas = await Idea.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      ideas,
    });
  },
);

/**
 * GET /api/ideas/overview-stats
 */
export const getOverviewStats = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).userId;

    const stats = await Idea.aggregate([
      { $match: { userId } },
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
 * GET /api/ideas/:id
 */
export const getIdea = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const { id } = req.params;

    const idea = await Idea.findOne({ _id: id, userId });
    if (!idea) {
      return next(new AppError("idea not found", 404));
    }

    res.status(200).json({
      status: "success",
      idea,
    });
  },
);
/**
 * POST /api/ideas/:id/reevaluate
 */
export const reevaluateIdea = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const { id } = req.params;
    const { description } = req.body;

    if (!description) {
      return next(new AppError("توضیحات الزامی است", 400));
    }

    const idea = await Idea.findOne({ _id: id, userId });
    if (!idea) {
      return next(new AppError("ایده پیدا نشد", 404));
    }

    let result;
    try {
      result = await validateIdea({ title: idea.title, description });
    } catch (err) {
      idea.status = "failed";
      idea.errorMessage = err instanceof Error ? err.message : "خطای نامشخص";
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
 * DELETE /api/ideas/:id
 */
export const deleteIdea = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const { id } = req.params;

    const idea = await Idea.findOneAndDelete({ _id: id, userId });
    if (!idea) {
      return next(new AppError("ایده پیدا نشد", 404));
    }

    res.status(200).json({ status: "success", message: "ایده حذف شد" });
  },
);
