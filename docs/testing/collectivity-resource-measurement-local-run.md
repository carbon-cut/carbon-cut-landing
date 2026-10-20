# Collectivity local resource measurement

**Classification:** local split-host estimate. These results describe this workstation and workload, not an all-in-one Docker or Hetzner capacity claim.

## Environment and fixture

- Run date: 2026-10-20. WSL2 Ubuntu on Windows 11 Pro 10.0.26200 (build 26200).
- WSL kernel: `6.18.54.1-microsoft-standard-WSL2`; Node.js `v20.19.4`; npm `11.6.2`.
- Host: 16 logical CPUs, 27.9 GiB physical RAM. WSL reported 13.6 GiB memory and 4 GiB swap.
- Topology: built Next.js production server and production Strapi in WSL; PostgreSQL 16.3 on Windows. Strapi used the verified `carbon_cut_test` database. The database verifier and independent `current_database()` checks passed before fixture writes and production Strapi startup.
- Backend pool settings from `config/database.ts`: min 2, max 10. No backend pool instrumentation was added.
- Source revisions: the production Next.js build used landing commit `b7feb7c6`; the measurement harness and report are in landing commit `3f4921c8`. Production Strapi used backend commit `33ccbc7e`; the fixture-preparation tool is in backend commit `81178ede`.
- Fixture: 25 distinct users, projects, inventories, subscriptions, claims, quotes, calculation runs and results. Each project used an 18,292-byte Sfax inventory input (457,300 bytes total input). The first fixture report recorded an 82,964,963-byte database; the reset before the repeat run recorded 84,365,795 bytes. Persisted calculations increased database size during measurement. Fixture row counts were recreated and checked before the repeat run.
- Next.js was built in production mode with MSW disabled. Each step used a 15-second warm-up, then a requested 60-second timed interval, think time of 800–3,000 ms, and one calculation action per twelve actions. Smoke checks verified sign-in, inventory read/save, calculation persistence to the expected project, changed result run ID, stored result read, session read and project navigation.
- All readings are warm-process measurements: services were already running and each timed window followed a warm-up. The repeated three-session step reset fixture rows and credentials but did not restart services or clear OS/database caches.

## Load summary

| Step                      | Timed seconds | Requests | Aggregate requests/s | Errors |
| ------------------------- | ------------: | -------: | -------------------: | -----: |
| 1 session                 |         60.10 |       28 |                 0.47 |      0 |
| 3 sessions                |         62.82 |       90 |                 1.43 |      0 |
| 5 sessions                |         61.53 |      155 |                 2.52 |      0 |
| 10 sessions               |         61.93 |      312 |                 5.04 |      0 |
| 3 sessions, fixture reset |         62.33 |       95 |                 1.52 |      0 |

## Operation results

Times are milliseconds. Full request counts, request rates, p50/p95/p99, calculation durations and error records are in the JSON summaries and JSONL files listed below.

| Step                      | Key results (operation: requests, p50/p95/p99 ms)                                                                                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 session                 | inventory read: 11, 34.06/39.93/39.93; navigation: 5, 179.97/254.24/254.24; draft save: 7, 57.20/83.53/83.53; session: 3, 6.95/7.34/7.34; calculation: 1, 150.77/150.77/150.77; result: 1, 39.54/39.54/39.54            |
| 3 sessions                | inventory read: 40, 30.44/39.76/79.91; navigation: 18, 141.01/193.15/193.15; draft save: 12, 47.62/129.31/129.31; session: 12, 4.96/28.78/28.78; calculation: 4, 129.85/188.62/188.62; result: 4, 33.38/44.54/44.54     |
| 5 sessions                | inventory read: 63, 27.01/67.05/102.89; navigation: 28, 134.98/202.12/225.50; draft save: 30, 47.09/102.43/132.49; session: 18, 4.52/49.62/49.62; calculation: 8, 141.87/200.47/200.47; result: 8, 35.98/54.46/54.46    |
| 10 sessions               | inventory read: 137, 31.50/97.29/122.57; navigation: 56, 145.95/255.17/398.51; draft save: 57, 53.39/223.64/245.50; session: 36, 4.74/34.83/54.70; calculation: 13, 171.81/237.51/237.51; result: 13, 40.39/95.20/95.20 |
| 3 sessions, fixture reset | inventory read: 41, 31.04/46.08/60.91; navigation: 17, 147.05/253.80/253.80; draft save: 17, 50.57/79.36/79.36; session: 12, 4.75/65.88/65.88; calculation: 4, 129.58/175.20/175.20; result: 4, 33.11/34.86/34.86       |

## Resource samples

Samples were taken every 5 seconds. Active-step resource rows include samples whose timestamps fall between that driver's recorded timed-window start and completion; warm-up and post-load tail samples remain in the raw files but are excluded from these averages. Individual process CPU is percent of one logical CPU; WSL CPU is the whole WSL environment. Available memory is average / minimum observed.

