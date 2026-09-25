# AGENTS

Working notes for contributors to this codebase.

## Project map

- Next.js App Router in `src/app`; root layout wires `Header`, `Footer`, `ScrollToTopButton`, and `Providers`.
- Design system uses Tailwind + CSS variables from `src/app/globals.css`; shared primitives are in `src/components/ui`.
- Home page is assembled from `src/app/_home/sections/*` and sibling presentational folders.
- Forms use `react-hook-form` + `zod` schemas from `src/app/_forms/formSchema` with shared form context.
- Static assets should respect `NEXT_PUBLIC_BASE_PATH`.

## Implementation rules

- Prefer shared primitives/components before introducing local UI patterns.
- Prefer the shared `Typography` primitive for text styling; do not introduce arbitrary text sizes, weights, or line-heights when an existing typography variant/size fits.
- Default to compact product-UI spacing. Do not introduce large gaps, padding, control heights, or text separation (`space-y-8`, `gap-8`, generous card padding, etc.) unless the user explicitly asks for generous spacing or a supplied reference clearly requires it. Treat spacing as an intentional design decision for each region, not a component default.
- Use visual hierarchy before verbal hierarchy. Do not add a heading, subheading, description, card title, or instructional sentence merely to explain the UI below it; use spacing, alignment, grouping, labels, and component structure first. Every heading must introduce a genuinely distinct concept or task. Prefer `page title → meaningful section titles → control labels`, without intermediate wrapper headings. Use one page title; add a section heading only when it separates multiple related controls or content from another meaningful group. Do not narrate the interface.
- For product UI, arbitrary Tailwind values such as `text-[...]`, `h-[...]`, `rounded-[...]`, or `tracking-[...]` are forbidden by default. Use them only when the user explicitly approves them, or when the system cannot express the required reference and that limitation has been stated first.
- Keep styling aligned with token semantics in `globals.css` and `tailwind.config.ts`.
- Preserve accessibility (`aria-*`, alt text, keyboard focus visibility).
- Keep sections semantic and data-driven where possible.
- Mocks must imitate the real backend/API contract exactly. Do not invent mock-only response shapes, UI convenience fields, shortcuts, or alternate data structures. If the contract is unclear, stop and clarify it before coding the mock or the UI parser.
- Run `npm run lint` before shipping UI changes.
- Only change files or code the user explicitly asked you to change.
- Do not overreach; if the task is simple, do the simple task and do not go wild.
- When the user names a specific layer, file, region, or subsystem, treat that as a hard scope boundary.
- Do not modify shared components, locales, schemas, APIs, tests, or adjacent files unless the user explicitly approves that scope expansion.
- If the requested change cannot be completed without crossing the stated scope, stop and ask before editing outside it.
- Do not "clean up", "align", or "follow through" into neighboring layers unless the user explicitly asks for that additional work.
- When a user requests changes to a specific UI region, do not modify adjacent regions, shared shells, headers, sidebars, or unrelated surfaces unless the user explicitly includes them.
- If a reference image is provided, apply it only to the named region in scope, not to the whole screen or neighboring UI.

## Localization

- Source of truth: `src/locales/fr.ts`.
- Use `useScopedI18n` and `getScopedI18n`; avoid hard-coded UI strings.

## Design docs entrypoint

Use docs in `docs/design/` with precedence defined in:

- `docs/design/README.md`

Primary files:

- `docs/design/00-product-truth.md`
- `docs/design/house-style-overrides.md`
- `docs/design/01-design-principles.md`
- `docs/design/02-homepage-spec.md`
- `docs/design/03-workflow.md`
