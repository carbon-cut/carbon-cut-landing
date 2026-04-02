import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "server-only": path.resolve(__dirname, "test/mocks/server-only.ts"),
    },
  },
  test: {
    environment: "node",
    include: ["test/**/*.test.{ts,tsx}", "src/**/*.test.{ts,tsx}"],
    setupFiles: ["./test/vitest.setup.ts"],
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
  },
});
