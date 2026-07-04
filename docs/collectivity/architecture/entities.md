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

`selector` defines when a parameter applies, for example by activity and qualifier such as fuel or animal.
`key` identifies the parameter family, not a unique version.

Examples:

- `key`: `ef-diesel-1`
  `selector`: `{ activity: "burning", fuel: "diesel" }`
- `key`: `frac-gas-system`
  `selector`: `{ activity: "manure-management", animal: "cattle" }`
- `key`: `absorption-factor`
  `selector`: `{ activity: "tree-stock", treeType: "urban-tree" }`

Required fields:

- `id`
- `key`
- `kind` (`emissionFactor`, `constant`, `density`, `absorptionFactor`)
- `selector`
- `applicability` (`global` or `country-specific`)
- `country` nullable
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
- Does `formulaVersion` need its own entity later?
- Does `SourceReference` also need to support multiple files or attachments?
