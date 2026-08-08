import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import "./utils/loadEnv.js";
import mongoose from "mongoose";

const DB: string | undefined = process.env.MONGODB_URI;

if (!DB) {
  console.error("❌ MONGODB_URI is not defined in environment variables");
  process.exit(1);
}

mongoose
  .connect(DB, {
    family: 4,
  })
  .then(async () => {
    console.log("🔹 Connected to MongoDB Atlas...");

    const { default: app } = await import("./app.js");

    const port: number = Number(process.env.PORT) || 3001;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error(`❌ Database connection error: ${err.message}`);
    } else {
      console.error("❌ Unknown database error");
    }
    process.exit(1);
  });
