# Test refactor final inventory

The frontend discovery baseline and its original file list are in [frontend-test-discovery-baseline.md](frontend-test-discovery-baseline.md). Detailed implementation dispositions are recorded in the linked issue comments below; this file summarizes the complete frontend/backend inventory and verification status.

## Discovery and commands

| Repository | Final discovery                                                                  | Focused commands                                                                                                               |
| ---------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Frontend   | 24 in-process Vitest files, 3 integration files, and 2 standalone browser checks | `npm run test`; `npm run test:integration:vitest`; `npm run test:integration:browser`; `npm run test:integration:browser:sfax` |
| Backend    | 35 Jest suites under `tests/`; no skipped or focused test declarations remain    | `npm test`; `npm run test:debug -- --runTestsByPath tests/carbon-footprint/collectivity/integration/sfax-inventory.test.js`    |

The combined connected command is `npm run test:integration:sfax`. It verifies the isolated backend database, runs the backend Sfax calculation and persisted-result test, starts Strapi and Next.js, then runs the browser Sfax comparison. The backend and browser commands remain independently selectable.

## Dispositions

### Frontend

- Authentication in-process and real integration tests moved under `tests/authentication/`; the recovery browser script moved under `tests/authentication/session-recovery/end-to-end/`. All original checks were retained.
- Collectivity in-process checks moved under `tests/collectivity/` by module and seam; the three mock-contract checks remain under `tests/collectivity/*/mock-contract/`. Shared test support and runtime mock fixtures remain support material, not executable tests.
- The locale middleware check moved under `tests/localization/`; Contact, Collectivity, and database-backed checks moved under their feature paths. The last legacy-root Collectivity integration test moved to `tests/collectivity/project-start/integration/` in #69.
- The Sfax browser end-to-end check was added in #68. The existing authentication recovery browser check remains.
- No original frontend executable test was removed or deferred. The unused French fixture, shared helpers, and runtime mock data remain classified as non-test material.

