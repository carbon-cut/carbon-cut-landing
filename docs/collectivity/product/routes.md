# Collectivity route map

This map records the current frontend pages under the localized `/collectivity` route. The locale prefix is omitted below. It describes implemented entry points; use [Collectivity product scope](00-product-truth.md) for product claims and the [domain glossary](../../../GLOSSARY.md) for terminology.

## Public and commercial entry

| Route                        | Current role                                                 |
| ---------------------------- | ------------------------------------------------------------ |
| `/collectivity`              | Collectivity landing page with entry to pricing and contact. |
| `/collectivity/pricing`      | Configure a subscription and begin the quote flow.           |
| `/collectivity/pricing/[id]` | Read the status of a submitted quote.                        |

## Subscription access and project creation

| Route                                       | Current role                                                                            |
| ------------------------------------------- | --------------------------------------------------------------------------------------- |
| `/collectivity/subscription`                | Manage capacity and access for an eligible subscription, including invitation requests. |
| `/collectivity/invitation`                  | Open an invitation or subscription access request.                                      |
| `/collectivity/projects/start`              | Select available approved access for creating a project.                                |
| `/collectivity/projects/setup?claimId=[id]` | Set up a new project using an approved subscription claim.                              |

## Project work

`[planId]` is the project slug in the current route structure. Each project concerns one commune.

| Route                                           | Current role                                                                        |
| ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| `/collectivity/projects`                        | List projects accessible to the signed-in user and open one.                        |
| `/collectivity/projects/[planId]`               | Redirect to that project's setup page.                                              |
| `/collectivity/projects/[planId]/setup`         | Review or edit the project's territory, years, and initial inventory applicability. |
| `/collectivity/projects/[planId]/ghg-inventory` | Enter inventory data, save a draft, and submit it for calculation.                  |
| `/collectivity/projects/[planId]/ghg-result`    | Read calculated inventory results.                                                  |

The route names for objectives, investment plans, indicators, rankings, and intercommunal pooling in navigation code are not evidence of developed pages or services. Their product meaning remains open.
