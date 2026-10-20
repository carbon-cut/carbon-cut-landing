# Collectivity local resource measurement

**Classification:** local split-host estimate. These results describe this workstation and workload, not an all-in-one Docker or Hetzner capacity claim.

## Environment and fixture

- Run date: 2026-10-20. WSL2 Ubuntu on Windows 11 Pro 10.0.26200 (build 26200).
- WSL kernel: `6.18.54.1-microsoft-standard-WSL2`; Node.js `v20.19.4`; npm `11.6.2`.
- Host: 16 logical CPUs, 27.9 GiB physical RAM. WSL reported 13.6 GiB memory and 4 GiB swap.
- Topology: production Next.js and production Strapi ran in WSL; PostgreSQL 16.3 ran on Windows. Strapi's live connection was verified as `carbon_cut_test` before its start. Fixture preparation ran the backend test-database verifier and independently checked `current_database()` before writing. The existing dev server and other databases were not used.
- Backend pool settings from `config/database.ts`: min 2, max 10. No backend pool instrumentation was added.
- Source revisions: production Next.js build from landing commit `4ae16661`; the one-session driver run used landing commit `d23057b9`; the multi-session and reset-repeat driver runs used landing commit `1b42ce49` (which adds the overlapping-calculation barrier, unused by the one-session run); fixture preparation and production Strapi used backend commit `81178ede`.
- Fixture: 25 distinct synthetic users, projects, inventories, subscriptions, claims, quotes, calculation runs, and results. Each project used an 18,292-byte Sfax inventory input (457,300 bytes total). The initial fixture reset measured the database at 86,831,587 bytes; the reset before the repeat measured 87,765,475 bytes. Persisted calculations increased database size over the run. Fixture row counts were recreated and verified before the repeat.
- Next.js was built in production mode with MSW disabled. Each load step requested a 15-second warm-up and 60-second measured window, used 800–3,000 ms think time, and attempted a calculation every twelve actions. Actual durations are reported below and in each JSON summary. Smoke checks covered sign-in, inventory read/save, calculation persistence to the expected project, changed result run ID, stored-result read, session read, and project navigation.
- Timed traffic included one sign-in, session reads, project navigation, inventory reads, draft saves, calculations, and stored-result reads. The sign-in was scheduled after the account's observed authentication cooldown while its worker continued normal actions. In each multi-session timed window, workers 2 and 3 began calculations together on separate projects; their request intervals overlap in the raw traces. The sign-in limiter required a cooldown between load steps; no backend limiter settings were changed.
- All readings are warm-process measurements: services were already running and each timed window followed a warm-up. The repeated three-session step reset fixture rows and credentials but did not restart services or clear OS/database caches.

## Load summary

| Step | Actual warm-up seconds | Timed seconds | Requests | Aggregate requests/s | Errors |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1 session | 16.55 | 60.40 | 31 | 0.51 | 0 |
| 3 sessions | 17.32 | 63.95 | 100 | 1.56 | 0 |
| 5 sessions | 17.33 | 62.02 | 157 | 2.53 | 0 |
| 10 sessions | 17.28 | 62.59 | 327 | 5.22 | 0 |
| 3 sessions, fixture reset | 17.70 | 62.55 | 103 | 1.65 | 0 |

## Operation results

Times are milliseconds. Entries show request count and p50/p95/p99. Full request rates, calculation durations, and error records are in the linked summaries and JSONL files.

| Step | Operation results |
| --- | --- |
| 1 session | sign-in 1, 100.23/100.23/100.23; session 3, 4.56/6.05/6.05; navigation 6, 175.01/207.23/207.23; inventory read 11, 30.28/40.17/40.17; draft save 6, 52.79/73.51/73.51; calculation 2, 123.31/170.60/170.60; result read 2, 25.22/39.68/39.68 |
| 3 sessions | sign-in 1, 116.54/116.54/116.54; session 11, 5.33/44.80/44.80; navigation 19, 167.37/308.99/308.99; inventory read 30, 30.44/42.70/50.61; draft save 25, 52.76/72.58/73.47; calculation 7, 163.06/254.30/448.32; result read 7, 37.40/95.89/95.89 |
| 5 sessions | sign-in 1, 129.43/129.43/129.43; session 16, 4.45/6.33/6.33; navigation 29, 137.41/350.03/350.67; inventory read 70, 26.95/40.03/79.61; draft save 21, 44.17/116.96/250.99; calculation 10, 112.95/399.00/445.85; result read 10, 27.61/47.43/47.43 |
| 10 sessions | sign-in 1, 117.24/117.24/117.24; session 38, 4.66/16.34/43.41; navigation 58, 133.11/250.02/274.70; inventory read 139, 28.25/106.52/136.22; draft save 57, 46.45/132.32/175.15; calculation 17, 130.99/340.87/340.87; result read 17, 31.31/107.96/107.96 |
| 3 sessions, fixture reset | sign-in 1, 101.37/101.37/101.37; session 12, 5.00/8.01/8.01; navigation 18, 165.05/310.31/310.31; inventory read 42, 28.35/47.79/80.80; draft save 18, 48.41/171.33/171.33; calculation 6, 166.50/297.73/297.73; result read 6, 33.73/52.53/52.53 |

