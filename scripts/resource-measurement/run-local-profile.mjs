#!/usr/bin/env node

import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const landingDir = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}
if (process.platform !== "linux") fail("The local resource profile requires Linux or WSL2.");

const backendDir = resolve(args["backend-dir"] ?? resolve(landingDir, "../carbon-cut-backend"));
const manifest = resolve(args.manifest ?? "/tmp/carbon-cut-resource-sessions.json");
const outputDir = resolve(
  args["output-dir"] ?? `./measurement-${new Date().toISOString().replaceAll(":", "-")}`
);
const nextUrl = new URL(args["next-url"] ?? "http://127.0.0.1:3010");
const backendUrl = args["backend-url"] ?? "http://127.0.0.1:1338";
const nextPort = positiveInt(args["next-port"], Number(nextUrl.port || 3010), "next-port");
const strapiPort = positiveInt(args["strapi-port"], 1338, "strapi-port");
const warmup = positiveInt(args.warmup, 15, "warmup");
const duration = positiveInt(args.duration, 60, "duration");
const interval = positiveInt(args.interval, 5, "interval");
const cooldown = nonNegativeInt(args.cooldown, 120, "cooldown");
const thinkMin = positiveInt(args["think-min"], 800, "think-min");
const thinkMax = positiveInt(args["think-max"], 3000, "think-max");
const calculateEvery = positiveInt(args["calculate-every"], 12, "calculate-every");
const fixtureCount = positiveInt(args["fixture-count"], 25, "fixture-count");
const profileSteps = [
  { label: "active-1", sessions: 1 },
  { label: "active-3", sessions: 3 },
  { label: "active-5", sessions: 5 },
  { label: "active-10", sessions: 10 },
  { label: "active-3-repeat", sessions: 3, reset: true },
];
const estimatedSeconds =
  120 + // two 60-second idle samples
  profileSteps.length * (warmup + duration + 30) +
  (profileSteps.length - 1) * cooldown +
  180; // build, fixture preparation and service startup allowance
if (thinkMax < thinkMin) fail("--think-max must be greater than or equal to --think-min.");
if (args.plan) {
  console.log(
    JSON.stringify(
      {
        estimatedMinutes: Math.ceil(estimatedSeconds / 60),
        buildProductionNext: true,
        prepareFixtures: fixtureCount,
        startProductionStrapi: true,
        startProductionNext: true,
        idleSamples: ["pre-run-idle", "post-load-idle"],
        profiles: profileSteps,
        cooldownSecondsBetweenProfiles: cooldown,
        outputDir,
        cleanup: "Stop only child process groups started by this runner.",
      },
      null,
      2
    )
  );
  process.exit(0);
}
const runStartedAt = new Date().toISOString();
const completedRuns = [];

await mkdir(outputDir, { recursive: true });
console.log(
  `Starting local resource profile. Estimated run time: about ${Math.ceil(estimatedSeconds / 60)} minutes. Output: ${outputDir}`
);

const children = new Set();
let interrupted = false;
let cleaning = null;
let stepIndex = 0;
const onSignal = (signal) => {
  interrupted = true;
  console.error(`\nReceived ${signal}; stopping measurement and owned services.`);
  cleaning ??= stopChildren(signal);
};
process.once("SIGINT", () => onSignal("SIGINT"));
process.once("SIGTERM", () => onSignal("SIGTERM"));

