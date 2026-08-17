## Goal

Create the semantic representation of inventory fields that the AI uses when deciding where extracted data belongs.

## Scope

Define an `AIFieldDefinition` structure containing at least:

- stable field ID
- human-readable label
- description
- value type
- expected unit
- dimensions such as year
- allowed values where applicable
- aliases / common terminology

Example concept:

```ts
{
  id: "municipal.publicLighting.electricityConsumption",
  label: "Public lighting electricity consumption",
  description: "Annual electricity consumed by the municipal public lighting network",
  valueType: "number",
  unit: "kWh",
  dimensions: ["year"],
  aliases: [
    "consommation éclairage public",
    "consommation EP"
  ]
}
```

Create the mapping between the semantic field ID and the actual application/form path.

Do not expose the complete application schema to the model when only one dataset is being edited.

## Acceptance criteria

- A field can be referenced by a stable semantic ID without exposing its RHF path.
- Given a dataset such as public lighting, the application can produce a catalog containing only its relevant AI fields.
- Catalog entries describe enough semantics for the model to distinguish similar fields.
- The mapping from semantic ID → application field is deterministic and application-controlled.

**Estimated effort: 0.5 day**
