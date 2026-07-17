### Goal

Define and implement setup editing rules for an existing collectivity project after inventory data may already exist.

### Acceptance criteria

- [ ] User can reopen project setup in edit mode for an existing project
- [ ] Backend exposes an update route for project setup and current inventory setup payload
- [ ] Editing rules are defined for applicability toggles after related data has already been saved
- [ ] Editing rules are defined for removing inventory years after related data has already been saved
- [ ] Editing rules are defined for changing the reference year after inventory data already exists
- [ ] Editing rules are defined for changing the project slug and the resulting route behavior
- [ ] Backend rejects blocked setup edits with explicit validation/error responses
- [ ] Frontend handles blocked setup edits without silent failure or hidden data loss
- [ ] No saved inventory data is deleted implicitly unless deletion behavior is explicitly defined and approved

effort: L
