import "./utils/loadEnv.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "./config/passport.js";
import authRoutes from "./Routes/authRoutes.js";
import projectScopedRoutes from "./Routes/projectScopedRoutes.js";
import githubProjectRoutes from "./Routes/githubProjectRoutes.js";
import aiDebugRoutes from "./Routes/aiDebugRoutes.js";
import ideaRoutes from "./Routes/ideaRoutes.js";
import dashboardRoutes from "./Routes/dashboardRoutes.js";
import { env, isAllowedOrigin } from "./config/env.js";
import { requireTrustedOrigin, requestId, requestLogger } from "./middleware/security.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimit.js";

import type { Request, Response } from "express";

const app = express();

// Required so Express resolves client IPs correctly behind a reverse proxy
// (rate limiting and session metadata rely on req.ip).
app.set("trust proxy", 1);

app.use(requestId);
app.use(requestLogger);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow same-origin / non-browser requests that send no Origin header.
      if (!origin) {
        callback(null, true);
        return;
      }

      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(passport.initialize());

// Blocks cross-site state-changing requests (CSRF) by validating Origin.
app.use(requireTrustedOrigin);

app.get("/", (_req: Request, res: Response) => {
  res.send("DevMatrix API is running");
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "success", env: env.nodeEnv });
});

app.use("/api", apiLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/github-projects", githubProjectRoutes);
app.use("/api/ai-debug", aiDebugRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/projects/:projectId", projectScopedRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
