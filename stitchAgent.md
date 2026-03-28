# Stitch Agent Brief

Use this file as the source of truth when prompting Stitch for new layouts or UI directions for Carbon Cut.

## How To Use In Stitch

1. Upload these assets first:
   - `public/logo/logoLight.svg`
   - `public/logo/logoDark.svg`
   - `public/home/hero/bg1.png`
2. Also upload screenshots of the current home page and form flow.
3. Paste the relevant prompt block from this file.
4. Tell Stitch to keep the existing brand system and only explore layout, hierarchy, composition, typography treatment, spacing, and art direction.

## Brand System

- Product: Carbon Cut
- Tone: eco-conscious, modern, calm, trustworthy, slightly editorial
- Avoid: generic startup SaaS templates, neon green, dark cyber aesthetics, corporate dashboard styling

### Core Color Tokens

Use these exact tokens as the design basis. Do not invent a new palette.

- `--background: 210 30% 96%`
- `--foreground: 227 9% 14%`
- `--card: 0 0% 100%`
- `--primary: 170 61% 10%`
- `--secondary: 0 0% 28%`
- `--chart-1: 126 75% 64%` light green
- `--chart-2: 175 67% 40%` green
- `--chart-3: 17 100% 60%` orange
- `--chart-4: 43 74% 66%`
- `--chart-5: 27 87% 67%`

### Section Colors

- `transport: 156 100% 32%`
- `food: 198 100% 16%`
- `vacation: 216 100% 38%`
- `energie: 13 100% 60%`
- `waste: 16 66% 48%`

### Existing Gradients

- Primary CTA gradient: `--linear-1 = chart-1 -> chart-2`
- Secondary accent gradient: `--linear-2-1 = chart-3 -> soft peach`
- Button/header accent gradient is frequently rounded and soft, not sharp or metallic

### Background Rules

- Overall page background is soft and light, not pure white
- Mobile navigation already uses a warm cream tone: `#F8F8EC`
- Prefer layered gradients, soft atmospheric overlays, and restrained depth
- Do not flatten the experience into plain white sections

## Existing UI Rules

### Header

- Fixed header
- Transparent over hero, then compresses into a smaller white rounded container on desktop
- Includes logo, nav links, and a primary CTA to `/form`
- Nav items:
  - Features
  - Testimonials
  - Pricing
  - FAQ

### Hero

- Full-screen feel with layered background image
- Dark green translucent overlay over the hero art
- Large headline with orange highlight
- Two CTAs:
  - Primary: go to `/form`
  - Secondary: jump to `#features`
- Quick links below CTAs:
  - Features
  - Testimonials
  - Pricing
  - FAQ

### Pricing

- Three-card layout
- Rounded cards
- Cards are simple, centered, and benefit-driven
- Should feel more premium than the current placeholder implementation

### FAQ

- Accordion pattern
- Clean, readable, low-friction interaction
- Emphasis on typography and spacing, not decorative noise

### Form Experience

- Multi-step flow
- Should feel guided and calm, not dense
- Existing select inputs are rounded, soft, and accessible
- Progress and section state matter
- Sections correspond to:
  - Transport
  - Energie
  - Food
  - Waste
  - Vacation

## Existing Component Language

- Buttons are rounded-full
- Primary buttons use a green gradient
- Outline buttons remain restrained and clean
- Typography uses strong bold titles and medium-weight subtitles
- Focus states are visible and accessibility is important
- Layout rhythm relies on cards, rounded corners, and generous spacing

## What Stitch Is Allowed To Change

- Page composition
- Section hierarchy
- Section order
- Section count
- Section grouping and merging
- Replacing weak sections with stronger alternatives
- Typography pairing and scale
- Spacing system
- Illustration/art direction
- Card treatment
- Hero balance
- CTA prominence
- Form step presentation

## What Stitch Must Not Change

- Brand palette foundation
- Primary CTA destination to `/form`
- Accessibility-first interaction patterns
- Soft, warm, eco-oriented visual direction
- Rounded control language

## Output Format To Ask From Stitch

Ask for:

- 3 distinct directions, not minor variations
- desktop and mobile for each direction
- landing page and form flow concepts
- notes explaining why each direction fits the Carbon Cut brand

## Master Prompt For Landing Page

