# Collectivity Backlog

This is the single active backlog for collectivity work. Product-truth questions
are intentionally deferred until the product-truth documentation is reorganized.

## P0 — Auth Reliability

- Resolve the backend callback that posts to `/api/revalidate`: locate the Strapi
  webhook/lifecycle configuration, agree its callback contract, then either
  implement a protected endpoint or remove/retarget the callback.

- Make refresh-token rotation persist the replacement cookie pair in the browser.
  Verify the forwarded Next response carries the rotated cookies, clear cookies on
  failed refresh, and cover the `401 → refresh → retry` flow end to end.

## Auth Flow

- Add signed-in-user guards for the auth entry routes and guard reset-password
  access when its required token or code is missing or invalid.

- Keep auth guards and redirects consistent with safe `returnTo` handling.

- Investigate the reported logout failure.

- Centralize protected frontend API `401` handling so it consistently follows the
  logout flow and clears auth state.

- Define and apply one protected-API session-validity policy, preserving the
  distinction between `401`, `403`, and upstream `5xx` responses.

- Prevent concurrent refresh-token rotation races for the same browser session.

- Investigate the remaining collectivity asset/debug-route `404` requests.

## Result Display

- Add a localized, accessible, non-blocking warning panel to the persisted result
  view. It must render the result API's structured `warnings` array, including an
  item or path when supplied; warnings are not calculation errors.

## UX And UI

- Add flags to the country select in collectivity setup.

- Consolidate collectivity request-state handling: loading, pending, errors, and
  authenticated requests should use shared frontend primitives.

- Add a “missing species?” action to AFAT selectors for animals, crops, and trees.

## Collection Schema

- Add collection-layer metadata where needed: units; source/provenance; data
  quality; required/optional status; validation rules; and accepted formats.

- Keep collection schema independent from calculation, scenario, action-planning,
  and reporting layers.

## Integration Coverage

- Expand the existing real-backend collectivity integration test into a complete
  workflow test: setup creation and editing, inventory persistence, calculation,
  and result retrieval. Setup-edit coverage includes destructive year/applicability
  changes, slug conflicts, and refreshed state.
