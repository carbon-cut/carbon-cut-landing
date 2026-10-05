---
name: frontend-ui
description: Use for frontend UI implementation, styling, layout, visual hierarchy, design-system components or tokens, and implementation from a Subframe, image, or other design reference.
---

# Frontend UI

- Design system uses Tailwind + CSS variables from `src/app/globals.css`; shared primitives are in `src/components/ui`.
- Use shared primitives/components whenever an equivalent exists. Do not introduce raw interactive HTML elements (such as `<button>`, `<input>`, `<select>`, or `<textarea>`) or local replacements when an equivalent shared primitive/component exists, unless the user explicitly approves an exception.
- Prefer the shared `Typography` primitive for text styling; do not introduce arbitrary text sizes, weights, or line-heights when an existing typography variant/size fits.
- Default to compact product-UI spacing. Do not introduce large gaps, padding, control heights, or text separation (`space-y-8`, `gap-8`, generous card padding, etc.) unless the user explicitly asks for generous spacing or a supplied reference clearly requires it. Treat spacing as an intentional design decision for each region, not a component default.
- Use visual hierarchy before verbal hierarchy. Do not add a heading, subheading, description, card title, or instructional sentence merely to explain the UI below it; use spacing, alignment, grouping, labels, and component structure first. Every heading must introduce a genuinely distinct concept or task. Prefer `page title → meaningful section titles → control labels`, without intermediate wrapper headings. Use one page title; add a section heading only when it separates multiple related controls or content from another meaningful group. Do not narrate the interface.
- For product UI, arbitrary Tailwind values such as `text-[...]`, `h-[...]`, `rounded-[...]`, or `tracking-[...]` are forbidden by default. Use them only when the user explicitly approves them, or when the system cannot express the required reference and that limitation has been stated first.
- Keep styling aligned with token semantics in `globals.css` and `tailwind.config.ts`.
- When implementing from a Subframe reference, read `docs/design/subframe-token-mapping.md` before copying token classes.
- Preserve accessibility (`aria-*`, alt text, keyboard focus visibility).
- Keep sections semantic and data-driven where possible.
- When a user requests changes to a specific UI region, do not modify adjacent regions, shared shells, headers, sidebars, or unrelated surfaces unless the user explicitly includes them.
- If a reference image is provided, apply it only to the named region in scope, not to the whole screen or neighboring UI.

## Design docs entrypoint

Use docs in `docs/design/` with precedence defined in:

- `docs/design/README.md`

Primary files:

- `docs/design/00-product-truth.md`
- `docs/design/house-style-overrides.md`
- `docs/design/01-design-principles.md`
- `docs/design/02-homepage-spec.md`
- `docs/design/03-workflow.md`
