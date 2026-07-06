# Calculation Data Flow

## Goal

Define the happy-path flow for how calculation data moves from user input to stored results.

This note is intentionally narrow. It defines the main lifecycle and system boundaries first. Detailed payload shapes can be added after the flow is agreed.

## Happy-path flow

1. A user fills the inventory form and submits it.
2. The submitted form payload is the primary `ActivityData` for that project context.
3. The backend receives the submitted `ActivityData` together with the calculation context, such as project, inventory year, territory, and country.
4. The backend performs authoritative validation and may do a final preparation pass on the payload before calculation.
5. That preparation pass may enrich or reshape the payload for engine use, but it must not silently change the business meaning of the user input.
6. The backend resolves the calculation parameters needed for that project context using selector, year, country, and fallback rules.
7. The calculation engine receives prepared activity data plus the resolved parameter set.
8. The calculation engine computes the emissions result and produces traceability data about what parameters and formulas were used.
9. The system stores the calculation run, the calculation result, and the parameter usage needed for auditability.
10. The results UI reads stored outputs and presents them to the user.

## Core flow

```text
User form
-> ActivityData
-> Backend validation and preparation
-> Parameter resolution
-> Calculation engine
-> CalculationRun
-> CalculationResult
-> Results UI
```

## Contract boundaries

This note does not define full payload schemas. It only names the boundary objects that move through the flow and what each one must carry.

### `ActivityData`

The primary business input produced by the form layer.

Carries:

- the user-submitted inventory activity payload
- the applicable data needed for calculation for the current project context

Detailed shape should live in a dedicated activity data document.

### `CalculationRequest`

The backend entry payload for starting a calculation.

Carries:

- `projectId`
- submitted `ActivityData`

This object starts the backend calculation flow. The backend loads project and `cadrage` context from storage using `projectId`.

### `PreparedCalculationInput`

The backend-prepared payload passed into the calculation engine.

Carries:

- calculation context needed by the engine
- submitted `ActivityData`

For now, `activityData` stays the submitted business input. A prepared variant may be introduced later if implementation proves necessary.

### `ResolvedParameterSet`

The resolved parameter snapshot acquired for one calculation run.

Carries:

- the resolved parameters used for the run
- value, unit, and gas
- selector and applicability context
- country and validity context when relevant
- source reference metadata

This object should reference parameter definitions without forcing this note to define the full parameter schema.

### `CalculationOutput`

The output returned by the calculation engine.

Carries:

- nested emissions output that mirrors `ActivityData`
- parameter snapshot used for the run
- formula or algorithm version used for the run

This object may later be split into smaller result and traceability contracts if that proves clearer.

## System boundaries

### Activity data collection

Owns:

- form data entry
- defaults applied during form use
- user-facing validation
- user-facing unit coercion
- production of the primary `ActivityData` payload

Does not own:

- parameter lookup
- parameter fallback rules
- emission formulas
- result aggregation logic

### Backend preparation

Owns:

- authoritative validation before calculation
- final technical preparation for engine use
- attaching calculation context
- rejecting inconsistent payloads that should not be calculated

May do:

- deterministic reshaping
- deterministic enrichment
- internal field attachment needed for calculation and traceability

Must not do:

- silent changes to the business meaning of the user input
- hidden assumptions that materially alter submitted activity values

### Calculation parameter management

Owns:

- parameter catalog maintenance
- parameter definitions and metadata
- versioning and applicability metadata
- imports, CRUD, and permissions

### Calculation engine

Owns:

- per-run parameter acquisition and resolution
- applying resolved parameters to activity data
- executing calculation rules
- generating outputs and traceability for the project calculation context

### Project and results storage

Owns:

- persisted project activity state
- persisted calculation runs
- persisted calculation results
- persisted parameter usage or parameter snapshot data needed for auditability

## Current decisions

- One calculation run processes the full applicable activity dataset for the current project context.
- The user is expected to fill the full inventory form, not select a manual calculation sub-scope.
- Applicability is driven by project reality and perimeter, not by a user choosing a partial run. For example, some collectivities may have no airport or no port in perimeter.
- Future modules may introduce optional domain inclusion, such as waste management, but that is not part of the current model.
- For now, calculation input stays the submitted `ActivityData`.
- Per calculation run, parameter acquisition should happen in one database call, or one preload phase, not by on-demand lookups during formula execution.
- Calculation output is canonical and should stay structurally close to `ActivityData`.
- Calculation output stores a parameter snapshot for auditability.
- Emissions output is nested JSON, similar to stored activity data.
- For now, emissions leaves contain only `value` and `unit`, with an implicit `CO2e` assumption.

## Implementation note

The exact field list of the stored parameter snapshot should be finalized during implementation.
