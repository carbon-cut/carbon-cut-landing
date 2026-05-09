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
- Keep styling aligned with token semantics in `globals.css` and `tailwind.config.ts`.
- Preserve accessibility (`aria-*`, alt text, keyboard focus visibility).
- Keep sections semantic and data-driven where possible.
- Run `npm run lint` before shipping UI changes.
- Only change files or code the user explicitly asked you to change.
- Do not overreach; if the task is simple, do the simple task and do not go wild.

## Localization

- Source of truth: `src/locales/fr.ts`.
- Use `useScopedI18n` and `useScopedServerI18n`; avoid hard-coded UI strings.

## Design docs entrypoint

Use docs in `docs/design/` with precedence defined in:

- `docs/design/README.md`

Primary files:

- `docs/design/00-product-truth.md`
- `docs/design/house-style-overrides.md`
- `docs/design/01-design-principles.md`
- `docs/design/02-homepage-spec.md`
- `docs/design/03-workflow.md`
