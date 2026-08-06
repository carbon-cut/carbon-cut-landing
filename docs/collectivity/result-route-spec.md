# Route Spec: Result

Before changing this route spec, read `docs/collectivity/00-product-truth.md` and `docs/collectivity/routes.md`.

This route spec must follow product truth and must not invent product structure on its own.

This document describes the inventory result reading route:

`/collectivity/[planId]/result`

## Role

The `result` route is for reading inventory results.

## What This Route Must Contain

- inventory results
- readings by category, source, or perimeter
- comparisons that help explain the data set

## What The User Does Here

- review the results produced by the inventory
- compare the main available readings
- understand the output state from the entered data

## Expected Outcome

The product should provide a clear reading of the inventory produced by the collection.
