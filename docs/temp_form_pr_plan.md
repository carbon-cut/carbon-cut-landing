# Form Design-System Unification PR Plan

Goal: unify form controls to one source of truth while preserving current visual output (conservative migration).

## Scope Rules

- Canonical form controls live in `src/components/forms/fields/*`.
- `src/components/ui/*` stays primitive-only.
- `src/app/_forms/components/*` keeps route-specific presentation helpers only (`question`, `content`, etc.), not field controls.
- No UX redesign in this migration.

## Canonical Decisions (Locked)

- `FormSelect` behavior is canonical for select fields.
- `Radio` behavior from `src/app/_forms/components/radio.tsx` is canonical.
- `FormCombox` behavior used by `/qCar1-1.tsx` is canonical.
- Result page keeps direct `ui` Alert usage (`@/components/ui/alert`) as canonical.
- Deprecated old code to remove:
  - `src/app/_forms/components/select.tsx`
  - `src/components/forms/formRadio.tsx`
- Moto and maritime flow cleanup is explicitly deferred (not part of this migration).

## Wrapper Location + Naming

- New wrapper home: `src/components/forms/fields/`
- Wrapper naming prefix: `Field*` (to stay distinct from primitives in `src/components/ui/*`)
- Planned names:
  - `FieldInput`
  - `FieldSelect` (implements canonical FormSelect behavior)
  - `FieldRadio` (implements canonical Radio behavior)
  - `FieldCombobox` (implements canonical FormCombox behavior)
  - `FieldCheckbox`

- Export barrel:
  - `src/components/forms/index.ts`
  - re-export `Field*` wrappers only.

## PR Order (Checklist)

## PR 0 - Baseline + Guardrails (No refactor yet)

- [ ] Capture baseline screenshots for `/form` and `/form/result` (desktop + mobile).
- [ ] Add migration notes and risk list in PR description.
- [ ] Add grep-based acceptance checks to PR description:
  - [ ] no imports from `@/app/_forms/components/input|select|combox|radio|unit|alert` after final migration.
  - [ ] no hardcoded hex colors in canonical form controls.

Files:

- Docs only (no code edits required).

## PR 1 - Canonical Controls Contract in `src/components/forms/fields`

- [ ] Create `src/components/forms/fields/*` and move canonical wrappers there.
- [ ] Standardize control API (shared prop names and behavior).
- [ ] Fix naming inconsistencies (`mandetory` -> `required`, align `options`/`data`).
- [ ] Align error/focus/disabled behavior to tokens + `ui/*` primitives.
- [ ] Ensure no hex/gray/white hardcoded colors in wrappers.
- [ ] Keep canonical behavior sources:
  - [ ] select: existing `FormSelect` behavior
  - [ ] radio: existing `Radio` behavior
  - [ ] combobox: existing `FormCombox` behavior

Primary files:

- [FieldInput.tsx](/home/lenovo/projects/carbon-cut-landing/src/components/forms/fields/FieldInput.tsx)
- [FieldSelect.tsx](/home/lenovo/projects/carbon-cut-landing/src/components/forms/fields/FieldSelect.tsx)
- [FieldRadio.tsx](/home/lenovo/projects/carbon-cut-landing/src/components/forms/fields/FieldRadio.tsx)
- [FieldCombobox.tsx](/home/lenovo/projects/carbon-cut-landing/src/components/forms/fields/FieldCombobox.tsx)
- [FieldCheckbox.tsx](/home/lenovo/projects/carbon-cut-landing/src/components/forms/fields/FieldCheckbox.tsx)
- [index.ts](/home/lenovo/projects/carbon-cut-landing/src/components/forms/index.ts)

Legacy source files to migrate from in this PR:

- [formSelect.tsx](/home/lenovo/projects/carbon-cut-landing/src/components/forms/formSelect/formSelect.tsx)
- [radio.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/radio.tsx)
- [combox.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/combox.tsx)
- [formCheckbox.tsx](/home/lenovo/projects/carbon-cut-landing/src/components/forms/formCheckbox.tsx)

Support files (if needed for types/helpers):

- [forms.tsx](/home/lenovo/projects/carbon-cut-landing/src/components/ui/forms.tsx)
- [input.tsx](/home/lenovo/projects/carbon-cut-landing/src/components/ui/input.tsx)
- [select.tsx](/home/lenovo/projects/carbon-cut-landing/src/components/ui/select/select.tsx)
- [radio-group.tsx](/home/lenovo/projects/carbon-cut-landing/src/components/ui/radio-group.tsx)

