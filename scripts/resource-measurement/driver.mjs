import { appendFile, readFile, writeFile } from "node:fs/promises";
import { randomInt } from "node:crypto";

const args = parseArgs(process.argv.slice(2));
const manifestPath = args.manifest ?? process.env.RESOURCE_MEASUREMENT_MANIFEST;
if (!manifestPath) fail("Pass --manifest with disposable session credentials and project slugs.");
const baseUrl = new URL(
  args.url ?? process.env.RESOURCE_MEASUREMENT_URL ?? "http://127.0.0.1:3000"
);
const sessions = JSON.parse(await readFile(manifestPath, "utf8"));
if (!Array.isArray(sessions) || sessions.length === 0)
  fail("Manifest must be a non-empty JSON array.");
for (const [index, session] of sessions.entries()) {
  if (!session.identifier || !session.password || !session.projectSlug || !session.inventoryInput) {
    fail(`Manifest entry ${index} needs identifier, password, projectSlug, and inventoryInput.`);
  }
}
const activeSessions = positiveInt(args.sessions, sessions.length, "sessions");
if (activeSessions > sessions.length)
  fail(`Requested ${activeSessions} sessions, manifest has ${sessions.length}.`);
const durationSeconds = positiveInt(args.duration, 60, "duration");
const warmupSeconds = positiveInt(args.warmup, 15, "warmup");
const minThinkMs = positiveInt(args["think-min"], 800, "think-min");
const maxThinkMs = positiveInt(args["think-max"], 3000, "think-max");
if (maxThinkMs < minThinkMs) fail("--think-max must be at least --think-min.");
const calculateEvery = positiveInt(args["calculate-every"], 12, "calculate-every");
const outputPath =
  args.output ?? `resource-measurement-${new Date().toISOString().replaceAll(":", "-")}.jsonl`;
const records = [];
let stopping = false;
process.once("SIGINT", () => {
  stopping = true;
});

function endpoint(session, suffix = "") {
  return `/api/collectivity/projects/${encodeURIComponent(session.projectSlug)}/current-inventory${suffix}`;
}

async function request(session, operation, path, init = {}) {
  const startedAt = new Date();
  const start = performance.now();
  let status = 0;
  let error = null;
  let responseBody = null;
  try {
    const headers = new Headers(init.headers);
    if (init.body) headers.set("content-type", "application/json");
    if (session.cookie) headers.set("cookie", session.cookie);
    const response = await fetch(new URL(path, baseUrl), {
      ...init,
      headers,
      signal: AbortSignal.timeout(Number(args.timeout ?? 30000)),
    });
    status = response.status;
    const setCookies =
      response.headers.getSetCookie?.() ??
      (response.headers.get("set-cookie") ? [response.headers.get("set-cookie")] : []);
    for (const setCookie of setCookies) {
      const [pair, ...attributes] = setCookie.split(";");
      const separator = pair.indexOf("=");
      if (separator < 1) continue;
      const name = pair.slice(0, separator).trim();
      const value = pair.slice(separator + 1).trim();
      if (
        value === "" ||
        attributes.some((attribute) => attribute.trim().toLowerCase() === "max-age=0")
      ) {
        session.cookies.delete(name);
      } else {
        session.cookies.set(name, value);
      }
    }
    session.cookie = [...session.cookies].map(([name, value]) => `${name}=${value}`).join("; ");
    const responseText = await response.text();
    try {
      responseBody = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseBody = null;
    }
    if (!response.ok) error = responseText.slice(0, 1000);
  } catch (cause) {
    error = cause instanceof Error ? cause.message : String(cause);
  }
  const record = {
    time: startedAt.toISOString(),
    worker: session.worker,
    projectSlug: session.projectSlug,
    operation,
    durationMs: Number((performance.now() - start).toFixed(2)),
    status,
    error,
    phase: currentPhase,
  };
  records.push(record);
  await appendFile(outputPath, `${JSON.stringify(record)}\n`);
  if (error) console.error(`${operation} failed (${status || "network"}): ${error}`);
  return { ...record, body: responseBody };
}

async function signIn(session) {
  const record = await request(session, "sign-in", "/api/auth/sign-in", {
    method: "POST",
    body: JSON.stringify({ identifier: session.identifier, password: session.password }),
  });
  if (record.status !== 200) throw new Error(`Sign-in failed for worker ${session.worker}.`);
}

let currentPhase = "setup";
await writeFile(outputPath, "");
const workers = sessions
  .slice(0, activeSessions)
  .map((session, index) => ({ ...session, cookies: new Map(), worker: index + 1 }));
await Promise.all(workers.map(signIn));

for (const session of workers) {
  const inventory = await request(session, "smoke-inventory-read", endpoint(session));
  if (inventory.status !== 200 || inventory.body?.data?.project?.slug !== session.projectSlug) {
    throw new Error(
      `Inventory smoke check did not return the expected project for worker ${session.worker}.`
    );
  }
  const save = await request(session, "smoke-draft-save", endpoint(session, "/input"), {
    method: "PUT",
    body: JSON.stringify({ inventoryInput: session.inventoryInput }),
  });
  if (save.status !== 200)
    throw new Error(`Draft smoke check failed for worker ${session.worker}.`);
  const previousResult = await request(
    session,
    "smoke-previous-result-read",
    endpoint(session, "/result")
  );
  if (previousResult.status !== 200 || !previousResult.body?.data?.calculationRunId)
    throw new Error(`Fixture needs an existing stored result for worker ${session.worker}.`);
  const calculation = await request(session, "smoke-calculation", endpoint(session, "/calculate"), {
    method: "POST",
    body: JSON.stringify({ inventoryInput: session.inventoryInput }),
  });
  if (
    calculation.status !== 200 ||
    String(calculation.body?.data?.resultData?.project) !==
      String(inventory.body?.data?.project?.id)
  ) {
    throw new Error(`Calculation smoke check failed for worker ${session.worker}.`);
  }
  const result = await request(session, "smoke-result-read", endpoint(session, "/result"));
  if (
    result.status !== 200 ||
    !result.body?.data?.calculationRunId ||
    result.body.data.calculationRunId === previousResult.body.data.calculationRunId
  )
    throw new Error(`Stored result smoke check failed for worker ${session.worker}.`);
  const sessionRead = await request(session, "smoke-session-read", "/api/auth/session");
  if (sessionRead.status !== 200)
    throw new Error(`Session smoke check failed for worker ${session.worker}.`);
  const projectPage = await request(
    session,
    "smoke-project-navigation",
    `/collectivity/projects/${encodeURIComponent(session.projectSlug)}/ghg-inventory`
  );
  if (projectPage.status !== 200)
    throw new Error(`Project navigation smoke check failed for worker ${session.worker}.`);
}

