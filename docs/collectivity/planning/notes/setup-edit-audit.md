# Setup edit audit

The earlier setup-edit planning note mixed completed frontend work with unverified backend behavior. This audit records what the current repository shows; it does not certify the external backend's data handling.

## Confirmed in this frontend

- An existing project has a setup page at `/collectivity/projects/[planId]/setup`.
- The setup form submits edits through a TanStack Query mutation to the same-origin `PUT /api/collectivity/projects/:projectSlug/setup` route.
- The Next.js route validates the payload and forwards it to the backend. The frontend handles returned field errors.
- Saving invalidates current-inventory and result queries for the old and new slug as applicable, then navigates to the returned slug's setup route.
- The form displays warnings when a year is removed or port or agriculture applicability is disabled.
- Inventory draft save, full calculation, debug calculation, and result reading use TanStack Query in the frontend.

## Still unverified

- Backend rules for removing years, disabling applicability, changing the reference year, and changing the slug after data exists.
- Whether saved inventory data is ever purged, revised, or blocked by those edits, and whether errors communicate that clearly.
- Whether an open inventory screen always rebuilds safely after a setup edit in another view or session.

The Next.js setup route forwards edits to an external backend, so these points need that backend's contract or an integration check before the old task can be called complete.
