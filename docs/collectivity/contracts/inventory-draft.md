# Inventory Draft Contract

`ProjectSetupPayload` keeps the same shape defined in `contracts/project-init.md`.

## Shared data

```ts
type InventoryInputPayload = {
  years: number[];
  municipal: Record<string, unknown>;
  energy: Record<string, unknown>;
  transport: Record<string, unknown>;
  afat: Record<string, unknown>;
};
```

For this contract, the required saved scope is:

- `municipal`
- `energy`
- `transport`
- `afat`

The payload stored in `Inventory.inventoryInput` must keep the same nested structure as the frontend inventory form.

## Routes

### `GET /api/collectivity/projects/:projectSlug/current-inventory`

```ts
type GetCurrentInventoryResponse = {
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
      inventoryInput: InventoryInputPayload | null;
      status: "draft" | "calculated" | "outdated";
      lockedYears: number[];
      latestCalculationRunId: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
};
```

### `PUT /api/collectivity/projects/:projectSlug/current-inventory/input`

```ts
type SaveInventoryDraftRequest = {
  inventoryInput: InventoryInputPayload;
};
```

```ts
type SaveInventoryDraftResponse = {
  data: {
    project: {
      id: string;
      slug: string;
      currentInventoryId: string;
      updatedAt: string;
    };
    currentInventory: {
      id: string;
      projectId: string;
      setupPayload: ProjectSetupPayload;
      inventoryInput: InventoryInputPayload;
      status: "draft" | "calculated" | "outdated";
      lockedYears: number[];
      latestCalculationRunId: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
};
```

## Binding decisions

- authenticated collectivity user only
- project access is resolved from auth plus `projectSlug`
- save updates the current inventory in place
- incomplete draft data is allowed
- save does not create a new `Inventory`
- save does not create a `CalculationRun`
- save does not create a `CalculationResult`
