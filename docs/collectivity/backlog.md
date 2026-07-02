# Collectivity Backlog

Centralized backlog for collectivity work.

Keep this file as the working index for open items. If another doc contains a backlog-shaped note, fold the actionable part back here instead of letting priorities drift across multiple files.

## Product Questions

- Clarify multi-collectivity identity rules for the same city:
  same ID or different IDs, whether data is shared, and how access is coordinated inside and outside the project ID.

## UX And UI

- Add flags to the country select in `cadrage`.

- Improve inventory domain-nav responsive behavior:
  keep the domain nav on a single row; when there is room, inactive tabs should share the available width; when space gets tight, inactive tabs should compress like browser tabs and ellipsize; the active tab should keep the width it needs; do not solve this with wrapping, aggressive font shrinking, or equal-width segmented controls.

- Add a `"missing species?"` report action for AFAT selectors:
  when the needed animal, culture, or tree is not available in the current list, the user should be able to open a dialog and send a request to add that species.

## Auth

- Add route-level guard for auth pages when the user is already signed in.
  Scope: `/auth/sign-in`, `/auth/sign-up`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/confirm-email`.
  Expected behavior: authenticated users should be redirected away from auth entry pages. Current likely target: `/form`.

- Add guard for reset-password access when required token or code is missing.
  Scope: `/auth/reset-password`.
  Expected behavior: if reset token or code is absent or invalid in URL params, redirect the user to the password recovery entry flow.

- Align auth guard behavior with `returnTo` handling.
  Redirects should remain safe and continue using current sanitization rules.

- Investigate the `logout doesn't work?` bug.

## Inventaire Decision Blockers

These items block a final `inventaire` route contract and should stay explicit until answered.

- Define the minimum usable inventory:
  what the minimum required dataset set is for a first usable inventory result, what can remain missing, what blocks progress completely, and what can be estimated or deferred.

- Define quality and missing-data handling:
  how missing data is represented, how estimated or proxy data is represented, what notes or clarifications are required, what validation means at dataset level, and what completeness means operationally.

- Decide import versus manual entry boundaries:
  which source families are better by import, which are realistic for manual entry, which require both, and whether files are first-scope or later-scope.

- Confirm route-contract readiness:
  close remaining unresolved points from `inventaire-input-inventory.md`, the completeness model, the import/manual split, and the minimum usable dataset set.

## Collection Schema Improvements

Strengthen the data-collection layer without mixing it with calculation or scenario logic.

- Add `unit` metadata at dataset, table, or row level where needed.

- Add source and provenance metadata such as organization, document name, contact person, collection date, and source type.

- Add quality metadata such as status, confidence, and comment.

- Add collection-layer metadata for required versus optional status, validation rules, and accepted format.

- Keep collection schema separate from later layers such as emission calculation, scenario projection, climate action planning, and report generation.

## Current Implementation TODOs

- AFAT livestock: develop the species-dependent confined-time-share (%) block.
  Current location: `src/app/collectivity/_inventaire/datasets/afat/livestock/surface.tsx`.

- AFAT perennial plantation stock: develop calculated totals display.
  Current location: `src/app/collectivity/_inventaire/datasets/afat/perennial-plantation-stock/config.ts`.
