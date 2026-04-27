# Inventaire Input Map

This document extracts the `inventaire` input families directly from the reference report.

It is not a UI spec.

It is not a route contract yet.

Its purpose is to answer one product question first:

`what inputs are needed for inventory entry and import?`

## Rule

- Extract reusable input patterns from the report.
- Do not treat report-specific values, years, names, or figures as product defaults.

## 1. Minimum Input Families

The report implies these input families.

### A. Framing inputs

These define what the inventory covers.

- territory
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

## 4. What Still Needs To Be Answered Next

This document still does not answer:

- which of these inputs the non-expert user can enter directly
- which inputs require helpers or examples
- which inputs are best imported from files
- which datasets are mandatory for a first usable inventory result
- how to handle partial or missing datasets in first scope

Those belong to the next artifact:

`inventaire input reality`
