# Carbon Cut Homepage Implementation Guide

This document defines the homepage structure Carbon Cut should implement next.

Use it together with `product-truth.md`.

If this file conflicts with `product-truth.md`, `product-truth.md` wins.

This file is for:

- homepage section planning
- UI and graphic direction by section
- content boundaries
- implementation order

This file is not for:

- speculative future product positioning
- enterprise messaging
- pricing strategy
- unsupported trust or proof claims

## Core Goal

The homepage must help a visitor understand, quickly and clearly:

- what Carbon Cut is
- who it is for right now
- what the current product does
- what the user gets after completing the flow
- why it is worth trying now
- what to do next

The homepage should feel like a stronger, clearer version of the current Carbon Cut homepage.

It should not feel like a rebrand into another product category.

## Product Positioning

Carbon Cut should currently be presented as:

- a testing-stage climate product
- a guided personal carbon-footprint assessment
- a practical way to understand emissions from transport and home energy
- a product that returns a structured result and recommendations

Carbon Cut should not currently be presented as:

- a business carbon accounting tool
- a carbon management platform
- a reporting or compliance system
- a team workspace
- an enterprise workflow
- a lifestyle or wellness product

## UX Principles To Apply

This homepage should be designed with these Laws of UX in mind: `lawsofux.com`.

### Hick's Law

Keep decisions simple.

Implementation:

- one clear primary CTA in the hero
- avoid multiple competing actions
- avoid too many parallel section goals

### Jakob's Law

Users expect familiar structures.

Implementation:

- use a recognizable homepage flow
- keep hero, explanation, process, results, trust, and CTA in a familiar order
- do not make the page feel experimental or hard to scan

### Law of Proximity and Common Region

Users understand grouped information faster when it is visually grouped clearly.

Implementation:

- each section should feel self-contained
- related items should live in the same visual block
- card groups should be small and intentional

### Fitts's Law

Important actions should be obvious and easy to click.

Implementation:

- make the primary CTA large and easy to hit
- keep secondary actions quiet but visible
- ensure strong spacing around actions

### Aesthetic-Usability Effect

Clear, well-composed interfaces feel easier to use.

Implementation:

- use clean hierarchy
- use calm spacing
- reduce visual noise
- make key content visually trustworthy

### Peak-End Rule

Users remember the strongest and final moments most.

Implementation:

- make the hero immediately clear
- make the final CTA calm and decisive
- avoid weak filler at the end

## Emotional and Visual Direction

The homepage should feel:

- light
- airy
- approachable
- human
- credible
- climate-serious
- emotionally open
- consumer-facing
- distinctive without becoming precious

The homepage should not feel:

- corporate
- consultancy-like
- enterprise-polished
- premium editorial
- boutique lifestyle
- wellness-oriented
- dashboard-heavy

## Graphic Language

Keep the homepage in the same visual family as the current Carbon Cut site.

Use:

- illustrated or stylized imagery
- non-photographic visuals
- soft, story-like atmospheric scenes
- simple icons where they improve clarity
- one main visual idea per section

Avoid:

- glossy renders
- cinematic product art
- realistic photography as the main language
- complex dashboards as hero imagery
- decorative 3D concept visuals

## Color and Typography

Use the current Carbon Cut palette system:

- pale cool backgrounds
- dark teal / green-teal text anchor
- vivid orange accent used sparingly
- soft white surfaces

Typography should feel:

- clear
- strong
- readable
- human

Avoid:

- editorial luxury styling
- corporate flatness
- too many text styles in one section

## Homepage Structure

The homepage should use this section order:

1. Hero
2. Guided Assessment Overview
3. Results Preview
4. Testing Stage and Trust
5. Final CTA

Do not include by default:

- pricing
- testimonials
- fake trust badges
- benchmark claims
- enterprise feature grids

## Section Plan

### 1. Hero

Primary job:

- explain what Carbon Cut is
- explain who it is for
- present the next step

What the user should understand:

- this is a guided personal carbon assessment
- it is meant for individuals
- I can start now

UI:

