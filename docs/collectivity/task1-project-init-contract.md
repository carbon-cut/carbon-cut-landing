# Task 1 Project Initialization Contract

This document defines the frontend/backend contract for `docs/collectivity/tasks/task1.md`.

It exists to align frontend and backend before implementation.

It does not replace product truth or architecture docs.
It translates them into a concrete API contract for the first working flow.

## Scope

This contract covers only:

- creation of a new `Project`
- creation of the first `Inventory`
- linking that `Inventory` as `project.currentInventoryId`
- storing `setupPayload` on that `Inventory`
- reloading the current inventory when the project is reopened

This contract does not cover:

- saving `inventoryInput`
- calculation
- `CalculationRun`
- `CalculationResult`
- reopening calculated years
- inventory revision history beyond the first draft

## Product Meaning

Task 1 must implement this lifecycle:

1. the user submits the initial setup data
2. the backend creates a `Project`
3. the backend creates the first `Inventory` in `draft` status
4. the backend stores the setup data as `Inventory.setupPayload`
5. the backend links that inventory as `Project.currentInventoryId`
6. reopening the project loads that current inventory

Task 1 must not create a `CalculationRun`.

## Entities In Scope

### `Project`

Minimum fields required by this task:

- `id`
- `name`
- `slug`
- `ownerUserId`
- `territory`
- `country`
- `referenceYear`
- `inventoryYears`
- `currentInventoryId`
- `createdAt`
- `updatedAt`

### `Inventory`

Minimum fields required by this task:

- `id`
- `projectId`
- `setupPayload`
- `inventoryInput`
- `status`
- `lockedYears`
- `latestCalculationRunId`
- `createdAt`
- `updatedAt`

## Setup Payload

`setupPayload` is the initialization payload stored on the first `Inventory`.

It should be the source of truth for:

- project framing
- covered years
- applicability choices that decide whether sections exist

Suggested shape:

```ts
type ProjectSetupPayload = {
  name: string;
  slug: string;
  territory: string;
  country: string; // ISO 3166-1 alpha-3, for example "TUN"
  referenceYear: number;
  inventoryYears: number[];
  applicability: {
    airport: boolean;
    port: boolean;
    agriculture: boolean;
  };
};
```

## API Surface

Three endpoints are required for task 1.

### 1. List User Projects

Load the authenticated collectivity user's accessible projects.

Suggested route:

`GET /api/collectivity/projects`

#### Required behavior

- require authenticated collectivity user
- reject household-only users
- identify the user from the backend auth token/session
- load only projects accessible to that authenticated user
- do not require a user id in query params or request body
- return the user's accessible projects

#### Success response

```ts
type ListProjectsResponse = {
  data: Array<{
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
  }>;
};
```

### 2. Initialize Project

Create a new project and its first draft inventory.

Suggested route:

`POST /api/collectivity/projects/init`

#### Request body

```ts
type InitProjectRequest = {
  name: string;
  slug: string;
  territory: string;
  country: string; // ISO 3166-1 alpha-3, for example "TUN"
  referenceYear: number;
  inventoryYears: number[];
  applicability: {
    airport: boolean;
    port: boolean;
    agriculture: boolean;
  };
};
```

#### Required behavior

- require authenticated collectivity user
- reject household-only users
- validate payload
- create `Project`
- create first `Inventory`
- set `Inventory.status = "draft"`
- set `Inventory.inventoryInput = null`
- set `Inventory.lockedYears = []`
- set `Inventory.latestCalculationRunId = null`
- store the submitted setup as `Inventory.setupPayload`
- set `Project.currentInventoryId` to the created inventory id
- attach the project to the authenticated user
- return the created project plus current inventory
- do not create a `CalculationRun`

#### Transaction rule

The backend should create the `Project` and first `Inventory` in one transaction.

If any step fails, nothing should be persisted.

#### Success response

```ts
type InitProjectResponse = {
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
      inventoryInput: null;
      status: "draft";
      lockedYears: number[];
      latestCalculationRunId: null;
      createdAt: string;
      updatedAt: string;
    };
  };
};
```

### 3. Load Current Inventory

Load the current project state when the user reopens the workspace.

Suggested route:

`GET /api/collectivity/projects/:projectSlug/current-inventory`

#### Required behavior

- require authenticated collectivity user
- require that the user is allowed to access the project
- load the project by slug
- load the inventory pointed to by `project.currentInventoryId`
- return the current project plus current inventory

#### Success response

```ts
type GetCurrentInventoryResponse = {
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
      inventoryInput: null;
      status: "draft";
      lockedYears: number[];
      latestCalculationRunId: null;
      createdAt: string;
      updatedAt: string;
    };
  };
};
```

## Validation Rules

The backend should enforce these rules even if the frontend also validates them.

### Required fields

- `name` required
- `slug` required
- `territory` required
- `country` required
- `referenceYear` required
- `inventoryYears` required
- `applicability` required

### Country rule

- `country` must be a stable ISO 3166-1 alpha-3 code
- examples: `TUN`, `FRA`, `SEN`
- `country` must not be a database relation id

### Year rules

- `inventoryYears` must contain at least one year
- `referenceYear` must be included in `inventoryYears`
- `inventoryYears` must not contain duplicates
- `referenceYear` and `inventoryYears` must be integers in the API contract

### Slug rule

- `slug` is part of the request contract for task 1
- the frontend derives an initial `slug` value from `name`
- the frontend shows the `slug` to the user before submit
- the user may edit the `slug` explicitly before submit
- the backend validates format and uniqueness
- the backend must persist the submitted `slug` as validated
- if the submitted `slug` is invalid or not unique, the backend must return a field-level error on `slug`

### Applicability rules

- `airport`, `port`, and `agriculture` must be explicit booleans

## Error Shape

Field-level validation errors should be returned in a form the frontend can bind directly to inputs.

Suggested error shape:

```json
{
  "error": {
    "status": 400,
    "message": "Invalid project initialization payload",
    "details": {
      "fieldErrors": {
        "name": "projectNameRequired",
        "territory": "projectTerritoryRequired"
      }
    }
  }
}
```

Suggested conflict shape for slug or duplicate project identity:

```json
{
  "error": {
    "status": 409,
    "message": "collectivityProjectSlugNotUnique",
    "details": {
      "fieldErrors": {
        "slug": "collectivityProjectSlugNotUnique"
      }
    }
  }
}
```

## Authorization Rules

The backend must enforce:

- only authenticated collectivity users can initialize a collectivity project
- users can only load projects they are allowed to access
- project membership returned in session must match actual backend authorization

## Frontend Expectations

For task 1, the frontend needs the backend contract to support these UI behaviors:

- submit one setup form and receive the created project plus current inventory
- derive an initial `slug` from `name` and let the user edit it before submit
- redirect into the new project after successful initialization
- reopen the project and restore the current inventory
- derive visible inventory years from `setupPayload.inventoryYears`
- derive visible optional sections from `setupPayload.applicability`

The frontend should not hardcode inventory years for collectivity once this contract is implemented.

## Backend Notes

The backend may choose different internal table names or ORM shapes.

That is fine as long as the external behavior stays consistent with this contract:

- one project created
- one first draft inventory created
- project points to that inventory
- setup stored on inventory
- no calculation run created

## Open Implementation Choices

These points may be decided by backend implementation without changing task 1 semantics:

- whether ids are numeric ids or UUIDs
- whether `inventoryYears` are stored as numbers or another internal database representation

If any of those choices change the API shape, the frontend and backend should freeze the final DTO before implementation starts.
