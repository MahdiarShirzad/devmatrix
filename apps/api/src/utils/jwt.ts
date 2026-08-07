import jwt from "jsonwebtoken";
import type { Types } from "mongoose";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY_DAYS = 30;

export interface AccessTokenPayload {
  userId: string;
}

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error(
    "ACCESS_TOKEN_SECRET و REFRESH_TOKEN_SECRET باید در .env تعریف شده باشن",
  );
}

/**
 * تولید Access Token کوتاه‌مدت — این چیزیه که روی هر request فرستاده می‌شه
 */
export const generateAccessToken = (
  userId: Types.ObjectId | string,
): string => {
  const payload: AccessTokenPayload = { userId: userId.toString() };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

/**
 * تولید Refresh Token بلندمدت — این توی DB (Session model) هم ذخیره می‌شه
 */
export const generateRefreshToken = (
  userId: Types.ObjectId | string,
): string => {
  const payload: AccessTokenPayload = { userId: userId.toString() };
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: `${REFRESH_TOKEN_EXPIRY_DAYS}d`,
  });
};

export const getRefreshTokenExpiryDate = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);
  return date;
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as AccessTokenPayload;
};

export const verifyRefreshToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as AccessTokenPayload;
};
