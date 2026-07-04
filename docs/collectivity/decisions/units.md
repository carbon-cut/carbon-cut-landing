# Units

## Goal

Document the current unit strategy and the remaining decision on conversion centralization.

## Current rule

- Emission factors are expressed as `kg CO₂e / canonical_usage_unit`.
- Each activity type has its own canonical usage unit.
- Forms display the entry unit to the user.

## Current canonical usage units

- masses -> `kg`
- diesel -> `L`
- petrol -> `L`
- natural gas -> `Nm³`
- emissions results -> `kg CO₂e`
- direct greenhouse gas quantities, when tracked directly, use the gas unit itself in `kg`, for example `kg N₂O`

## Storage and calculation rule

- Activity data should be usable in the canonical usage unit expected by the factor.
- Factor application uses `kg CO₂e / canonical_usage_unit`.

## Missing decision

Unit conversions should be centralized next to the calculation engine, as part of the calculation flow, instead of being scattered across forms or formulas.

## Draft unit metadata

- `value`
- `unit`

This is enough for now.

Conversion rules should not be repeated in each metadata object. They should live in one centralized conversion layer.

## Conversion location

- Unit conversion lives next to the calculation engine.
- In practice, it should behave like part of the calculation flow because that is where the canonical unit is needed.

## Example conversions

- `m³` -> `Nm³` when normalization is required by the factor
- `kg` -> canonical mass unit when a dataset expects another base unit
- input unit -> canonical usage unit before factor application

## Notation

- In future docs, use proper notation when possible: `Nm³`, `CO₂`, `CO₂e`
