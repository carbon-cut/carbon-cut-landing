# House Style Overrides

This file defines the local design decisions that override or refine `docs/design/uncodexify.md`.

## Token Semantics

- `primary.*` means emphasized interactive/action color.
- `foreground` (plus `secondary`/`muted-foreground`) means text hierarchy.
- `border`/`input`/`card`/`background`/`surface-*` are structural tokens.
- `section-*` and `chart-*` are domain/data accents, not default structure.

## Buttons

- Primitive-first policy: recurring button patterns belong in `src/components/ui/button/button.tsx`.
- If only the background/surface differs but the behavior pattern is the same, keep the same behavior model and apply minimal style delta.
- Add a new variant only when that pattern is reused and stable.
- `variant="none"` is treated as a restricted escape hatch (currently scroll-to-top only).

## On-Action Text

- Any emphasized action surface (solid, accent, or gradient action intent) must use `text-primary-foreground`.
- Non-emphasized variants (`outline`, `ghost`, `link`) should not use on-action text by default.

## Gradient Policy

- Gradients are allowed for emphasized CTA/action variants in the primitive system.
- Avoid ad-hoc gradient usage for neutral structural surfaces.

## Shape Policy

- Pill shapes are allowed where existing product patterns require them (form/preassessment/home CTA).
- Do not introduce pill shapes as an indiscriminate default for unrelated components.
