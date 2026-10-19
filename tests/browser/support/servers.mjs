import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";

const repositoryRoot = process.cwd();

/** Start the contract-faithful mock backend and Next.js app for a browser suite. */
export async function startBrowserTestServers({ frontendPath, backendEnvironment = {} }) {
  const backendPort = await reservePort();
  const frontendPort = await reservePort();
  const backendUrl = `http://localhost:${backendPort}`;
  const frontendUrl = `http://localhost:${frontendPort}`;
  const sharedEnvironment = {
    ...process.env,
    BACKEND_URL: backendUrl,
    FRONTEND_URL: frontendUrl,
    NEXT_PUBLIC_SERVER: backendUrl,
    NEXT_PUBLIC_APP_URL: frontendUrl,
    NEXT_PUBLIC_BASE_PATH: "",
    NEXT_PUBLIC_ENABLE_MSW: "false",
    NEXT_TELEMETRY_DISABLED: "1",
  };

  let backend;
  let frontend;
  let stoppedBackendOutput = "";
  let closed = false;

  try {
    backend = start("npm", ["run", "mock:strapi"], {
      ...sharedEnvironment,
      ...backendEnvironment,
    });
    await waitForHttp(backendUrl, backend, "Controlled mock backend");

    frontend = start(
      "npm",
      ["run", "dev:next", "--", "--hostname", "localhost", "--port", String(frontendPort)],
      sharedEnvironment
    );
    await waitForHttp(`${frontendUrl}${frontendPath}`, frontend, "Next.js app");
  } catch (error) {
    error.message += `\n${formatOutput(backend, frontend)}`;
    try {
      await stop(frontend);
    } finally {
      await stop(backend);
    }
    throw error;
  }

  return {
    backendUrl,
    frontendUrl,
    formatOutput: () => formatOutput(backend, frontend, stoppedBackendOutput),
    async stopBackend() {
      const child = backend;
      backend = undefined;
      await stop(child);
      stoppedBackendOutput = child?.output.join("") ?? stoppedBackendOutput;
    },
    async waitForBackendUnavailable() {
      await waitForUnavailable(backendUrl);
    },
    async close() {
      if (closed) return;
      closed = true;
      try {
        await stop(frontend);
      } finally {
        await stop(backend);
      }
    },
  };
}

async function reservePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Could not reserve a port");
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  );
  return address.port;
}

function start(command, args, env) {
  const child = spawn(command, args, {
    cwd: repositoryRoot,
    env,
    detached: process.platform !== "win32",
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.output = [];
  child.outputSize = 0;
  for (const stream of [child.stdout, child.stderr]) {
    stream.setEncoding("utf8");
    stream.on("data", (chunk) => {
      child.output.push(chunk);
      child.outputSize += chunk.length;
      while (child.outputSize > 12_000 && child.output.length > 1) {
        child.outputSize -= child.output.shift().length;
      }
    });
  }
  return child;
}

async function waitForHttp(url, child, description) {
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`${description} exited before becoming ready:\n${child.output.join("")}`);
    }
    try {
      await fetch(url, { signal: AbortSignal.timeout(2_000) });
      return;
    } catch {
      await delay(250);
    }
  }
  throw new Error(`${description} did not become ready:\n${child.output.join("")}`);
}

async function waitForUnavailable(url) {
  const deadline = Date.now() + 5_000;
  while (Date.now() < deadline) {
    try {
      await fetch(url, { signal: AbortSignal.timeout(500) });
      await delay(100);
    } catch {
      return;
    }
  }
  throw new Error(`Controlled backend is still reachable at ${url} after shutdown`);
}

async function stop(child) {
  if (!child || child.exitCode !== null) return;
  if (process.platform === "win32") child.kill("SIGTERM");
  else {
    try {
      process.kill(-child.pid, "SIGTERM");
    } catch (error) {
      if (error.code === "ESRCH") return;
      throw error;
    }
  }
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    delay(5_000).then(() => {
      if (child.exitCode === null) {
        if (process.platform === "win32") child.kill("SIGKILL");
        else process.kill(-child.pid, "SIGKILL");
      }
    }),
  ]);
}

function formatOutput(backend, frontend, stoppedBackendOutput) {
  return [
    `Controlled backend output:\n${backend?.output.join("") ?? stoppedBackendOutput}`,
    `Next.js output:\n${frontend?.output.join("") ?? ""}`,
  ].join("\n");
}
