import "./utils/loadEnv.js";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import authRoutes from "./Routes/authRoutes.js";
import playgroundRoutes from "./Routes/playgroundRoutes.js"; // adjust path/filename to match yours
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

export default app;
