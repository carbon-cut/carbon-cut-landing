import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const backendDir = resolve(process.env.INTEGRATION_BACKEND_DIR ?? "../carbon-cut-backend");
const requireBackend = createRequire(resolve(backendDir, "package.json"));
requireBackend("dotenv").config({
  path: resolve(backendDir, ".env"),
  override: false,
  quiet: true,
});
const requiredDatabaseVariables = [
  "DATABASE_TEST_HOST",
  "DATABASE_TEST_PORT",
  "DATABASE_TEST_NAME",
  "DATABASE_TEST_USERNAME",
  "DATABASE_TEST_PASSWORD",
];
for (const name of requiredDatabaseVariables) {
  if (!process.env[name]) {
    throw new Error(`${name} must be exported explicitly for the production measurement process.`);
  }
}
if (process.env.DATABASE_TEST_NAME === process.env.DATABASE_NAME) {
  throw new Error("Test and normal database names must differ before launching production Strapi.");
}
if ((process.env.DATABASE_TEST_CLIENT ?? "postgres") !== "postgres") {
  throw new Error("The resource measurement launcher only supports PostgreSQL test databases.");
}
if (process.env.DATABASE_URL) {
  console.warn("Ignoring DATABASE_URL for the production measurement process.");
}

function run(command, commandArgs, env, cwd = backendDir) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, commandArgs, { cwd, env, stdio: "inherit" });
    child.once("error", rejectRun);
    child.once("exit", (code, signal) => {
      if (code === 0) resolveRun();
      else
        rejectRun(new Error(`${command} ${commandArgs.join(" ")} exited with ${signal ?? code}`));
    });
  });
}

const verifyEnv = { ...process.env, NODE_ENV: "test" };
console.log(
  `Verifying the backend test database before production launch (database: ${process.env.DATABASE_TEST_NAME}).`
);
await run("npm", ["run", "test:integration:verify-db"], verifyEnv);
const { Client } = requireBackend("pg");
const database = new Client({
  host: process.env.DATABASE_TEST_HOST,
  port: Number(process.env.DATABASE_TEST_PORT),
  database: process.env.DATABASE_TEST_NAME,
  user: process.env.DATABASE_TEST_USERNAME,
  password: process.env.DATABASE_TEST_PASSWORD,
  ssl: process.env.DATABASE_TEST_SSL === "true",
  connectionTimeoutMillis: 10000,
});
await database.connect();
const databaseCheck = await database.query("SELECT current_database() AS name");
await database.end();
const connectedDatabase = databaseCheck.rows[0]?.name;
if (connectedDatabase !== process.env.DATABASE_TEST_NAME) {
  throw new Error(
    `The verified PostgreSQL connection returned ${connectedDatabase ?? "unknown"}; expected ${process.env.DATABASE_TEST_NAME}.`
  );
}
console.log(`Independent PostgreSQL check confirmed current_database() = ${connectedDatabase}.`);

const productionEnv = {
  ...process.env,
  NODE_ENV: "production",
  DATABASE_CLIENT: process.env.DATABASE_TEST_CLIENT ?? "postgres",
  DATABASE_HOST: process.env.DATABASE_TEST_HOST,
  DATABASE_PORT: process.env.DATABASE_TEST_PORT,
  DATABASE_NAME: process.env.DATABASE_TEST_NAME,
  DATABASE_USERNAME: process.env.DATABASE_TEST_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_TEST_PASSWORD,
  DATABASE_URL: "",
  AUTH_TEST_SUPPORT_ENABLED: "false",
  DEV_INTEGRATION_SEED_ENABLED: "false",
  NEXT_PUBLIC_ENABLE_MSW: "false",
};
if (process.env.DATABASE_TEST_SSL !== undefined)
  productionEnv.DATABASE_SSL = process.env.DATABASE_TEST_SSL;
console.log(
  `Starting production Strapi against verified test database ${process.env.DATABASE_TEST_NAME}.`
);
const connectionProbe = new Client({
  host: process.env.DATABASE_TEST_HOST,
  port: Number(process.env.DATABASE_TEST_PORT),
  database: process.env.DATABASE_TEST_NAME,
  user: process.env.DATABASE_TEST_USERNAME,
  password: process.env.DATABASE_TEST_PASSWORD,
  ssl: process.env.DATABASE_TEST_SSL === "true",
  connectionTimeoutMillis: 10000,
});
await connectionProbe.connect();
const launchedAt = new Date();
const server = spawn("npm", ["run", "start"], {
  cwd: backendDir,
  env: productionEnv,
  stdio: "inherit",
});
server.once("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.once("exit", (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});
try {
  await waitForProductionDatabaseConnection(server, connectionProbe, launchedAt);
  console.log(`Running Strapi confirmed a live PostgreSQL connection to ${connectedDatabase}.`);
  await connectionProbe.end();
} catch (error) {
  server.kill("SIGTERM");
  await connectionProbe.end();
  throw error;
}
const stop = (signal) => {
  if (server.exitCode === null) server.kill(signal);
};
process.once("SIGINT", () => stop("SIGINT"));
process.once("SIGTERM", () => stop("SIGTERM"));

async function waitForProductionDatabaseConnection(serverProcess, probe, launchedAt) {
  const port = Number(process.env.PORT ?? 1337);
  const healthUrl = `http://127.0.0.1:${port}/_health`;
  const deadline = Date.now() + 120000;
  while (Date.now() < deadline) {
    if (serverProcess.exitCode !== null || serverProcess.signalCode !== null) {
      throw new Error(
        "Production Strapi exited before the database connection could be confirmed."
      );
    }
    try {
      const health = await fetch(healthUrl, { signal: AbortSignal.timeout(2000) });
      if (health.status === 204) {
        const result = await probe.query(
          `SELECT count(*)::integer AS connections
           FROM pg_stat_activity
           WHERE datname = $1
             AND usename = $2
             AND backend_start >= $3
             AND pid <> pg_backend_pid()`,
          [process.env.DATABASE_TEST_NAME, process.env.DATABASE_TEST_USERNAME, launchedAt]
        );
        if (result.rows[0]?.connections > 0) return;
      }
    } catch {
      // Strapi or its database pool may still be starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 1000));
  }
  throw new Error(
    `Production Strapi did not expose ${healthUrl} and a matching live connection to ${process.env.DATABASE_TEST_NAME} within 120 seconds.`
  );
}