## Resource samples

Resource samples were taken every 5 seconds. Active-step rows include samples timestamped between that driver's recorded timed-window start and completion; warm-up and post-window samples remain in raw files but are excluded from the averages. Process CPU is percent of one logical CPU; WSL CPU is the whole WSL environment. Available memory is average / minimum observed. PostgreSQL CPU was reported at 0.0% resolution by `Get-Process`; its working set and Windows disk counters were available.

| Step | Samples | WSL CPU avg / peak | WSL available MiB avg / min | Swap used avg | Next CPU / RSS avg | Strapi CPU / RSS avg | PostgreSQL CPU / working set avg | Disk time / queue avg | DB connections avg | Driver / sampler CPU avg |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Pre-run idle baseline | 12 | 11.5% / 12.3% | 3,692 / 3,624 | 774 MiB | 0.0% / 249 MiB | 0.1% / 354 MiB | 0.0% / 90 MiB | 1.22% / 0.024 | 3.0 | — / — |
| 1 session | 12 | 12.3% / 14.4% | 3,686 / 3,625 | 1,145 MiB | 2.7% / 317 MiB | 1.5% / 339 MiB | 0.0% / 106 MiB | 1.71% / 0.034 | 3.0 | 0.3% / 2.2% |
| 3 sessions | 13 | 12.8% / 14.7% | 3,604 / 3,552 | 1,145 MiB | 9.4% / 326 MiB | 4.2% / 357 MiB | 0.0% / 112 MiB | 0.98% / 0.020 | 3.2 | 0.9% / 2.0% |
| 5 sessions | 12 | 12.6% / 14.5% | 3,627 / 3,567 | 1,145 MiB | 10.1% / 343 MiB | 4.4% / 369 MiB | 0.0% / 116 MiB | 0.75% / 0.015 | 3.5 | 1.2% / 1.9% |
| 10 sessions | 12 | 14.4% / 15.8% | 3,463 / 3,297 | 1,145 MiB | 20.6% / 511 MiB | 10.1% / 369 MiB | 0.0% / 175 MiB | 1.49% / 0.030 | 6.1 | 2.6% / 1.9% |
| 3 sessions, fixture reset | 13 | 12.9% / 14.1% | 3,659 / 3,572 | 1,145 MiB | 9.5% / 342 MiB | 3.7% / 373 MiB | 0.0% / 113 MiB | 1.32% / 0.026 | 3.2 | 0.9% / 2.1% |
| Post-load idle | 12 | 11.5% / 12.7% | 3,699 / 3,619 | 1,145 MiB | 0.0% / 349 MiB | 1.7% / 338 MiB | 0.0% / 109 MiB | 1.11% / 0.022 | 3.0 | — / 2.1% |

PostgreSQL statistics are differences in cumulative `pg_stat_database` counters across each timed sampling window; the sampler's own queries and background database activity are included. The following are block reads / block hits, fetched rows, inserted / updated / deleted rows:

| Step | Blocks read / hit | Rows fetched | Rows inserted / updated / deleted |
| --- | ---: | ---: | ---: |
| 1 session | 0 / 3,476 | 1,013 | 37 / 7 / 19 |
| 3 sessions | 0 / 13,428 | 2,711 | 214 / 38 / 100 |
| 5 sessions | 0 / 18,091 | 3,744 | 219 / 38 / 89 |
| 10 sessions | 0 / 34,491 | 7,396 | 424 / 92 / 214 |
| 3 sessions, fixture reset | 0 / 16,226 | 5,218 | 147 / 96 / 65 |

