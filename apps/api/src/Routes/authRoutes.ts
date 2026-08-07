import { Router } from "express";
import passport from "../config/passport.js";

import { requireAuth } from "../middleware/authMiddleware.js";
import {
  getMe,
  githubCallback,
  login,
  logout,
  refresh,
  register,
} from "../Controllers/authController.js";

const router = Router();

// --- Email/Password ---
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);

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
    failureRedirect: "/login",
  }),
  githubCallback,
);

export default router;