References: [#63](https://github.com/carbon-cut/carbon-cut-landing/issues/63), [#64](https://github.com/carbon-cut/carbon-cut-landing/issues/64), [#65](https://github.com/carbon-cut/carbon-cut-landing/issues/65), [#66](https://github.com/carbon-cut/carbon-cut-landing/issues/66), [#67](https://github.com/carbon-cut/carbon-cut-landing/issues/67), [#68](https://github.com/carbon-cut/carbon-cut-landing/issues/68), and [#69](https://github.com/carbon-cut/carbon-cut-landing/issues/69).

### Backend

| Original area                                                       | Disposition                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication and Collectivity access/Subscription suites (#12–13) | Retained and moved under feature/seam paths; all 2 authentication suites and all 24 original Collectivity cases remain.                                                                                                                                                                                                                                                                                                          |
| Project and Inventory suites (#14–15)                               | The mixed Project suite was split into focused setup, result, calculation, and parameter-selection checks; all 30 active Project cases remain. The stale skipped trees/parks/waste numeric case was removed with its obsolete seeded-default expectation documented. All 22 active Inventory input and preservation cases remain.                                                                                                |
| Calculation, results, and parameters (#16–17)                       | Current behavior checks moved under calculation-run, inventory-results, inventory, parameter, and engine paths. All 11 original active cases remain; the tautological source-row check was replaced with a distinct component-key assertion. Six cases hidden by the skipped parameter suite were accounted for: four resolver tests, one closest-year case added to tie-breaking coverage, and one active unit-conversion case. |
| Retired household and old calculation suites (#18)                  | Removed obsolete fixed-number calculation assertions, the empty Tunisia placeholder, the duplicate skipped Sfax test, and unregistered retired household-form tests/fixtures. Retained active route-retirement and normalization checks. No skipped test declarations remain under backend `tests/`.                                                                                                                             |
| Contact, configuration, and health (#19)                            | Contact and database-configuration checks moved and retained. The undiscovered health placeholder was removed because it only asserted Strapi global setup and duplicated active integration startup; Jest discovery stayed at 35 files.                                                                                                                                                                                         |
| Sfax comparison and integration (#20–21)                            | Added one shared comparator and its adapter check; replaced the old Sfax reporting assertion with the comparator. Added the standalone authenticated Sfax integration test. These are new checks, not removed original tests.                                                                                                                                                                                                    |

References: [backend #12](https://github.com/carbon-cut/carbon-cut-backend/issues/12), [#13](https://github.com/carbon-cut/carbon-cut-backend/issues/13), [#14](https://github.com/carbon-cut/carbon-cut-backend/issues/14), [#15](https://github.com/carbon-cut/carbon-cut-backend/issues/15), [#16](https://github.com/carbon-cut/carbon-cut-backend/issues/16), [#17](https://github.com/carbon-cut/carbon-cut-backend/issues/17), [#18](https://github.com/carbon-cut/carbon-cut-backend/issues/18), [#19](https://github.com/carbon-cut/carbon-cut-backend/issues/19), [#20](https://github.com/carbon-cut/carbon-cut-backend/issues/20), and [#21](https://github.com/carbon-cut/carbon-cut-backend/issues/21).

## Discovery snapshots

The frontend baseline below is the pre-migration tree at `cdc5dec9^`; its original list is also preserved in [frontend-test-discovery-baseline.md](frontend-test-discovery-baseline.md). The final lists are the current paired integration branches. Browser scripts are listed separately because Vitest and Jest do not discover them.

### Frontend: final Vitest files

```text
tests/authentication/auth-context/in-process/auth-context.test.tsx
tests/authentication/auth/integration/auth.integration.test.ts
tests/authentication/browser-request/in-process/browser-request.test.ts
tests/authentication/cookies/in-process/cookies.test.ts
tests/authentication/middleware/in-process/collectivity-recovery-middleware.test.ts
tests/authentication/middleware/in-process/middleware.test.ts
tests/authentication/pages/in-process/pages.test.tsx
tests/authentication/redirects/in-process/redirect.test.ts
tests/authentication/refresh-coordination/in-process/refresh-coordination.test.ts
tests/authentication/reset-link/in-process/reset-link.test.tsx
tests/authentication/route-handlers/in-process/route-handlers.test.ts
tests/authentication/session-recovery/in-process/recover-current-path.test.tsx
tests/authentication/session-recovery/in-process/recover-page.test.tsx
tests/collectivity/access/in-process/access.test.ts
tests/collectivity/cadrage/in-process/route.test.ts
tests/collectivity/cadrage/in-process/schema.test.ts
tests/collectivity/inventory/in-process/inventory-boundary.test.ts
tests/collectivity/inventory/in-process/inventory-draft-preservation.test.tsx
tests/collectivity/project-start/in-process/start.test.ts
tests/collectivity/project-start/integration/collectivity.integration.test.ts
tests/collectivity/project/mock-contract/project.test.ts
tests/collectivity/quote-information/in-process/schema.test.ts
tests/collectivity/subscription-invitations/mock-contract/invitation.test.ts
tests/collectivity/subscription/mock-contract/subscription.test.ts
tests/collectivity/wastewater/in-process/schema.test.ts
tests/contact/contact-submission/integration/contact.integration.test.ts
tests/localization/middleware/in-process/locale-middleware.test.ts
```

Standalone browser checks:

```text
tests/authentication/session-recovery/end-to-end/test-auth-recovery-browser.mjs
tests/collectivity/inventory/end-to-end/sfax-inventory-browser.mjs
```

### Backend: original Jest files at `e25faffe^`

```text
tests/authentication/auth-test-support.test.js
tests/authentication/authentication.test.js
tests/carbon-footprint/calculation-code-digest.test.js
tests/carbon-footprint/calculation-engine/absorption-precedence.test.js
tests/carbon-footprint/calculation-engine/formula-trace.test.js
tests/carbon-footprint/calculation-engine/wastewater-alignment.test.js
tests/carbon-footprint/calculation-explanation-model.test.js
tests/carbon-footprint/calculation-parameter-entry.test.js
tests/carbon-footprint/calculation-parameter-family-db-probe.test.js
tests/carbon-footprint/calculation-parameter-family.test.js
tests/carbon-footprint/calculation-parameter-resolution-wastewater.test.js
tests/carbon-footprint/calculation-projections.test.js
tests/carbon-footprint/calculation-run-result.test.js
tests/carbon-footprint/calculation-service/index.test.js
tests/carbon-footprint/calculation-tunisia-reference.test.js
tests/carbon-footprint/collectivity-project-api.test.js
tests/carbon-footprint/collectivity-supported-values-api.test.js
tests/carbon-footprint/default-parameter-availability/index.test.js
tests/carbon-footprint/forms/basic.test.js
tests/carbon-footprint/household-retirement.test.js
tests/carbon-footprint/normalization/basic.test.js
tests/carbon-footprint/parameter-default-seeder.test.js
tests/carbon-footprint/project-inventory.test.js
tests/carbon-footprint/tunisia/sfax-end-to-end.test.js
tests/collectivity/projects.routes.test.js
tests/collectivity/subscription-credits.test.js
tests/collectivity/subscription-lifecycle.test.js
tests/config/database.test.js
tests/contact/contact.test.js
```

### Backend: final Jest files

```text
tests/authentication/integration/auth-test-support.test.js
tests/authentication/integration/authentication.test.js
tests/carbon-footprint/calculation-engine/absorption-precedence.test.js
tests/carbon-footprint/calculation-engine/formula-trace.test.js
tests/carbon-footprint/calculation-engine/in-process/resolution-identity.test.js
tests/carbon-footprint/calculation-engine/in-process/unit-conversion.test.js
tests/carbon-footprint/calculation-engine/wastewater-alignment.test.js
tests/carbon-footprint/calculation-parameter-availability/integration/availability.test.js
tests/carbon-footprint/calculation-parameter-entry/in-process/entries.test.js
tests/carbon-footprint/calculation-parameter-family/in-process/family-catalog.test.js
tests/carbon-footprint/calculation-parameter-family/in-process/family-persistence.test.js
tests/carbon-footprint/calculation-parameter-resolution/in-process/resolution.test.js
tests/carbon-footprint/calculation-parameter-seeder/integration/default-seeder.test.js
tests/carbon-footprint/calculation-run/in-process/code-digest.test.js
tests/carbon-footprint/calculation-run/in-process/run-result-persistence.test.js
tests/carbon-footprint/collectivity-supported-values-api.test.js
tests/carbon-footprint/collectivity/integration/sfax-inventory-comparison.test.js
tests/carbon-footprint/collectivity/integration/sfax-inventory.test.js
tests/carbon-footprint/household-retirement.test.js
tests/carbon-footprint/inventory-results/in-process/reporting-projections.test.js
tests/carbon-footprint/inventory/in-process/input-provenance.test.js
tests/carbon-footprint/normalization/basic.test.js
tests/collectivity/countries/integration/countries.test.js
tests/collectivity/project-credits/integration/project-credits.test.js
tests/collectivity/projects/in-process/project-inventory-persistence.test.js
tests/collectivity/projects/in-process/project-routes.test.js
tests/collectivity/projects/integration/calculation-parameter-selection.test.js
tests/collectivity/projects/integration/current-inventory-input.test.js
tests/collectivity/projects/integration/current-inventory-results.test.js
tests/collectivity/projects/integration/inventory-calculation.test.js
tests/collectivity/projects/integration/project-setup.test.js
tests/collectivity/subscription-access/in-process/entitlement.test.js
tests/collectivity/subscription-lifecycle/integration/lifecycle.test.js
tests/configuration/database-configuration/in-process/database-config.test.js
tests/contact/in-process/contact.test.js
```

## Verification results

- Frontend in-process suite: 24 files; 17 passed, 7 failed; 71 tests passed and 17 failed. These are existing failures in the active test-refactor suite and are not represented as passes.
- Frontend real integration suite: 3 files and 23 tests attempted; Contact passed 2/2, authentication passed 20/20, and Collectivity failed because the configured integration user has no approved, unconsumed Subscription claim. No tests were skipped. The auth recovery browser command then ran and passed its signed-in navigation and refresh recovery/expiry checks.
- Backend full suite: 35 suites; 34 passed and 1 failed. The 34 passing suites completed 224 tests. The comparator adapter suite fails during Jest parsing because its local `jest` binding redeclares Jest's global; those adapter cases did not run. The standalone Sfax integration passed 1/1 in the same full run.
- Combined `INTEGRATION_SFAX_PASSWORD=123123 npm run test:integration:sfax`: database verification passed for `carbon_cut_test`; backend Sfax integration passed 1/1; browser Sfax calculation passed and invoked the backend-owned comparator. The 11 deferred comparison lines logged their documented reasons. The local password override is needed because this existing test database has a development-seeded Sfax user; a fresh backend-created test user defaults to `Password123!`.
- Frontend lint passed with pre-existing legacy warnings. Formatting, JavaScript syntax, and diff checks passed.

The unrelated CI automation remains in frontend backlog #62. This work adds no CI jobs.
