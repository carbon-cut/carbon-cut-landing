# Inventory Result Contract

This contract defines the result-reading payload returned after a successful
collectivity inventory calculation.

It is a read model for the result page. `resultRows` is the normalized,
persisted calculation output; the frontend must not traverse calculation
internals to build visualizations.

## Route

### `GET /api/collectivity/projects/:projectSlug/current-inventory/result`

The route returns the latest successful persisted calculation result for the
current inventory.

## Result rows

Result rows are grouped by inventory year. The `y-` prefix is intentional: it
keeps the JSON object key explicit and avoids treating object keys as numeric
array indexes.

```ts
type ResultYearKey = `y-${number}`;

/** Fixed accounting owners or a public-transport company name from inventory input. */
type ResultOwnerKey = "municipal" | "territory" | "airport" | "port" | string;

type ResultFamilyKey = "energy" | "afat" | "waste";

type ResultSectorKey = "transport" | "industry" | "residential" | "tertiary" | "agriculture";

type ResultScopeKey = "scope1" | "scope2" | /* extended */ "scope3";

type ResultEnergyKey =
  | "electricity"
  | "naturalGas"
  | "gpl"
  | "diesel"
  | "gasoline"
  | /* extended */ "gnv";

type ResultActivityKey = "landTransport" | "airport" | "navigation" | "municipalFleet";

type ResultAfatSourceKey =
  | "manureManagement"
  | "organicSoilAmendment"
  | "syntheticFertilizer"
  | "cropProduction"
  | string;

type ResultWasteSourceKey = "greenWaste";

type ResultDirection = "emission" | "absorption";

type ResultRow = {
  /** Stable result identifier. Its display label is resolved by the frontend locale. */
  key: string;
  value: number;
  unit: string;

  /** Stable classification identifiers, not translated display strings. */
  owner: ResultOwnerKey;
  family: ResultFamilyKey;
  sector?: ResultSectorKey;
  scope?: ResultScopeKey;
  energy?: ResultEnergyKey;
  activity?: ResultActivityKey;
  afatSource?: ResultAfatSourceKey;
  wasteSource?: ResultWasteSourceKey;
  direction: ResultDirection;
};

type ResultsByYear = Record<ResultYearKey, ResultRow[]>;
```

Example:

```json
{
  "y-2019": [
    {
      "key": "industryElectricity",
      "value": 148506.7763290135,
      "unit": "tCO2e",
      "owner": "territory",
      "family": "energy",
      "sector": "industry",
      "scope": "scope2",
      "energy": "electricity",
      "direction": "emission"
    },
    {
      "key": "greenWaste",
      "value": -12766.909671937332,
      "unit": "tCO2e",
      "owner": "municipal",
      "family": "afat",
      "afatSource": "absorptions",
      "direction": "absorption"
    }
  ]
}
```

## Calculation-result payload

```ts
type CalculationWarning = {
  code:
    | "negativeEstimatedActivityClamped"
    | "missingLtoCorrectionFactorDefaulted"
    | "treeAbsorptionFactorFallbackUsed"
    | "greenWasteAbsorptionFallbackUsed";
  itemId?: string;
  path?: string;
  message: string;
  details?: Record<string, unknown>;
};

type InventoryCalculationResult = {
  id: string;
  calculationRunId: string;
  resultRows: ResultsByYear;
  /** Persisted non-emission values needed to interpret result rows. */
  context: {
    population: Partial<Record<ResultYearKey, { value: number; unit: string }>>;
  };
  /** Warnings recorded during the persisted successful calculation run. */
  warnings: CalculationWarning[];
  createdAt: string;
};
```

## Success response

```ts
type GetCurrentInventoryResultResponse = {
  data: InventoryCalculationResult;
};
```

## Binding decisions

- The backend returns the calculated `value` and its `unit`; the frontend uses
  its existing unit handler to display that unit.
- `key` and every classification field are stable machine identifiers. The
  frontend resolves their human-readable labels, colours, and ordering from
  its locale/configuration.
- The backend owns the assignment of classifications. The frontend may filter
  and sum rows for a chart, but must not infer classifications from `key`.
- `owner` identifies the accounting owner independently from the emission
  family. Besides the fixed owners, public-transport rows use their operator
  `name` from inventory input. Result formation may later use it to apply
  accounting adjustments; calculation rows remain gross values.
- Tree absorption rows use the stable `key: "treeAbsorption"` and preserve
  their tree source from input in `afatSource` (for example `urbanTrees`,
  `fruitTrees`, or a tracked-tree row's `treeType`).
- `warnings` are the structured warnings persisted with the linked successful
  calculation run. The result API exposes them directly and does not need to
  return the complete calculation run.
- A row is present only when there is a calculated result for that year. A
  missing row is not represented by a zero-valued placeholder.
- Every identifier the backend may emit must have a corresponding frontend
  locale entry. Adding an identifier requires updating this contract and the
  frontend locale/configuration in the same change.
- The category fields are intentionally closed unions. Do not replace them
  with loose `string` fields.
