# UI Design Workflow

Use this workflow for any new page/section UI work to reduce rework and keep design quality consistent.

## Default Rule

Before implementing UI, the agent must ask for design direction.

Do not start styling from scratch without this input.

## Required Preflight (Ask First)

For any UI task, ask the user for:

1. A reference (screenshot, existing section, or external example)
2. A direction choice:
   - conservative
   - balanced
   - expressive
3. Three explicit constraints:
   - must keep
   - must avoid
   - what currently looks wrong

If the user does not have a design reference, follow the No-Reference Path below.

## No-Reference Path (Exact Steps)

If the user has no reference, do not start implementation. Use this discovery flow first.

Rules:

- Do not ask the user to provide internal product refs.
- Do not propose A/B/C design directions unless the user explicitly requests options.
- Do not start code before the return package is provided.

### A) Search For References (10-15 min)

Search strategy: broad to specific, then pattern-hunt.

Use these starter searches first:

- `help center ui`
- `support page ui`
- `knowledge base ui`
- `faq page ui`

Then refine with one modifier:

- `saas`
- `b2c`
- `minimal`
- `editorial`
- `dashboard`

Examples:

- `help center ui saas`
- `support page ui minimal`
- `knowledge base ui editorial`

Where to search and how:

- Land-book
- Awwwards
- Godly
- Mobbin
- Refero

Per-site guidance:

- Land-book / Godly: browse tags/categories first, then use search.
- Awwwards: use search, then narrow by clean/minimal sites.
- Mobbin / Refero: search by UI pattern terms:
  - `help`
  - `support`
  - `settings`
  - `onboarding`
  - `faq`

Collect exactly 3 screenshots:

1. one layout reference
2. one typography/spacing reference
3. one color/surface reference

Important:

- Do not wait for a perfect “help page” match.
- Mix references by component if needed:
  - hero/layout from one ref
  - action cards/list from another
  - status/trust block from another
- Timebox this step to 10-15 minutes, then move on.

### B) Generate A Draft With AI (Optional but recommended)

Use one tool (v0/Relume/Framer/Uizard) with this prompt:

```txt
Design a Help Center page for a climate product.
Style: calm, modern, trustworthy, human.
Avoid generic SaaS card grids.
Sections:
1) Hero with one primary CTA and one secondary CTA
2) Guided help paths (3 actions max)
3) Current scope vs planned scope
Visual direction:
- soft airy background
- green as primary anchor, orange as accent
- clear typography hierarchy
- mobile-first responsive behavior
```

Export one screenshot only.

### C) Return Package Before Coding

Before implementation, user provides:

- 3 web references (screenshots)
- 1 AI draft screenshot (optional)
- a quick preference note:
  - what to keep (3)
  - what to avoid (3)
  - desired direction: conservative/balanced/expressive

Without this package, stop and ask again. Do not style from scratch.

## Minimal Input Template (Send To User)

```txt
Reference: [screenshot/file/URL]
Direction: [conservative | balanced | expressive]
Must keep (3):
- ...
- ...
- ...
Must avoid (3):
- ...
- ...
- ...
What looks wrong now:
- ...
- ...
- ...
```

## Build Sequence

1. Confirm layout intent in 5-8 bullets (no code yet)
2. Implement one section only (usually hero first)
3. Get approval/rejection
4. Continue section by section

Never redesign the whole page in one pass unless user explicitly asks.

## Review Language

Use short feedback labels during iteration:

- Keep
- Too flat
- Too busy
- Too generic
- Off-brand

## Quality Gate (Before Finalizing)

Check all items:

- Matches the chosen reference direction
- Uses existing design tokens/components
- Preserves spacing rhythm used on homepage
- Keeps copy and claims aligned with product truth docs
- Works on desktop and mobile

If any item fails, revise before final handoff.
