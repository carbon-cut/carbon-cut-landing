# Auth And Revalidation Backlog

Investigation notes from 2026-08-13. These are backlog items, not confirmed implementation decisions.

## P0: Resolve the Missing Revalidation Endpoint

### Evidence

- The frontend receives repeated `POST /api/revalidate` requests and returns `404`.
- No `src/app/api/revalidate/route.ts` exists.
- No frontend source code calls `/api/revalidate`.
- The calls follow inventory writes in Strapi, which strongly indicates a Strapi lifecycle hook or webhook is posting to the frontend.

### Work

- Find the Strapi webhook/lifecycle configuration that posts to `/api/revalidate`.
- Establish the intended callback contract: target URL, HTTP method, authentication secret, request payload, and paths or tags to invalidate.
- Decide whether this endpoint is still required.
  - If yes, add a protected Next route that implements the agreed contract.
  - If no, remove or retarget the Strapi callback.
- Add an integration test that proves an authorized callback revalidates the intended route or tag and an unauthorized callback is rejected.

### Design Question

The inventory UI already uses client-side requests with `cache: "no-store"` and TanStack Query invalidation after saves. Confirm which server-rendered or cached surfaces actually require Next revalidation before adding it back.

## P0: Make Refresh-Token Rotation Persist the New Session

### Evidence

The observed request sequence was:

1. A Strapi inventory request returned `401`.
2. `POST /api/refresh-token-rotation` succeeded with `200`.
3. Retrying the inventory request succeeded with `200`.
4. Fourteen seconds later, the debug-calculation request again reached Strapi with an invalid access token (`401`).
5. A second rotation attempt returned `401`.

This is consistent with one-time-use refresh-token rotation succeeding on the server but the browser retaining the old access and refresh cookie pair. The old refresh token is then invalid after its first successful use.

### Suspected Implementation Gap

`fetchWithAuth()` refreshes a session through `refreshSessionFromCookies()`. That helper writes to Next's server cookie store, while the collectivity API route later returns a separately constructed `NextResponse`. Verify that the response actually sent to the browser contains the new `Set-Cookie` values. Do not assume request-cookie mutation is enough.

### Work

- Trace and capture response headers for an upstream `401 -> refresh -> retry` flow.
- Ensure the actual Next API response carries replacement access, refresh, and user cookies after a successful refresh.
- Ensure a failed refresh clears the browser's session cookies through the actual response.
- Add an end-to-end test: force an expired access token, successfully rotate it, then make a later protected request and assert that it succeeds without reusing the old refresh token.

## P1: Define One Valid-Session Policy for Protected Collectivity APIs

### Evidence

`getServerSession()` currently regards a session as authenticated when a user cookie exists and either an access token or refresh token is present. It does not validate or proactively refresh the access token. Protected collectivity routes can therefore pass their initial gate with an expired access token and fail only when they proxy the request to Strapi.

### Work

- Decide where access-token validity is checked and refreshed: at the protected route boundary, in the backend proxy, or through a shared server-session abstraction.
- Apply the chosen policy consistently to collectivity route handlers and page guards.
- Preserve an explicit distinction between unauthenticated (`401`), authenticated but unauthorized (`403`), and upstream failure (`5xx`).
- Add tests for expired access token, valid refresh token, expired or revoked refresh token, and absent cookies.

## P1: Prevent Concurrent Refresh-Token Rotation Races

### Risk

If two concurrent requests see an expired access token, both can submit the same refresh token. With rotating, single-use refresh tokens, one request can succeed while the other fails. This can produce intermittent logouts even after cookie propagation is corrected.

### Work

- Determine Strapi's refresh-token reuse and grace-period semantics.
- Deduplicate in-flight refreshes per browser session, or otherwise introduce a safe server-side refresh coordination strategy.
- Test concurrent protected requests against an expired access token.

## P2: Clean Up Unrelated Broken Route/Asset Requests

- Investigate `GET /collectivity/grand-sfax-inventory/home/hero/bg1.png 404`; likely a relative static asset path resolving beneath the project route.
- Investigate `GET /collectivity/grand-sfax-inventory/result/poc 404`; likely stale debug navigation or an unimplemented route.

## Acceptance Signals

- Strapi no longer posts to a missing `/api/revalidate` endpoint.
- After a successful rotation, the next browser request uses the new token pair.
- A refresh failure results in a clean, consistent signed-out state instead of a protected action repeatedly returning `401`.
- Concurrent protected requests do not race one refresh token into an unexpected logout.
