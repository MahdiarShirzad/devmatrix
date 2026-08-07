import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import passport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";

import type { Request, Response } from "express";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get("/", (req: Request, res: Response) => {
  res.send("DevMatrix API is running");
});

app.use("/api/auth", authRoutes);

const PORT: number = Number(process.env.PORT) || 3001;

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
