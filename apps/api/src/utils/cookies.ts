import type { CookieOptions, Response } from "express";
import { env } from "../config/env.js";

const baseCookieOptions = (): Pick<
  CookieOptions,
  "httpOnly" | "secure" | "sameSite" | "domain"
> => ({
  httpOnly: true,
  secure: env.cookie.secure,
  sameSite: env.cookie.sameSite,
  domain: env.cookie.domain,
});

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
): void => {
  res.cookie("accessToken", accessToken, {
    ...baseCookieOptions(),
    maxAge: env.cookie.accessTokenMaxAgeMs,
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    ...baseCookieOptions(),
    maxAge: env.cookie.refreshTokenMaxAgeMs,
    path: env.cookie.refreshTokenPath,
  });
};

export const clearAuthCookies = (res: Response): void => {
  res.clearCookie("accessToken", {
    ...baseCookieOptions(),
    path: "/",
  });
  res.clearCookie("refreshToken", {
    ...baseCookieOptions(),
    path: env.cookie.refreshTokenPath,
  });
};
