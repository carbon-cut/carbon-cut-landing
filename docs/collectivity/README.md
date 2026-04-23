# Collectivity Docs Map

This folder contains the active product thinking for the `collectivity` work.

Use these docs in this order:

1. `00-product-truth.md`
2. `inventaire-result-input-map.md` when working on inventory data-entry and result logic
3. `inventaire-input-inventory.md` when turning report outputs into explicit input families
4. route specs such as `cadrage-route-spec.md` and `inventaire-route-spec.md`
5. report-reading notes and source report files as reference only

## Rules

- `00-product-truth.md` is the current source of truth for product assumptions.
- Route specs must follow product truth. They should not invent product structure on their own.
- Report-derived docs can inform the product, but they do not define the product by themselves.
- If a product decision is still open, write it down explicitly instead of inferring it in implementation.

## Current Focus

The current goal is to define the `collectivity` product itself before tightening route contracts or UI behavior.
