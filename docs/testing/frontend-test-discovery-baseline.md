# Frontend test discovery baseline

Baseline recorded on 2026-10-17 before expanding Vitest discovery to `tests/`.

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
