import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "server-only": path.resolve(__dirname, "tests/test-support/in-process/server-only.ts"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}", "test/**/*.test.{ts,tsx}", "src/**/*.test.{ts,tsx}"],
    exclude: ["tests/**/integration/**/*.test.ts", "test/**/integration/**/*.test.ts"],
    setupFiles: ["./tests/test-support/in-process/vitest.setup.ts"],
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
  },
});
