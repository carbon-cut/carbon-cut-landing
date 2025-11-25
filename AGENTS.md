# AGENTS

Working notes for anyone contributing to this codebase. Keep changes aligned with the existing implementation rather than reinventing patterns.

## Project map
- Next.js App Router in `src/app`; root layout wires `Header`, `Footer`, `ScrollToTopButton`, `Providers` (`src/lib/partials/Providers.tsx` starts MSW and React Query).
- Design system: Tailwind with CSS variables defined in `src/app/globals.css` (green/orange palette via `--primary`, `--chart-*`, `--section-*`). UI primitives live in `src/components/ui` (Button, Typography, Badge, Card, Tabs, Forms, etc.) and should be reused instead of raw elements.
- Home page is composed from section wrappers in `src/app/_home/sections/*` and presentational components in sibling folders (`_features`, `_pricing`, `_testimonials`, `_faqs`).
- Forms flow: `src/app/form` uses `react-hook-form` + `zod` schemas from `src/app/_forms/formSchema`, with shared context in `src/app/form/_layout/_formContext.tsx` and question renderers under `_components`.
- Static assets expect `NEXT_PUBLIC_BASE_PATH`; Next Image/Link used across sections for performance and routing.

## Patterns to reuse
- Prefer the shared UI components for typography, buttons, badges, cards, tabs, form wiring, etc.; follow existing className/variant patterns (`class-variance-authority` + `cn`).
- Keep styling on the palette: use theme tokens (`text-primary`, `text-secondary`, `text-chart-3`, `bg-card`, `bg-linear-*`) instead of new hex values. Respect the soft background tone (`#F8F8EC`) used on hero/CTA when adding similar blocks.
- Maintain the section pattern: `section` with `aria-labelledby`, a heading rendered via `Typography`, and any controls labeled (`aria-label` for buttons/nav).
- Animations are handled with Tailwind plugins (`timeline-view`, `animate-rise-in`, `animate-tilt-in-*`, etc.); reuse these utility classes to match existing motion.
- When adding assets, prepend `process.env.NEXT_PUBLIC_BASE_PATH` where applicable to keep preview builds working.

## Translation expectations
- Source of truth is `src/locales/fr.ts`. Use `useScopedI18n` in client components and `useScopedServerI18n` in server components/metadata; no hard-coded UI strings.
- New copy belongs in the locale file under the existing scopes (`seo.*`, `home.*`, `components.*`, `forms.*`, etc.). Follow the nested structure (e.g., `home.pricing.*`, `home.faq.*`) so hooks resolve naturally.
- Outstanding i18n work: move the pricing plan labels/descriptions/prices from `src/app/_home/_pricing/index.tsx` and FAQ items in `src/app/_home/_faqs/index.tsx` into the locale file; align `<html lang>` with the default locale.

## Component structure and reuse
- Keep sections data-driven: define arrays of content and map to small card components (pattern used in `_features` and `_testimonials`); avoid duplicating markup.
- Shared patterns belong in `src/components` (ui/layout/forms). If a block is reused across pages, extract a prop-driven component rather than copying section markup.
- Forms: extend schemas in `src/app/_forms/formSchema`, keep `zod` types and `react-hook-form` fields in sync, and leverage the helpers in `src/components/ui/forms` for accessibility/error messaging.
- Charts or API-bound views should run through React Query (already set up) and respect the mock worker during development.

## Workflow notes
- Run `npm run dev` for local work, `npm run lint` before shipping. Storybook is available (`npm run storybook`) for UI verification; add stories when introducing new primitives or layout blocks.
- Preserve accessibility: meaningful alt text on images, keyboard focus states (already styled in `globals.css`), and `aria-*` labels on controls like carousels or nav toggles.
