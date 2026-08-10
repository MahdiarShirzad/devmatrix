import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    res.status(401).json({ message: "احراز هویت نشده — لطفاً وارد شوید" });
    return;
  }

  try {
    const payload = verifyAccessToken(accessToken);
    (req as any).userId = payload.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Access token نامعتبر یا منقضی شده" });
  }
};
