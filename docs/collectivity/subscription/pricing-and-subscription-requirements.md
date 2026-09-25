# Collectivity subscription and pricing requirements

## Status and purpose

This document records the agreed product requirements for the collectivity subscription journey. It is a product source of truth for future design and implementation; it does not prescribe an API, payment provider, or database model.

## Core concepts

- **X** is the authenticated purchaser. X may represent a municipality, an organization, or an intermunicipal body.
- A subscription is owned by X, not by an individual climate-plan workspace.
- A collectivity workspace (`planId`) is not available before subscription access is confirmed.
- **One commune equals one user slot.** The number of purchased communes and the number of assignable user-email slots are the same number. There are no included, automatic, hidden, or bonus seats.
- X may assign a purchased slot to their own email, but X is never assigned one automatically.
- Only assigned email addresses receive collectivity access.

## Access and order journey

1. Anyone may view the public collectivity catalogue and configure an indicative selection.
2. Authentication is required to proceed beyond the public catalogue or save/submit a selection.
3. X selects the subscription configuration:
   - number of communes covered;
   - contract duration;
   - perimeter;
   - modules;
   - email addresses assigned to the purchased slots.
4. X submits a purchase request.
5. The request remains under administrative review. The initial user-facing confirmation must be neutral: the request was received and the team will provide the payment next steps.
6. An administrator confirms payment and activates access.
7. Assigned users can then create or enter collectivity workspaces for the covered communes.

### Initial scope

- X can later upgrade or downgrade their selection.
- Cancellation, recurring-payment management, invoice management, payment-method management, expiry, unpaid-state handling, and entitlement enforcement are not part of the initial UI scope.
- Expiry, unpaid states, and backend access enforcement remain backend concerns.

## Manual-payment boundary

The company/legal payment setup is not yet settled. This must not block development of the catalogue, configuration, authenticated purchase-request flow, price calculation, slot assignment, or administrative activation.

Until a legal seller and accounting process are defined, the product must not:

- display bank details;
- claim to issue an invoice or a pro-forma invoice;
- accept payment proof as a basis for automatic access;
- promise a payment deadline or a specific tax treatment.

The interim post-submission state is **purchase request under review**. Payment/invoicing integration becomes a separate go-live decision once the legal seller, VAT handling, invoicing sequence, and payment instructions are confirmed.

## Perimeters

There are exactly two purchasable perimeters:

1. **Patrimoine communal**
2. **Territorial Communes**

`Patrimoine communal et compétences` is not a product offering. It must be ignored in all pricing tables, UI, calculations, and documentation, even when it appears in source spreadsheets.

## Current implementation catalogue

The following catalogue is the one to implement now. Prices are annual catalogue prices in euros and exclude tax treatment, which is still open.

| Module                                               | Périmètre | Patrimoine communal | Territorial Communes | Availability                              |
| ---------------------------------------------------- | --------- | ------------------: | -------------------: | ----------------------------------------- |
| Inventaire GES                                       | Scope 1+2 |             1,500 € |              3,500 € | Available at launch                       |
| Inventaire GES                                       | Scope 3   |             2,000 € |              6,000 € | Planned later                             |
| Consolidation et validation des facteurs d’émission  | Scope 1+2 |               600 € |              1,200 € | Available at launch                       |
| Prospective et objectifs                             | Scope 1+2 |               800 € |              1,800 € | In development                            |
| Plan d’investissement atténuation GES                | Scope 1+2 |             1,500 € |              4,500 € | In development                            |
| Suivi MRV                                            | Scope 1+2 |             1,200 € |              3,500 € | In development                            |
| 10 indicateurs significatifs à des fins comparatives | Scope 1+2 |               700 € |              1,500 € | Coming very soon (one month after launch) |
| Système de notation sur 100                          | Scope 1+2 |               800 € |              1,800 € | Coming very soon (one month after launch) |
| Agrégation intercommunale                            | Scope 1+2 |               400 € |              1,000 € | In development                            |
| **Total annuel catalogue**                           |           |         **9,500 €** |         **24,800 €** |                                           |

### Availability semantics

- **Available at launch:** selectable and usable now.
- **Coming very soon:** expected one month after launch.
- **In development:** visible but not selectable/purchasable in the initial flow.
- **Planned later:** visible as future direction, not selectable/purchasable and not expected soon.

Spreadsheet colors are availability data only. They are not a visual-design direction for the product UI. The UI should communicate status through clear labels and accessible semantic treatments.

## Coverage and term pricing logic

The additional pricing tables define how prices vary by commune coverage and contract term. They use their own one-commune, one-year baseline below; this is distinct from the current implementation catalogue above.

### Baseline: one commune, one year

| Module                                              | Périmètre | Patrimoine communal | Territorial Communes |
| --------------------------------------------------- | --------- | ------------------: | -------------------: |
| Inventaire GES                                      | Scope 1+2 |             3,000 € |              5,000 € |
| Inventaire GES                                      | Scope 3   |             7,000 € |             15,000 € |
| Consolidation et validation des facteurs d’émission | Scope 1+2 |               500 € |              1,500 € |
| Prospective et objectifs                            | Scope 1+2 |             1,500 € |              2,500 € |
| Plan d’investissement atténuation GES               | Scope 1+2 |             3,000 € |              5,000 € |
| Suivi MRV                                           | Scope 1+2 |             3,000 € |              5,000 € |
| Indicateurs significatifs                           | Scope 1+2 |             1,000 € |              2,500 € |
| Système de notation sur 100                         | Scope 1+2 |               500 € |              3,500 € |
| **Total, excluding Agrégation Communes**            |           |        **19,500 €** |         **40,000 €** |

### Core-module reduction ladder

All core-module reductions stack multiplicatively. The three-year term always applies a further 20% reduction to the applicable annual commune-tier price.

| Coverage             |   One-year price | Three-year price |
| -------------------- | ---------------: | ---------------: |
| 1 commune            | 100% of baseline |  80% of baseline |
| Up to 3 communes     |  80% of baseline |  64% of baseline |
| Up to 5 communes     |  70% of baseline |  56% of baseline |
| More than 5 communes |  60% of baseline |  48% of baseline |

Prices are per commune and per subscription year. The selected module prices are summed using the applicable perimeter and tier.

### Agrégation Communes

`Agrégation Communes` is a separate, in-development module. Its rate is not derived from the core-module reduction ladder; it has the following catalogue rates.

| Coverage             | One year: Patrimoine communal | One year: Territorial Communes | Three years: Patrimoine communal | Three years: Territorial Communes |
| -------------------- | ----------------------------: | -----------------------------: | -------------------------------: | --------------------------------: |
| Up to 3 communes     |                       1,000 € |                        2,500 € |                            800 € |                           2,000 € |
| Up to 5 communes     |                         800 € |                        2,000 € |                            640 € |                           1,600 € |
| More than 5 communes |                         700 € |                        1,750 € |                            560 € |                           1,400 € |

The three-year `Agrégation Communes` prices are 80% of the corresponding one-year rate.

## Design direction

- Continue the existing collectivity product UI: restrained, practical, and based on shared primitives and typography.
- Do not derive a green-heavy visual system from the pricing spreadsheets.
- The subscription route is a dedicated pre-workspace route, not a route under `[planId]`.

## Open questions

- At launch, which legal entity sells the Carbone Cut subscription and issues invoices to collectivités?
- What tax/VAT treatment applies by buyer country and buyer status?
- May prices be presented as excluding tax (`HT`) in the subscription summary?
- What exact route name and information architecture should the subscription journey use?
