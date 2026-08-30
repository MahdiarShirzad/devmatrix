import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { analyzeCode } from "../services/aiDebudService.js";
import { DebugSession } from "../Models/DebugSession.js";
import GithubProject from "../Models/GithubProject.js";
import { parseDaysParam } from "../utils/parseDaysParam.js";

const findOwnedProject = async (projectId: string, userId: string) => {
  return GithubProject.findOne({ _id: projectId, userId });
};

/**
 * POST /api/projects/:projectId/ai-debug/sessions
 */
export const createSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;
    const { language, sourceCode, userDescription } = req.body;

    const project = await findOwnedProject(projectId, userId);
    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    const result = await analyzeCode({ language, sourceCode, userDescription });

    const session = await DebugSession.create({
      userId: userId.toString(),
      projectId,
      title: result.title,
      language,
      sourceCode,
      userDescription,
      status: "resolved",
      explanation: result.explanation,
      fixedCode: result.fixedCode,
      resolvedAt: new Date(),
    });

    res.status(201).json({ session });
  },
);

/**
 * GET /api/projects/:projectId/ai-debug/sessions
 */
export const listSessions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;

    const project = await findOwnedProject(projectId, userId);
    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    const sessions = await DebugSession.find({
      userId: userId.toString(),
      projectId,
    })
      .sort({ createdAt: -1 })
      .select("title language status createdAt projectId");

    res.status(200).json({ sessions });
  },
);

/**
 * GET /api/projects/:projectId/ai-debug/sessions/:id
 */
export const getSession = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const projectId = req.params.projectId as string;
  const id = req.params.id as string;

  const session = await DebugSession.findOne({
    _id: id,
    userId: userId.toString(),
    projectId,
  });

  if (!session) {
    throw new AppError("Session not found", 404);
  }

  res.status(200).json({ session });
});

/**
 * POST /api/projects/:projectId/ai-debug/sessions/:id/reanalyze
 */
export const reanalyzeSession = catchAsync(
  async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;
    const id = req.params.id as string;

    const session = await DebugSession.findOne({
      _id: id,
      userId: userId.toString(),
      projectId,
    });

    if (!session) {
      throw new AppError("Session not found", 404);
    }

    session.status = "in_progress";
    await session.save();

    try {
      const result = await analyzeCode({
        language: session.language,
        sourceCode: session.sourceCode,
        userDescription: session.userDescription,
      });

      session.title = result.title;
      session.explanation = result.explanation;
      session.fixedCode = result.fixedCode;
      session.status = "resolved";
      session.resolvedAt = new Date();
      session.errorMessage = undefined;
    } catch (err) {
      session.status = "failed";
      session.errorMessage =
        err instanceof AppError ? err.message : "Unknown error";
      await session.save();
      throw err;
    }

    await session.save();
    res.status(200).json({ session });
  },
);

/**
 * DELETE /api/projects/:projectId/ai-debug/sessions/:id
 */
export const deleteSession = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const projectId = req.params.projectId as string;
  const id = req.params.id as string;

  const session = await DebugSession.findOneAndDelete({
    _id: id,
    userId: userId.toString(),
    projectId,
  });

  if (!session) {
    throw new AppError("Session not found", 404);
  }

  res.status(204).send();
});

export const listAllSessions = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).userId;
    const { isAllTime, rangeStart } = parseDaysParam(req.query.days);

    const match: Record<string, unknown> = { userId: userId.toString() };
    if (!isAllTime && rangeStart) {
      match.createdAt = { $gte: rangeStart };
    }

    const sessions = await DebugSession.find(match)
      .sort({ createdAt: -1 })
      .select("title language status createdAt projectId");

    res.status(200).json({ sessions });
  },
);
