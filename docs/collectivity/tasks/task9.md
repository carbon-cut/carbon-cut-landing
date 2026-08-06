### Goal

Implement subgroup-level debug calculation actions inside the inventory form.

### Acceptance criteria

- [ ] Each subgroup can expose a local debug `Calculate` action
- [ ] The debug calculation uses the current in-memory subgroup input, including unsaved changes
- [ ] The debug calculation does not save the `Inventory`
- [ ] The debug calculation does not create a `CalculationRun`
- [ ] The debug calculation does not create a `CalculationResult`
- [ ] The debug calculation reuses the same parameter resolution and formula path as the full calculation, but scoped to one subgroup
- [ ] The debug result is shown locally near the subgroup in a clearly temporary or debug-oriented way
- [ ] The debug action can be disabled easily later

effort: M
