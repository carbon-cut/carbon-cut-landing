# Inventaire Input Inventory

This document lists the current `inventaire` inputs and working table shapes based on the reference report.

It is intentionally conservative, but it may generalize report patterns where needed so the product can work beyond one territory.

Use `TODO` wherever the product still needs clarification before turning this into a route contract or field model.

## Rule

- Base the product on the report, while generalizing report-specific patterns when needed.
- Do not infer hidden validation rules or implementation details without a product reason.
- When something still needs design or product clarification, write `TODO`.

## Working Framing

Based on current product truth and the report-backed input families, the `inventaire` should currently be framed like this:

- user-facing organization should follow the source of the data
- app-facing classification can remain multilayered underneath

This means the user should primarily think in terms of:

- fleet data
- public lighting data
- building data
- electricity data
- transport data
- sanitation data
- other source-oriented datasets

The app can then map those datasets internally to:

- territory-level reading
- municipal patrimoine reading
- commune
- sector
- source
- scope
- usage
- energy form

This framing is preferred because it matches the current assumed user better than an expert-first inventory structure.

### TODO

- confirm whether all main `inventaire` entry sections should be source-based by default
- confirm whether any user-facing section should be organized first by territory / patrimoine instead of by source

## Standing Input Rule

For each input family, dataset, field group, or classification slice, the product must explicitly ask:

- is this input `source-native`
- or is this input `year-native`

### Source-native

`Source-native` means the user naturally works from one source or one report covering multiple years with the same structure.

In that case, the product should prefer:

- source-first entry
- multi-year entry in one place
- year as a review / filtering / comparison dimension

### Year-native

`Year-native` means the user naturally thinks about the data as specific to one year and may need to explain or validate that year separately.

In that case, the product should prefer:

- year-specific entry or confirmation
- year-specific completeness
- year-specific notes, assumptions, corrections, or validation

### Rule Of Use

The product must not assume that all `inventaire` data should follow one navigation model.

Some inputs will be source-native.

Some inputs will be year-native.

This distinction must be checked explicitly whenever defining:

- a source family
- a field group
- a dataset
- a completeness rule
- a carry-forward rule
- an import flow

### TODO

- confirm which input families are clearly source-native
- confirm which input families are clearly year-native
- confirm whether some families contain both source-native values and year-native context

## Provenance Rule

Source / proof / provenance is a cross-cutting requirement.

It should not be redesigned separately for each source family.

For every `inventaire` input, provenance may be required at the appropriate level depending on context:

- field level
- grouped-field level
- family level

The required level depends on how the data is actually provided by the user or source document.

### TODO

- define the standard provenance fields used across `inventaire`
- define when provenance is required at field level vs grouped-field level vs family level

## Navigation Direction

Top-level navigation should use a small number of big groups.

Source families should live inside those groups.

Year handling should stay local to each table or section.

Working group examples:

- Patrimoine municipal
- Energie territoire
- Transport
- AFAT
- Dechets
  -assainissement

Inside `Patrimoine municipal`:

- fleet
- public lighting
- buildings
- trees / parks / urban green waste

Inside `Energie territoire`:

- electricity demand
- photovoltaic data
- natural gas data
- solar water heating data

### TODO

- lock the exact top-level groups for first scope

## 1. What The Report Clearly Gives Us

The report gives us three strong things:

- the inventory result structure
- the inventory classification axes
- the inventory collection template families

This file only records those.

## 2. Inventory Framing Inputs

These inputs are explicitly supported by the report's inventory and perimeter sections.

### Known

- organizational perimeter
- operational perimeter
- covered sources of emissions
- covered scopes
- inventory years
- one reference year for the inventory

### TODO

- exact field list for the perimeter in product terms
- whether sectors should be entered explicitly or derived from source datasets
- whether the reference year is selected by the user or assigned by the app after data review

## 3. Inventory Classification Axes

These are the main ways the report reads and stratifies the inventory result.

### Known

- year
- territory-level reading
- municipal patrimoine reading
- commune
- scope
- source
- sector
- usage
- energy form

### TODO

- whether all of these are first-class product dimensions in the app
- whether `source` and `sector` should both be visible to the user at entry time
- whether `usage` belongs to all datasets or only some of them
- how much of this multilayer classification should stay hidden behind source-based entry flows

## 4. Activity Input Families From The Report Templates

These come from the report's data collection templates in Annex 1.

These families also support the current product direction:

- entry should likely be organized by source-oriented dataset families
- multilayer inventory classification should likely happen underneath, not as the user's first mental model

The table shapes below are current working shapes only. If a source table changes, keep the same family and update the local structure.

