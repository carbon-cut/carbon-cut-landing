# Wastewater calculation alignment — frontend

Status: In progress
Feature: wastewater-calculation-alignment
Last updated: 2026-10-07

Canonical full plan:
carbon-cut-backend — `docs/fullPlans/wastewater-calculation-alignment.md`

Related plan:

- carbon-cut-backend — `docs/plans/wastewater-calculation-alignment.md`

## Context

The wastewater form contract is centered on `src/app/[locale]/collectivity/projects/[planId]/inventory/InventorySchema/wastewaterSanitation/index.ts` and its adjacent config/default files. Dataset surfaces under `datasets/wastewater-treatment/` render treatment/discharge, nitrogen, population fallback, and sludge inputs. Calculation readiness also applies separate fallback rules.

The current schema can validate a row from data in one year while another active year lacks its required incoming load. It exposes all treatment systems for all load types, validates population shares only independently, and accepts landfill selector fields as free text even though the backend expects controlled values. The UI also collects receiving-water detail that is not yet resolved correctly by the backend.

## Goal

Users can save incomplete wastewater drafts, but the UI gives immediate, year-specific guidance and only offers calculation when the input satisfies the same method/data-availability contract as the backend. Unsupported methods are not offered as if calculable, and not-estimated outcomes remain visible rather than being filled with fabricated defaults.

## Scope

- Align wastewater Zod/config/default and calculation-readiness behavior with the backend-owned contract.
- Preserve the Scope 1 boundary: outside-boundary rows are retained but explicitly excluded from calculation.
- Add method/load compatibility, annual dependency, recovery, receiving-water, wetland, population-reconciliation, and landfill-history validation/UI.
- Add focused schema and component tests, messages/translations, and API snapshot synchronization when applicable.

Scope 3, result-category redesign, shallow-lagoon sludge-removal reinterpretation, and unrelated inventory UI changes are excluded.

## Plan

### 1. Mirror the approved wastewater contract

Update `wastewaterSanitation/config.ts` with the backend-approved controlled enums and capability metadata. Keep one frontend source for schema refinements and option rendering so system/load support cannot drift inside the UI. Sync the newly covered calculate/debug-calculate operations into `openapi/backend.yaml` and regenerate `src/generated/backend-api.ts` rather than inventing local response types.

### 2. Make schema validation annual and dependency-aware

Replace row-wide `hasIncomingLoad` logic with active-year evaluation. Require incoming load or supported domestic population fallback for every participating year, and require outgoing load, sludge removed, nitrogen selectors, and recovery prerequisites only in the years/methods where they apply. Reject orphan annual values and unsupported system/load combinations with paths targeting the row, field, and year.

Keep `withinMunicipalBoundary: false` data valid and editable, but communicate that the row is outside the current Scope 1 calculation. Do not introduce Scope 3 totals.

### 3. Reconcile population fallback

Sum population allocations across population-derived rows per year. Block totals over 100%. Allow totals below 100% and show the backend's derived unallocated percentage as not estimated. Coordinate calculation-readiness rules so they do not contradict the Zod schema or double-count explicit organic-load rows.

### 4. Constrain method-specific controls

Filter treatment system options by load type using the capability matrix. Explain the documented domestic proxy when `unclassified` is selected. Disable/reject methane recovery for aquatic discharge and surface only selectors required by the active CH4/N2O method.

Use controlled selects for sludge type, climate, landfill site type, oxidation/cover condition, and identifier semantics. Add a separate site-history editor capable of years before the project inventory period, grouped by landfill and sludge type, with the commissioning year and an explicit value, including zero, for every year through the calculated year. If history is incomplete, show that landfill emissions will be not estimated rather than silently creating earlier mass or an opening stock.

### 5. Present backend errors and warnings coherently

Map backend reason paths to the owning dataset row, field, and year. Present blocking calculation errors separately from accepted not-estimated warnings, including unallocated population and insufficient landfill history. Retain server validation as authoritative if stale clients submit a combination that local validation missed.

### 6. Add tests and cross-repository verification

Add focused Vitest tests for schema parsing and readiness: sparse multi-year rows, nitrogen-only activity, outgoing/recovery without load, sludge dependencies, boundary exclusion, supported and unsupported industrial systems, receiving-water requirements, population totals, recovery eligibility, controlled landfill values, and incomplete/complete history.

Add component tests for dependent options, legacy unsupported draft display, history years outside the inventory range, and field/year error placement. Run the frontend against the implemented backend and confirm debug calculation and persisted calculation agree for supported fixtures and return matching validation reasons for unsupported ones.

## Verification

- focused `npm test -- <wastewater schema/readiness test files>`
- focused component tests for treatment and sludge surfaces
- `npm run lint`
- `npm run api:check:source` and `npm run api:check` after syncing the backend OpenAPI changes
- `npm run build`
- `npm run test:integration` with the backend runner and isolated test database

If integration prerequisites are unavailable, record the exact blocked check rather than substituting mock-only evidence.

## Compatibility

The frontend implements only the current backend contract. Unsupported historic shapes and free-text controlled values receive no compatibility handling or migration path.

## Progress

- Complete: schema, config, readiness rules, and wastewater dataset surfaces inspected.
- Complete: draft frontend plan created.
- Complete: frontend implementation plan approved by the user on 2026-10-07.
- Complete: backend wastewater contract and calculate/debug-calculate OpenAPI operations discovered and synced.
- Complete: wastewater structural schema, annual/cross-row calculation evaluator, readiness integration, and focused schema tests implemented.
- Pending: wastewater surfaces, warning/error presentation, and component tests.
- Pending: backend integration verification.

## Decisions and discoveries

- The frontend mirrors but does not redefine the backend methodology contract.
- Draft editing remains possible even when the inventory is not calculation-ready.
- Annual dependencies are validated only for years in which a row actually participates.
- Population totals below 100% remain explicit not-estimated coverage; totals above 100% block calculation.
- Existing landfill metadata inputs are replaced by current controlled values without legacy-draft handling.
- No focused wastewater frontend tests currently exist, so this feature adds them rather than relying solely on the backend Sfax test.
- The initial contract check used stale planning/snapshot state. Direct inspection on 2026-10-08 found the implemented backend contract and OpenAPI operations; the frontend snapshot was then synced.
- Legacy compatibility was explicitly removed from scope because there are no existing production users or drafts to preserve.