try {
  const buildEnv = {
    ...process.env,
    NEXT_PUBLIC_ENABLE_MSW: "false",
    NEXT_PUBLIC_APP_URL: nextUrl.origin,
    BACKEND_URL: backendUrl,
  };
  await runCommand("npm", ["run", "build"], { cwd: landingDir, env: buildEnv });

  await resetFixtures("initial");

  const strapi = startOwnedProcess(
    process.execPath,
    [resolve(landingDir, "scripts/resource-measurement/start-production-strapi.mjs")],
    {
      cwd: landingDir,
      env: {
        ...process.env,
        INTEGRATION_BACKEND_DIR: backendDir,
        HOST: "127.0.0.1",
        PORT: String(strapiPort),
      },
    }
  );

  const next = startOwnedProcess(
    "npm",
    ["run", "start", "--", "--hostname", "127.0.0.1", "--port", String(nextPort)],
    {
      cwd: landingDir,
      env: {
        ...process.env,
        NODE_ENV: "production",
        NEXT_PUBLIC_ENABLE_MSW: "false",
        NEXT_PUBLIC_APP_URL: nextUrl.origin,
        BACKEND_URL: backendUrl,
      },
    }
  );

  await waitForNext(nextUrl, next);
  console.log(
    `Production Next.js is ready at ${nextUrl.origin}; waiting for Strapi startup confirmation.`
  );
  // The launcher prints only after its health check and live database connection check pass.
  await waitForOutputMarker(strapi, "Running Strapi confirmed a live PostgreSQL connection");

  const idleBefore = await runIdleSampler("pre-run-idle");
  for (const [index, step] of profileSteps.entries()) {
    stepIndex = index + 1;
    if (step.reset) await resetFixtures("repeat");
    console.log(
      `Profile ${stepIndex}/${profileSteps.length}: ${step.sessions} session${step.sessions === 1 ? "" : "s"}${step.reset ? " after fixture reset" : ""}.`
    );
    const result = await runProfile(step, next.pid, strapi.pid);
    completedRuns.push(result);
    if (index < profileSteps.length - 1) await waitCooldown(cooldown);
  }
  const idleAfter = await runIdleSampler("post-load-idle");

  const finalReport = {
    startedAt: runStartedAt,
    completedAt: new Date().toISOString(),
    nextUrl: nextUrl.origin,
    backendDir,
    fixtureManifest: manifest,
    options: {
      warmup,
      duration,
      interval,
      cooldown,
      thinkMin,
      thinkMax,
      calculateEvery,
      fixtureCount,
    },
    idleBefore,
    runs: completedRuns,
    idleAfter,
  };
  await writeFile(
    resolve(outputDir, "run-report.json"),
    `${JSON.stringify(finalReport, null, 2)}\n`
  );
  console.log(
    `All profiles passed artifact checks. Report: ${resolve(outputDir, "run-report.json")}`
  );
} catch (error) {
  console.error(`Measurement stopped at profile ${stepIndex || "setup"}: ${error.message}`);
  try {
    await writeFile(
      resolve(outputDir, "run-failure.json"),
      `${JSON.stringify({ startedAt: runStartedAt, failedAt: new Date().toISOString(), failedProfileIndex: stepIndex, error: error.message, completedRuns }, null, 2)}\n`
    );
  } catch (reportError) {
    console.error(`Could not write run-failure.json: ${reportError.message}`);
  }
  process.exitCode = 1;
} finally {
  await (cleaning ?? stopChildren("SIGTERM"));
  if (interrupted) process.exitCode = 130;
}

async function resetFixtures(label) {
  console.log(`Preparing ${fixtureCount} isolated measurement fixtures (${label}).`);
  const report = resolve(outputDir, `fixture-${label}.json`);
  await runCommand(
    "npm",
    [
      "run",
      "resource:measurement:prepare",
      "--",
      "--count",
      String(fixtureCount),
      "--manifest",
      manifest,
      "--report",
      report,
    ],
    { cwd: backendDir, env: process.env }
  );
}

async function runIdleSampler(label) {
  const output = resolve(outputDir, `${label}-resources.jsonl`);
  console.log(`Sampling ${label} for 60 seconds.`);
  await runCommand(
    process.execPath,
    [
      resolve(landingDir, "scripts/resource-measurement/sample-resources.mjs"),
      "--phase",
      label,
      "--duration",
      "60",
      "--interval",
      String(interval),
      "--output",
      output,
    ],
    { cwd: landingDir, env: { ...process.env, INTEGRATION_BACKEND_DIR: backendDir } }
  );
  return { output };
}

async function runProfile(step, nextPid, strapiPid) {
  const httpOutput = resolve(outputDir, `${step.label}-http.jsonl`);
  const summaryOutput = resolve(outputDir, `${step.label}-summary.json`);
  const resourcesOutput = resolve(outputDir, `${step.label}-resources.jsonl`);
  const samplerDuration = warmup + duration + 30;
  const samplerArgs = [
    resolve(landingDir, "scripts/resource-measurement/sample-resources.mjs"),
    "--phase",
    step.label,
    "--duration",
    String(samplerDuration),
    "--interval",
    String(interval),
    "--next-pid",
    String(nextPid),
    "--strapi-pid",
    String(strapiPid),
    "--output",
    resourcesOutput,
  ];
  const driverArgs = [
    resolve(landingDir, "scripts/resource-measurement/driver.mjs"),
    "--manifest",
    manifest,
    "--url",
    nextUrl.origin,
    "--sessions",
    String(step.sessions),
    "--warmup",
    String(warmup),
    "--duration",
    String(duration),
    "--think-min",
    String(thinkMin),
    "--think-max",
    String(thinkMax),
    "--calculate-every",
    String(calculateEvery),
    "--output",
    httpOutput,
    "--report",
    summaryOutput,
  ];
  const env = { ...process.env, INTEGRATION_BACKEND_DIR: backendDir };
  const sampler = startOwnedProcess(process.execPath, samplerArgs, { cwd: landingDir, env });
  await delay(1000);
  const driver = startOwnedProcess(process.execPath, driverArgs, { cwd: landingDir, env });
  await Promise.all([waitForChild(sampler), waitForChild(driver)]);
  const validation = await validateProfile(step, httpOutput, summaryOutput);
  return { ...step, httpOutput, summaryOutput, resourcesOutput, validation };
}

