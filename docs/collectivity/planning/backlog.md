# Collectivity Backlog

Provisional backlog for collectivity work. Items still need an audit for relevance and completion unless evidence is recorded beside them.

Keep this file as the working index for open items. If another doc contains a backlog-shaped note, fold the actionable part back here instead of letting priorities drift across multiple files.

## Product Questions

- Define and implement RGPD compliance for collectivity data.
  Scope: privacy information, legal basis, retention, data-subject rights, security measures,
  incident handling, processor contracts, and the conditions for making any compliance claim in the UI.

- Clarify multi-collectivity identity rules for the same city:
  same ID or different IDs, whether data is shared, and how access is coordinated inside and outside the project ID.

## UX And UI

- Add flags to the country select in `cadrage`.

- Centralize frontend request handling primitives for collectivity surfaces.
  Scope: shared hooks/components for loading state, waiting state, error display, and authenticated request handling instead of per-surface ad hoc implementations.
  Expected outcome: inventory and adjacent collectivity screens reuse the same request pattern and UI behavior.

- Improve inventory domain-nav responsive behavior:
  keep the domain nav on a single row; when there is room, inactive tabs should share the available width; when space gets tight, inactive tabs should compress like browser tabs and ellipsize; the active tab should keep the width it needs; do not solve this with wrapping, aggressive font shrinking, or equal-width segmented controls.

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
