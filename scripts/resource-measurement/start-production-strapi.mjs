import { spawn, spawnSync } from "node:child_process";
import { resolve } from "node:path";

const backendDir = resolve(process.env.INTEGRATION_BACKEND_DIR ?? "../carbon-cut-backend");
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
const databaseCheck = spawnSync("psql", ["-X", "-A", "-t", "-c", "SELECT current_database()"], {
  encoding: "utf8",
  env: {
    ...process.env,
    PGHOST: process.env.DATABASE_TEST_HOST,
    PGPORT: process.env.DATABASE_TEST_PORT,
    PGDATABASE: process.env.DATABASE_TEST_NAME,
    PGUSER: process.env.DATABASE_TEST_USERNAME,
    PGPASSWORD: process.env.DATABASE_TEST_PASSWORD,
    ...(process.env.DATABASE_TEST_SSL === undefined
      ? {}
      : { PGSSLMODE: process.env.DATABASE_TEST_SSL === "true" ? "require" : "disable" }),
  },
});
if (databaseCheck.error || databaseCheck.status !== 0) {
  throw new Error(
    `Could not independently verify the PostgreSQL test connection with psql: ${databaseCheck.error?.message ?? databaseCheck.stderr.trim()}`
  );
}
const connectedDatabase = databaseCheck.stdout.trim();
if (connectedDatabase !== process.env.DATABASE_TEST_NAME) {
  throw new Error(
    `The verified PostgreSQL connection returned ${connectedDatabase}; expected ${process.env.DATABASE_TEST_NAME}.`
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

const server = spawn("npm", ["run", "start"], {
  cwd: backendDir,
  env: productionEnv,
  stdio: "inherit",
});
const stop = (signal) => {
  if (server.exitCode === null) server.kill(signal);
};
process.once("SIGINT", () => stop("SIGINT"));
process.once("SIGTERM", () => stop("SIGTERM"));
server.once("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.once("exit", (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});
