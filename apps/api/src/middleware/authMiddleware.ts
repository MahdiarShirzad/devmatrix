import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";

/**
 * محافظت از route ها با چک کردن Access Token توی کوکی
 * در صورت معتبر بودن، userId رو روی req می‌ذاره تا controller بعدی استفاده کنه
 */
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
    // شامل expired token هم می‌شه — فرانت باید با /api/auth/refresh این حالت رو مدیریت کنه
    res.status(401).json({ message: "Access token نامعتبر یا منقضی شده" });
  }
};
