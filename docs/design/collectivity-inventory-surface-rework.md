# Collectivity Inventory Surface Rework

This note defines the next UI cleanup pass for the collectivity inventory workspace.

It applies to the inventory workspace shell and dataset surfaces under `src/app/collectivity/_inventaire`.

The goal is to improve readability and reduce unnecessary UI noise before adding richer progress and validation states.

## Scope

Current surface references:

- `src/app/collectivity/_inventaire/components/InventoryWorkspace.tsx`
- `src/app/collectivity/_inventaire/components/InventoryDomainNav.tsx`
- `src/app/collectivity/_inventaire/components/InventoryDatasetNav.tsx`
- `src/app/collectivity/_inventaire/components/DatasetHeader.tsx`
- dataset surface files such as:
  - `src/app/collectivity/_inventaire/datasets/municipal/fleet/surface.tsx`
  - `src/app/collectivity/_inventaire/datasets/energy/electricity/surface.tsx`

This rework is limited to the inventory body and its immediate surfaces.

Do not expand this into a broader redesign of the collectivity shell, sidebar, header, or adjacent modules.

## Problems To Fix

### 1. Spacing is too large

The inventory workspace currently burns too much vertical space between:

- top workspace shell and domain navigation
- dataset navigation and dataset content
- dataset header and first input block
- one table block and the next

This makes the page feel slower and heavier than the task requires.

### 2. Some badges are outdated or not useful

## done

The current header badges such as `source-first` and `multi-annees` do not help users complete the form.

They add visual noise without supporting a decision or task.

These should be removed unless they are converted into meaningful status indicators.

### 3. Titles are repeated

## done

The current dataset name appears both in navigation and again as a large content title.

That duplication weakens hierarchy and wastes space.

We should keep one strong place for orientation and avoid repeating the same label unless the second occurrence adds new meaning.

### 4. Future need: progress and error signaling in navigation

This can be implemented later if it requires more structural work.

We need a mechanism for:

- completion percentage per dataset
- nav labels or field groups that change appearance when there is an error
- clearer progress feedback than the current decorative badge approach

## Direction

The inventory UI should feel:

- tighter
- clearer
- more task-oriented
- less decorative

This follows the active design rules:

- restrained product UI
- shared primitives first
- token-based styling
- no decorative filler badges
- no unnecessary repeated headings

## Proposed Changes

### Phase 1: Surface cleanup

Focus on low-risk UI cleanup first.

Changes:

- reduce vertical spacing in the workspace shell and inside dataset content
- tighten section spacing inside inventory dataset surfaces
- remove non-essential badges from the dataset header
- simplify the dataset header so it carries description only when navigation already provides the active title
- keep status only when it communicates something actionable or genuinely useful

Expected result:

- faster scan
- less empty space
- less duplicate information
- clearer transition from nav to form content

### Phase 2: Header and navigation hierarchy cleanup

After spacing cleanup, simplify orientation patterns.

Changes:

- decide whether the active dataset title lives in the nav area or the body header, but not both by default
- keep family and dataset context visible without repeating the exact same label stack
- make section intros shorter and more functional

Possible direction:

- navigation owns the active label
- body header keeps only description or contextual helper text

This should be validated against the current surfaces before implementation.

### Phase 3: Progress and validation states

This phase is intentionally deferred until the cleanup work is stable.

We likely need a small state model for navigation items.

Desired nav states:

- default
- active
- complete
- incomplete
- error

Desired supporting data:

- `completionPercent` per dataset
- `errorCount` or boolean invalid state per dataset
- optional field-group level invalid state where relevant

Possible UI outputs:

- progress text such as `65%`
- compact completion indicator
- error color or icon on nav items
- stronger active state when the current section contains validation issues

Important rule:

Any future error state must be functional, not decorative. It should reflect real form validation or completion logic.

## Implementation Order

1. Tighten spacing in the inventory workspace shell.
2. Remove outdated header badges and related copy.
3. Remove or reduce repeated dataset titles.
4. Review individual dataset surfaces with the worst spacing.
5. Design the progress/error-state mechanism only after the base layout is stable.

## Acceptance Checks

The cleanup pass is successful when:

- the top of the active dataset reaches usable content faster
- the header no longer contains non-functional badges
- the active dataset name is not needlessly repeated
- section spacing feels compact but still readable
- no change breaks accessibility or existing form structure

## Out Of Scope For The First Pass

- rewriting inventory validation logic
- adding backend-driven progress tracking
- redesigning the collectivity sidebar or global shell
- changing dataset schemas unless required by a later progress-state implementation
