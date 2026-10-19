# Frontend test discovery baseline

Baseline recorded on 2026-10-17 before expanding Vitest discovery to `tests/`.

The paths below preserve the original discovery snapshot. The frontend test-root migration is complete: executable Vitest tests now live under `tests/`, and Vitest no longer discovers the retired `test/` root.

The frontend-only runner (`npm run test`) discovered 24 files:

```text
test/auth/auth-context.test.tsx
test/auth/browser-request.test.ts
test/auth/collectivity-recovery-middleware.test.ts
test/auth/cookies.test.ts
test/auth/locale-middleware.test.ts
test/auth/middleware.test.ts
test/auth/pages.test.tsx
test/auth/recover-current-path.test.tsx
test/auth/recover-page.test.tsx
test/auth/redirect.test.ts
test/auth/refresh-coordination.test.ts
test/auth/reset-link.test.tsx
test/auth/route-handlers.test.ts
test/collectivity/access.test.ts
test/collectivity/cadrage-route.test.ts
test/collectivity/cadrage-schema.test.ts
test/collectivity/inventory-boundary.test.ts
test/collectivity/inventory-draft-preservation.test.tsx
test/collectivity/quote-information-schema.test.ts
test/collectivity/start.test.ts
test/collectivity/wastewater-schema.test.ts
test/mocks/collectivity-invitation.test.ts
test/mocks/collectivity-openapi.test.ts
test/mocks/collectivity-subscription.test.ts
```

The focused integration runner (`npm run test:integration:vitest`) discovered 3 files:

```text
test/integration/api/contact/contact.integration.test.ts
test/integration/auth.integration.test.ts
test/integration/collectivity.integration.test.ts
```

The browser recovery check remains selectable with `npm run test:integration:browser` and is also run by `npm run test:integration`.

## Migration completion

- The remaining Collectivity integration test moved to `tests/collectivity/project-start/integration/collectivity.integration.test.ts`.
- `npm run test` discovers only in-process tests under `tests/`.
- `npm run test:integration:vitest` discovers only integration tests under `tests/`.
- The focused browser commands remain `npm run test:integration:browser` and `npm run test:integration:browser:sfax`.
- Final Vitest discovery: 24 in-process files and 3 integration files (23 integration cases). `npm run test` ran 24 files: 17 passed and 7 failed (71 tests passed, 17 failed); these failures are in the existing refactor suite. The focused integration runner discovered all 3 files, but all 23 cases were skipped after setup failed because the local frontend at `http://localhost:3000` was not running. Those skips are not passing test results.
