import type { Request, Response, NextFunction } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpiryDate,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { setAuthCookies, clearAuthCookies } from "../utils/cookies.js";
import User, { IUser } from "../Models/User.js";
import Session from "../Models/Session.js";

import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

/**
 * کمک‌کننده: بعد از احراز هویت موفق، توکن‌ها رو بساز، Session رو ذخیره کن، کوکی‌ها رو ست کن
 */
const issueTokensAndSession = async (
  user: IUser,
  res: Response,
  req: Request,
): Promise<void> => {
  const accessToken = generateAccessToken(user._id as any);
  const refreshToken = generateRefreshToken(user._id as any);

  await Session.create({
    userId: user._id,
    refreshToken,
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
    expiresAt: getRefreshTokenExpiryDate(),
  });

  setAuthCookies(res, accessToken, refreshToken);
};

/**
 * POST /api/auth/register
 */
export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new AppError("نام، ایمیل و پسورد الزامی هستند", 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        new AppError("کاربری با این ایمیل قبلاً ثبت‌نام کرده است", 409),
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      authProvider: "local",
    });

    await issueTokensAndSession(user, res, req);

    res.status(201).json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  },
);

/**
 * POST /api/auth/login
 */
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("ایمیل و پسورد الزامی هستند", 400));
    }

    // password با select: false مخفیه، پس صریحاً درخواستش می‌کنیم
    const user = await User.findOne({ email }).select("+password");

    if (!user || user.authProvider !== "local") {
      return next(new AppError("ایمیل یا پسورد اشتباه است", 401));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new AppError("ایمیل یا پسورد اشتباه است", 401));
    }

    await issueTokensAndSession(user, res, req);

    res.status(200).json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  },
);

/**
 * POST /api/auth/refresh
 */
export const refresh = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return next(new AppError("Refresh token موجود نیست", 401));
    }

    const session = await Session.findOne({ refreshToken });
    if (!session) {
      return next(new AppError("Session نامعتبر یا منقضی شده است", 401));
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      await Session.deleteOne({ _id: session._id });
      return next(new AppError("Refresh token نامعتبر است", 401));
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      return next(new AppError("کاربر پیدا نشد", 401));
    }

    await Session.deleteOne({ _id: session._id });
    await issueTokensAndSession(user, res, req);

    res.status(200).json({ status: "success", message: "توکن‌ها تمدید شدند" });
  },
);

/**
 * POST /api/auth/logout
 */
export const logout = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      await Session.deleteOne({ refreshToken });
    }

    clearAuthCookies(res);
    res.status(200).json({ status: "success", message: "با موفقیت خارج شدید" });
  },
);

/**
 * GET /api/auth/github/callback
 */
export const githubCallback = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = req.user as IUser;

    if (!user) {
      res.redirect(`${FRONTEND_URL}/login?error=github_auth_failed`);
      return;
    }

    await issueTokensAndSession(user, res, req);

    res.redirect(`${FRONTEND_URL}/dashboard`);
  },
);

/**
 * GET /api/auth/me
 */
export const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const user = await User.findById(userId);

    if (!user) {
      return next(new AppError("کاربر پیدا نشد", 404));
    }

    res.status(200).json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  },
);
