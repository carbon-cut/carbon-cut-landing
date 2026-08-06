# Form Standardization Plan (What, Not How)

## Objective

Standardize the full form system end-to-end so it is consistent in layout, component usage, spacing rhythm, and question code quality, while preserving the current UI character.

## Core Direction

- Keep the current visual identity and interaction feel.
- Improve consistency, architecture, and maintainability.
- Reduce variation in how questions are built.
- Make future question additions predictable and low-risk.

## Scope

- Active form flow only (transport, energy, food).
- Inactive/archived question sets remain out of scope.
- Includes form shell + question modules + field usage patterns.

## Execution Targets

- Target A: Shell spacing + typography baseline
  - Includes: `formPageClient`, `container`, `_tab`, `questionList`, shared `question`/`content` wrappers.
  - Purpose: establish one baseline rhythm and text system before deeper question refactors.

- Target B: Question composition contract
  - Includes: active question modules in transport -> energy -> food.
  - Purpose: normalize question structure and coding patterns section-by-section.
  - Canonical model references: `docs/temp_form_target_b_models.md`.

- Target C: Story coverage
  - Includes: shell stories + representative question pattern stories + key states.
  - Purpose: visual validation and regression safety while standardizing.

## Target Order + Parallelization

- Start with `A + C` together.
- Then execute `B + C` together, section-by-section (`transport`, then `energy`, then `food`).
- Story work is continuous (not deferred to the end).

## Target State

## 1) Container & Layout Standard

- One standard container model for form pages and question blocks.
- One spacing rhythm for vertical/horizontal spacing across all questions.
- Consistent section framing (title, content, controls, auxiliary info).
- No ad-hoc spacing patterns per question unless explicitly justified.

## 2) Field Component Organization Standard

- `@/components/forms` is the only entry point for form controls.
- `Field*` wrappers are the canonical abstraction layer over UI primitives.
- Question code must not depend on local field wrapper duplicates.
- Field behavior, sizing, states, and validation presentation are consistent across all sections.

## 3) Question Composition Standard

- Every question follows the same structural contract (header/content/fields/messages/actions).
- Naming and file-level patterns are consistent across transport/energy/food.
- Similar question types use shared patterns, not one-off custom structures.
- Question metadata declarations are consistent and easy to audit.

## 4) Code Cleanliness & Maintainability Standard

- Remove dead patterns from active flow.
- Minimize local exceptions and custom style fragments in question files.
- Keep question files focused on domain logic, not UI plumbing.
- Improve readability and reduce cognitive load for contributors.

## 5) Shell Standardization With UI Preservation

- Form shell (`tabs`, `progress`, `container`, `question navigation`) is standardized.
- Styling remains recognizable to current product UI.
- Any shell adjustments must preserve the current look-and-feel baseline.
- Standardization should increase coherence, not redesign the experience.

## 6) Story Coverage Standard

- Form system must have Storybook coverage for shell and question composition patterns.
- Stories should represent real form states (default, error, disabled, long-label, dense-content).
- Stories should cover at least one representative question pattern from each active section:
  - transport
  - energy
  - food
- Stories should validate spacing rhythm and typography consistency visually.

## Change Policy

- Architecture and code standardization are the primary goal.
- Small UI adjustments are allowed when required to achieve clean and consistent structure.
- Visual drift must stay minimal and intentional.
- Design tokens and shared primitives remain the default foundation.
- No reintroduction of duplicate field-wrapper systems.

## Expected Changes (Allowed Without Pre-Approval)

- Spacing and layout rhythm normalization between questions and containers.
- Field alignment and sizing consistency.
- Label and question color normalization when needed for consistency.
- Error/focus/disabled state consistency.
- Typography cleanup to shared typography primitives, including replacing non-standard text styling.

## Approval-Required Changes

- Major changes to overall form shell identity and interaction feel.
- Major changes to visual personality (core look-and-feel).
- Major changes to background/card/shape language.

## Done Criteria

- Active form questions follow one consistent composition style.
- Spacing and layout rhythm are consistent across sections.
- Form controls are used through one canonical path (`@/components/forms`).
- Shell components are standardized while preserving current UI character.
- Codebase is cleaner and easier to extend without custom per-question patterns.
- Storybook coverage exists for form shell + representative question patterns and key states.
