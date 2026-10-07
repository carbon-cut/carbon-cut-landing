# Collectivity Product Truth

This file records the current explicit product assumptions for `collectivity`.

Its job is to stop implementation chats from making implicit product inferences.

If something is not written here, it should be treated as `open`, not guessed.

Product truth in this file must extract reusable product patterns from the reference report.

It must not copy report-specific literals as if they were universal product defaults.

## Current Working Assumptions

### 1. Primary Product Unit

For now, assume the product is centered on one `municipality`.

The municipality has one defined territory.

### 2. Product Framing Boundary

For now, `collectivity` should be framed as:

- an inventory workspace for one municipality and its territory
- a product focused on inventory data entry, evidence, hypotheses, and results

It should not yet be framed as:

- a municipality network product for multiple local authorities
- a general public-sector platform for any government shape
- a climate planning product with scenarios or action planning as current scope

### 3. Primary User

For now, assume the primary day-to-day user is:

- a non-expert administrative operator working for the municipality or territory-level plan
- someone able to open the app, fill fields, and keep information updated
- someone who is not expected to understand emissions methodology deeply
- someone who may misunderstand a field if the wording is abstract, technical, or climate-jargon-heavy

For now, assume this user:

- is more comfortable with administrative language than expert climate language
- needs the app to be practical, explicit, and guided
- needs helpers inside the flow
- needs the app to reduce ambiguity instead of asking the user to interpret methodology alone

This user is not the product's climate expert.

This user is also not the person who should manually design the plan logic from scratch.

### 4. Primary User Job In The Product

For now, assume the primary user's job is to:

- enter and maintain the required information in the app
- keep the inventory data current over time
- review enough of the output to understand what the app produced
- present the inventory outputs to stakeholders

For now, assume the app carries most of the methodological burden.

That means the app should structure the inventory, generate the outputs, and guide the user through what is needed.

The primary user should not be expected to:

- invent climate methodology
- understand GHG accounting deeply before using the product
- construct scenarios intellectually without product guidance
- infer the meaning of fields from expert shorthand

### 5. UX Consequence Of This User Assumption

Until this assumption changes, UX decisions should optimize for:

- clarity
- guided completion
- low ambiguity
- plain administrative wording
- helper text near fields
- confidence for a non-expert operator

UX decisions should not optimize first for:

- expert climate terminology
- dense dashboards for specialists
- unexplained acronyms
- flows that assume the user knows the methodology already

### 6. Reviewers

For now, assume reviewers are not the primary data-entry users of the product.

For now, assume review stakeholders mainly need the product's outputs in a form that supports reading and validation.

The product should therefore be able to present reviewers with:

- a clear summary of the inventory
- the territory and covered years
- the current inventory completeness state
- the main results by source, category, or perimeter
- the missing data or hypotheses that still shape the output

Reviewers should not need to read raw collection details in order to understand the inventory.

Reviewers should not need to interpret technical methodology before they can understand the output.

The product should therefore distinguish between:

- operator-facing input and maintenance views
- inventory output and review views

Current decision:

- collectivity should produce inventory outputs and result views for the municipality
- the product should not assume scenario, action-plan, or decision documents in first scope

What remains open:

- the exact review roles
- the exact format in which they prefer to consume the inventory outputs
- how much detail should be visible by default versus collapsed

TODO: Confirm what "keeping the app updated" should mean in product terms, and whether ongoing post-inventory updates are part of the first product scope at all.

## Open Product Questions

These are still open and must not be guessed in implementation:

- what municipality users are allowed to edit versus only read
- what the final inventory output is for different user roles
- whether the product later expands into planning, coordination, reporting, or execution
- the exact review audience and their preferred output format

## Implementation Guardrail

Until these open questions are answered:

- do not let route specs invent product structure
- do not let UI copy become product truth
- do not treat report sample content as implementation defaults
- do not treat report-specific names, dates, or values as universal product defaults
- do not infer permissions from page layout alone
- do not design for expert users by default when the current assumed user is a non-expert operator
