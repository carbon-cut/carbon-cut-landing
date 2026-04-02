import path from "path";
import { loadEnvConfig } from "@next/env";
import { defineConfig } from "vitest/config";

loadEnvConfig(process.cwd());

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "server-only": path.resolve(__dirname, "test/mocks/server-only.ts"),
    },
  },
  test: {
    environment: "node",
    include: ["test/integration/**/*.test.ts"],
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
    testTimeout: 20_000,
    hookTimeout: 20_000,
    sequence: {
      concurrent: false,
    },
  },
});
