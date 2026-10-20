# Collectivity resource measurement harness

The landing repository contains the timed same-origin HTTP driver, production Strapi launcher, and resource sampler for the local split-host profile described in [collectivity-resource-measurement.md](./collectivity-resource-measurement.md). Fixture preparation lives in the backend repository beside the schema and Sfax fixture it uses.

## Fixture boundary

Prepare or reset the standard 25-project fixture from the backend checkout:

```bash
npm run resource:measurement:prepare -- \
  --count 25 \
  --manifest /tmp/carbon-cut-resource-sessions.json \
  --report /tmp/carbon-cut-resource-summary.json
```

The script runs `npm run test:integration:verify-db`, independently checks `current_database()` through PostgreSQL, then boots Strapi in test mode and checks the connection again before writes. It recreates only its reserved `resource-measurement-01..100@example.invalid` accounts when their organization marker matches the fixture. Each session gets its own user, direct-grant subscription, project, inventory, and stored successful calculation based on the Sfax inventory. Re-running the command resets the same slug namespace and produces a fresh local manifest with disposable credentials. The report records the backend commit, database server version and size, fixture row counts and relation sizes, payload bytes, project slugs, and the reset command. Do not run another integration suite against that database during measurement. The manifest is written with owner-only permissions and should not be committed.

Example `sessions.json` shape:

```json
[
  {
    "identifier": "resource-user-01@example.invalid",
    "password": "local-disposable-password",
    "projectSlug": "resource-project-01",
    "inventoryInput": {}
  }
]
```

Replace `inventoryInput` with the real Sfax-sized inventory payload. Each session must point to a different project record. The driver does not print passwords, tokens, or request bodies.

## Production Strapi launcher

Set `INTEGRATION_BACKEND_DIR` if the backend checkout is not `../carbon-cut-backend`. The launcher loads the backend `.env` without overriding values already exported in the shell. It runs the backend's database verifier with `NODE_ENV=test`, independently checks `SELECT current_database()` through the backend's PostgreSQL client, and starts Strapi with `NODE_ENV=production`. It maps only `DATABASE_TEST_*` into `DATABASE_*`, clears `DATABASE_URL`, and disables test auth support and seeding. Before returning control, it waits for Strapi health and confirms a live connection from the configured database user appeared in `pg_stat_activity` after startup. Do not launch this beside an integration suite using the same database.

```bash
node scripts/resource-measurement/start-production-strapi.mjs
```

Build Next.js first, then start it separately with `npm run start` and its same-origin API configuration pointing to the production Strapi URL. Keep MSW disabled.

## Timed driver

```bash
node scripts/resource-measurement/driver.mjs \
  --manifest ./local-resource-sessions.json \
  --url http://127.0.0.1:3000 \
  --sessions 1 --warmup 15 --duration 60 \
  --think-min 800 --think-max 3000 --calculate-every 12
```

The script authenticates one separate cookie jar per worker, then smoke-checks the project inventory read, draft save, calculation persistence against the project ID, and stored result read before timed traffic. It then mixes periodic sign-ins and session reads, project page navigation, inventory reads, draft saves, calculations and stored result reads through the Next.js API routes. A successful calculation is followed by a result read. It writes JSON Lines raw samples and a JSON summary with operation counts, request rates, p50/p95/p99 latency, errors, and individual calculation durations. Run bounded steps with `--sessions 1`, `3`, `5`, and `10`; retain the fixture state between equivalent runs and reset it before reproducibility checks. Pass `--timeout` to change the per-request timeout from 30 seconds, and `--output` and `--report` to choose artifact paths. The script has no fixed pass/fail latency threshold.

## Resource sampler

The sampler records WSL CPU, available memory and swap, Next.js/Strapi/driver process count, CPU and RSS, Windows PostgreSQL process CPU and working set, Windows physical-disk time and queue counters where available, and PostgreSQL database size, active connections, block reads/hits and row activity. It checks `current_database()` against `DATABASE_TEST_NAME` before sampling. The sampler's own CPU, RSS, and sampling duration are included so its overhead is visible. On machines running another Next.js development server, pass the production Next and Strapi root PIDs with `--next-pid` and `--strapi-pid` so unrelated processes are excluded. The driver is discovered by command line unless `--driver-pid` is supplied.

Start it in a separate terminal while the production services are running. Use a short idle baseline first, then run it alongside each driver step. Give every phase a separate output file and fixed interval:

```bash
node scripts/resource-measurement/sample-resources.mjs \
  --phase idle-baseline --duration 60 --interval 5 --output ./measurement/idle.jsonl
node scripts/resource-measurement/sample-resources.mjs \
  --phase active-1 --duration 180 --interval 5 --output ./measurement/active-1.jsonl
```

To scope process readings, add `--next-pid <production-next-root-pid> --strapi-pid <production-strapi-root-pid>` to each sampler command. These should be the root process IDs whose child process trees own the measured services.

For each active phase, start the driver with the same duration and the matching session count in another terminal. Repeat for 1, 3, 5, and 10 sessions, then reset fixtures before rerunning an interesting step. Use one sampler process per phase; its period is measured in seconds and samples contain UTC timestamps. Keep the driver and sampler in WSL for this initial run, and report their recorded overhead alongside application use. The Windows disk counters are omitted with an `unavailable` value when the host does not expose the English performance-counter paths.

## Local split-host scope

This profile measures Next.js and Strapi in WSL with PostgreSQL on Windows. It is a local split-host estimate. It does not establish all-in-one Docker resource requirements or a supported-user guarantee. The URL-based driver can target the later Docker stack, but that equivalent container run has not been demonstrated. Keep Docker and candidate Hetzner results separately labelled when those runs happen.
