import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import os from "node:os";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import nextEnv from "@next/env";

const args = parseArgs(process.argv.slice(2));
const backendDir = resolve(process.env.INTEGRATION_BACKEND_DIR ?? "../carbon-cut-backend");
nextEnv.loadEnvConfig(process.cwd());
const requireBackend = createRequire(resolve(backendDir, "package.json"));
requireBackend("dotenv").config({
  path: resolve(backendDir, ".env"),
  override: false,
  quiet: true,
});
const durationSeconds = positiveInt(args.duration, 300, "duration");
const intervalSeconds = positiveInt(args.interval, 5, "interval");
const outputPath =
  args.output ?? `resource-samples-${new Date().toISOString().replaceAll(":", "-")}.jsonl`;
const phase = args.phase ?? "measurement";
const expectedPids = {
  next: args["next-pid"] === undefined ? null : positiveInt(args["next-pid"], 0, "next-pid"),
  strapi:
    args["strapi-pid"] === undefined ? null : positiveInt(args["strapi-pid"], 0, "strapi-pid"),
  driver:
    args["driver-pid"] === undefined ? null : positiveInt(args["driver-pid"], 0, "driver-pid"),
};
const required = [
  "DATABASE_TEST_HOST",
  "DATABASE_TEST_PORT",
  "DATABASE_TEST_NAME",
  "DATABASE_TEST_USERNAME",
  "DATABASE_TEST_PASSWORD",
];
for (const name of required)
  if (!process.env[name]) fail(`${name} is required to collect database metrics.`);
if ((process.env.DATABASE_TEST_CLIENT ?? "postgres") !== "postgres")
  fail("The sampler requires the PostgreSQL test database.");

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
const identity = await database.query("SELECT current_database() AS name");
if (identity.rows[0]?.name !== process.env.DATABASE_TEST_NAME) {
  await database.end();
  fail(
    `Database connection reached ${identity.rows[0]?.name ?? "unknown"}; expected DATABASE_TEST_NAME.`
  );
}
await writeFile(outputPath, "");

const startTime = Date.now();
const endTime = startTime + durationSeconds * 1000;
let previousSystemCpu = await readSystemCpu();
let previousSampleCompletedAt = Date.now();
let previousProcTicks = new Map();
let previousWindowsCpu = new Map();
let previousSamplerCpu = process.cpuUsage();
let seenPids = new Set();
let sampleNumber = 0;
let interrupted = false;
process.once("SIGINT", () => {
  interrupted = true;
});

try {
  while (!interrupted && Date.now() < endTime) {
    const sampledAt = new Date().toISOString();
    const startedAt = Date.now();
    const [systemCpu, memory, processes, databaseStats, windowsTelemetry] = await Promise.all([
      readSystemCpu(),
      readMemory(),
      readProcesses(expectedPids),
      readDatabaseStats(database),
      sampleWindowsPostgres(),
    ]);
    const sampleCompletedAt = Date.now();
    const elapsedSeconds = Math.max((sampleCompletedAt - previousSampleCompletedAt) / 1000, 0.001);
    const samplingDurationMs = sampleCompletedAt - startedAt;
    const processGroups = groupProcesses(processes, previousProcTicks, elapsedSeconds, seenPids);
    const windowsPostgres = summarizeWindowsPostgres(
      windowsTelemetry.postgres,
      previousWindowsCpu,
      elapsedSeconds
    );
    const samplerCpu = process.cpuUsage(previousSamplerCpu);
    const record = {
      sampledAt,
      phase,
      intervalSeconds,
      wsl: {
        logicalCpuCount: os.cpus().length,
        cpuPercent: cpuPercent(previousSystemCpu, systemCpu),
        ...memory,
        processes: processGroups.groups,
        observedProcessStarts: processGroups.starts,
      },
      windows: { postgresProcesses: windowsPostgres, diskCounters: windowsTelemetry.disk },
      postgres: databaseStats,
      sampler: {
        pid: process.pid,
        samplingDurationMs,
        cpuPercentOfOneLogicalCpu: Number(
          (((samplerCpu.user + samplerCpu.system) / 1_000_000 / elapsedSeconds) * 100).toFixed(2)
        ),
        rssBytes: process.memoryUsage().rss,
      },
    };
    await writeFile(outputPath, `${JSON.stringify(record)}\n`, { flag: "a" });
    previousSystemCpu = systemCpu;
    previousProcTicks = new Map(processes.map((proc) => [proc.pid, proc.cpuTicks]));
    previousWindowsCpu = new Map(windowsTelemetry.postgres.map((proc) => [proc.Id, proc.CPU]));
    previousSamplerCpu = process.cpuUsage();
    previousSampleCompletedAt = sampleCompletedAt;
    seenPids = new Set([...seenPids, ...processes.map((proc) => proc.pid)]);
    sampleNumber += 1;
    const nextSampleAt = startTime + sampleNumber * intervalSeconds * 1000;
    await sleep(Math.max(0, Math.min(nextSampleAt - Date.now(), endTime - Date.now())));
  }
} finally {
  await database.end();
}
console.log(
  JSON.stringify(
    {
      output: outputPath,
      phase,
      database: identity.rows[0].name,
      requestedDurationSeconds: durationSeconds,
      intervalSeconds,
      samples: sampleNumber,
      interrupted,
    },
    null,
    2
  )
);

