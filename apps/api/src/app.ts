import "./utils/loadEnv.js";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import authRoutes from "./Routes/authRoutes.js";
import playgroundRoutes from "./Routes/playgroundRoutes.js";
import aiDebugRoutes from "./Routes/aiDebugRoutes.js";
import githubProjectRoutes from "./Routes/githubProjectRoutes.js";
import cors from "cors";

import type { Request, Response } from "express";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
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
app.use("/api/playground", playgroundRoutes);
app.use("/api/ai-debug", aiDebugRoutes);
app.use("/api/github-projects", githubProjectRoutes);

export default app;