## PR 2 - Migrate Form Flow Imports to Canonical Controls

- [ ] Replace field-control imports in `src/app/_forms/basic/**` to `@/components/forms` (`Field*` exports).
- [ ] Keep route-level helper imports (`question`, `content`, etc.) unchanged.
- [ ] Keep behavior and UI output unchanged.

Primary migration files (known active users):

- [qAir1.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/transport/commonTransport/airTravel/qAir1.tsx)
- [qSea.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/transport/commonTransport/maritimeTravel/qSea.tsx)
- [qSea1.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/transport/commonTransport/maritimeTravel/qSea1.tsx)
- [train.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/transport/commonTransport/longueDistances/train.tsx)
- [bus.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/transport/commonTransport/longueDistances/bus.tsx)
- [covoiturage.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/transport/commonTransport/longueDistances/covoiturage.tsx)
- [covoiturage.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/transport/commonTransport/shortDistances/covoiturage.tsx)
- [bus.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/transport/commonTransport/shortDistances/bus.tsx)
- [qHeating1-2.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/energy/heating/qHeating1-2.tsx)
- [centralHeating.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/energy/heating/centralHeating.tsx)
- [electricalHeating.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/energy/heating/electricalHeating.tsx)
- [fioul.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/energy/heating/quantities/fioul.tsx)
- [gpl.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/energy/heating/quantities/gpl.tsx)
- [woodCharcoal.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/energy/heating/quantities/woodCharcoal.tsx)
- [q1.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/energy/housing/q1.tsx)
- [index.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/basic/food/market/index.tsx)

## PR 3 - Delete Deprecated Wrappers + Duplicate Controls

- [ ] Delete deprecated wrappers after all imports are migrated.
- [ ] Keep only presentation helpers used by form route.
- [ ] Do not touch moto/maritime legacy flow cleanup beyond import compatibility.

Delete now (explicit decisions):

- [select.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/select.tsx)
- [formRadio.tsx](/home/lenovo/projects/carbon-cut-landing/src/components/forms/formRadio.tsx)

Remaining duplicate candidates (delete only if no references remain):

- [input.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/input.tsx)
- [combox.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/combox.tsx)
- [dynamicCombox.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/dynamicCombox.tsx)
- [multiCombox.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/multiCombox.tsx)
- [radio.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/radio.tsx)
- [unit.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/unit.tsx)
- [alert.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/alert.tsx)
- [multiCheckInput.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/multiCheckInput.tsx)

Keep (route presentation helpers):

- [question.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/question.tsx)
- [content.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/content.tsx)
- [sideQuestion.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/sideQuestion.tsx)
- [formTitle.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/formTitle.tsx) (or merge into typography usage)
- [formDescription.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/_forms/components/formDescription.tsx) (or merge into typography usage)

## PR 4 - Token Cleanup Pass for Form Shell (No architecture changes)

- [ ] Replace remaining hardcoded surface/text colors in form shell with tokens.
- [ ] Preserve current spacing/layout and interaction behavior.

Primary files:

- [formPageClient.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/form/_components/formPageClient.tsx)
- [container.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/form/_components/container.tsx)
- [\_tab.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/form/_components/_tab.tsx)
- [questionList.tsx](/home/lenovo/projects/carbon-cut-landing/src/app/form/_components/questionList.tsx)
- [form.module.css](/home/lenovo/projects/carbon-cut-landing/src/app/form/form.module.css)

## Verification Checklist (Run each PR)

- [ ] `npm run lint`
- [ ] Form route smoke test:
  - [ ] tab switch
  - [ ] next/back
  - [ ] validation errors
  - [ ] submit path
- [ ] Visual regression check against PR 0 screenshots (desktop + mobile).
- [ ] i18n check: no new hardcoded UI strings in migrated controls.

## Final Acceptance Criteria

- [ ] Form field controls are imported from one source only: `src/components/forms/fields/*` via `src/components/forms/index.ts`.
- [ ] No active field-control imports from `src/app/_forms/components/*`.
- [ ] `src/app/_forms/components/select.tsx` and `src/components/forms/formRadio.tsx` are removed.
- [ ] Visual output remains materially the same (conservative direction).
- [ ] Lint passes and no behavior regressions in core form flow.