The pre-run idle baseline was collected before the final production rebuild. WSL swap use rose after the build and remained around 1,145 MiB through the final load steps. The sampler used about 1.9–2.1% of one logical CPU during the final multi-session windows and is reported as overhead. WSL-wide CPU includes ambient activity. Process readings were scoped to the production Next and Strapi process trees to exclude an unrelated Next development server. No timed-window request errors, timeouts, or app restarts occurred. At ten sessions, draft-save p95 was 132 ms, navigation p95 was 250 ms, and calculation p95 was 341 ms; the latter includes two intentionally overlapping calculations on different projects. This short run does not establish a capacity threshold.

## Observed limiting resource

| Step | Observation |
| --- | --- |
| 1 session | No limiting resource observed. The driver's 0.3% CPU use and the WSL, PostgreSQL, and request metrics show headroom at this offered rate. |
| 3 sessions | No limiting resource observed. The driver used 0.9% of one CPU; WSL available memory stayed above 3,552 MiB and no requests failed. |
| 5 sessions | No limiting resource observed. The driver used 1.2% of one CPU; WSL available memory stayed above 3,567 MiB and no requests failed. |
| 10 sessions | No clear resource limit observed. This step had the highest app CPU and latency, while WSL available memory remained above 3,297 MiB, average PostgreSQL connections were 6.1 against a pool max of 10, disk pressure stayed low, and no requests failed. The Windows-host-wide CPU was not sampled, and the PostgreSQL process CPU counter has 0.0% resolution, so brief host CPU pressure cannot be ruled out. |
| 3 sessions, fixture reset | No limiting resource observed. The driver used 0.9% of one CPU; WSL available memory stayed above 3,572 MiB and no requests failed. |

The offered request rate was set by the scripted action loop and 800–3,000 ms think time; there is no evidence the driver CPU limited that schedule. The application/database request path became slower for some operations at higher concurrency, especially the intentionally overlapping calculations, but these short windows do not isolate a saturated component.

## Artifacts and commands

- Owner-only fixture credentials: `/tmp/carbon-cut-resource-sessions.json` (do not commit or share).
- Fixture reports, driver summaries, and raw timing/resource samples are in [`artifacts/collectivity-resource-measurement-2026-10-20`](./artifacts/collectivity-resource-measurement-2026-10-20/). The Windows hostname in performance-counter paths is redacted; measured values and counter names are unchanged. No credentials or authentication cookies are included.
- Fixture reset: `npm run resource:measurement:prepare -- --count 25 --manifest /tmp/carbon-cut-resource-sessions.json --report /tmp/carbon-cut-resource-summary-repeat.json` from the backend checkout.
- Production Next build: `NEXT_PUBLIC_ENABLE_MSW=false BACKEND_URL=http://127.0.0.1:1338 NEXT_PUBLIC_APP_URL=http://127.0.0.1:3010 npm run build`.
- Production Strapi: `INTEGRATION_BACKEND_DIR=/home/lenovo/projects/carbon-cut-backend HOST=127.0.0.1 PORT=1338 node scripts/resource-measurement/start-production-strapi.mjs`.
- Production Next start: `NODE_ENV=production NEXT_PUBLIC_ENABLE_MSW=false NEXT_PUBLIC_APP_URL=http://localhost:3010 BACKEND_URL=http://127.0.0.1:1338 npm run start -- --hostname :: --port 3010`.
- Driver: `node scripts/resource-measurement/driver.mjs --manifest /tmp/carbon-cut-resource-sessions.json --url http://localhost:3010 --sessions N --warmup 15 --duration 60 --think-min 800 --think-max 3000 --calculate-every 12 --output /tmp/carbon-cut-active-N-http.jsonl --report /tmp/carbon-cut-active-N-summary.json`.
- Resource sampler: `node scripts/resource-measurement/sample-resources.mjs --phase LABEL --duration 90 --interval 5 --next-pid NEXT_PID --strapi-pid STRAPI_PID --output /tmp/carbon-cut-active-LABEL-resources.jsonl`.

## Limits and next evidence

Timed traffic omitted subscription purchase, quote, and project setup journeys; their records only provide realistic entitlement data. The driver throttles timed reauthentication to respect the backend's existing sign-in rate limit. This used PostgreSQL on Windows with Next.js and Strapi in WSL, not the planned Docker images. No candidate Hetzner VM was tested. It covers short windows on one workstation and cannot project registered-user counts or guarantee support for a stated number of users. Preserve the raw files while the issue is open; rerun against the pinned Docker stack when available and label that result separately.
