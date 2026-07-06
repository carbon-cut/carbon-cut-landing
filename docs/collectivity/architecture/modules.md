# Architecture Modules

## Calculation parameter management

### Responsibility

Own the calculation parameter catalog and its maintenance lifecycle.

### Owns

- parameter definitions
- parameter versioning by source and validity period
- parameter metadata: kind, unit, gas, selector, applicability
- the rule metadata needed for later parameter resolution
- parameter edit permissions

### Inputs

- official factor sources
- imported parameter tables
- admin-managed parameter entries
- user-managed country-specific parameter entries when missing

### Outputs

- maintained parameter records usable by calculation
- parameter metadata and traceability fields usable during calculation
- permission state for whether a parameter can be edited or only requested

### Rules

- A parameter is either `global` or `country-specific`.
- `unit` is the physical unit. `gas` is stored separately on parameters when they refer to `CO2`, `CH4`, `N2O`, or `CO2e`.
- Each parameter family should define its selector vocabulary instead of relying on arbitrary selector keys.
- Imports must parse raw names and raw units into structured fields. Raw import names are not the source of truth for `key`.
- Admin manages parameters and country-specific parameters.
- A user can add a country-specific parameter only when none exists for that country and use case.
- If an admin-set country-specific parameter exists, the user cannot edit it directly.
- In that case, the user may request permission or request a change.
- Parameters must carry the selector, applicability, and validity data needed for later resolution during a calculation run.

### Boundaries

This module does not collect activity data, does not calculate results, and does not own report presentation.

### Shared entities

- `CalculationParameter`
- `SourceReference`

## Results/reporting

### Responsibility

Own the reading and presentation of inventory outputs.

### Owns

- result views
- reporting views
- readings by category, source, and perimeter
- comparison views that help explain the inventory

### Inputs

- calculated inventory results
- saved project and workflow state

### Outputs

- readable inventory outputs
- summaries for review and reporting

### Rules

- Results are for reading, not for data entry.
- Reporting must present results clearly by category, source, or perimeter.
- Reporting should help users understand the current inventory output state.

### Boundaries

This module does not collect activity data, does not manage factors, and does not calculate results.

### Shared entities

- `CalculationResult`
- `Project`

## Project/workflow storage

### Responsibility

Own the storage of project state and workflow state for one collectivity plan.

### Owns

- project identity
- `cadrage` state
- `general data` state
- current `inventory` state
- user save-for-later state
- locked years
- progress and completion state
- saved calculation outputs when needed
- saved parameters used for a specific inventory
- saved calculation algorithm version reference

### Inputs

- project data
- workflow updates
- activity data updates
- calculation result updates

### Outputs

- persistent project state
- persistent workflow state
- current progress state for the workspace

### Rules

- Storage is scoped to one collectivity plan.
- Workflow state must stay linked to the project and its inventory years.
- Users can save their work whenever they want and continue later.
- Save should accept incomplete input with minimal validation.
- The project stores the current nested inventory state.
- Previously calculated years remain read-only by default.
- Reopening old years must be an explicit special action.
- The project should save the parameters used for a specific inventory for auditability.
- Stored parameter usage should come from the calculation output, not from a separate parameter lookup.
- The project should save the calculation algorithm version used for a specific inventory.
- The workspace must be able to read the current progress and saved state at any time.

### Boundaries

This module does not define calculation rules, does not manage factors, and does not own report presentation.

### Shared entities

- `Project`
- `InventoryState`
- `CalculationRun`
- `CalculationResult`

## Calculation engine

### Responsibility

Own the calculation flow that transforms activity data and parameters into inventory results.

### Owns

- calculation rules
- per-run parameter acquisition and resolution
- parameter application
- yearly result generation
- production of the canonical emissions output for the run

### Inputs

- structured activity data
- inventory years
- parameter data from `Calculation parameter management`

### Outputs

- canonical emissions output that mirrors the activity structure
- the parameter snapshot used for the calculation
- the calculation algorithm version used

### Rules

- Calculations use the inventory years defined in `cadrage`.
- Before formula execution, the calculation flow should determine all parameters needed for the run.
- The calculation flow should acquire those parameters in one database call, or one preload phase, not by on-demand lookups during calculation.
- After acquisition, the run should resolve the parameters it will use from the preloaded set.
- Parameter resolution uses selector, year, and country applicability.
- If a `country-specific` parameter exists, it must be used.
- If no `country-specific` parameter exists, the run falls back to the `global` default when a fallback exists.
- The calculation output should stay structurally close to the submitted activity data rather than being reshaped into a reporting model.
- The calculation should specify the parameter snapshot used for that calculation.
- The calculation should specify the calculation algorithm version used.
- Results must stay traceable to both activity data and parameters.

### Boundaries

This module does not collect activity data, does not manage factors, and does not own report presentation.

### Shared entities

- `CalculationParameter`
- `CalculationRun`
- `CalculationResult`

## Activity data collection

### Responsibility

Own the collection and storage of activity data used by the inventory.

### Owns

- `cadrage`
- `general data`
- `inventory`
- yearly data entry
- common data format across datasets

### Inputs

- territory
- inventory years
- manual user input
- imported dataset files

### Outputs

- structured activity data ready for calculation
- consistent dataset data by year

### Rules

- `cadrage` defines the territory and the inventory years.
- `general data` and `inventory` data follow the years defined in `cadrage`.
- Datasets use a common data format.

### Boundaries

This module does not manage factors, does not calculate results, and does not own report presentation.

### Shared entities

- `Project`
- `InventoryState`
