### Goal

Design how calculation parameters are stored, versioned, sourced, and selected.

Scope

- parameter kinds: emission factor, constant, density, absorption factor
- parameter value
- unit: physical unit only, for example `kg` or `L`
- gas: CO2 / CH4 / N2O / CO2e
- source
- country/region
- sector/category
- fuel/activity type
- selector
- applicability: global or country-specific
- validity year or period
- versioning

### Acceptance criteria

- [x] CalculationParameter entity is defined
- [x] `kind` covers emission factors and constants in the same table
- [x] Source/reference fields are defined
- [x] Selector and applicability rules are defined
- [x] Versioning strategy is decided
- [x] Example parameters are represented correctly

Note:

- Use the normalized approach: store `unit` and `gas` separately, then render labels such as `kg CO2e` in the UI when needed.
