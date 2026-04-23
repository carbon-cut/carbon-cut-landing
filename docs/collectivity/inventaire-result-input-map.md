# Inventaire: Result -> Required Inputs

This document extracts the `inventaire` result structure directly from the reference report, then maps the input families required to produce that result in the app.

It is not a UI spec.

It is not a route contract yet.

Its purpose is to answer one product question first:

`what inputs are needed to produce the inventory result pattern shown by the report?`

## Rule

- Extract reusable output and input patterns from the report.
- Do not treat report-specific values, years, names, or figures as product defaults.

## 1. Report-Derived Inventory Result Structure

The report shows that an inventory result is not one number.

The inventory output pattern includes at least these result layers.

### A. Multi-year inventory result

The report presents inventory results across multiple years, with one year treated as the reference year.

So the app must be able to produce:

- inventory results for multiple years
- one year marked as the reference inventory year
- historical comparison across years

### B. Global territorial result

The report presents the inventory first at the whole-territory level.

So the app must be able to produce:

- total gross emissions
- total net emissions when absorptions are considered
- evolution over time
- high-level source distribution

### C. Municipal patrimoine result

The report separates emissions linked directly to municipal patrimoines from the broader territory.

So the app must be able to produce:

- a municipal patrimoine subset inside the wider inventory
- aggregated municipal patrimoine emissions
- distribution of municipal patrimoine emissions by usage
- comparison between communes inside that municipal patrimoine subset

### D. Scope-based result

The report explicitly separates emissions by covered scopes.

So the app must be able to produce:

- emissions by covered scope
- total result split by scope
- transparent explanation of what belongs to each covered scope

### E. Source / sector analysis

The report refines the inventory by source and by sector.

So the app must be able to produce:

- emissions by source
- emissions by sector
- deeper reading of major emission drivers
- sector-specific supporting views such as energy, waste, and AFAT

### F. Energy-specific result

The report does not stop at emissions. It also presents energy consumption structure.

So the app must be able to produce:

- energy consumption totals
- energy consumption split by sector / usage / energy form
- link between energy activity and resulting emissions

### G. Readiness for scenarios

The inventory result is used as the base for later scenario work.

So the inventory output must be structured enough to support:

- later reference vs transition trajectory work
- commune-level declinations where relevant
- action planning based on the inventory reading

## 2. Minimum Input Families Required To Produce That Result

To produce the result pattern above, the app needs these input families.

### A. Framing inputs

These define what the inventory covers.

- territory
- included communes
- organizational perimeter
- operational perimeter
- covered sectors / sources
- covered scopes
- inventory years
- reference inventory year

### B. Activity inputs

These are the underlying real-world quantities from which the inventory is built.

The report's annexed collection templates imply at least these activity families:

- municipal vehicle fleet data
- public lighting data
- municipal building data
- urban trees / parks / municipal waste-related data
- territory-wide electricity demand
- photovoltaic data
- natural gas data
- solar water heating data
- port-related data
- public transport data
- air transport data
- AFAT data
  - olive groves
  - fruit trees
  - livestock
  - fertilizers
  - agricultural production
- transport activity data
- wastewater / sanitation data

### C. Classification inputs

These inputs let the app organize raw activity into the result structure.

- year
- commune
- territorial vs municipal patrimoine lens
- source
- sector
- scope
- usage
- energy form where relevant

### D. Provenance inputs

These inputs explain where a number came from.

- source institution / actor
- collection template or source document
- file / export / statement / supporting document
- reporting period
- responsible contributor or owner

### E. Quality inputs

The report makes clear that collection involves clarification, adjustment, and validation over time.

So the app will likely need explicit quality context for each important dataset.

- missing data marker
- estimated / proxy marker
- clarification note
- validation state
- limitation note

### F. Methodology inputs

The report includes methodology, gases, sources, and scopes as part of the inventory approach.

These inputs exist, but they should mostly belong to the app's expert layer rather than the non-expert user.

- covered gases
- emission factors
- calculation rules
- scope logic
- aggregation rules
- net vs gross treatment where relevant

## 3. Responsibility Split

This follows the current product truth.

### The user should mainly provide

- framing data
- activity data
- provenance data
- quality / clarification context

### The app should mainly carry

- methodology
- calculation
- aggregation
- output structuring
- comparison views

### The app should produce

- territorial inventory result
- municipal patrimoine reading
- scope reading
- source / sector reading
- comparison across years
- scenario-ready baseline outputs

## 4. What This Means For `inventaire`

The `inventaire` route should not be thought of as:

- one generic data-entry page
- one long form
- one expert methodology screen

It should be thought of as:

- the place where the app gathers and organizes the raw activity reality needed to generate the inventory result structure shown above

## 5. What Still Needs To Be Answered Next

This document still does not answer:

- which of these inputs the non-expert user can enter directly
- which inputs require helpers or examples
- which inputs are best imported from files
- which datasets are mandatory for a first usable inventory result
- how to handle partial or missing datasets in first scope

Those belong to the next artifact:

`inventaire input reality`
