### Goal

Implement project initialization and first inventory draft creation.

### Acceptance criteria

- [ ] User can create a project with the required setup data: name, territory, country, reference year, and inventory years
- [ ] Setup captures the applicability choices that decide whether sections exist, such as airport, port, and agriculture
- [ ] Creating a project also creates its first `Inventory` in `draft` status
- [ ] The new `Inventory` is linked as the project's `currentInventoryId`
- [ ] `setupPayload` is stored on the `Inventory`
- [ ] Reopening the project loads the current `Inventory`
- [ ] Project initialization does not create a `CalculationRun`

effort: M
