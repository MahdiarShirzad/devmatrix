import "./utils/loadEnv.js";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import authRoutes from "./Routes/authRoutes.js";
import projectScopedRoutes from "./Routes/projectScopedRoutes.js";
import githubProjectRoutes from "./Routes/githubProjectRoutes.js";
import aiDebugRoutes from "./Routes/aiDebugRoutes.js";
import ideaRoutes from "./Routes/ideaRoutes.js";
import dashboardRoutes from "./Routes/dashboardRoutes.js";
import cors from "cors";

import type { Request, Response } from "express";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin === "http://localhost:3000" ||
        /\.vercel\.app$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get("/", (req: Request, res: Response) => {
  res.send("DevMatrix API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/github-projects", githubProjectRoutes);
app.use("/api/ai-debug", aiDebugRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/projects/:projectId", projectScopedRoutes);

export default app;
