import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { analyzeCode } from "../services/aiDebudService.js";
import { DebugSession } from "../Models/DebugSession.js";

export const createSession = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { language, sourceCode, userDescription, projectId } = req.body;

  // if (!language || !!sourceCode) {
  //   throw new AppError("language and sourceCode are required", 400);
  // }

  const result = await analyzeCode({ language, sourceCode, userDescription });

  const session = await DebugSession.create({
    userId: userId.toString(),
    projectId: projectId ? projectId.toString() : undefined,
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
});

export const listSessions = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const sessions = await DebugSession.find({ userId: userId.toString() })
    .sort({ createdAt: -1 })
    .select("title language status createdAt projectId");

  res.status(200).json({ sessions });
});

export const getSession = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const session = await DebugSession.findOne({
    _id: req.params.id,
    userId: userId.toString(),
  });

  if (!session) {
    throw new AppError("Sesion not found", 404);
  }

  res.status(200).json({ session });
});

export const reanalyzeSession = catchAsync(
  async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const session = await DebugSession.findOne({
      _id: req.params.id,
      userId: userId.toString(),
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

export const deleteSession = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const session = await DebugSession.findOneAndDelete({
    _id: req.params.id,
    userId: userId.toString(),
  });

  if (!session) {
    throw new AppError("Session not found", 404);
  }

  res.status(204).send();
});
