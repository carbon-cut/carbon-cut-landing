# Collectivity Product Truth

This file records the current explicit product assumptions for `collectivity`.

Its job is to stop implementation chats from making implicit product inferences.

If something is not written here, it should be treated as `open`, not guessed.

Product truth in this file must extract reusable product patterns from the reference report.

It must not copy report-specific literals as if they were universal product defaults.

## Current Working Assumptions

### 1. Primary Product Unit

For now, assume the product is centered on one `municipality-scale territory`.

This means the main product object is not an isolated commune.

It is a larger city or territorial plan that can contain multiple communes inside it.

### 2. Account Structure

For now, assume there is:

- one main `territory-level` account responsible for the whole city-level plan
- multiple `commune-level` accounts related to communes inside that territory

This matches the current pattern extracted from the report structure.

### 3. Product Relationship Between Territory And Communes

For now, assume:

- the territory-level plan is the main shared plan
- commune accounts exist inside that plan context
- commune accounts do not define a separate top-level product by default

The commune layer is therefore a subordinate layer of the larger territorial plan, not a parallel standalone product model.

### 4. Product Framing Boundary

For now, `collectivity` should be framed as:

- a product for building and managing a city-level climate plan
- with commune-level participation and municipal sub-readings inside it

It should not yet be framed as:

- a generic multi-tenant public-sector platform for any government shape
- a commune-first product where every commune is treated as a separate independent root object

### 5. Primary User

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

### 6. Primary User Job In The Product

For now, assume the primary user's job is to:

- enter and maintain the required information in the app
- keep the plan data current over time
- review enough of the output to understand what the app produced
- present the app's outputs to executives

For now, assume the app carries most of the methodological burden.

That means the app should structure the plan, generate the outputs, and guide the user through what is needed.

The primary user should not be expected to:

- invent climate methodology
- understand GHG accounting deeply before using the product
- construct scenarios intellectually without product guidance
- infer the meaning of fields from expert shorthand

### 7. UX Consequence Of This User Assumption

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

### 8. Executives

For now, assume executives are not the primary data-entry users of the product.

For now, assume executives mainly need the product's outputs in a form that supports reading, validation, prioritization, and decision-making.

The product should therefore be able to present executives with:

- a clear summary of the plan
- the target direction and planning horizon
- a comparison between the reference trajectory and the transition trajectory
- the main action priorities
- the expected impacts of those actions
- the required investments
- the implementation sequence or calendar
- the governance, responsibility, and follow-up structure around execution

Executives should not need to read raw collection details in order to understand the plan.

Executives should not need to interpret technical methodology before they can understand the strategic output.

The product should therefore distinguish between:

- operator-facing input and maintenance views
- executive-facing output and decision views

Current decision:

- collectivity should produce one shared output / document for all decision-makers
- the product should not assume different executive-specific output documents in first scope

What remains open:

- the exact executive roles
- the exact format in which they prefer to consume the outputs
- how much detail should be visible by default versus collapsed

TODO: Confirm what "keeping the app updated" should mean in product terms, and whether ongoing post-plan updates are part of the first product scope at all.

## Open Product Questions

These are still open and must not be guessed in implementation:

- what commune accounts are allowed to edit versus only read
- whether commune workflows are full sub-plans or limited municipal declinations
- what the final output of the product is for territory users versus commune users
- whether the product is mainly for plan creation, coordination, reporting, execution, or all of them
- the exact executive audience and their preferred output format

## Implementation Guardrail

Until these open questions are answered:

- do not let route specs invent product structure
- do not let UI copy become product truth
- do not treat report sample content as implementation defaults
- do not treat report-specific names, dates, or values as universal product defaults
- do not infer permissions from page layout alone
- do not design for expert users by default when the current assumed user is a non-expert operator
