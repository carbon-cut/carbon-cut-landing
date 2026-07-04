# Parameter Sample DB Shape

This file shows how the raw parameter sample can map into the current `CalculationParameter` architecture.

For tabular viewing, use [parameter-sample-db-shape.csv](/home/lenovo/projects/carbon-cut-landing.worktrees/experimental-sectionIsolation/docs/collectivity/architecture/parameter-sample-db-shape.csv:1).

## Mapping assumptions

- Raw `name` informs `key` and `selector`, but should not be copied directly into `key`.
- Raw `type` maps to `applicability`.
- For this example, raw `specific` is treated as `country-specific`.
- Raw `global` stays `global`.
- Raw `scope` maps to `emissionScope`.
- Raw `year` maps to `validFromYear` when only one year is given.
- `validToYear` stays `null` unless a period is explicitly known.
- `unit` is the physical unit only.
- `gas` stores `CO2`, `CH4`, `N2O`, or `CO2e` when relevant.
- `value` should be numeric in storage. Values like `46%` should be normalized before insert.
- Raw `source` should point to a `SourceReference` row through `sourceReferenceId`.
- Raw `comment` does not currently have a dedicated field on `CalculationParameter`. For now it can stay in import notes or in `SourceReference.note`.
- `selector` should stay minimal and use only the fields that matter for that parameter family.

## Raw to DB field mapping

| Raw column | DB field                                                       |
| ---------- | -------------------------------------------------------------- |
| `name`     | `key` + `selector`                                             |
| `unit`     | `unit` + `gas` + selector qualifiers when needed               |
| `type`     | `applicability`                                                |
| `value`    | `value`                                                        |
| `year`     | `validFromYear`                                                |
| `scope`    | `emissionScope`                                                |
| `version`  | not yet modeled separately beyond validity/versioning strategy |
| `source`   | `sourceReferenceId`                                            |
| `comment`  | import note or `SourceReference.note`                          |

## Representative rows in normalized shape

### Electricity factor

```json
{
  "key": "ef-electricity",
  "kind": "emissionFactor",
  "selector": {},
  "applicability": "country-specific",
  "country": "TN",
  "gas": "CO2e",
  "emissionScope": "2",
  "value": 0.5193,
  "unit": "kWh",
  "sourceReferenceId": "<source:electricity-factor-2019>",
  "validFromYear": 2019,
  "validToYear": 2019
}
```

### Petrol factor

```json
{
  "key": "ef-petrol",
  "kind": "emissionFactor",
  "selector": {},
  "applicability": "country-specific",
  "country": "TN",
  "gas": "CO2e",
  "emissionScope": "1",
  "value": 2.3505,
  "unit": "L",
  "sourceReferenceId": "<source:petrol-factor>",
  "validFromYear": null,
  "validToYear": null
}
```

### Global warming potential

```json
{
  "key": "gwp",
  "kind": "constant",
  "selector": {
    "inputGas": "CH4"
  },
  "applicability": "global",
  "country": null,
  "gas": "CO2e",
  "emissionScope": null,
  "value": 25,
  "unit": "g",
  "sourceReferenceId": null,
  "validFromYear": null,
  "validToYear": null
}
```

Interpretation:

- numerator gas is `CO2e`
- denominator gas `CH4` is better captured in `selector.inputGas`

### Composting methane factor

```json
{
  "key": "compostingEf",
  "kind": "emissionFactor",
  "selector": {
    "wasteType": "greenWaste"
  },
  "applicability": "global",
  "country": null,
  "gas": "CH4",
  "emissionScope": null,
  "value": 4,
  "unit": "kg",
  "sourceReferenceId": "<source:ipcc>",
  "validFromYear": null,
  "validToYear": null
}
```

Interpretation:

- stored `unit` is the denominator base unit used by the factor
- emitted gas stays in `gas`
- the full display label can still be rendered as `g CH4 / kg` or normalized to `kg CH4 / kg`

### Olive tree biomass constant

```json
{
  "key": "treeBiomass",
  "kind": "constant",
  "selector": {
    "treeType": "olive",
    "treeStage": "young"
  },
  "applicability": "country-specific",
  "country": "TN",
  "gas": null,
  "emissionScope": null,
  "value": 38,
  "unit": "kg",
  "sourceReferenceId": "<source:ipcc>",
  "validFromYear": null,
  "validToYear": null
}
```

### Root-to-shoot ratio

```json
{
  "key": "rootToShoot",
  "kind": "constant",
  "selector": {
    "treeFamily": "broadleaf"
  },
  "applicability": "global",
  "country": null,
  "gas": null,
  "emissionScope": null,
  "value": 46,
  "unit": "percent",
  "sourceReferenceId": "<source:ipcc-table-4-4>",
  "validFromYear": null,
  "validToYear": null
}
```

### Manure methane parameter

```json
{
  "key": "manureEf",
  "kind": "emissionFactor",
  "selector": {
    "animal": "dairyCattle"
  },
  "applicability": "country-specific",
  "country": "TN",
  "gas": "CH4",
  "emissionScope": "1",
  "value": 99.5646,
  "unit": "head/year",
  "sourceReferenceId": "<source:ire-sfax>",
  "validFromYear": null,
  "validToYear": null
}
```

### Confined time share

```json
{
  "key": "confinedTimeShare",
  "kind": "constant",
  "selector": {
    "animal": "dairyCattle"
  },
  "applicability": "global",
  "country": null,
  "gas": null,
  "emissionScope": null,
  "value": 100,
  "unit": "percent",
  "sourceReferenceId": "<source:ire-sfax>",
  "validFromYear": null,
  "validToYear": null
}
```

## Notes surfaced by this sample

- Composite raw units like `kgCO2e/L` or `kgCH4/head/year` need parsing before insert.
- Some selectors are embedded in the raw `name` and should not stay implicit in application code.
- Architectural `key` values should stay readable and should not just repeat the raw import labels.
- The current architecture can represent these rows, but imports need a parsing layer, not direct string copy into the database.

## Reminder

- There is still a defaults question to settle.
- In particular: when a raw row is `specific`, what default `country`, fallback behavior, and default-source precedence should the system apply if import data is incomplete?