| Step                      | Samples | WSL CPU avg / peak | WSL available memory avg / min | Swap used avg | Next CPU / RSS avg | Strapi CPU / RSS avg | PostgreSQL CPU / working set avg | Disk time / queue avg | DB connections avg | Driver CPU avg |
| ------------------------- | ------: | -----------------: | -----------------------------: | ------------: | -----------------: | -------------------: | -------------------------------: | --------------------: | -----------------: | -------------: |
| Idle baseline             |      12 |      11.5% / 12.3% |              3,692 / 3,624 MiB |       774 MiB |     0.0% / 249 MiB |       0.1% / 354 MiB |                    0.0% / 90 MiB |         1.22% / 0.024 |                3.0 |              — |
| 1 session                 |      12 |      12.0% / 13.9% |              3,675 / 3,596 MiB |       773 MiB |     4.4% / 267 MiB |       1.4% / 333 MiB |                    0.0% / 91 MiB |         0.94% / 0.019 |                3.0 |           0.3% |
| 3 sessions                |      13 |      12.7% / 13.7% |              3,625 / 3,550 MiB |       773 MiB |     8.3% / 288 MiB |       4.4% / 356 MiB |                   0.0% / 105 MiB |         0.87% / 0.017 |                3.2 |           0.7% |
| 5 sessions                |      12 |      12.5% / 14.1% |              3,507 / 3,408 MiB |       773 MiB |    11.4% / 320 MiB |       5.6% / 368 MiB |                   0.0% / 130 MiB |         1.62% / 0.032 |                4.5 |           1.3% |
| 10 sessions               |      13 |      14.7% / 17.9% |              3,432 / 3,251 MiB |       773 MiB |    20.4% / 438 MiB |      11.9% / 371 MiB |                   0.0% / 103 MiB |         0.73% / 0.015 |                5.8 |           2.4% |
| 3 sessions, fixture reset |      13 |      12.8% / 14.4% |              3,543 / 3,479 MiB |       773 MiB |     9.5% / 316 MiB |       3.9% / 362 MiB |                   0.0% / 110 MiB |         1.09% / 0.022 |                3.5 |           0.7% |

The available `Get-Process` CPU resolution reported 0.0% for Windows PostgreSQL during these windows; its working set and Windows disk counters were available. The sampler consumed about 1.8–2.1% of one logical CPU during active windows and is reported as overhead. WSL-wide CPU includes ambient activity. Process readings were scoped to production Next and Strapi trees to exclude an unrelated Next development server. No app restarts, request errors or timeouts occurred. Latency rose at ten sessions, especially for draft saves and navigation, but this short run does not establish a capacity threshold.

## Artifacts and commands

- Owner-only fixture credentials: `/tmp/carbon-cut-resource-sessions.json` (do not commit or share).
- Durable fixture reports, driver summaries, and raw timing/resource samples are in [`artifacts/collectivity-resource-measurement-2026-10-20`](./artifacts/collectivity-resource-measurement-2026-10-20/). The Windows hostname in performance-counter paths is redacted; measurements and counter names are unchanged. The local `/tmp` copies remain available on the measurement machine.
- Fixture reset: `npm run resource:measurement:prepare -- --count 25 --manifest /tmp/carbon-cut-resource-sessions.json --report /tmp/carbon-cut-resource-summary-repeat.json` from the backend checkout.
- Production Next build: `NEXT_PUBLIC_ENABLE_MSW=false BACKEND_URL=http://127.0.0.1:1338 NEXT_PUBLIC_APP_URL=http://127.0.0.1:3010 npm run build`.
- Production Strapi: `INTEGRATION_BACKEND_DIR=/home/lenovo/projects/carbon-cut-backend HOST=127.0.0.1 PORT=1338 node scripts/resource-measurement/start-production-strapi.mjs`.
- Production Next start: `NODE_ENV=production NEXT_PUBLIC_ENABLE_MSW=false NEXT_PUBLIC_APP_URL=http://localhost:3010 BACKEND_URL=http://127.0.0.1:1338 npm run start -- --hostname :: --port 3010`.
- Driver: `node scripts/resource-measurement/driver.mjs --manifest /tmp/carbon-cut-resource-sessions.json --url http://localhost:3010 --sessions N --warmup 15 --duration 60 --think-min 800 --think-max 3000 --calculate-every 12 --output /tmp/carbon-cut-active-N-http.jsonl --report /tmp/carbon-cut-active-N-summary.json`.
- Resource sampler: `node scripts/resource-measurement/sample-resources.mjs --phase LABEL --duration 100 --interval 5 --next-pid NEXT_PID --strapi-pid STRAPI_PID --output /tmp/carbon-cut-active-LABEL-resources.jsonl`.

## Limits and next evidence

Timed traffic omitted subscription purchase, quote and project setup journeys; their records only provide realistic entitlement data. This used PostgreSQL on Windows with Next.js and Strapi in WSL, not the planned Docker images. No candidate Hetzner VM was tested. It covers short windows on one workstation and cannot project registered-user counts or guarantee support for a stated number of users. Preserve the raw files while the issue is open; rerun against the pinned Docker stack when available and label that result separately.
