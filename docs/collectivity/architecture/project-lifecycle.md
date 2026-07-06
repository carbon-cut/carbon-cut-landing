# Project Lifecycle

## Goal

Define how a project workspace and its inventory state are saved, resumed, extended, and recalculated.

## Entity split

### `Project`

`Project` is the workspace container.

It stores:

- project metadata
- reference to the current `InventoryState`

It does not carry draft/calculated/outdated lifecycle state.

### `InventoryState`

`InventoryState` is one saved inventory revision for a project.

It stores:

- `setup`
- `inventory`
- lifecycle status
- `lockedYears`

### `CalculationRun`

Stores calculation execution history for one project and one inventory revision.

### `CalculationResult`

Stores the canonical output of one calculation run.

## Inventory status

### `draft`

- the inventory state has saved `setup` and/or `inventory`
- no current valid calculation exists yet
- editable by default

### `calculated`

- the latest successful calculation matches the current saved `setup` and `inventory`
- previously calculated years are read-only by default

### `outdated`

- the inventory state is no longer the active current revision
- it is kept as history after a newer draft was created to revise or replace it
- it is not the editable working state anymore

## Revision model

- a project can have many `InventoryState` revisions
- one revision is the current active inventory state
- older revisions are kept as history when needed
- reopening previously calculated years creates a new draft `InventoryState`
- the older calculated inventory state becomes `outdated` history and remains linked to the project through `projectId`

## Editability rules

- `setup` and `inventory` can be saved at any time
- a calculated year is locked by default after calculation
- `setup` choices that affect whether a section exists, such as airport, port, or agriculture applicability, are also locked for calculated years
- changing a locked year requires an explicit reopen action
- extending the inventory must not silently unlock previously calculated data

## Extension after calculation

An inventory may be extended after calculation by:

- adding new years
- adding new applicable inventory sections

Rules:

- newly added scope is editable
- previously calculated scope stays locked by default
- extension after calculation continues in a `draft` inventory state
- extending with new scope does not silently unlock previously calculated years
- extending with new years should allow calculation only for the new years when previously calculated years remain unchanged
- setup applicability added for new years must not retroactively change previously calculated years unless those years are explicitly reopened

## Save and resume

- saving persists the current `setup` and `inventory` state even if incomplete
- resuming restores the current active `InventoryState` for the project
- save-for-later does not require calculation

## Calculation runs

- one project can have many `CalculationRun`
- each run belongs to one project and one `InventoryState`
- run history is kept
- a successful run provides the `CalculationResult` for that inventory revision

## Latest result

- a `calculated` inventory state points to its latest successful run
- a current `draft` inventory state may have no current result yet
- results from older inventory revisions remain history

## Storage rules

- `Project` stores workspace identity and metadata
- `Project` points to the current active `InventoryState`
- `InventoryState` stores `setup`, `inventory`, lifecycle status, and `lockedYears`
- historical `InventoryState` revisions are stored when the workflow needs them
- calculation runs are stored separately as history
- the latest calculation result is stored separately from editable inventory state
