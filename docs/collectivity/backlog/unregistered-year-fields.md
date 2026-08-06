### Goal

Fix validation coverage for inventory years whose fields were never mounted or registered.

### Problem

Some inventory tables render one selected year at a time. If a user never opens another year, that year's inputs may never register with React Hook Form. In that case validation may not run for that year's fields at all, so an inventory year can be completely missing for a dataset while the user can still send the dataset to calculation.

This is worse than a visual year-selector issue: the missing year may not be represented in validation errors, may not be highlighted, and may reach calculation as absent data.

### Acceptance criteria

- [ ] Validation actually covers every configured inventory year, including years never opened in the UI
- [ ] Missing required data for hidden/unopened years blocks calculation
- [ ] Validation errors for hidden/unopened years are visible through the year selector
- [ ] The solution does not require users to manually open every year first
- [ ] The solution works for normal schema validation errors
- [ ] The solution works for readiness/debug-calculation errors
- [ ] Calculation payload cannot silently omit a required inventory year for a dataset
- [ ] The solution keeps year-selector error detection out of dataset surfaces
- [ ] The behavior is verified on at least one table that renders one year at a time

effort: M