## 4.1 Municipal Patrimoine Templates

- vehicle fleet data
- public lighting data
- building data
- trees / parks / municipal waste-related data

### Fleet

Based on `Tableau 75` from the report's data collection annex.

- entry responsibility:
  - commune-entered

- fleet is `both`
- source-native because the user can work from one grouped administrative table
- year-native because some values are recorded by year

Structure:

- rows:
  - vehicle category
    - voitures de fonction
    - voitures de service
    - véhicules et engins de service
    - autres
- fleet composition columns:
  - number of petrol vehicles
  - number of diesel vehicles
  - number of GPL vehicles
  - number of electric vehicles
  - number of hybrid vehicles
  - number of natural gas / GNV vehicles
  - total
- yearly blocks:
  - number of vehicles per year
    - petrol vehicles
    - diesel vehicles
    - GPL vehicles
    - electric vehicles
    - hybrid vehicles
    - natural gas / GNV vehicles
    - total
  - energy consumption per year
    - petrol
    - diesel
    - GPL
    - electricity
    - natural gas / GNV
  - energy expenditure per year
    - petrol
    - diesel
    - GPL
    - electricity
    - natural gas / GNV

Year model:

- by default, year-value columns should show the reference year and comparison years
- year-value columns must be expandable when additional years exist

Provenance:

- fleet has its own source / proof context

### TODO

- waiting for the energy audit response: confirm whether `fleet` also needs audit-derived data in the app, or whether audit outputs remain only an optional external source

### Public Lighting

Based on `Tableau 76` from the report's data collection annex.

- entry responsibility:
  - commune-entered

- public lighting is `both`
- source-native because the user can work from one public-lighting table
- year-native because some values are recorded by year

Structure:

- infrastructure rows:
  - number of cabinets
  - number of meters
  - number of operational dimmers
  - power if applicable
- luminous point block:
  - lamp rows
  - type
    - SHP
    - HPL
    - LED
  - power
  - total
- yearly blocks:
  - electricity consumption for public lighting
  - electricity bill for public lighting

Year model:

- by default, year-value columns should show the reference year and comparison years
- year-value columns must be expandable when additional years exist

Provenance:

- public lighting has its own source / proof context

### TODO

- waiting for the energy audit response: confirm whether `public lighting` also needs audit-derived data in the app, or whether audit outputs remain only an optional external source

### Buildings

Based on `Tableau 77` from the report's data collection annex.

- entry responsibility:
  - commune-entered

- buildings is `both`
- source-native because the user can work from one grouped building table
- year-native because some values are recorded by year

Structure:

- scope:
  - total of all patrimoine buildings
- yearly blocks:
  - number of buildings per year
  - square meter of open surface per year
  - square meter of closed surface per year
- source blocks:
  - electricity
    - electricity consumption
    - electricity bill
  - natural gas
    - gas consumption
    - gas bill
  - diesel
    - diesel consumption
    - diesel bill
  - other
    - consumption
    - bill

Year model:

- by default, year-value columns should show the reference year and comparison years
- year-value columns must be expandable when additional years exist

Provenance:

- buildings has its own source / proof context

### TODO

- waiting for the energy audit response: confirm whether `buildings` also needs audit-derived data in the app, or whether audit outputs remain only an optional external source

### Trees / Parks / Urban Green Waste

Based on `Tableau 78` from the report's data collection annex.

- entry responsibility:
  - commune-entered

- trees / parks / urban green waste is `both`
- source-native because the user can work from one grouped table
- year-native because some values are recorded by year

Structure:

- yearly fields:
  - number of urban trees
  - quantity of urban green waste
    - tonnes per year
  - destination
    - compostage
    - décharge contrôlée

Year model:

- by default, year-value columns should show the reference year and comparison years
- year-value columns must be expandable when additional years exist

Provenance:

- trees / parks / urban green waste has its own source / proof context

### TODO

- confirm whether `destination` should stay limited to the report logic above or support additional controlled values when other territories use different flows

### TODO

- confirm the unit for `quantity of urban green waste`
- confirm whether `destination` is free text or a controlled value

## 4.2 Territory-Level Energy Templates

### Known

- electricity demand data
- photovoltaic data
- natural gas data
- solar water heating data

### Electricity Demand

Based on `Tableau 79` from the report's data collection annex.

- entry responsibility:
  - city / main establishment-entered

- electricity demand is `both`
- source-native because the user can work from one electricity-demand table
- year-native because the table is repeated by year

Structure:

- year blocks:
  - one table per year
