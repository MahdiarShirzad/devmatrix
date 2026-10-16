import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import "./utils/loadEnv.js";
import mongoose from "mongoose";
import logger from "./utils/logger.js";

const DB: string | undefined = process.env.MONGODB_URI;

if (!DB) {
  logger.error("MONGODB_URI is not defined in environment variables");
  process.exit(1);
}

mongoose
  .connect(DB, {
    family: 4,
  })
  .then(async () => {
    logger.info("Connected to MongoDB");

    const { default: app } = await import("./app.js");

    const port: number = Number(process.env.PORT) || 3001;

    app.listen(port, () => {
      logger.info("Server listening", { port });
    });
  })
  .catch((err: unknown) => {
    logger.error("Database connection error", {
      error: err instanceof Error ? err.message : String(err),
    });
    process.exit(1);
  });