async function readSystemCpu() {
  const contents = await readFile("/proc/stat", "utf8");
  const cpu = contents.split("\n", 1)[0].trim().split(/\s+/).slice(1).map(Number);
  return { total: cpu.reduce((sum, value) => sum + value, 0), idle: cpu[3] + (cpu[4] ?? 0) };
}
function cpuPercent(previous, current) {
  const total = current.total - previous.total;
  const idle = current.idle - previous.idle;
  return total > 0 ? Number((((total - idle) / total) * 100).toFixed(2)) : null;
}
async function readMemory() {
  const values = Object.fromEntries(
    (await readFile("/proc/meminfo", "utf8")).split("\n").flatMap((line) => {
      const match = line.match(/^(MemTotal|MemAvailable|SwapTotal|SwapFree):\s+(\d+) kB$/);
      return match ? [[match[1], Number(match[2]) * 1024]] : [];
    })
  );
  return {
    totalMemoryBytes: values.MemTotal ?? null,
    availableMemoryBytes: values.MemAvailable ?? null,
    swapTotalBytes: values.SwapTotal ?? null,
    swapUsedBytes:
      values.SwapTotal === undefined ? null : values.SwapTotal - (values.SwapFree ?? 0),
  };
}
async function readProcesses(expectedPids) {
  const candidates = [];
  const ticksPerSecond = 100;
  for (const entry of await readdir("/proc")) {
    if (!/^\d+$/.test(entry)) continue;
    try {
      const [stat, cmdline, status] = await Promise.all([
        readFile(`/proc/${entry}/stat`, "utf8"),
        readFile(`/proc/${entry}/cmdline`),
        readFile(`/proc/${entry}/status`, "utf8"),
      ]);
      const closingParen = stat.lastIndexOf(")");
      const fields = stat
        .slice(closingParen + 2)
        .trim()
        .split(/\s+/);
      const pid = Number(entry);
      const command =
        cmdline.toString().replaceAll("\0", " ").trim() ||
        stat.slice(stat.indexOf("(") + 1, closingParen);
      const rss = status.match(/^VmRSS:\s+(\d+) kB$/m);
      candidates.push({
        pid,
        ppid: Number(fields[1]),
        command,
        cpuTicks: Number(fields[11]) + Number(fields[12]),
        ticksPerSecond,
        rssBytes: rss ? Number(rss[1]) * 1024 : null,
      });
    } catch {
      // Process exited while /proc was being sampled.
    }
  }
  const byPid = new Map(candidates.map((proc) => [proc.pid, proc]));
  return candidates.flatMap((proc) => {
    const category = ["next", "strapi", "driver"].find((name) => {
      const rootPid = expectedPids[name];
      if (rootPid) return isProcessDescendant(proc.pid, rootPid, byPid);
      if (name === "driver") return proc.command.includes("resource-measurement/driver.mjs");
      if (name === "next") return /next-server|(?:^|\s|\/)next(?:\s|\/|$)/i.test(proc.command);
      return /strapi(?:\s|\/|$)/i.test(proc.command);
    });
    return category ? [{ ...proc, category, command: proc.command.slice(0, 220) }] : [];
  });
}
function isProcessDescendant(pid, rootPid, byPid) {
  let current = byPid.get(pid);
  for (let depth = 0; current && depth < 32; depth += 1) {
    if (current.pid === rootPid) return true;
    current = byPid.get(current.ppid);
  }
  return false;
}
function groupProcesses(processes, previousTicks, elapsedSeconds, alreadySeen) {
  const groups = {};
  const starts = {};
  for (const category of ["next", "strapi", "driver"]) {
    const items = processes.filter((proc) => proc.category === category);
    const cpu = items.reduce((sum, proc) => {
      const prior = previousTicks.get(proc.pid);
      return (
        sum +
        (prior === undefined
          ? 0
          : ((proc.cpuTicks - prior) / proc.ticksPerSecond / elapsedSeconds) * 100)
      );
    }, 0);
    groups[category] = {
      processCount: items.length,
      cpuPercentOfOneLogicalCpu: Number(cpu.toFixed(2)),
      rssBytes: items.reduce((sum, proc) => sum + (proc.rssBytes ?? 0), 0),
      pids: items.map((proc) => proc.pid),
    };
    starts[category] = items.filter((proc) => !alreadySeen.has(proc.pid)).length;
  }
  return { groups, starts };
}
async function readDatabaseStats(client) {
  const result = await client.query(`
    SELECT current_database() AS database_name,
           pg_database_size(current_database()) AS database_size_bytes,
           stats.numbackends AS active_connections,
           stats.blks_read AS blocks_read,
           stats.blks_hit AS blocks_hit,
           stats.tup_returned AS rows_returned,
           stats.tup_fetched AS rows_fetched,
           stats.tup_inserted AS rows_inserted,
           stats.tup_updated AS rows_updated,
           stats.tup_deleted AS rows_deleted
    FROM pg_stat_database AS stats
    WHERE stats.datname = current_database()
  `);
  return result.rows[0] ?? null;
}
function sampleWindowsPostgres() {
  const command =
    "$p=Get-Process -Name postgres -ErrorAction SilentlyContinue | Select-Object Id,CPU,WorkingSet64; $d=@(); try {$d=Get-Counter -Counter @('\\PhysicalDisk(_Total)\\% Disk Time','\\PhysicalDisk(_Total)\\Avg. Disk Queue Length') -ErrorAction Stop | Select-Object -ExpandProperty CounterSamples | Select-Object Path,CookedValue} catch {$d=@(@{unavailable=$_.Exception.Message})}; ConvertTo-Json -Compress -Depth 4 -InputObject @{postgres=@($p);disk=@($d)}";
  const result = spawnSync(
    process.env.POWERSHELL ?? "powershell.exe",
    ["-NoProfile", "-NonInteractive", "-Command", command],
    { encoding: "utf8", timeout: 4000, windowsHide: true }
  );
  if (result.error || result.status !== 0) {
    const unavailable = {
      unavailable: result.error?.message ?? result.stderr.trim() ?? "PowerShell returned an error",
    };
    return { postgres: [unavailable], disk: unavailable };
  }
  try {
    const parsed = JSON.parse(result.stdout.trim() || "[]");
    return {
      postgres: (parsed.postgres ?? []).map((item) => ({
        Id: Number(item.Id),
        CPU: Number(item.CPU ?? 0),
        WorkingSet64: Number(item.WorkingSet64 ?? 0),
      })),
      disk: parsed.disk ?? [],
    };
  } catch (error) {
    const unavailable = { unavailable: `Could not parse PowerShell output: ${error.message}` };
    return { postgres: [unavailable], disk: unavailable };
  }
}
function summarizeWindowsPostgres(processes, previousCpu, elapsedSeconds) {
  if (processes[0]?.unavailable) return processes[0];
  return {
    processCount: processes.length,
    cpuPercentOfOneLogicalCpu: Number(
      processes
        .reduce((sum, item) => {
          const previous = previousCpu.get(item.Id);
          return (
            sum + (previous === undefined ? 0 : ((item.CPU - previous) / elapsedSeconds) * 100)
          );
        }, 0)
        .toFixed(2)
    ),
    workingSetBytes: processes.reduce((sum, item) => sum + item.WorkingSet64, 0),
    pids: processes.map((item) => item.Id),
  };
}
function parseArgs(values) {
  const result = {};
  for (let index = 0; index < values.length; index += 1) {
    if (!values[index].startsWith("--")) fail(`Unexpected argument: ${values[index]}`);
    const key = values[index].slice(2);
    if (key === "help") {
      console.log(
        "node scripts/resource-measurement/sample-resources.mjs [--duration SEC] [--interval SEC] [--phase LABEL] [--next-pid PID] [--strapi-pid PID] [--driver-pid PID] [--output FILE]"
      );
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
function sleep(milliseconds) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, milliseconds));
}
