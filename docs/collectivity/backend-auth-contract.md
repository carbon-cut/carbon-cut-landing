# Collectivity Backend Contract

This note describes the minimum backend support the frontend now expects for collectivity auth, route access, and cadrage data.

The frontend currently mocks part of this behavior. Those mocked paths now need real backend support.

## Required session user fields

The authenticated user payload should include:

```ts
type ProductType = "household" | "collectivity";

type AuthUser = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  allowedProducts: ProductType[];
  planId?: string[];
};
```

## Meaning

- `allowedProducts` decides which product surfaces the user is allowed to access.
- `planId` is optional and only relevant for `collectivity`.
- `planId === undefined` means the collectivity user has not yet created a collectivity workspace and must be redirected to setup.
- `planId.length > 0` means the collectivity user can access collectivity workspace routes for those plans.
- `allowedProducts: ["household", "collectivity"]` means a super user can access both products.

## Frontend routing rules already implemented

- `household` users are redirected away from collectivity workspace routes to `/form`.
- `collectivity` users are redirected away from household routes to `/collectivity/start`.
- `collectivity` users with no `planId` are redirected from normal collectivity workspace routes to `/collectivity/setup/cadrage`.
- `collectivity` users with existing `planId` values are redirected away from setup to their first allowed collectivity plan.

## Auth and session work needed in backend

- Add `allowedProducts` to the session/auth response payload.
- Add `planId` to the session/auth response payload for collectivity users.
- Keep the session cookie or session endpoint in sync after collectivity setup creates the first plan.
- Keep the session cookie or session endpoint in sync after a collectivity user renames an existing `planId`.
- Enforce that `planId` returned in session contains only plans the user is allowed to access.

## Collectivity routes now expected by frontend

These are frontend routes, but they imply backend data and permission checks:

- `/collectivity/start`
- `/collectivity/setup/cadrage`
- `/collectivity/[planId]`
- `/collectivity/[planId]/cadrage`
- `/collectivity/[planId]/inventaire`
- `/collectivity/[planId]/scenarios`
- `/collectivity/[planId]/actions`

The backend does not need to implement these exact frontend pages, but it does need to support:

- plan membership lookup for the authenticated user
- plan-level read/write authorization
- creation of a first collectivity plan
- update of an existing collectivity plan identity

## API work needed for cadrage

The frontend currently calls:

- `GET /api/collectivity/cadrage?planId=...`
- `POST /api/collectivity/cadrage`
- `POST /api/collectivity/cadrage?currentPlanId=...`
- `GET /api/collectivity/countries`

The mock implementation also contains territory options and plan-id suggestion logic. Backend support is needed for those data sources too.

### 1. Read cadrage by plan

Expected behavior:

- require authenticated collectivity user
- require that the user is allowed to access `planId`
- return saved cadrage data for that plan

Suggested response:

```ts
type CollectivityCadrageData = {
  country: string;
  planId: string;
  territoryName: string;
  referenceYear: string;
  supportYears: string[];
};
```

### 2. Create first cadrage / create plan

When the user has no `planId` yet, submitting cadrage should create the first collectivity plan and return its saved cadrage.

Backend must also make sure the refreshed session now returns:

```ts
planId: [createdPlanId];
```

### 3. Update cadrage for an existing plan

When `currentPlanId` is present, the backend should treat the request as an update of that existing plan.

That includes two cases:

- update cadrage fields while keeping the same `planId`
- rename the plan from `currentPlanId` to a new `planId`

If the plan is renamed, the backend must also update the authenticated session payload so the old `planId` is removed and the new one is present.

### 4. Uniqueness validation for `planId`

Frontend validates only slug format.

Backend is source of truth for uniqueness.

If the submitted `planId` already exists and the current user is not allowed to reuse it, return a field-level error on `planId`.

Expected error shape:

```json
{
  "error": {
    "status": 409,
    "message": "collectivityPlanIdNotUnique",
    "details": {
      "fieldErrors": {
        "planId": "collectivityPlanIdNotUnique"
      }
    }
  }
}
```

The important part is not the exact string value, but that the backend returns a field-specific error so the frontend can attach it directly to the `planId` input.

### 5. Country and territory reference data

The frontend currently mocks:

- country options
- territory / city options per country
- suggested slug for known territories

Backend work needed:

- provide country options
- provide territory options filtered by country
- optionally provide backend-generated slug suggestion for known territories

Suggested API shape:

- `GET /api/collectivity/countries`
- `GET /api/collectivity/territories?country=...`

Suggested territory response:

```ts
type CollectivityTerritoryOption = {
  value: string;
  label: string;
  planIdSuggestion?: string;
};
```

If backend provides `planIdSuggestion`, frontend should prefer that over its local slugify fallback.

## Validation rules backend must preserve

The frontend already enforces these, but backend must validate them too:

- `country` required and valid
- `planId` required
- `planId` slug-safe
- `territoryName` required
- `referenceYear` required
- at least one `supportYear`
- no duplicate `supportYears`
- `referenceYear` cannot also exist in `supportYears`

## Authorization rules backend must enforce

Frontend redirects are only UX behavior. Backend still needs to enforce:

- household users cannot create or update collectivity cadrage
- collectivity users can only read/write plans they belong to
- users cannot rename a plan to another plan they do not own
- session `planId` values must match actual backend authorization

## Mocked pieces that still need real backend implementation

Today these are mocked in frontend code and should move to backend:

- collectivity user-to-plan membership
- first-plan creation from setup
- cadrage persistence
- plan rename handling
- `planId` uniqueness check
- country list
- territory list by country
- known territory to suggested `planId` mapping
