# House Style Overrides

This file defines local design decisions that override/refine archived guidance.

## Priority

For house-level UI decisions, this file has precedence over non-canonical reference docs.

## Primitive policy

- Primitive-first policy: recurring UI patterns should come from shared primitives.
- Prefer primitive defaults first. If a primitive already encodes key style (for example radius, height, spacing rhythm), use that baseline before adding page-level overrides.
- Prefer using primitives directly over creating local one-off style systems.
- Replicating primitive styles is discouraged, but allowed when necessary.
- When replication is necessary, keep behavior and token usage aligned with primitive conventions.
- Treat local visual overrides on primitives as exceptions, not baseline behavior. Keep overrides minimal and purposeful.

## Token semantics

- `primary.*` means emphasized interactive/action color.
- `foreground` (plus `secondary`/`muted-foreground`) means text hierarchy.
- `border`/`input`/`card`/`background`/`surface-*` are structural tokens.
- `section-*` and `chart-*` are domain/data accents, not default structure.

## Buttons

- Recurring button patterns belong in `src/components/ui/button/button.tsx`.
- If only the surface differs but behavior is the same, keep behavior and apply minimal style delta.
- Add new variants only when reused and stable.
- `variant="none"` remains a restricted escape hatch.

## On-action text

- Emphasized action surfaces should use `text-primary-foreground`.
- Non-emphasized variants (`outline`, `ghost`, `link`) should not default to on-action text.

## Gradient policy

- Gradients already defined in shared primitive variants are allowed.
- Do not add ad-hoc gradients for neutral/structural surfaces outside primitive patterns.

## Shape policy

- Rounded/pill treatments are allowed when they come from existing primitive/product patterns.
- Do not introduce pill/rounded treatments as indiscriminate defaults for unrelated components.

## Typography scope

- Marketing/editorial surfaces may use more expressive typography where appropriate.
- Product/task surfaces should keep typography restrained, practical, and clear.

## Interpretation discipline

- Apply house guidance with project context, not blanket substitution.
- "Moderate" or "restrained" does not imply rewriting established primitive shape language by default.
- If a project primitive uses pill treatments in a flow, preserve that choice unless a specific request says otherwise.

## Non-negotiable anti-template rules

- Card-grid-first layouts are forbidden by default.
- Do not use more than one primary card group in a single section unless explicitly requested.
- Do not stack multiple card-only sections back-to-back as the core page pattern.
- Feature-card overload is forbidden.
- Fake charts/metrics used only as visual filler are forbidden.
- Decorative trust/testimonial/status blocks without concrete product support are forbidden.
- Glassmorphism, glow-heavy cards, and frosted-panel styling as a base visual language are forbidden.
- Repeating the same rounded container treatment across every surface type (cards/buttons/panels/navigation shells) is forbidden.
- Dashboard-style KPI grids are forbidden as a default first pattern.
