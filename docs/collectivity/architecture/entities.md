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

### InventoryState

Role: stored inventory payload for a project.

Required fields:

- `id`
- `projectId`
- `payload`
- `lockedYears`
- `createdAt`
- `updatedAt`

### CalculationParameter

Role: calculation reference value used by the calculation engine.

`key` identifies the parameter family, not a unique version.
`key` must stay human-readable and may include a human-important qualifier when that improves readability, for example `ef-diesel` or `ef-electricity`.
`key` must not duplicate dimensions already stored in structured fields such as `country`, `emissionScope`, validity years, or `sourceReferenceId`.
`selector` contains only the qualifiers needed to disambiguate a parameter within its family.
`selector` is flexible but not free-form; each parameter family should define its allowed selector fields.
`activity` is optional and should be used only when it actually distinguishes calculation contexts.
`unit` stores the physical unit only, while `gas` stores the emitted gas or accounting basis when relevant.

Examples:

- `key`: `ef-diesel`
  `selector`: `{}`
- `key`: `gwp`
  `selector`: `{ inputGas: "CH4" }`
- `key`: `rootToShoot`
  `selector`: `{ treeType: "olive" }`

Required fields:

- `id`
- `key`
- `kind` (`emissionFactor`, `constant`, `density`, `absorptionFactor`)
- `selector`
- `applicability` (`global` or `country-specific`)
- `country` nullable
- `gas` nullable (`CO2`, `CH4`, `N2O`, `CO2e`)
- `emissionScope` nullable
- `value`
- `unit` nullable
- `sourceReferenceId` nullable
- `validFromYear` nullable
- `validToYear` nullable
- `createdBy`
- `createdAt`
- `updatedAt`

Uniqueness rule:

- unique on `key + applicability + country + validFromYear + validToYear + selector`

### CalculationRun

Role: one calculation execution for one project.

Required fields:

- `id`
- `projectId`
- `runType`
- `startedAt`
- `completedAt` nullable
- `status`
- `parameterSnapshot` or `parameterReferenceSet`
- `formulaVersion` nullable

### CalculationResult

Role: stored output of a calculation run.

Required fields:

- `id`
- `calculationRunId`
- `projectId`
- `sectorKey`
- `subsectorKey` nullable
- `ownershipKey` nullable
- `energyTypeKey` nullable
- `year`
- `resultKey`
- `value`
- `unit`

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
- One `Project` has one current `InventoryState`.
- One `Project` has many `CalculationRun`.
- One `CalculationRun` has many `CalculationResult`.
- One `Sector` groups many `Subsector` entries in the product structure.
- `InventoryState` stores the nested inventory JSON payload for a project.
- `CalculationResult` can be classified by `Sector`, `Subsector`, `Ownership`, and `EnergyType`.
- One `CalculationParameter` can be linked to one `SourceReference`.
- One `InventoryState` can contain source references inside its payload.
- `CalculationParameter` resolution should use country-specific first, then global fallback.
- One `CalculationRun` must record the parameters used for that run.
- Previously calculated years should remain read-only by default.
- Reopening old years for editing must be an explicit special action.

## Open questions

- Does `parameterSnapshot` need its own entity later?
- Does parameter resolution need its own entity later, or stay in calculation logic?
- Does `CalculationResult` need only final `CO2e` outputs for users, or should it also preserve per-gas composition such as `CO2`, `CH4`, and `N2O`?