- two-column layout on desktop
- text and CTA block on the left
- one main illustration on the right
- on mobile, stack cleanly with the CTA staying prominent

Content:

- one strong headline
- one short supporting paragraph
- one primary CTA
- one quieter secondary CTA if useful
- optional light quick links only if they help scanning

Graphics:

- one large illustrated hero visual
- human, stylized, non-photographic
- no dashboard hero

Notes:

- keep choices low
- do not introduce multiple product stories here

### 2. Guided Assessment Overview

Primary job:

- explain the current product clearly without repeating the homepage hero

What the user should understand:

- Carbon Cut guides the user through a footprint questionnaire
- the current focus is transport and home energy
- the output is a structured result with recommendations

UI:

- one section only
- may be static or lightly interactive
- 3 points or 3 steps maximum
- each point should stay concise

Suggested content buckets:

- guided questionnaire
- transport and home energy focus
- clear result and practical recommendations

Graphics:

- small icons, a compact process visual, or one restrained companion illustration
- no large decorative system diagrams unless they directly support clarity

Notes:

- this section replaces the old split between "what it does" and "how it works"
- do not create two separate sections that repeat questionnaire, focus areas, and results
- this section should clarify, not impress
- it should feel concrete and operational

### 3. Results Preview

Primary job:

- show what the user gets at the end

What the user should understand:

- I receive a personal estimate
- I can see where emissions come from
- I get recommendations after the assessment

UI:

- one main result preview composition
- one larger result visual plus 2 to 3 explanatory points
- keep this section visually calm

What to show:

- a headline footprint number
- category-oriented visual cues
- recommendations or next-step guidance

What not to show:

- dense analytics
- benchmarking claims
- reporting UI
- compliance language

Graphics:

- product-adjacent UI preview
- clean and simplified
- not a complex dashboard

### 4. Testing Stage and Trust

Primary job:

- build confidence through honesty

What the user should understand:

- Carbon Cut is in testing
- the current scope is intentionally focused
- the product is being improved through usage and learning

UI:

- compact section
- one small status cue
- short explanatory copy
- 2 to 3 trust points maximum

Safe trust themes:

- guided clarity
- focused scope
- practical first step
- testing-stage honesty

Avoid:

- fake badges
- inflated proof
- unverified methodology claims
- enterprise trust language

Graphics:

- minimal
- quiet visual treatment
- trust should come from restraint, not decoration

### 5. Final CTA

Primary job:

- close the page with one clear action

What the user should understand:

- the next step is to start the assessment
- this is a practical first step, not a heavy commitment

UI:

- one short closing headline
- one support line
- one strong primary CTA

Graphics:

- simple visual echo of the hero mood
- calmer than the hero
- no new concepts

Notes:

- the ending should feel resolved
- do not reopen complexity here

## Copy Rules

Copy should be:

- specific
- practical
- calm
- conservative

Copy should avoid:

- hype
- jargon
- enterprise phrasing
- abstract climate slogans
- inflated maturity

Preferred framing:

- measure and understand your footprint
- get a guided carbon assessment
- see where your emissions come from
- start with a personal carbon estimate and practical next steps

## Claims To Keep Safe

Safe homepage claims include:

- guided personal carbon assessment
- transport and home energy focus
- structured footprint result
- category-oriented visuals
- recommendations after the flow
- testing-stage product

Do not claim:

- business support
- restaurant support
- municipality support
- audit-ready reporting
- exports
- real-time tracking
- team collaboration
- enterprise integrations
- live subscriptions unless confirmed

## Implementation Order

Implement the homepage in this order:

1. Hero
2. What Carbon Cut Does
3. How It Works
4. Results Preview
5. Testing Stage and Trust
6. Final CTA

Do not redesign the whole page at once.

Build section by section on the cleaned design system.

## Success Criteria

The homepage is successful if a new visitor can quickly understand:

- Carbon Cut is for individuals
- Carbon Cut offers a guided personal carbon assessment
- the current product focuses on transport and home energy
- the user receives a structured result and recommendations
- the product is in testing
- the next step is to start the assessment

The intended impression is:

"A clear, human, testing-stage climate product that helps me take a practical first step."
