# Calculation Contracts

## Input contracts

### `CalculationRequest`

Backend entry payload.

```ts
type CalculationRequest = {
  projectId: string;
  activityData: ActivityData;
};
```

Meaning:

- `projectId` identifies the project workspace
- `activityData` is the submitted form payload

The backend loads project and `setup` context from storage using `projectId`.

### `PreparedCalculationInput`

Calculation input.

```ts
type PreparedCalculationInput = {
  context: {
    projectId: string;
    country: string;
    territory: string;
    referenceYear: number;
    inventoryYears: number[];
  };
  activityData: ActivityData;
};
```

Meaning:

- `context` is authoritative project calculation context
- `activityData` stays the submitted business input for now

The calculation side needs `context` because it acquires the parameters needed for the run.

### `ResolvedParameterSet`

Resolved parameters acquired for one calculation run.

```ts
type ResolvedParameterSet = {
  items: ResolvedParameter[];
};
```

Each item must at least carry:

- parameter identity
- value
- unit
- gas
- selector
- applicability
- country when relevant
- validity years when relevant
- source reference

## Output contract

### `CalculationOutput`

Calculation result.

```ts
type CalculationOutput = {
  emissions: EmissionsTree;
  formulaVersion: string;
  parameterSnapshot: ResolvedParameterSet;
};
```

Meaning:

- `emissions` mirrors the nested `ActivityData` structure
- `formulaVersion` identifies the algorithm version used
- `parameterSnapshot` stores the exact resolved parameters used by the run

This output is the canonical calculation result. Later persistence or read models may project it differently, but they should not redefine the meaning of the calculation output itself.

### `EmissionsTree`

The emissions payload should keep the same nested structure as `ActivityData`.

For now:

- it contains emissions only, not copied activity values
- each emissions leaf contains `value` and `unit`
- emissions are assumed to mean `CO2e` unless a later contract states otherwise

The reporting module is responsible for reshaping this tree into whatever read model the UI needs.

## Storage points

Before calculation:

- project state
- `setup` state
- saved `activityData`

At run start:

- `CalculationRun.projectId`
- `CalculationRun.runType`
- `CalculationRun.status`
- `CalculationRun.startedAt`

At run completion:

- `CalculationRun.completedAt`
- `CalculationRun.status`
- `CalculationRun.formulaVersion`
- `CalculationRun.parameterSnapshot`
- calculated emissions output

Storage approach:

- store calculated emissions output as nested JSON, similar to how activity data is stored
- treat any later flattening or projection as a storage or reporting concern, not as a change to calculation output

## Implementation note

The exact field list of `parameterSnapshot` should be finalized during implementation.

For now, the expected minimum is:

- key
- selector
- value
- unit
- gas
- country
- validity
- source
- maybe parameter record id
