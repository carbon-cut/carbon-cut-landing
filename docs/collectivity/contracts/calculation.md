# Calculation Contract

## Shared data

`ProjectSetupPayload` keeps the same shape defined in `contracts/project-init.md`.

`InventoryInputPayload` keeps the same shape defined in `contracts/inventory-draft.md`.

```ts
type CalculationDatasetKey =
  | "fleet"
  | "publicLighting"
  | "buildings"
  | "treesParksWaste"
  | "electricity"
  | "photovoltaic"
  | "naturalGas"
  | "solarWaterHeating"
  | "publicTransport"
  | "airTransport"
  | "port"
  | "territoryVehicles"
  | "perennialPlantationStock"
  | "livestock"
  | "fertilizers"
  | "agriculturalProduction";
```

```ts
type CalculationEmissionLeaf = {
  value: number;
  unit: "kgCO2e";
};
```

```ts
type CalculationParameterSnapshot = {
  items: Array<{
    key: string;
    selector: Record<string, unknown>;
    value: number;
    unit: string;
    gas?: string | null;
    country?: string | null;
    validFromYear?: number | null;
    validToYear?: number | null;
    sourceReferenceId?: string | null;
  }>;
};
```

## Debug calculation

### `POST /api/collectivity/projects/:projectSlug/current-inventory/debug-calculate`

```ts
type DebugCalculationRequest = {
  datasetKey: CalculationDatasetKey;
  inventoryInput: InventoryInputPayload;
};
```

```ts
type DebugCalculationResponse = {
  data: {
    datasetKey: CalculationDatasetKey;
    emissionsPayload: Record<string, CalculationEmissionLeaf | Record<string, unknown>>;
    parameterSnapshot: CalculationParameterSnapshot;
    formulaVersion: string;
  };
};
```

### Calculation-specific error

Use this when the request is valid, but the requested dataset cannot be calculated from the provided draft input and available parameters.

```ts
type DebugCalculationCannotRunResponse = {
  error: {
    status: 422;
    message: "debugCalculationCannotRun";
    details: {
      datasetKey: CalculationDatasetKey;
      reasons: Array<{
        code:
          | "missingCalculationInput"
          | "invalidInput"
          | "missingParameter"
          | "unsupportedDataset";
        path?: string;
        parameterKey?: string;
      }>;
    };
  };
};
```

## Debug calculation binding decisions

- authenticated collectivity user only
- project access is resolved from auth plus `projectSlug`
- backend loads project and current inventory by `projectSlug`
- backend uses persisted `setupPayload` from the current inventory
- frontend sends current in-memory `inventoryInput`, including unsaved changes
- frontend validates only the requested dataset slice before calling debug calculation
- frontend does not validate unrelated datasets before debug calculation
- backend calculates only the requested `datasetKey`
- debug calculation does not save `Inventory.inventoryInput`
- debug calculation does not create a `CalculationRun`
- debug calculation does not create a `CalculationResult`
- debug response is temporary UI data only

## Full calculation

Full persisted calculation is intentionally left for the later calculation-run task.
