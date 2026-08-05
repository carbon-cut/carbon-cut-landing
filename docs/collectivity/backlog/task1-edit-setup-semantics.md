### Goal

Define and implement setup editing rules for an existing collectivity project after inventory data may already exist.

### Planning note

Before implementation, define the frontend architecture for setup-edit side effects.

The current collectivity setup/inventory flow still uses ad hoc raw `fetch` calls. That is not sufficient for setup edits that can invalidate inventory state, result state, and open inventory screens.

This task should therefore be planned with TanStack Query as the target frontend data layer for collectivity:

- setup snapshot should be query-backed
- current inventory snapshot should be query-backed
- result/calculation state should be query-backed
- setup save, draft save, and calculation actions should be mutation-backed
- setup edits should invalidate dependent collectivity queries and force open inventory views to rebuild from the latest server snapshot

Do not implement setup-edit behavior on top of the current raw `fetch` pattern.

Reminder: show warnings for destructive setup edits such as year removal or disabling applicability fields. This is implementation detail, not a planning blocker.

### Acceptance criteria

- [ ] User can reopen project setup in edit mode for an existing project
- [ ] Backend exposes an update route for project setup and current inventory setup payload
- [ ] A frontend implementation plan is defined before coding, including query ownership, mutation ownership, invalidation flow, and forced refresh behavior for open collectivity inventory views
- [ ] Collectivity setup/inventory data flow is migrated away from raw `fetch` to TanStack Query before or as part of setup-edit implementation
- [ ] Editing rules are defined for applicability toggles after related data has already been saved
- [ ] Editing rules are defined for removing inventory years after related data has already been saved
- [ ] Editing rules are defined for changing the reference year after inventory data already exists
- [ ] Editing rules are defined for changing the project slug and the resulting route behavior
- [ ] Backend rejects blocked setup edits with explicit validation/error responses
- [ ] Frontend handles blocked setup edits without silent failure or hidden data loss
- [ ] No saved inventory data is deleted implicitly unless deletion behavior is explicitly defined and approved

effort: L