async function validateProfile(step, httpPath, summaryPath) {
  const [lines, summaryText] = await Promise.all([
    readFile(httpPath, "utf8"),
    readFile(summaryPath, "utf8"),
  ]);
  const rows = lines
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  const summary = JSON.parse(summaryText);
  const measured = rows.filter((row) => row.phase === "measurement");
  const expectedCount = Object.values(summary.operations).reduce(
    (count, operation) => count + operation.requests,
    0
  );
  if (measured.length !== expectedCount)
    throw new Error(
      `${basename(httpPath)} has ${measured.length} timed rows; summary reports ${expectedCount}.`
    );
  if (
    Object.values(summary.operations).some((operation) => operation.errors > 0) ||
    measured.some((row) => row.error || row.status < 200 || row.status >= 400)
  ) {
    throw new Error(`${basename(httpPath)} contains timed request errors.`);
  }
  if (
    !measured.some((row) => row.operation === "sign-in" && row.status >= 200 && row.status < 300)
  ) {
    throw new Error(`${basename(httpPath)} has no successful timed sign-in.`);
  }
  let overlapVerified = false;
  if (step.sessions >= 3) {
    const calculations = measured.filter((row) => row.operation === "calculation");
    overlapVerified = calculations.some((left) =>
      calculations.some(
        (right) =>
          left.worker === 2 &&
          right.worker === 3 &&
          left.projectSlug !== right.projectSlug &&
          intervalsOverlap(left, right)
      )
    );
    if (!overlapVerified)
      throw new Error(
        `${basename(httpPath)} has no overlapping calculations on separate projects.`
      );
  }
  return {
    measuredRequests: measured.length,
    timedErrors: 0,
    successfulTimedSignIn: true,
    overlapVerified,
  };
}

function intervalsOverlap(left, right) {
  const leftEnd = Date.parse(left.time);
  const rightEnd = Date.parse(right.time);
  const leftStart = leftEnd - left.durationMs;
  const rightStart = rightEnd - right.durationMs;
  return leftStart < rightEnd && rightStart < leftEnd;
}

async function waitForNext(url, nextProcess) {
  const deadline = Date.now() + 120000;
  let lastStatus = "no response";
  while (Date.now() < deadline) {
    if (interrupted) throw new Error("Interrupted while waiting for Next.js.");
    if (nextProcess.spawnError) throw nextProcess.spawnError;
    if (nextProcess.exitCode !== null || nextProcess.signalCode !== null) {
      throw new Error("Next.js exited before becoming ready.");
    }
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
      lastStatus = `HTTP ${response.status}`;
      if (response.status < 500) return;
    } catch (error) {
      lastStatus = error.message;
    }
    await delay(1000);
  }
  throw new Error(`Next.js did not become ready within 120 seconds (${lastStatus}).`);
}

async function waitForOutputMarker(child, marker) {
  const deadline = Date.now() + 120000;
  while (Date.now() < deadline) {
    if (interrupted || child.spawnError || child.exitCode !== null || child.signalCode !== null)
      throw new Error("Strapi launcher exited before readiness.");
    if (child.output.includes(marker)) return;
    await delay(250);
  }
  throw new Error(
    "Strapi launcher did not confirm its test-database connection within 120 seconds."
  );
}

async function waitCooldown(seconds) {
  if (!seconds) return;
  console.log(`Authentication cooldown: ${seconds} seconds.`);
  const until = Date.now() + seconds * 1000;
  let lastNotice = seconds;
  while (Date.now() < until) {
    if (interrupted) throw new Error("Interrupted during authentication cooldown.");
    const remaining = Math.ceil((until - Date.now()) / 1000);
    if (remaining <= lastNotice - 30) {
      lastNotice = remaining;
      console.log(`${remaining} seconds until the next profile.`);
    }
    await delay(Math.min(1000, until - Date.now()));
  }
}

