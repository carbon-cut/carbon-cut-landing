import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { createServer } from "node:net";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

const frontendDir = process.cwd();
loadEnvConfig(frontendDir);

const backendDir = resolve(
  frontendDir,
  process.env.INTEGRATION_BACKEND_DIR ?? "../carbon-cut-backend"
);
const backendPort = parsePort(process.env.INTEGRATION_BACKEND_PORT, 1338);
const frontendPort = parsePort(process.env.INTEGRATION_FRONTEND_PORT, 3001);
const backendUrl = `http://127.0.0.1:${backendPort}`;
const frontendUrl = `http://127.0.0.1:${frontendPort}`;
const ownedChildren = new Set();
let interrupted = false;

function parsePort(value, fallback) {
  const port = value === undefined ? fallback : Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid integration port: ${value}`);
  }
  return port;
}

function assertConfiguration() {
  if (!existsSync(resolve(backendDir, "package.json"))) {
    throw new Error(`Backend repository not found at ${backendDir}`);
  }
  if (!process.env.AUTH_TEST_SUPPORT_KEY) {
    throw new Error("AUTH_TEST_SUPPORT_KEY is required for integration tests");
  }
  if (backendPort === frontendPort) {
    throw new Error("Integration backend and frontend ports must differ");
  }
}

async function assertPortAvailable(port) {
  await new Promise((accept, reject) => {
    const server = createServer();
    server.once("error", () => reject(new Error(`Integration port ${port} is already in use`)));
    server.listen(port, "127.0.0.1", () => server.close(accept));
  });
}

function launch(args, cwd, env) {
  if (interrupted) throw new Error("Integration run interrupted");
  const child = spawn("npm", args, {
    cwd,
    env,
    stdio: "inherit",
    detached: process.platform !== "win32",
  });
  ownedChildren.add(child);
  child.once("exit", () => ownedChildren.delete(child));
  return child;
}

function waitForExit(child, label) {
  return new Promise((accept, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0 && !interrupted) accept();
      else reject(new Error(`${label} exited with ${signal ?? code}`));
    });
  });
}

async function run(args, cwd, env, label) {
  const child = launch(args, cwd, env);
  await waitForExit(child, label);
}

async function waitForHttp(child, label, url, expectedStatus, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && !interrupted) {
    if (child.exitCode !== null || child.signalCode !== null) {
      throw new Error(`${label} exited before becoming ready`);
    }
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (response.status === expectedStatus) return;
    } catch {
      // The server may still be starting.
    }
    await delay(1000);
  }
  throw new Error(interrupted ? "Integration run interrupted" : `${label} did not become ready`);
}

function signalChild(child, signal) {
  if (!child.pid) return;
  try {
    if (process.platform === "win32") child.kill(signal);
    else process.kill(-child.pid, signal);
  } catch (error) {
    if (error.code !== "ESRCH") throw error;
  }
}

async function stopChild(child) {
  if (!child) return;
  signalChild(child, "SIGTERM");
  if (child.exitCode !== null || child.signalCode !== null) return;
  await new Promise((accept) => {
    const timeout = setTimeout(() => {
      signalChild(child, "SIGKILL");
      accept();
    }, 5000);
    child.once("exit", () => {
      clearTimeout(timeout);
      accept();
    });
  });
}

function onInterrupt() {
  interrupted = true;
  for (const child of ownedChildren) signalChild(child, "SIGTERM");
}

process.on("SIGINT", onInterrupt);
process.on("SIGTERM", onInterrupt);

let backend;
let frontend;
try {
  assertConfiguration();
  await assertPortAvailable(backendPort);
  await assertPortAvailable(frontendPort);

  const backendEnv = {
    ...process.env,
    NODE_ENV: "test",
    HOST: "127.0.0.1",
    PORT: String(backendPort),
    FRONTEND_URL: frontendUrl,
    AUTH_TEST_SUPPORT_ENABLED: "true",
    EMAIL_PROVIDER_STUB: "true",
    DEV_INTEGRATION_SEED_ENABLED: "false",
    CRON_ENABLED: "false",
  };
  const frontendEnv = {
    ...process.env,
    NODE_ENV: "development",
    BACKEND_URL: backendUrl,
    FRONTEND_URL: frontendUrl,
    NEXT_PUBLIC_ENABLE_MSW: "false",
  };

  await run(
    ["run", "test:integration:verify-db"],
    backendDir,
    backendEnv,
    "Backend DB verification"
  );
  backend = launch(["run", "start"], backendDir, backendEnv);
  await waitForHttp(backend, "Backend", `${backendUrl}/_health`, 204, 120000);

  frontend = launch(
    ["run", "dev:next", "--", "--hostname", "127.0.0.1", "--port", String(frontendPort)],
    frontendDir,
    frontendEnv
  );
  await waitForHttp(frontend, "Frontend", `${frontendUrl}/api/auth/session`, 200, 120000);

  await run(
    ["run", "test:integration:vitest", "--", ...process.argv.slice(2)],
    frontendDir,
    frontendEnv,
    "Integration tests"
  );
  await run(
    ["run", "test:integration:browser"],
    frontendDir,
    frontendEnv,
    "Browser integration tests"
  );
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await stopChild(frontend);
  await stopChild(backend);
  process.off("SIGINT", onInterrupt);
  process.off("SIGTERM", onInterrupt);
}
