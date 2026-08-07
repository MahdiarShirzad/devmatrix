import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import type { Request, Response } from "express";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("DevMatrix API is running");
});

const PORT: number = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
