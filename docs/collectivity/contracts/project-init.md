# Project Initialization Contract

This document defines the frontend/backend contract for collectivity project initialization.

It was first used for `docs/collectivity/tasks/task1.md`.

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

Project initialization must implement this lifecycle:

1. the user submits the initial setup data
2. the backend creates a `Project`
3. the backend creates the first `Inventory` in `draft` status
4. the backend stores the setup data as `Inventory.setupPayload`
5. the backend links that inventory as `Project.currentInventoryId`
6. reopening the project loads that current inventory

Project initialization must not create a `CalculationRun`.

## Entities In Scope

### `Project`

Minimum fields required by this contract:

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

Minimum fields required by this contract:

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

Three endpoints are required for project initialization.

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
