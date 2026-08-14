import type { Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000;
const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
): void => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: ACCESS_TOKEN_MAX_AGE,
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: isProduction ? "none" : "lax",
    maxAge: REFRESH_TOKEN_MAX_AGE,
    path: "/api/auth/refresh",
  });
};

export const clearAuthCookies = (res: Response): void => {
  res.clearCookie("accessToken", { path: "/", secure: true, sameSite: "none" });
  res.clearCookie("refreshToken", {
    path: "/api/auth/refresh",
    secure: true,
    sameSite: "none",
  });
};
