import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    setupFiles: ["src/tests/setup.ts"],
    // Integration tests spin up an in-memory MongoDB, which can be slow on
    // first run (binary download).
    testTimeout: 60_000,
    hookTimeout: 60_000,
  },
});
