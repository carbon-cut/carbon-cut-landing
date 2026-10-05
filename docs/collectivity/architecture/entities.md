# Domain Entities

## Core entities

### Project

Role: one collectivity inventory workspace.

Required fields:

- `id`
- `name`
- `slug`
- `ownerUserId`
- `territory`
- `country`
- `referenceYear`
- `inventoryYears`
- `currentInventoryId` nullable
- `createdAt`
- `updatedAt`

### User

Role: authenticated app user.

Required fields:

- `id`
- `username`
- `email`
- `provider`
- `confirmed`
- `blocked`
- `allowedProducts`
- `projectIds` optional

### Sector

Role: top-level inventory classification defined by product structure.

Required fields:

- `key`

### Subsector

Role: second-level inventory classification under a sector, defined by product structure.

Required fields:

- `sectorKey`
- `key`

### Ownership

Role: classification axis used to separate municipality data from the rest.

Required fields:

- `key`

### EnergyType

Role: classification axis used to separate readings such as `thermal` and `electricity`.

Required fields:

- `key`

### Inventory

Role: one stored inventory revision for a project.

Required fields:

- `id`
- `projectId`
- `setupPayload`
- `inventoryInput`
- `status` (`draft`, `calculated`, `outdated`)
- `lockedYears`
- `latestCalculationRunId` nullable
- `createdAt`
- `updatedAt`

### CalculationParameterFamily

Role: stable definition of one calculation parameter family.

`key` identifies the stable parameter family.
`key` must stay human-readable and may include a human-important qualifier when that improves readability, for example `ef-diesel` or `ef-electricity`.
`key` should not encode changing value-entry dimensions such as `country`, validity years, or source.
Each family defines the selector vocabulary allowed for its entries.
`unit` stores the expected physical unit. `gas` stores the emitted gas or accounting basis when relevant.

Examples:

- `key`: `ef-diesel`
- `key`: `gwp`
- `key`: `rootToShoot`

Required fields:

- `id`
- `key`
- `kind` (`emissionFactor`, `constant`, `density`, `absorptionFactor`)
- `selectorSchema`
- `gas` nullable (`CO2`, `CH4`, `N2O`, `CO2e`)
- `unit` nullable
- `emissionScope` nullable
- `createdAt`
- `updatedAt`

Uniqueness rule:

- unique on `key`

### CalculationParameterEntry

Role: one stored value entry under a calculation parameter family.

`selector` contains the qualifier values used for this entry within its family.
Entries carry the changing dimensions of a parameter, such as `country`, `value`, `sourceReferenceId`, and validity years.

Required fields:

- `id`
- `familyId`
- `selector`
- `applicability` (`global` or `country-specific`)
- `country` nullable
- `value`
- `sourceReferenceId` nullable
- `validFromYear` nullable
- `validToYear` nullable
- `createdBy`
- `createdAt`
- `updatedAt`

Uniqueness rule:

- unique on `familyId + applicability + country + validFromYear + validToYear + selector`

### CalculationRun

Role: one calculation execution for one project.

Required fields:

- `id`
- `projectId`
- `inventoryId`
- `startedAt`
- `completedAt` nullable
- `status` (`succeeded`, `failed`)
- `parameterSnapshot`
- `formulaVersion` nullable

### CalculationResult

Role: stored canonical output of a calculation run.

Required fields:

- `id`
- `calculationRunId`
- `projectId`
- `emissionsPayload`
- `createdAt`
- `updatedAt`

### SourceReference

Role: traceability source for inventory data or calculation parameters.

Required fields:

- `id`
- `title`
- `type`
- `publisher` nullable
- `year` nullable
- `url` nullable
- `filePath` nullable
- `note` nullable

## Main relationships

- One `User` can access zero or many `Project` entries.
- One `Project` has one current `Inventory`.
- One `Project` can keep many `Inventory` revisions as history.
- One `Project` has many `CalculationRun`.
- One `Inventory` can have many `CalculationRun`.
- One `CalculationRun` has one canonical `CalculationResult`.
- One `Sector` groups many `Subsector` entries in the product structure.
- `Inventory` stores one saved `setup` and `inventoryInput` revision for a project.
- `CalculationResult` stores the nested emissions JSON payload for a project run.
- Reporting may later project `CalculationResult` into read models classified by `Sector`, `Subsector`, `Ownership`, and `EnergyType`.
- One `CalculationParameterFamily` can have many `CalculationParameterEntry` records.
- One `CalculationParameterEntry` can be linked to one `SourceReference`.
- `Inventory` may contain source references inside its stored `setup` or `inventoryInput` payloads when needed.
- `CalculationParameterEntry` resolution should use country-specific first, then global fallback within one family.
- One `CalculationRun` must record the parameters used for that run.
- `Inventory` carries lifecycle status such as `draft`, `calculated`, and `outdated`.
- Previously calculated years should remain read-only by default.
- Setup applicability choices that affected previously calculated years should remain locked by default with those years.
- Reopening old years for editing must be an explicit special action.

## Open questions

- Does `parameterSnapshot` need its own entity later?
- Does parameter family definition stay fully database-managed, or later become partly code-defined?
- Does `CalculationResult` later need separate flattened read models in addition to the canonical nested emissions payload?
- Does the canonical emissions payload later need explicit per-gas composition in addition to the current `CO2e` assumption?
