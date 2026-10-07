# Frontend authentication session recovery

Status: Archived
Feature: auth-session-recovery
Last updated: 2026-10-06

Canonical full plan: carbon-cut-landing — `docs/fullPlans/archive/auth-session-recovery.md`

Related plan: carbon-cut-backend — `docs/plans/archive/auth-session-recovery.md`

## Context

`src/lib/auth/auth-context.tsx` reads `/api/auth/session` on mount and after explicit actions. `src/lib/auth/fetchWithAuth.ts` rotates on a backend 401 and retries, but does not handle a second 401 as a terminal session failure. Client query modules parse errors separately. `getServerSession()` and the session route accept an access token plus cached user cookie as an authenticated session without validating the token. Several route guards use cached plan IDs. Server-rendered refresh can consume a token even when new cookies cannot be written. Current tests cover ordinary auth and refresh failure when the access cookie is absent, but not these combinations.

## Goal

Users keep working when renewal succeeds. If renewal is impossible, they see a localized session-expired explanation, their private cached data is cleared, and sign-in returns them safely to their prior location. Entitlement failures and outages remain distinguishable.

## Scope

Shared authentication infrastructure and active collectivity client requests, same-origin API routes, and route guards are in scope. Auth entry forms continue to handle invalid credentials and confirmation requirements as form errors. Retired household UI is not expanded.

## Plan

### 1. Align the browser contract

Sync backend OpenAPI after backend auth operations are added. Introduce one normalized auth failure classification at the frontend API boundary, preserving HTTP status and `error.details.code`. Route all active collectivity query fetchers through it. A 401 from an already authenticated request triggers renewal once; login's invalid-credentials 401, 403 entitlement errors, and 5xx/network failures do not.

### 2. Make session renewal reliable

Put refresh rotation in a same-origin route handler that writes the rotated cookies on its returned response. Stop rotating in server-rendered reads where cookie mutation is unreliable. Handle protected page loads with a browser recovery step before returning to the original path. Coordinate in-flight refreshes within a tab and across tabs; after a competing refresh fails, re-read session state before sign-out. Retry an authenticated request at most once.

### 3. Centralize terminal failure and UX

Expose one session-expired action through `AuthProvider` or a shared auth controller. Clear auth cookies through a local route even when backend revocation fails, clear private TanStack Query data, update provider state, and navigate to sign-in with a sanitized `returnTo` and a localized expiry reason. Explicit logout uses the same local cleanup and synchronizes across tabs. Do not expose raw backend error messages to the user. Refresh session state after sign-in, reset, confirmation, and password change.

### 4. Update password reset page

Accept the random token from an emailed link, remove it from the visible URL/history after capture, submit it in the existing `code` field, and show localized expired/invalid link guidance with a new-link action. Remove the requirement to manually type a short code. Preserve the neutral forgot-password confirmation and safe post-reset navigation.

## Verification

Add focused tests for successful refresh and single retry, repeated 401, revoked refresh, concurrent and cross-tab refresh, a 403 entitlement failure, a network outage, private query cache cleanup, localized return navigation, and reset-link handling. Run `npm run lint`, relevant Vitest tests, and `npm run build`. Run real auth integration tests only with a known running frontend and isolated Strapi backend; record any missing environment rather than claiming a pass.

## Progress

- Frontend implementation authorized by the user's 2026-10-06 request.
- Browser refresh route, single retry, terminal cleanup, safe return navigation, reset-link UI, and project guard changes: implemented.
- Cross-tab refresh completion uses Web Locks when available and an IndexedDB lease with completion records otherwise. Expired leases are reclaimable. If neither coordination mechanism is available, refresh reports availability failure and keeps the local session for retry.
- Collectivity middleware preserves the exact requested path and query before server guards run. A client recovery bridge preserves the current nested URL when a backend 401 is found during server rendering.
- Focused auth and collectivity access tests: passing. Lint: passing with existing unrelated warnings.
- Production build: blocked by existing missing `src/app/layout` and `src/app/page` imports in generated Storybook output.
- Backend OpenAPI auth operations are present and the frontend snapshot matches the backend source. The user reports that the auth integration test ran successfully; this archival update did not rerun it.

## Decisions and discoveries

The backend remains the authority for user identity and plan access. The cached user cookie may guide presentation but cannot establish a valid access token or entitlement by itself. The user chose an explained sign-in redirect after terminal expiry and a reset link in place of manual code entry.

During implementation, refresh was removed from server-rendered reads and placed in `/api/auth/refresh`, which returns rotated cookies. The session route checks the access token's expiry for presentation; it cannot establish signature validity, session version, or account status without the backend auth contract. Protected project routes now defer entitlement decisions to backend calls instead of cached plan IDs. The browser shares an in-flight promise within a tab. Across tabs, Web Locks serialize refresh where available; an IndexedDB transaction elects a lease owner and records completion so waiters reuse the result. A browser with neither facility receives an availability failure without consuming a refresh token.

A review found that `/api/auth/change-password` still rotated when the access cookie was missing, then wrote the replacement cookies only after password change succeeded. A wrong current password could therefore consume the browser's refresh token. The route now returns 401 without rotating; the browser recovery path can refresh and retry the request. Focused tests cover refresh-only and wrong-current-password failures.

The local auth mock issued opaque access tokens, which would loop through the new expiry-aware collectivity middleware. It now issues JWT-shaped mock access tokens with a five-minute expiry hint, matching the real access-token behavior needed by route recovery. Mock collectivity tests pass with that format.

## Unresolved work

- The unrelated generated Storybook output type errors still prevent a passing production build from being claimed. They remain outside this auth feature.