- voltage levels:
  - basse tension
    - domestique
    - commercial
    - administration
    - éclairage public
    - agricole
    - petites industries
    - ateliers
    - industries
  - moyenne tension
    - industrie extractive
    - industrie chimique
    - industrie textile et habillement
    - industrie alimentaire
    - industries diverses
    - agriculture
    - pompage
    - tourisme
    - transport et télécom
  - haute tension
    - editable columns
    - user can add, remove, and rename columns
    - final total column
- rows inside each voltage block:
  - consumption (GWh)
  - number of subscribers
- total handling:
  - total is a final, calculated, non-editable column in each voltage block, not a metric row
  - the user does not enter total values
  - the total column sums the sector / editable columns for the same metric row
  - do not total consumption and subscriber counts together

Year model:

- by default, year tables should show the reference year and comparison years

Provenance:

- electricity demand has its own source / proof context

### TODO

- whether energy inputs are entered by supplier, sector, usage, or aggregated file
- confirm whether `basse tension` and `moyenne tension` categories should stay fixed from the report or also become editable

### Photovoltaic Data

Based on `Tableau 80` from the report's data collection annex.

- entry responsibility:
  - city / main establishment-entered

- photovoltaic data is `both`
- source-native because the user can work from one photovoltaic table
- year-native because the table is repeated by year

Structure:

- perimeter note:
  - data relates to the perimeter of all communes
- year columns:
  - source-dependent years
- photovoltaic BT block:
  - number of BT subscribers
  - installed capacity (kWc)
  - production (MWh)
  - annual transaction balance with these subscribers
- photovoltaic MT block:
  - number of MT subscribers
  - installed capacity (kWc)
  - production (MWh)

Year model:

- by default, year columns should show the reference year and comparison years

Provenance:

- photovoltaic data has its own source / proof context

### TODO

- `annual transaction balance` is optional

### Natural Gas Data

Based on `Tableau 81` from the report's data collection annex.

- entry responsibility:
  - city / main establishment-entered

- natural gas data is `both`
- source-native because the user can work from one natural-gas table
- year-native because the table is repeated by year

Structure:

- year blocks:
  - one table per year
- pressure levels:
  - basse pression
  - moyenne pression
  - haute pression
    - editable columns
    - user can add, remove, and rename columns
    - final total column
- rows inside each pressure block:
  - consumption (Nm3)
  - number of subscribers
- total handling:
  - total is a final, calculated, non-editable column in each pressure block, not a metric row
  - the user does not enter total values
  - the total column sums the sector / editable columns for the same metric row
  - do not total consumption and subscriber counts together

Year model:

- by default, year tables should show the reference year and comparison years

Provenance:

- natural gas data has its own source / proof context

### TODO

- confirm whether `basse pression` and `moyenne pression` should stay fixed from the report or also become editable

### Solar Water Heating Data

Based on `Tableau 82` from the report's data collection annex.

- entry responsibility:
  - city / main establishment-entered

- solar water heating data is `both`
- source-native because the user can work from one solar-water-heating table
- year-native because the table is repeated by year

Structure:

- year columns:
  - source-dependent years
- residential block:
  - number of households
  - number of m2
- tertiary block:
  - number of tertiary entities
  - number of m2
- industrial block:
  - number of industrial entities
  - number of m2

Year model:

- by default, year columns should show the reference year and comparison years

Provenance:

- solar water heating data has its own source / proof context

## 4.3 Transport And Mobility Templates

### Known

- port-related data
- public transport data
- air transport data
- transport data

### Ports

Based on `Tableau 83` from the report's data collection annex.

- entry responsibility:
  - city / main establishment-entered

- ports data is `both`
- source-native because the user can work from one ports table
- year-native because the table is repeated by year

Structure:

- year columns:
  - source-dependent years
- vessel count block:
  - number of boats / barges operated
    - leisure
    - fishing
    - other
- fuel consumption block:
  - fuel consumption within the covered perimeter (litres)
    - leisure
    - fishing
    - other
- concerned ports list:
  - port 1
  - port 2
  - port 3
  - port 4
  - port 5

Note:

- the source table includes `concerned ports`
- it is not yet clear whether this should be implemented as a real input field or kept only as contextual metadata

Year model:

- by default, year columns should show the reference year and comparison years

Provenance:

- ports data has its own source / proof context

### Public Transport Operator Data

Based on `Tableau 84` from the report's data collection annex.

- entry responsibility:
  - city / main establishment-entered

- public transport operator data is `both`
- source-native because the user can work from one operator table
- year-native because the table is repeated by year

Structure:

- operator-level table
- default implementation:
  - one operator table
