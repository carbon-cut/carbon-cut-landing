# Collectivity Route Map

This document defines the current `collectivity` route structure.

It follows `docs/collectivity/00-product-truth.md`.

If a route is not listed here as current scope, do not assume it is part of the product today.

## Current Product Scope

The current product is an inventory workspace for one municipality and its territory.

The route structure should reflect three things:

- a root entry that summarizes workspace status
- a cadrage route that sets the municipality and inventory frame
- an inventory entry route for data input and import
- a separate inventory result route for reading outputs

## Current Routes

### 1. Root Workspace

`/collectivity`

Role:

- global access point to collectivity
- workspace entry or plan selector when needed

### 2. Municipality Workspace

`/collectivity/[planId]`

Role:

- workspace entry for one municipality
- surface the current completeness state
- provide the main entry point into the inventory workspace

This route is where completeness should be summarized.

### 3. Inventory

`/collectivity/[planId]/inventaire`

Role:

- enter or import inventory data
- manage the data collection workflow

This route is for input only.

Evidence and hypotheses are embedded in the input flow and are not separate top-level product areas.

### 4. Cadrage

`/collectivity/[planId]/cadrage`

Role:

- define the municipality frame for the inventory
- confirm the inventory perimeter before data entry

This route is part of the current product scope.

### 5. Inventory Results

`/collectivity/[planId]/result`

Role:

- read the inventory output
- inspect results by category, source, or perimeter

This is a separate route from input because reading results is a different task from entering data.

## Out Of Scope For Current Product

These routes may exist in code or documentation, but they are not current product scope:

- `/collectivity/[planId]/scenarios`
- `/collectivity/[planId]/actions`

They should not be marketed or described as active product capabilities.

## Routing Rules

- Keep inventory entry and inventory reading separate.
- Keep completeness at the workspace root, not inside the inventory input route.
- Do not let future planning routes shape current product claims.
- Do not treat old route drafts as product truth.
