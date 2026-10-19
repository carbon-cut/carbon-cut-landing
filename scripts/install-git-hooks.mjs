import { spawnSync } from "node:child_process";

if (!process.env.CI) {
  const repository = spawnSync("git", ["rev-parse", "--is-inside-work-tree"], {
    stdio: "ignore",
  });

  if (repository.status === 0) {
    const result = spawnSync("git", ["config", "--local", "core.hooksPath", ".githooks"], {
      stdio: "inherit",
    });
    if (result.status !== 0) process.exit(result.status ?? 1);
  }
}
