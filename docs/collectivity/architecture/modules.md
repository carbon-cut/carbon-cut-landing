# Architecture Modules

## Calculation parameter management

### Responsibility

Own the calculation parameters used by the inventory and calculation flow.

### Owns

- parameter definitions
- parameter versioning by source and validity period
- parameter metadata: kind, unit, selector, applicability
- parameter selection rules for a given inventory year, country, and selector
- fallback from country-specific parameter to global default
- parameter edit permissions

### Inputs

- official factor sources
- imported parameter tables
- admin-managed parameter entries
- user-managed country-specific parameter entries when missing
- inventory context: territory, country, year, selector

### Outputs

- resolved parameter set usable by the calculation engine
- traceability data showing which parameter was used and why
- permission state for whether a parameter can be edited or only requested

### Rules

- A parameter is either `global` or `country-specific`.
- If a `country-specific` parameter exists, it must be used.
- If no `country-specific` parameter exists, the module falls back to the `global` default. Not all parameters have a fallback.
- Parameter resolution uses selector, year, and country.
- Admin manages parameters and country-specific parameters.
- A user can add a country-specific parameter only when none exists for that country and use case.
- If an admin-set country-specific parameter exists, the user cannot edit it directly.
- In that case, the user may request permission or request a change.

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
- parameter application
- yearly result generation
- aggregation by dataset, category, and perimeter

### Inputs

- structured activity data
- resolved parameters
- inventory years

### Outputs

- calculated inventory results by year
- aggregated totals for result reading
- calculation traceability
- the parameter set used for the calculation
- the calculation algorithm version used

### Rules

- Calculations use the inventory years defined in `cadrage`.
- Calculations use the resolved parameters provided by `Calculation parameter management`.
- The calculation engine should load parameters in one database call, or from one preloaded parameter set, not call parameters one by one during calculation.
- Parameter resolution uses selector, year, and country applicability.
- The calculation should specify the parameters used for that calculation.
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