- repeatability:
  - the user can add more operator tables when multiple operators exist
- year columns:
  - source-dependent years
- operational fields:
  - number of buses operated in the covered perimeter
  - fuel consumption in the covered perimeter
  - fuel expenditure in the covered perimeter
  - km traveled by all buses in the covered perimeter
  - number of staff operating in the covered perimeter
  - passenger-km in the covered perimeter
  - number of passengers in the covered perimeter
- fleet renewal fields:
  - number of buses scrapped / sold
  - number of buses purchased
  - cost of purchased buses
- fleet age fields:
  - number of buses by age
    - 0–5 years
    - 6–10 years
    - more than 10 years
- future acquisition / renewal sub-table:
  - planned bus acquisitions / renewals by future year

Year model:

- by default, year columns should show the reference year and comparison years

Provenance:

- public transport operator data has its own source / proof context

### Air Transport Data

Based on `Tableau 85` and `Tableau 86` from the report's data collection annex.

- entry responsibility:
  - city / main establishment-entered

- air transport data is `both`
- source-native because the user can work from one air-transport source set
- year-native because the tables are repeated by year

Structure:

- aircraft movement sub-table:
  - one row per aircraft model
  - aircraft model rows from the source table:
    - A300
    - A310
    - A319
    - A320
    - A321
    - A330-200/300
    - A340-200
    - A340-300
    - A340-500/600
    - 707
    - 717
    - 727
    - 727-100
    - 727-200
    - 737-100/200
    - 737-300/400/500
    - 737-600
    - 737-700
    - 737-800/900
    - 747-100
    - 747-200
    - 747-300
    - 747-400
    - 757-200
    - 757-300
    - 767-200
    - 767-300
    - 767-400
    - 777-200/300
    - DC-10
    - DC-8-50/60/70
    - DC-9
    - L-1011
    - MD-11
    - MD-80
    - MD-90
    - TU-134
    - TU-154M
    - TU-154 B
    - RJ-RJ85
    - BAE 146
    - CRJ-100ER
    - RJ-145
    - Fokker 100/70/28
    - BAC111
    - Dornier 328Jet
    - Gulfstream IV
    - Gulfstream V
    - Yak-42M
    - Cessna 525/560
    - Beech King Air
    - DHCS100
    - ATR72-500
    - ATR42
    - B700
  - columns by year
  - columns inside each year:
    - international flights
    - national flights
- airport energy / fuel sub-table:
  - columns by year
  - electricity consumption
  - fuel consumption (fleet)
    - diesel
    - petrol
  - kerosene served to aircraft

Year model:

- by default, year columns should show the reference year and comparison years

Provenance:

- air transport data has its own source / proof context

### Vehicle Counts

Based on `Tableau 93` and `Tableau 94` from the report's data collection annex.

- entry responsibility:
  - city / main establishment-entered

- vehicle counts is `both`
- source-native because the user can work from one transport vehicle table
- year-native because the table is repeated by year

Structure:

- one merged vehicle-count table
- merged category rows from both source tables
- category examples from the report:
  - motorcycles
  - public transport vehicles
  - mopeds
  - agricultural equipment
  - private vehicles
  - special-purpose vehicles
  - tourist buses
  - heavy trucks
  - light trucks / vans
  - tractors
  - tricycles
  - quadricycles
  - trailers
  - semi-trailers
  - microbuses
  - ambulances
  - taxis
  - shared taxis
  - tourist taxis
- year columns:
  - source-dependent years
- yearly values:
  - vehicle count
- total row

Year model:

- by default, year columns should show the reference year and comparison years

Provenance:

- vehicle counts has its own source / proof context

## 4.4 AFAT Templates

### Known

- perennial plantation / tree stock data
- livestock data
- fertilizer data
- agricultural production data

### Perennial Plantation Stock

Based on `Tableau 87` and `Tableau 89` from the report's data collection annex.

- entry responsibility:
  - city / main establishment-entered

- report-local examples only:
  - olive groves
  - fruit tree stock
- do not model olive groves or fruit trees as separate product-level datasets
- product-level template is one generic perennial plantation stock input where the user names the tree / plant row groups
- perennial plantation stock is `both`
- source-native because the user can work from one plantation-stock table
- year-native because each plant / tree row carries reference and comparison year lines

Structure:

- one expandable tree / plant row group
- user can add rows and name the tree / plant
- inside each row group:
  - reference year line
  - comparison year lines
- shared columns:
  - hectares
    - young plantations
    - adult plantations
    - old / senescent plantations
    - total
  - tree count
    - young plantations
    - adult plantations
    - old / senescent plantations
    - total

