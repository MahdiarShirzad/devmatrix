import type { Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 دقیقه بر حسب میلی‌ثانیه
const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 روز

/**
 * ست کردن هر دو کوکی (access و refresh) روی response
 * httpOnly یعنی جاوااسکریپت سمت کلاینت نمی‌تونه بهشون دسترسی داشته باشه (امنیت در برابر XSS)
 * sameSite: "lax" جلوی بیشتر حملات CSRF رو می‌گیره ولی اجازه navigation عادی رو می‌ده
 */
export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
): void => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: ACCESS_TOKEN_MAX_AGE,
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: REFRESH_TOKEN_MAX_AGE,
    // فقط برای route های مربوط به refresh فرستاده بشه، نه هر request
    path: "/api/auth/refresh",
  });
};

export const clearAuthCookies = (res: Response): void => {
  res.clearCookie("accessToken", { path: "/" });
  res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
};
