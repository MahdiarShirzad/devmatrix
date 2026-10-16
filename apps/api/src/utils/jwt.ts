import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import type { Types } from "mongoose";

const getEnv = () => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error(
      "ACCESS_TOKEN_SECRET و REFRESH_TOKEN_SECRET باید در .env تعریف شده باشن",
    );
  }

  return { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET };
};

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY_DAYS = 30;

export interface AccessTokenPayload {
  userId: string;
  jti?: string;
}

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = getEnv();

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
 *
 * A unique jti is embedded so two tokens issued to the same user within the
 * same second are never byte-identical (the Session.refreshToken index is
 * unique, and without a jti identical tokens caused 409s on rapid logins).
 */
export const generateRefreshToken = (
  userId: Types.ObjectId | string,
): string => {
  const payload: AccessTokenPayload = {
    userId: userId.toString(),
    jti: randomUUID(),
  };
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