Year model:

- by default, each row group should show the reference year and comparison years

Provenance:

- perennial plantation stock has its own source / proof context

### Livestock Stock

Based on `Tableau 90` from the report's data collection annex.

- entry responsibility:
  - city / main establishment-entered

- livestock stock is `both`
- source-native because the user can work from one livestock table
- year-native because the table is repeated by year

Structure:

- fixed livestock rows:
  - bovins laitiers
  - autres bovins
  - ovins
  - caprins
  - equins
  - anes et mules
  - camelins
  - poulets de chair
  - poules pondeuse
  - dindes
- year columns:
  - source-dependent years
- yearly values:
  - headcount
- extra parameter column:
  - proportion of annual time spent in stable or enclosed space

Year model:

- by default, year columns should show the reference year and comparison years

Provenance:

- livestock stock has its own source / proof context

### Fertilizer And Amendment Use

Based on `Tableau 91` from the report's data collection annex.

- entry responsibility:
  - city / main establishment-entered

- fertilizer and amendment use is `both`
- source-native because the user can work from one fertilizer/amendment table
- year-native because the table is repeated by year

Structure:

- fixed common rows:
  - ammonitrate
  - DAP
  - compost
  - sewage sludge
- custom local rows:
  - user can add local/custom fertilizer or amendment rows when needed
- explanation:
  - add any other fertilizer, organic amendment, or locally used agricultural input not already listed
- year columns:
  - source-dependent years
- yearly values:
  - tonnes used

Year model:

- by default, year columns should show the reference year and comparison years

Provenance:

- fertilizer and amendment use has its own source / proof context

### Agricultural Production

Based on `Tableau 92` from the report's data collection annex.

- entry responsibility:
  - city / main establishment-entered

- agricultural production is `both`
- source-native because the user can work from one agricultural-production table
- year-native because the table is repeated by year

Structure:

- editable crop lines
- examples from the report:
  - blé
  - orge
  - pois + pois chiches
  - fèves + féveroles
  - luzerne
  - pomme de terre
- harvested-area sub-table:
  - hectares
- production sub-table:
  - tonnes
- year columns:
  - source-dependent years

Year model:

- by default, year columns should show the reference year and comparison years

Provenance:

- agricultural production has its own source / proof context

## 4.5 Wastewater / Sanitation Templates

### Known

- sanitation data
- sanitation continuation data
- sanitation CH4-related data
- sanitation N2O-related data
- entry responsibility:
  - city / main establishment-entered

### TODO

- sanitation needs a separate focused pass; do not continue this section casually
- clarify the sanitation sub-tables and calculation-oriented inputs later, with full attention
- exact field structure for the sanitation families
- whether the CH4 / N2O breakdown should be exposed directly to the user or handled by the app layer

## 4.6 Waste

### TODO

## 5. Provenance Inputs

The report clearly shows that data collection is template-based and actor-based.

### Known

- source actor or institution exists
- source document / source template exists
- collected data may come from external actors and sector partners

### TODO

- exact provenance fields the product should require
- whether file attachment is first-scope
- whether contributor / owner should be recorded per dataset
- whether reporting period must be explicit on every entered dataset

## 6. Quality And Clarification Inputs

The report clearly indicates that data collection involved repeated clarification, adjustment, and validation.

### Known

- some datasets require clarification
- some datasets require adjustment
- some datasets require validation through exchanges with actors

### TODO

- explicit quality fields in the product
- whether the app should expose status such as missing / estimated / validated
- whether note-taking is required per dataset
- what the minimum quality context is for a usable inventory result

## 7. Methodology Inputs

The report includes methodology, gases, scopes, and calculation logic as part of the inventory approach.

### Known

- methodology exists
- covered gases exist
- scope logic exists
- source logic exists

### Known Product Interpretation

Based on current product truth, these should mostly belong to the app's expert layer rather than the non-expert operator layer.

### TODO

- which methodology settings, if any, should ever be visible to the user
- whether any methodology choices are user-confirmed or fully app-owned

## 8. What This File Still Does Not Define

This file does not yet define:

- exact fields
- required vs optional inputs
- single vs repeatable inputs
- manual entry vs import
- the minimum usable dataset set
- the smallest unit of entry
- the exact boundary between user-facing source grouping and app-facing inventory classification
- exact row / column geometry when a source table changes

## 9. Next Step

The next step should only clarify the unresolved parts above.

It should not rewrite the report into UI yet.

The next useful document is:

`inventaire input reality`

That document should answer:

- what the user can realistically provide directly
- what needs helper text or examples
- what should come from import
- what the app should derive without asking the user