function startOwnedProcess(command, commandArgs, options) {
  const child = spawn(command, commandArgs, {
    ...options,
    stdio: ["ignore", "pipe", "pipe"],
    detached: process.platform !== "win32",
  });
  child.output = "";
  child.spawnError = null;
  child.once("error", (error) => {
    child.spawnError = error;
  });
  const collect = (chunk) => {
    const text = chunk.toString();
    child.output = (child.output + text).slice(-16000);
  };
  child.stdout.on("data", collect);
  child.stderr.on("data", collect);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  children.add(child);
  child.once("exit", () => children.delete(child));
  return child;
}

function waitForChild(child) {
  return new Promise((resolveExit, rejectExit) => {
    if (child.spawnError) {
      rejectExit(child.spawnError);
      return;
    }
    if (child.exitCode !== null) {
      if (child.exitCode === 0) resolveExit();
      else rejectExit(new Error(`Child exited with ${child.exitCode}.`));
      return;
    }
    child.once("error", rejectExit);
    child.once("exit", (code, signal) => {
      if (code === 0) resolveExit();
      else rejectExit(new Error(`Child ${child.pid} exited with ${signal ?? code}.`));
    });
  });
}

async function runCommand(command, commandArgs, options) {
  const child = startOwnedProcess(command, commandArgs, options);
  return waitForChild(child);
}

async function stopChildren(signal) {
  const active = [...children];
  for (const child of active) {
    try {
      if (process.platform === "win32") child.kill(signal);
      else process.kill(-child.pid, signal);
    } catch (error) {
      if (error.code !== "ESRCH")
        console.error(`Could not stop child ${child.pid}: ${error.message}`);
    }
  }
  await Promise.race([
    Promise.all(
      active.map(
        (child) =>
          new Promise((resolveStop) => {
            if (child.exitCode !== null || child.signalCode !== null) return resolveStop();
            child.once("exit", resolveStop);
          })
      )
    ),
    delay(10000),
  ]);
  for (const child of active) {
    if (child.exitCode !== null || child.signalCode !== null) continue;
    try {
      if (process.platform === "win32") child.kill("SIGKILL");
      else process.kill(-child.pid, "SIGKILL");
    } catch (error) {
      if (error.code !== "ESRCH")
        console.error(`Could not force-stop child ${child.pid}: ${error.message}`);
    }
  }
}

function parseArgs(values) {
  const parsed = {};
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith("--")) fail(`Unexpected argument: ${value}`);
    const key = value.slice(2);
    parsed[key] =
      values[index + 1]?.startsWith("--") || values[index + 1] === undefined
        ? true
        : values[++index];
  }
  return parsed;
}
function positiveInt(value, fallback, name) {
  const number = value === undefined || value === true ? fallback : Number(value);
  if (!Number.isInteger(number) || number < 1) fail(`--${name} must be a positive integer.`);
  return number;
}
function nonNegativeInt(value, fallback, name) {
  const number = value === undefined || value === true ? fallback : Number(value);
  if (!Number.isInteger(number) || number < 0) fail(`--${name} must be a non-negative integer.`);
  return number;
}
function delay(ms) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}
function fail(message) {
  console.error(message);
  process.exit(1);
}
function printHelp() {
  console.log(`Usage: npm run resource:measurement:run -- [options]

Builds production Next.js, prepares the backend test database, starts production
Strapi and Next.js, samples idle and active resources, runs 1/3/5/10/3 sessions,
resets fixtures for the repeat, validates each trace, and stops only owned services.

Options:
  --backend-dir PATH       Backend checkout (default: ../carbon-cut-backend)
  --manifest PATH          Local fixture credentials (default: /tmp/carbon-cut-resource-sessions.json)
  --output-dir PATH        Artifact directory (default: ./measurement-<timestamp>)
  --next-url URL           Next.js URL (default: http://127.0.0.1:3010)
  --backend-url URL        Strapi URL for Next.js (default: http://127.0.0.1:1338)
  --next-port PORT         Next.js port (defaults to the port in --next-url)
  --strapi-port PORT       Strapi port (default: 1338)
  --fixture-count N        Distinct fixtures to prepare (default: 25)
  --warmup SEC             Warm-up per profile (default: 15)
  --duration SEC           Measured window (default: 60)
  --interval SEC           Resource sample interval (default: 5)
  --cooldown SEC           Delay between profiles (default: 120)
  --plan                   Print the run plan and estimate without starting services or resetting fixtures
  --think-min MS           Driver minimum think time (default: 800)
  --think-max MS           Driver maximum think time (default: 3000)
  --calculate-every N      Calculate after this many actions (default: 12)`);
}
