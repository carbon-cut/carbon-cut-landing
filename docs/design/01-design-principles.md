# Carbon Cut Design Principles

This file defines active design principles for Carbon Cut.

Use this with `00-product-truth.md` and `house-style-overrides.md`.
If there is a conflict, `house-style-overrides.md` wins for house-level UI decisions.

## Design intent

Carbon Cut should feel:

- credible
- climate-serious
- slightly technical
- human and approachable
- distinctive without becoming chaotic

Carbon Cut should avoid:

- generic SaaS template feel
- consultancy-style corporate polish
- emotionally flat interfaces
- visual decisions that overpromise product maturity

## Product UI vs marketing UI

Typography and visual expression have two lanes:

- Marketing/editorial surfaces can be more expressive when needed.
- Product/task-oriented surfaces should stay restrained, practical, and clear.

## Primitive-first policy

- Prefer shared primitives and design-system components first (`src/components/ui/*`).
- Primitive usage is preferred over ad-hoc local styling.
- Replicating primitive styles is discouraged, but allowed when necessary.
- When replication is necessary, keep token semantics and behavior aligned with the primitive model.
- Start from primitive defaults before reaching for page-level visual overrides.
- Local overrides should stay small and intentional so primitive behavior remains the dominant pattern.

## Hard layout constraints

- Do not use card grids as the default composition strategy.
- Do not treat "add more cards" as the fallback solution for weak hierarchy.
- Do not use fake analytical UI (placeholder charts, fake KPIs, fake benchmarks) to fill space.
- Do not rely on generic testimonial/trust filler blocks without clear product-grounded purpose.
- Do not use dashboard-like visual patterns as default marketing/product page structure unless explicitly requested.
- Keep section composition mixed and intentional (text, list, media, interaction), not repeated card clusters.

## Token and action-surface rules

Token semantics and action text rules follow `house-style-overrides.md`.

Operationally:

- Use design tokens consistently (`primary.*`, `foreground`, `muted-foreground`, `border`, `input`, `card`, `background`, `surface-*`).
- Emphasized action surfaces should use `text-primary-foreground`.
- Non-emphasized surfaces (`outline`, `ghost`, `link`) should not default to on-action text.

## Gradients and shape usage

- If a gradient exists in a shared primitive variant, it is allowed.
- Avoid introducing one-off ad-hoc gradients outside the primitive system.
- Rounded/pill treatments are allowed when they come from existing primitive/product patterns.

## Motion and interaction

- Reuse existing project animation utilities when motion is needed.
- Avoid gratuitous custom transform effects that create decorative churn.

## Accessibility and structure

- Keep section semantics (`section`, `aria-labelledby`) and clear heading hierarchy.
- Label controls and navigational actions (`aria-label`) when needed.
- Preserve keyboard focus visibility and meaningful alt text.

## Interpretation notes

- Apply style guidance in context of existing primitives, not as automatic replacement rules.
- Restrained UI direction should not erase established primitive choices unless a task explicitly asks for that change.
