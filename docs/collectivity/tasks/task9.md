### Goal

Implement persistence for `CalculationRun` and `CalculationResult`.

### Acceptance criteria

- [ ] `CalculationRun` table/model exists
- [ ] `CalculationResult` table/model exists
- [ ] `CalculationRun.inventoryId` relation is supported
- [ ] `CalculationRun.parameterSnapshot` is supported
- [ ] `CalculationRun.formulaVersion` is supported
- [ ] `CalculationRun.status` supports `succeeded` and `failed`
- [ ] `CalculationResult.emissionsPayload` is supported
- [ ] A successful run can be linked to one result
- [ ] Migrations run successfully

effort: M