```text
Design a new landing page direction for Carbon Cut using the uploaded logo files and current screenshots as the visual source of truth.

This is not a greenfield project. You must design within an existing brand and product system.

Brand:
- Carbon Cut
- eco-conscious, modern, calm, credible, slightly editorial
- soft premium feel rather than generic startup SaaS

Use this palette foundation exactly:
- background: hsl(210 30% 96%)
- foreground: hsl(227 9% 14%)
- primary: hsl(170 61% 10%)
- secondary: hsl(0 0% 28%)
- chart-1: hsl(126 75% 64%)
- chart-2: hsl(175 67% 40%)
- chart-3: hsl(17 100% 60%)
- chart-4: hsl(43 74% 66%)
- chart-5: hsl(27 87% 67%)
- warm cream support background: #F8F8EC

Existing visual rules:
- rounded-full buttons
- green gradient primary CTAs
- soft rounded cards
- light atmospheric backgrounds
- large bold headlines with occasional orange emphasis
- accessible, calm, trustworthy UI

Required landing-page elements:
- fixed header with logo, nav, and primary CTA
- hero with strong headline, supporting copy, primary CTA to /form, secondary CTA to the next relevant section
- a clear explanation of the product value
- a trust-building or proof section
- a pricing or offer section if appropriate
- a question-handling section such as FAQ if appropriate
- a strong final CTA section
- footer

Navigation can be restructured if the page architecture changes, but it should remain simple, clear, and conversion-oriented.

Hero rules:
- keep the experience full-screen or near full-screen
- use the uploaded hero background/image as inspiration or a direct visual anchor
- keep a layered or atmospheric treatment, not a flat block
- highlight one word or phrase in orange

Design constraints:
- do not invent a new palette
- do not remove the form CTA
- do not produce a generic template
- do not use dark cyber, neon, or enterprise dashboard aesthetics
- preserve mobile-first usability
- preserve accessibility and readable contrast

Section flexibility:
- the current home-page sections are not fixed
- you may change the order, rename sections, merge sections, remove weak sections, or introduce stronger ones
- any new structure must still support clarity, trust, and conversion toward the `/form` flow
- prefer a tighter, more intentional narrative over keeping every existing block

Create 3 clearly different visual directions:
1. Editorial premium
2. Conversion-focused product marketing
3. Climate campaign with refined restraint

For each direction, provide:
- desktop landing page
- mobile landing page
- a short rationale
```

## Prompt For Multi-Step Form

```text
Design a multi-step form experience for Carbon Cut using the uploaded screenshots and the same brand system as the landing page.

This form should feel guided, calm, and trustworthy. It must not feel like an enterprise admin panel.

Brand constraints:
- same palette and logo system as the landing page
- rounded controls
- soft, clean surfaces
- accessible interaction states
- strong hierarchy with minimal clutter

Form behavior and structure:
- multi-step progression
- clear progress indicator
- visible section/state transitions
- rounded select inputs and standard form controls
- support validation and error messaging
- mobile-first layout quality is required

The form sections are:
- Transport
- Energie
- Food
- Waste
- Vacation

Design goals:
- reduce cognitive load
- make progress feel tangible
- keep the interface warm and reassuring
- allow one question group to dominate attention at a time

Avoid:
- dashboard UI
- crowded comparison tables
- tiny controls
- harsh borders
- heavy dark backgrounds

Create 3 different form directions with:
- desktop screens
- mobile screens
- progress indicator treatment
- select/input/button states
- short rationale for each direction
```

## Prompt For Header Refinement

```text
Redesign the Carbon Cut header using the uploaded logo and current screenshots.

Current behavior to preserve:
- fixed positioning
- transparent over the hero
- compresses into a smaller white rounded container on desktop after leaving the home state
- mobile menu opens as a full-screen panel on a warm cream background
- includes logo, nav links, and CTA to /form

Nav links:
- Features
- Testimonials
- Pricing
- FAQ

Visual direction:
- elegant and confident
- not flashy
- eco-conscious and premium
- rounded geometry
- must harmonize with the hero rather than feeling detached

Create 3 alternatives with desktop and mobile states.
```

## Recommended Attachments For Every Stitch Session

- `public/logo/logoLight.svg`
- `public/logo/logoDark.svg`
- `public/home/hero/bg1.png`
- current home page screenshot
- current form page screenshot
- this `stitchAgent.md`

## Notes For Future Updates

Update this file whenever any of these change:

- logo
- palette tokens in `src/app/globals.css`
- header structure
- landing-page section inventory
- major form interaction patterns
