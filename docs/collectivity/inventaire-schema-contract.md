# Inventaire Schema Contract

This note describes the schema pattern used by the `collectivity` inventory layer.

It is the source of truth for how we structure yearly data, units, locale labels, and dataset tables.

## Goal

The inventory schema exists to enforce a structural contract:

- values are stored by year
- units are stored in a predictable place
- dataset shapes stay consistent across municipal sections
- labels stay separate from structure

The goal is not to make the schema "generic".
The goal is to make the data shape predictable and safe to render.

## Where Each Concern Lives

### Locale

The locale provides labels only.

It should not become the source of row data or table structure.

Use keyed objects for labels, for example:

- `fleet.category`
- `fleet.fuel`
- `publicLighting.infrastructure`
- `publicLighting.lamps`
- `publicLighting.yearly`

### Schema config

`src/app/collectivity/_inventaire/InventorySchema/municipal/config.ts` holds the structural constants:

- dataset keys
- row keys
- column keys
- unit definitions

Keep these names simple.

### Dataset config

`src/app/collectivity/_inventaire/datasets/municipal/*/config.ts` builds row and column arrays from the schema constants.

This is where labels from the locale are mapped onto row objects.

### Schema index

`src/app/collectivity/_inventaire/InventorySchema/municipal/index.ts` defines the actual Zod shapes.

Use the shared helpers when they enforce the desired structure:

- `createMatrixSchema` for values by year
- `createGridSchema` for nested value tables by year
- `createGroupSchema` for grouped sections

Do not add new schema-builder abstractions unless there is a clear need and approval for that pattern.

## Structural Rules

### Yearly values

Yearly data must be explicit in the schema.

Preferred shape:

- `section.dataSet.metric.rowKey.value.y-2023`
- `section.dataSet.metric.rowKey.unit`

For nested tables, the helper should still keep the same year/value/unit contract.

### Units

Units are part of the schema contract.

They should be attached structurally, not inferred from labels.

### Naming

Keep names short and direct:

- `fleet`
- `publicLighting`
- `infrastructure`
- `lamps`
- `yearly`

Avoid introducing more abstraction than the dataset needs.

## Practical Examples

### Fleet

- row groups are built from `fleet` keys
- yearly values are enforced through schema helpers
- units come from the schema config, not from locale text

### Public lighting

- infrastructure rows come from `publicLighting.infrastructureKeys`
- lamp rows and lamp columns come from `publicLighting.lampKeys` and `publicLighting.lampCols`
- yearly consumption and bill data use the same yearly contract as the rest of the inventory

## Editing Rule

When updating inventory datasets:

1. update schema config keys and units first
2. update the Zod shape in the municipal schema index
3. update the dataset config row builders
4. update locale labels last

That keeps the structure stable while labels move around it.
