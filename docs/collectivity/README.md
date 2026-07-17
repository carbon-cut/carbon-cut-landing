# Collectivity Docs Map

This folder contains the active product thinking for the `collectivity` work.

Use these docs in this order:

1. `00-product-truth.md`
2. `routes.md` for the current route map
3. `result-route-spec.md` for the result route
4. `inventaire-result-input-map.md` when working on inventory result logic
5. `inventaire-input-inventory.md` when turning report outputs into explicit input families
6. route specs such as `inventaire-route-spec.md`
7. `inventaire-schema-contract.md` for the inventory schema and yearly/unit contract
8. `contracts/` for frozen frontend/backend API agreements
9. report-reading notes and source report files as reference only

## Rules

- `00-product-truth.md` is the current source of truth for product assumptions.
- Route specs must follow product truth. They should not invent product structure on their own.
- Contracts should be organized by domain in `contracts/`, not by task number.
- Report-derived docs can inform the product, but they do not define the product by themselves.
- If a product decision is still open, write it down explicitly instead of inferring it in implementation.

## Current Focus

The current goal is to define `collectivity` as an inventory workspace for one municipality before tightening route contracts or UI behavior.
