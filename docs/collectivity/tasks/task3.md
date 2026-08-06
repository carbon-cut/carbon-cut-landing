### Goal

Implement full calculation run orchestration and persistence.

### Acceptance criteria

- [ ] A calculate action submits the current `setupPayload` and `inventoryInput` together
- [ ] The calculation flow gathers all parameters needed for the run before formula execution
- [ ] Parameter resolution uses family key, selector, year, and country fallback rules
- [ ] One `CalculationRun` is stored for each calculation attempt
- [ ] `CalculationRun.status` is only `succeeded` or `failed`
- [ ] `CalculationRun` stores the `parameterSnapshot` used by the run
- [ ] `CalculationRun` stores the `formulaVersion` used by the run
- [ ] One `CalculationResult` is stored for each successful calculation run
- [ ] `CalculationResult.emissionsPayload` keeps the canonical nested output structure
- [ ] A failed run does not overwrite the latest successful result

effort: L
