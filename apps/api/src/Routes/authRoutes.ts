import { Router } from "express";
import passport from "../config/passport.js";
import { env } from "../config/env.js";
import { authLimiter } from "../middleware/rateLimit.js";
import { validateBody } from "../middleware/validate.js";
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "../validation/schemas.js";

import { requireAuth } from "../middleware/authMiddleware.js";
import {
  getMe,
  githubCallback,
  login,
  logout,
  refresh,
  register,
  updateMe,
} from "../Controllers/authController.js";

const router = Router();

// --- Email/Password ---
router.post("/register", authLimiter, validateBody(registerSchema), register);
router.post("/login", authLimiter, validateBody(loginSchema), login);
router.post("/refresh", authLimiter, refresh);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);
router.patch(
  "/me",
  requireAuth,
  validateBody(updateProfileSchema),
  updateMe,
);

// --- GitHub OAuth ---
// مرحله ۱: کاربر رو به صفحه لاگین گیت‌هاب می‌فرسته
router.get(
  "/github",
  passport.authenticate("github", {
    session: false,
    scope: ["user:email", "repo"],
  }),
);

// مرحله ۲: گیت‌هاب کاربر رو به اینجا برمی‌گردونه
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${env.frontendUrl}/login`,
  }),
  githubCallback,
);

export default router;
