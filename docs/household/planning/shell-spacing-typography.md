# Target A Plan: Shell Spacing + Typography Baseline

## Goal

Create one consistent baseline for form shell spacing and typography across active form flow, while preserving the current UI character.

## Scope

- `src/app/form/_components/formPageClient.tsx`
- `src/app/form/_components/container.tsx`
- `src/app/form/_components/_tab.tsx`
- `src/app/form/_components/questionList.tsx`
- `src/app/_forms/components/question.tsx`
- `src/app/_forms/components/content.tsx`
- `src/app/form/form.module.css`

## What Target A Must Achieve

- One spacing rhythm for shell containers and question frames.
- One typography baseline for question titles/labels/helper text.
- Reduced local one-off spacing/text overrides.
- Consistent visual hierarchy and alignment.
- No major visual identity drift.

## Standardization Rules For A

- Use shared primitives and tokens first.
- Keep spacing values from a constrained set (no random per-file spacing).
- Keep typography on shared primitives/components where possible.
- Keep existing shell interaction behavior unchanged.

## Deliverables

- Shell components aligned to one spacing and typography rhythm.
- `question` and `content` wrappers aligned with shell baseline.
- Reduced ad-hoc utility variation in target files.
- Storybook coverage for shell states used in this target.

## Story Coverage For A

- Shell default state.
- Validation/error state visibility in shell context.
- Dense-content shell state.
- Mobile viewport shell state.

## Acceptance Criteria

- Shell spacing feels consistent across tabs/questions.
- Typography hierarchy is consistent and readable.
- No major look-and-feel shift from current form UI.
- Lint passes.
- Existing interaction flow remains intact.
