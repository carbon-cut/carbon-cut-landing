# AGENTS

## Repository overview

Carbon Cut's frontend is a TypeScript Next.js App Router application. Collectivity is the active product flow. Household is retired; its remaining routes and code are legacy, not active product scope. Browser requests to the backend go through this application's same-origin API routes.

## Project map

- `src/app/[locale]` contains localized pages; its layout wires `Header`, `Footer`, and `Providers`.
- `src/app/[locale]/_home/sections` assembles the home page; `src/app/[locale]/household/form` contains the retired household questionnaire; `src/app/[locale]/collectivity` contains the active collectivity flows.
- `src/app/api` contains the same-origin API routes. Shared UI primitives are in `src/components/ui`.

## Commands

- `npm run dev` starts the development server; with `NEXT_PUBLIC_ENABLE_MSW=true`, it also starts the local mock Strapi server.
- `npm run build` builds the application; `npm run lint` runs lint.
- `npm run test` runs frontend Vitest tests. `npm run test:integration` runs real auth integration tests and requires a running frontend and Strapi backend; see `README.md` for the required environment.

## Architecture

- For client-rendered data and mutations, use TanStack Query. Add reusable query keys, fetchers, and shared query options to the relevant `*_lib/queries.ts` module; do not issue ad-hoc `fetch` calls from UI components.
- Browser requests must use the same-origin Next.js API route layer rather than calling Strapi directly.
- Server-only loading is reserved for server-rendered initial data and must not replace the client query when the UI needs live API state.

## Code placement

- Keep route-specific components, state, and supporting code close to the route or flow that owns them. Use its existing `_components`, `_lib`, or form directories when they fit.
- Prefer solving a feature requirement within its owning surface before considering a change to foundation code.
- Put application components shared across flows in `src/components`; put generic design-system primitives in `src/components/ui`. Do not move feature-specific code into shared infrastructure merely because it could theoretically be reused.
- Keep feature-specific logic in the owning flow's existing `_lib` location rather than creating a generic `utils`, `helpers`, or `common` module for it.
- Put reusable client query keys, fetchers, and options in the relevant `*_lib/queries.ts` module, as described under Architecture.
- Keep validation and form-specific code with the owning form or flow, following its established schema structure. Use the `frontend-forms` skill for form conventions.
- Static assets should respect `NEXT_PUBLIC_BASE_PATH`.
- Source of truth for localization: `src/locales/fr.ts`. All user-facing strings must go through `useScopedI18n` or `getScopedI18n`; do not hard-code UI strings.

## API contracts and mocks

- For covered operations, read `openapi/backend.yaml` before editing integration types, API routes, or mocks. The backend owns the source at `openapi/openapi.yaml`; run `npm run api:sync` after a backend contract change and commit the refreshed snapshot and generated types. Coverage is listed in `docs/openapi.md`.
- Treat the backend/API contract as authoritative for request and response shapes. Frontend integration types, parsers, validation, mocks, and behavior must reflect the real contract.
- Mocks must imitate the real backend/API contract exactly. Do not invent frontend-only or mock-only response fields, UI convenience shapes, aliases, shortcuts, or alternate data structures.
- Do not silently compensate for an uncertain or inconsistent contract in UI code. Investigate using in-scope sources; if the contract remains unknown, treat it as an unresolved dependency rather than inventing one.
- Browser-facing backend integration must remain behind the same-origin Next.js API route layer.
- The backend is a separate repository. Do not inspect or modify it unless the repository or a specific backend resource has explicitly been brought into scope.

## Scope discipline

The repository distinguishes between surface code and foundation code. Classify code by its ownership and consumers, not just its directory name.

### Surface code

Pages, route-specific components, feature-specific logic, local queries, local schemas, feature-owned translation entries, and other code owned by one flow may be changed as needed to complete the requested task, within the user's stated scope.

- Keep changes within the requested feature, flow, page, or region. Only change files or code needed for that request; do not overreach.
- Do not "clean up", "align", refactor, or follow through into neighboring features or unrelated surfaces.
- When the user names a specific file, layer, region, or subsystem as the scope, treat it as a hard boundary. If the change cannot be completed within it, ask before editing outside it.

### Foundation code

Shared or cross-cutting code that multiple parts of the application depend on is protected. Foundation code includes, where applicable:

- shared components and design-system primitives;
- shared schemas, validation, query, or data infrastructure;
- API contracts and shared API behavior;
- localization structure or shared locale infrastructure;
- global providers, root layouts, configuration, and application-wide infrastructure;
- shared abstractions with multiple consumers.

Do not modify foundation code merely because it would make a surface task easier. A request that explicitly names a foundation change authorizes that change; do not ask for the same approval again. If an otherwise requested surface change requires an unapproved foundation change, stop before making it and explain the specific change required.

### Repository boundaries

- Do not explore another repository without the user's permission. A path the user shares from another repository authorizes reading that specific resource only, not searching or inspecting the surrounding repository.
- Read a user-provided file first and use it as the supplied context. If the task cannot be completed reliably without looking beyond it, stop and explain why, then ask before expanding the search.

## Verification

Use verification proportional to the behavior changed.

- Run `npm run lint` for implementation changes.
- Run relevant targeted Vitest tests when tested frontend behavior changes.
- Run `npm run test:integration` when the change affects behavior covered by the real frontend/Strapi integration suite and the required environment is available.
- Run `npm run build` when the change could affect routing, server/client boundaries, bundling, configuration, or production build behavior.
- Do not claim that a command or test passed unless it was actually run.
- If an applicable check cannot run because its environment or a dependency is unavailable, state that explicitly.
- Report failures unrelated to the requested change separately; do not fix them as collateral work.

## Definition of done

A task is complete when:

- the requested behavior is implemented within the approved scope;
- applicable verification has been run, or any check that could not be run is reported;
- unresolved dependencies, assumptions, or failures affecting the result are reported.

## Specialized skills

- For UI implementation, styling, layout, visual hierarchy, design-system components or tokens, or implementation from a Subframe, image, or other design reference, read and follow `.codex/skills/frontend-ui/SKILL.md`.
- For forms, React Hook Form, Zod validation, form schemas, field arrays, form state, or form submission behavior, read and follow `.codex/skills/frontend-forms/SKILL.md`.
