# Inventory Calculation Submission Backend Contract

This contract defines the backend route for submitting the current collectivity inventory and running a full persisted calculation.

`ProjectSetupPayload` keeps the same shape defined in `contracts/project-init.md`.

`InventoryInputPayload` keeps the same shape defined in `contracts/inventory-draft.md`.

`CalculationParameterSnapshot` keeps the same shape defined in `contracts/calculation.md`.

## Route

### `POST /api/collectivity/projects/:projectSlug/current-inventory/calculate`

```ts
type CalculateCurrentInventoryRequest = {
  inventoryInput: InventoryInputPayload;
};
```

The backend loads the project and current inventory from `projectSlug`. The request body carries the submitted inventory input that should be saved and calculated.

### `GET /api/collectivity/projects/:projectSlug/current-inventory/result`

The backend returns the latest persisted calculation result for the current inventory. The response shape is backend-owned.

## Success response

```ts
type CalculateCurrentInventoryResponse = {
  data: {
    project: {
      id: string;
      slug: string;
      name: string;
      territory: string;
      country: string;
      referenceYear: number;
      inventoryYears: number[];
      currentInventoryId: string;
      createdAt: string;
      updatedAt: string;
    };
    currentInventory: {
      id: string;
      projectId: string;
      setupPayload: ProjectSetupPayload;
      inventoryInput: InventoryInputPayload;
      status: "calculated";
      lockedYears: number[];
      latestCalculationRunId: string;
      createdAt: string;
      updatedAt: string;
    };
    calculationRun: {
      id: string;
      projectId: string;
      inventoryId: string;
      runType: "full";
      status: "succeeded";
      formulaVersion: string;
      parameterSnapshot: CalculationParameterSnapshot;
      startedAt: string;
      completedAt: string;
    };
    calculationResult: {
      id: string;
      calculationRunId: string;
      emissionsPayload: Record<string, unknown>;
      createdAt: string;
    };
  };
};
```

## Error response

Use this when the request is valid, but the current inventory cannot be calculated from the submitted input and available parameters.

```ts
type CalculateCurrentInventoryCannotRunResponse = {
  error: {
    status: 422;
    message: "calculationCannotRun";
    details: {
      calculationRunId: string;
      reasons: Array<{
        code:
          | "missingCalculationInput"
          | "invalidInput"
          | "missingParameter"
          | "unsupportedDataset";
        datasetKey?: string;
        path?: string;
        parameterKey?: string;
      }>;
    };
  };
};
```

## Binding decisions

- authenticated collectivity user only
- project access is resolved from auth plus `projectSlug`
- backend loads the authoritative `setupPayload` from the current inventory
- submitted `inventoryInput` is saved before calculation starts
- calculation processes the full applicable inventory scope for the current project
- one `CalculationRun` is created for each calculation attempt
- successful calculation creates one `CalculationResult`
- successful calculation sets `Inventory.status = "calculated"`
- successful calculation sets `Inventory.latestCalculationRunId` to the successful run id
- successful calculation locks the calculated inventory years in `Inventory.lockedYears`
- failed calculation stores a failed `CalculationRun`
- failed calculation does not create a `CalculationResult`
- failed calculation does not replace `Inventory.latestCalculationRunId`
