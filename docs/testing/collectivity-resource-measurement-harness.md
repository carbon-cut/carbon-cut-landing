# Collectivity resource measurement harness

This repository contains the timed same-origin HTTP driver and the production Strapi launcher for the local split-host profile described in [collectivity-resource-measurement.md](./collectivity-resource-measurement.md).

## Fixture boundary

The driver expects disposable production-authenticated users and one distinct, pre-created project per session. The manifest contains an inventory payload for each project. This checkout does not own Strapi's database schema or the backend-owned Sfax inventory fixture, so it does not create/reset database rows. Prepare and reset fixtures through the backend repository's reviewed fixture tooling, after running `npm run test:integration:verify-db` there. Do not run another integration suite against that database during measurement. Keep credentials in an ignored local file and never commit the manifest.

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

Export `INTEGRATION_BACKEND_DIR` and the verified `DATABASE_TEST_HOST`, `DATABASE_TEST_PORT`, `DATABASE_TEST_NAME`, `DATABASE_TEST_USERNAME`, and `DATABASE_TEST_PASSWORD`. Optionally set `DATABASE_TEST_CLIENT` and `DATABASE_TEST_SSL`. The launcher runs the backend's database verifier with `NODE_ENV=test`, independently checks `SELECT current_database()` using `psql` and the explicit test credentials, then starts Strapi with `NODE_ENV=production`, maps those explicit test connection values into `DATABASE_*`, clears `DATABASE_URL`, and disables test auth support and seeding. Strapi must report its active connection points to `DATABASE_TEST_NAME` before fixture writes. Do not launch this beside an integration suite using the same database.

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

The driver process runs in the same WSL environment as the applications, so measure its resource use or run it on a separate host before attributing all observed WSL pressure to Next.js and Strapi. Database, host, application, and system resource sampling remains an operator responsibility for this first pass.
