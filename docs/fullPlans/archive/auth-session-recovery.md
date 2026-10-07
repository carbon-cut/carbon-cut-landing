# Authentication session recovery and password reset

Status: Archived
Feature: auth-session-recovery
Last updated: 2026-10-06

## Context

The frontend keeps access, refresh, and cached user data in HTTP-only cookies. Server requests may rotate a refresh token after a backend 401, while the browser `AuthProvider` reads `/api/auth/session` at mount and after explicit auth actions. Browser API fetchers do not share a terminal-auth response handler. The backend issues five-minute access tokens and rotating refresh tokens. Its reset-password flow currently uses a six-digit code without an expiry check and does not revoke older sessions.

Authentication operations are not yet covered by the backend-owned OpenAPI source; `docs/authentication-integration.md` is current context, to be verified against controllers and tests. The backend owns HTTP auth contracts. The frontend owns cookies, browser recovery, navigation, and query cache state.

## Goal

- Recover an expired access token once without losing user work when the refresh token remains valid.
- When recovery fails, clear local session state, explain expiry, and open sign-in with a sanitized return path.
- Keep missing/invalid authentication separate from blocked accounts and insufficient project or subscription access.
- Replace the reset code with a short-lived, single-use link and invalidate older sessions after password reset or change.

## Scope and shared behavior

The active collectivity flow and shared authentication infrastructure in both repositories are in scope. Retired household behavior is not expanded. Login, registration, confirmation, reset, refresh, logout, protected collectivity requests, and server-rendered route guards must be checked for consistent outcomes.

- A protected backend request with an absent, malformed, expired, or unknown-user access token returns 401 with public code `AUTH_AUTHENTICATION_REQUIRED`. Detailed cause belongs in structured server logs without raw tokens or secrets.
- A blocked account and a valid account lacking an entitlement return 403 with distinct stable codes. These do not trigger session-expiry recovery.
- Auth entry errors such as invalid login credentials keep their existing codes and do not trigger the signed-in session recovery flow.
- An authenticated browser request may cause one coordinated refresh and one retry. A repeated 401 ends the local session; a 5xx or network failure shows an availability error without treating the session as invalid.
- The sign-in page displays a localized expiry message and honors a sanitized `returnTo`. Successful sign-in replaces the session and clears stale private query data.

## Architecture and contract decisions

1. **Refresh ownership.** Rotation occurs through a same-origin route capable of returning new cookies. Server-rendered reads must not consume a refresh token where cookie writes cannot be guaranteed. A browser recovery step handles protected page loads that discover an expired access token. Browser refresh attempts are coordinated within and across tabs; a losing concurrent request re-reads the session before treating its refresh failure as terminal.
2. **Backend rotation.** Consume the old refresh token and create the replacement in one database transaction with a conditional claim. Exactly one caller succeeds. A missing or blocked user cannot refresh. Continue hashing refresh tokens at rest.
3. **Session invalidation.** Add a persisted user session version to issued access tokens and validate it on protected requests. Existing versionless tokens map to version zero until the user's version changes. Password change and reset increment the version and revoke existing refresh tokens before issuing a new session. Ordinary logout revokes its refresh token; its current access token can remain valid for the configured five-minute lifetime.
4. **Reset link.** Generate a cryptographically random token; store its hash and a 15-minute expiry, then email a URL containing the raw token. Keep `code` as the reset request field to avoid an unnecessary wire rename. Consume once atomically, reject expiry/reuse, and provide a neutral response to forgot-password requests. Add a per-account resend cooldown. Existing six-digit codes stop working at deployment; users request a new link. Prevent the reset token from remaining in browser history or leaking through referrers after the page captures it.
5. **API ownership.** Add backend OpenAPI operations for auth endpoints with success/error shapes and statuses, then sync the frontend snapshot and generated types. Keep the backend's `error.details.code` convention; do not add alternate frontend-only backend shapes. Preserve different refresh-token failure codes while using one public access-token failure code.

The backend deploys before the frontend. Both versions must tolerate the unchanged session success shape during the rollout. Any session-version schema migration must preserve existing users as version zero. Update the backend auth integration guide and email template alongside the reset contract.

## Repository responsibilities

- Backend: `carbon-cut-backend/docs/plans/archive/auth-session-recovery.md` owns JWT validation, refresh persistence, reset persistence and mail contract, HTTP error semantics, OpenAPI, and backend tests.
- Frontend: `carbon-cut-landing/docs/plans/archive/auth-session-recovery.md` owns same-origin session routes, centralized browser error handling, cookies, redirects, localized UX, cache clearing, and frontend tests.

## Implementation sequence

1. Record and verify the backend HTTP contract, including framework-generated 401/403 behavior.
2. Implement and test backend token lifecycle, reset link, and error semantics; publish OpenAPI and auth integration updates.
3. Sync the frontend contract, implement one recovery path and its UI, and remove refresh from unwritable server-rendered contexts.
4. Run cross-repository integration scenarios and review deployment compatibility before rollout.

## Integration verification

Use a confirmed isolated test database. Exercise expired access plus valid refresh, revoked/expired refresh, two simultaneous refreshes, a blocked or deleted user, a wrong project, backend outage, sign-out across tabs, reset-link expiry/reuse, and invalidation after password change/reset. Run each repository's relevant lint, targeted tests, and build checks. Do not count skipped tests as evidence.

## Progress

- Research and user choices: complete.
- Backend and frontend implementation: complete. The frontend OpenAPI snapshot matches the backend source.
- Backend focused auth and test-support tests passed as recorded in the backend repository plan. The user reports that the frontend auth integration test has run successfully; this archival update did not rerun it.
- Frontend focused tests and lint passed as recorded in its repository plan. An unrelated generated Storybook output error blocked a production build and remains documented separately.

## Decisions and discoveries

The user chose to include password-reset security work, use an explained sign-in redirect after expiry, keep access-token diagnostics out of public responses, and move from manual reset codes to links. The backend working tree has an unrelated change to generated documentation; leave it untouched unless contract regeneration is approved as part of implementation.

## Unresolved work

Deployment ingress-level rate limiting remains unverified. Strapi's stock users-permissions auth routes have their own rate-limit middleware, as recorded in the backend plan. This does not block the implemented auth behavior.