async function doAction(session, sequence) {
  if (sequence % 50 === 0) return signIn(session);
  if (sequence % 8 === 0) return request(session, "session-read", "/api/auth/session");
  if (sequence % 5 === 0) {
    return request(
      session,
      "project-navigation",
      `/collectivity/projects/${encodeURIComponent(session.projectSlug)}/ghg-inventory`
    );
  }
  const roll =
    sequence % calculateEvery === 0 ? "calculate" : randomInt(0, 10) < 3 ? "save" : "read";
  if (roll === "read") return request(session, "inventory-read", endpoint(session));
  if (roll === "save")
    return request(session, "draft-save", endpoint(session, "/input"), {
      method: "PUT",
      body: JSON.stringify({ inventoryInput: session.inventoryInput }),
    });
  const calculation = await request(session, "calculation", endpoint(session, "/calculate"), {
    method: "POST",
    body: JSON.stringify({ inventoryInput: session.inventoryInput }),
  });
  if (calculation.status === 200)
    await request(session, "result-read", endpoint(session, "/result"));
  return calculation;
}

async function runWindow(seconds, phase) {
  currentPhase = phase;
  const deadline = Date.now() + seconds * 1000;
  await Promise.all(
    workers.map(async (session) => {
      let sequence = randomInt(1, calculateEvery);
      while (!stopping && Date.now() < deadline) {
        await doAction(session, sequence++);
        const think = randomInt(minThinkMs, maxThinkMs + 1);
        await new Promise((resolve) => setTimeout(resolve, think));
      }
    })
  );
}

const warmupStarted = Date.now();
await runWindow(warmupSeconds, "warmup");
const warmupCompleted = Date.now();
const timedStart = records.length;
const measurementStarted = Date.now();
await runWindow(durationSeconds, "measurement");
const elapsedSeconds = Math.max((Date.now() - measurementStarted) / 1000, 0.001);
const measured = records.slice(timedStart);
const byOperation = measured.reduce((groups, record) => {
  (groups[record.operation] ??= []).push(record);
  return groups;
}, {});
const summary = Object.fromEntries(
  Object.entries(byOperation).map(([operation, items]) => {
    const durations = items.map((item) => item.durationMs).sort((a, b) => a - b);
    return [
      operation,
      {
        requests: items.length,
        requestsPerSecond: Number((items.length / elapsedSeconds).toFixed(3)),
        errors: items.filter((item) => item.error || item.status < 200 || item.status >= 300)
          .length,
        p50Ms: percentile(durations, 0.5),
        p95Ms: percentile(durations, 0.95),
        p99Ms: percentile(durations, 0.99),
        calculationDurationMs: operation === "calculation" ? durations : undefined,
      },
    ];
  })
);
const report = {
  baseUrl: baseUrl.origin,
  sessions: activeSessions,
  requestedWarmupSeconds: warmupSeconds,
  actualWarmupSeconds: Number(((warmupCompleted - warmupStarted) / 1000).toFixed(2)),
  warmupStartedAt: new Date(warmupStarted).toISOString(),
  warmupCompletedAt: new Date(warmupCompleted).toISOString(),
  requestedMeasurementSeconds: durationSeconds,
  actualMeasurementSeconds: Number(elapsedSeconds.toFixed(2)),
  thinkTimeMs: [minThinkMs, maxThinkMs],
  calculateEveryActions: calculateEvery,
  startedAt: new Date(measurementStarted).toISOString(),
  completedAt: new Date().toISOString(),
  operations: summary,
  rawSamples: outputPath,
};
const reportPath = args.report ?? outputPath.replace(/\.jsonl$/, "-summary.json");
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));

function percentile(sorted, quantile) {
  if (!sorted.length) return null;
  return sorted[Math.min(sorted.length - 1, Math.ceil(quantile * sorted.length) - 1)];
}
function parseArgs(values) {
  const result = {};
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith("--")) fail(`Unexpected argument: ${value}`);
    const key = value.slice(2);
    if (key === "help") {
      printHelp();
      process.exit(0);
    }
    result[key] =
      values[index + 1]?.startsWith("--") || values[index + 1] === undefined
        ? true
        : values[++index];
  }
  return result;
}
function positiveInt(value, fallback, name) {
  const parsed = value === undefined || value === true ? fallback : Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) fail(`--${name} must be a positive integer.`);
  return parsed;
}
function fail(message) {
  console.error(message);
  process.exit(1);
}
function printHelp() {
  console.log(
    "node scripts/resource-measurement/driver.mjs --manifest sessions.json [--url URL] [--sessions N] [--warmup SEC] [--duration SEC] [--think-min MS] [--think-max MS] [--calculate-every N] [--timeout MS] [--output FILE] [--report FILE]"
  );
}
