# Setup Edit Contract

Temporary planning contract for setup edit.

This file exists only to align frontend and backend before implementation.

Delete it after setup edit is implemented and the behavior is reflected in the permanent contracts.

## Shared data

`ProjectSetupPayload` keeps the same shape defined in `contracts/project-init.md`.

`InventoryInputPayload` keeps the same shape defined in `contracts/inventory-draft.md`.

## Scope

This contract covers only:

- reopening setup for an existing collectivity project
- updating the current inventory `setupPayload`
- backend side effects when years or applicability change
- slug update behavior
- current inventory/result invalidation caused by setup changes

This contract does not cover:

- project initialization
- detailed frontend warning UX
- inventory revision history beyond the current inventory
- permanent aliasing from old slug to new slug

## Core decisions

- setup edit updates the existing project, it does not create a new project
- the backend resolves the target project from authenticated access plus the current project slug in the route
- if a year is removed from `inventoryYears`, the backend purges that year from the saved current inventory state
- if `airport`, `port`, or `agriculture` is disabled, the backend purges the related saved inventory state
- if setup changes invalidate an existing calculated state, the backend marks the current inventory/result state as no longer current
- if a year is added while the current inventory is already calculated, the backend creates the appropriate new current inventory state for continued editing
- if the slug changes successfully, the response returns the new canonical slug
- old slug routes do not need aliasing; stale routes may fall back to the projects root with existing app behavior

## Route

### `PUT /api/collectivity/projects/:projectSlug/setup`

```ts
type UpdateSetupRequest = {
  name: string;
  slug: string;
  territory: string;
  country: string; // ISO 3166-1 alpha-3
  referenceYear: number;
  inventoryYears: number[];
  applicability: {
    airport: boolean;
    port: boolean;
    agriculture: boolean;
  };
};
```

## Required behavior

- require authenticated collectivity user
- resolve project access from auth plus `projectSlug`
- validate payload shape and setup invariants
- update project framing fields that remain stored on `Project`
- update `currentInventory.setupPayload`
- if years were removed, purge saved current-inventory data for those removed years
- if applicability fields were disabled, purge saved current-inventory data for the affected sections
- if setup changes make the previously calculated state outdated, mark the current inventory/result as outdated
- if the submitted slug is already in use by another accessible project, reject the update
- return the updated project plus the updated current inventory snapshot

## Success response

```ts
type UpdateSetupResponse = {
  data: {
    project: {
      id: string;
      slug: string;
      name: string;
      territory: string;
      country: string;
      referenceYear: number;
      inventoryYears: number[];
      currentInventoryId: string;
      createdAt: string;
      updatedAt: string;
    };
    currentInventory: {
      id: string;
      projectId: string;
      setupPayload: ProjectSetupPayload;
      inventoryInput: InventoryInputPayload | null;
      status: "draft" | "calculated" | "outdated";
      lockedYears: number[];
      latestCalculationRunId: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
};
```

## Error responses

### Slug conflict

```ts
type UpdateSetupSlugConflictResponse = {
  error: {
    status: 409;
    message: "collectivityProjectSlugTaken";
    details: {
      fieldErrors: {
        slug: "collectivityProjectSlugTaken";
      };
    };
  };
};
```

### Invalid setup edit

Use this when the payload shape is valid but the requested edit is rejected by business rules.

```ts
type UpdateSetupValidationResponse = {
  error: {
    status: 422;
    message: "collectivitySetupEditInvalid";
    details?: {
      fieldErrors?: Partial<Record<keyof UpdateSetupRequest, string>>;
    };
  };
};
```

## Frontend binding expectations

- after `200`, frontend navigates to the same surface under the returned `project.slug`
- setup edit invalidates setup, current inventory, and result queries
- already open `/inventory` views should refresh from the latest server snapshot
- destructive edits should show warnings in the UI, but warning copy is not part of this contract
