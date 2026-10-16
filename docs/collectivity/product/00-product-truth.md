# Collectivity product scope

This document records confirmed product decisions and the customer journey represented by the current frontend. Use the [domain glossary](../../../GLOSSAIRE.md) for definitions. A visible label or placeholder does not by itself establish a product capability.

## Place within Carbon Cut

Carbon Cut is the overall application. Collectivity is its active offering for local authorities. The GHG emissions inventory is a capability within Collectivity, not the scope of the entire application. Household is retired; future offerings are not defined here.

## Confirmed domain model

- One project concerns one commune. A Collectivity subscription may cover multiple communes and therefore multiple projects.
- A project has a communal territory, an inventory boundary, a reference year, and inventory years. The reference year is one of the inventory years and provides the baseline for comparisons.
- An inventory may cover municipal assets or the whole communal territory. Municipal assets include buildings, the vehicle fleet, and public lighting; whole-territory coverage also includes sources beyond those assets.
- The GHG emissions inventory comprises activity data and calculated emissions and absorptions. Inventory results are the calculated outputs.
- Use **GHG emissions inventory** for the overall inventory work. **Municipal assets** names one part of its possible boundary; it does not name the whole offering.

## Current implemented journey

The frontend provides a Collectivity landing page, a subscription pricing and quote flow, subscription access management, project creation, project setup, inventory entry, and inventory results. An approved subscription claim is required to create a project. The inventory flow can save input as a draft and submit it for calculation; the results view reads calculated output.

These are descriptions of the present frontend flow, not claims that every possible dataset, report, or commercial operation has been independently validated for production use.

## Intended user experience

Design inventory entry and inventory results for a person who does not know GHG accounting. Give that person clear guidance. Keep enough detail in the data and results for a GHG accounting expert to examine the substance of the work.

## Outside the current documented capability

Reduction action plans, investment plans, scenarios, rankings, indicators, and intercommunal pooling are not defined here as developed services. Some names appear in navigation or copy, but their business models and delivered behavior have not been settled.

A project with multiple users and different access roles, including a person who can only read inventory results, is a possible future feature. It is not planned or scheduled.

## Open product questions

- What constitutes a complete inventory and which outputs different audiences need.
- How post-calculation updates, revisions, and comparisons should be understood by users.
- Whether and how future services are offered alongside the inventory.

Do not fill these gaps from legacy route drafts, placeholder copy, or reference-report examples.
