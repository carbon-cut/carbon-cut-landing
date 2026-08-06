### Goal

Implement save and reload of editable inventory input for the current draft.

### Acceptance criteria

- [ ] User can enter inventory input for the scoped sections: municipality, energy, transport, and AFAT
- [ ] User can save an incomplete draft with minimal validation
- [ ] Saving updates the current `Inventory.inventoryInput`
- [ ] Reopening the project restores the saved `setupPayload` and `inventoryInput`
- [ ] Save keeps values grouped by year and subgroup
- [ ] Save does not create a `CalculationRun`
- [ ] Save does not create a `CalculationResult`

effort: M
