import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const browserCommands = Object.keys(packageJson.scripts ?? {})
  .filter((name) => name.startsWith("test:browser:"))
  .sort();

if (browserCommands.length === 0) {
  console.error("Browser test setup failed: no test:browser:* scripts are configured.");
  process.exit(1);
}

for (const script of browserCommands) {
  console.log(`\n=== Running ${script} ===`);
  const result = spawnSync("npm", ["run", script], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.error) {
    console.error(`Browser test setup failed while starting ${script}: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    const reason = result.signal ? `signal ${result.signal}` : `exit code ${result.status}`;
    console.error(
      `Browser journey failed in ${script} (${reason}). See runner output above for setup or assertion details.`
    );
    process.exit(result.status ?? 1);
  }
}

console.log(`\nAll ${browserCommands.length} browser journey command(s) passed.`);
