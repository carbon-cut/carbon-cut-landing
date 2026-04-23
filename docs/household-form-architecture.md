# Household Form Architecture

This document describes the current architecture of the household form flow in code.

It is meant to explain the structure and hierarchy of the system so similar flows can be built in the same spirit, even if the exact UI or domain changes.

## Purpose

The household form is a staged questionnaire built on top of:

- Next.js App Router for routing
- `react-hook-form` for state and validation orchestration
- `zod` for schema definition
- shared field wrappers in `src/components/forms`
- route-specific shell and navigation components in `src/app/form`
- domain-specific question modules in `src/app/_forms`

The important architectural idea is this:

- one route owns one form session
- one root schema defines the full submission shape
- one shell handles navigation and progress
- sections are modeled as ordered lists of question components
- questions own domain logic and local interaction details
- shared field primitives own control rendering and validation presentation

## Top-Level Structure

The form system is split into three layers.

### 1. Form route shell

This layer lives in `src/app/form`.

It owns:

- route entry
- form bootstrapping
- tab/section navigation
- progress UI
- question-to-question flow
- submit behavior
- review/overview UI

Main files:

- `src/app/form/page.tsx`
- `src/app/form/_components/formPageClient.tsx`
- `src/app/form/_components/container.tsx`
- `src/app/form/_components/formTabs.tsx`
- `src/app/form/_components/questionList.tsx`
- `src/app/form/_layout/_formContext.tsx`

### 2. Domain question modules

This layer lives in `src/app/_forms`.

It owns:

- the questionnaire content
- question ordering inside each section
- conditional flow inside a question
- domain-specific local UI composition
- field names used for validation and submission

Main folders:

- `src/app/_forms/basic/transport`
- `src/app/_forms/basic/energy`
- `src/app/_forms/basic/food`
- `src/app/_forms/formSchema`
- `src/app/_forms/components`
- `src/app/_forms/types.ts`

### 3. Shared form controls

This layer lives in `src/components/forms` and `src/components/ui/forms.tsx`.

It owns:

- reusable input/select/radio/checkbox/combobox controls
- connection to `react-hook-form`
- label, message, description, and invalid state plumbing
- common field-level rendering behavior

Main files:

- `src/components/ui/forms.tsx`
- `src/components/forms/index.ts`
- `src/components/forms/fields/*`

## Runtime Flow

The form runtime flow is intentionally simple.

1. The `/form` route renders `FormPageClient`.
2. `FormPageClient` creates a single `react-hook-form` instance with the root `zod` schema.
3. `FormPageClient` loads the active section question arrays:
   - transport
   - energy
   - food
4. `FormContext` tracks which section is active and which question index is active inside each section.
5. `Container` renders the current section and current question.
6. `TabContent` selects the active question component from the section array.
7. `QuestionRenderer` wraps the question with any additional local context needed by question families.
8. The question component renders shared field controls and registers which fields must be validated before moving forward.
9. The shell validates those fields, advances the question index, or submits the full form payload.

## Route Shell Responsibilities

### Route entry

`src/app/form/page.tsx` is the route entry. It handles page metadata and session gating, then renders the client-side form shell.

### Form bootstrapping

`src/app/form/_components/formPageClient.tsx` is the true runtime entry for the household form.

It owns:

- `useForm(...)` initialization
- `zodResolver(formSchema)`
- section question arrays via `useState(initTransportQuestions)` and the equivalent for energy and food
- submit mutation
- handoff to the shell components

This file is the composition root of the household form system.

### Shell state

`src/app/form/_layout/_formContext.tsx` stores shell-only state:

- current tab
- current question index per tab
- submit readiness
- fields to validate before advancing

This context is not the form data itself.

It exists to coordinate navigation around the form data.

### Question navigation

`src/app/form/_components/container.tsx` is the central navigation shell.

It owns:

- previous/next behavior
- question card framing
- section icon/title/count display
- "next error" navigation
- validation trigger before moving to the next question
- switching between section tabs

This file is the main controller for the step-by-step experience.

### Section rendering

`src/app/form/_components/formTabs.tsx` bridges shell navigation and question components.

`TabContent` receives:

- the current section question array
- shell callbacks like `next`, `prev`, `setOnSubmit`, `setSubmit`
- the shared `mainForm`

It then renders the current question component from the ordered question array.

### Question overview dialog

`src/app/form/_components/questionList.tsx` renders the review dialog that lists all questions by section and lets the user jump to a specific question.

This is navigation support, not question logic.

## Data Model And Validation

### Root schema

`src/app/_forms/formSchema/index.ts` defines the top-level submission shape.

Current active structure:

- `uid`
- `transport`
- `energy`
- `food`

The architectural rule is:

- section names in the shell should align with section names in the schema
- question field paths should point into this root schema

### Section schemas

The actual nested data contracts live under `src/app/_forms/formSchema/*`.

This layer owns:

- field names
- nested object shape
- validation rules
- section-level grouping

Questions should target these paths rather than inventing ad hoc local payload shapes.

### Validation model

The shell does not validate the entire form on every "next" click.

Instead, each active question declares which fields matter for its current step. Those field paths are stored in `FormContext.verifyFields`, and `Container` triggers validation only for that subset before advancing.

This gives the system a question-by-question validation model on top of a single shared form object.

## Question Module Architecture

### Section entrypoints

Each active section exports an ordered array of question components.

Examples:

- `src/app/_forms/basic/transport/index.tsx`
- `src/app/_forms/basic/energy/index.tsx`
- `src/app/_forms/basic/food/index.tsx`

This ordering is the section flow.

The shell does not discover questions dynamically from the filesystem.

The architecture is explicit:

- section index file composes the ordered question list
- shell consumes the ordered question list

### Question contract

`src/app/_forms/types.ts` defines the shared question contract.

Each question component receives shell integration props such as:

- `mainForm`
- `next`
- `prev`
- `setVerifyFields`
- `setOnSubmit`
- `setSubmit`
- `setQuestions`
- `currentIndex`

Each question component also exposes static metadata through `Question.Symbol`.

That metadata currently includes:

- `question`: human-readable label
- `fields`: field paths associated with that question

This metadata is used by shell utilities such as question overview and error navigation.

### Question responsibilities

A question component is responsible for:

- rendering the prompt/content for that step
- rendering field controls
- deciding which fields are required for step validation
- optionally changing later question flow when the flow is conditional

A question component is not responsible for:

- owning the global form instance
- owning route-level submit behavior
- owning tab-level shell layout

### Dynamic question arrays

The architecture allows questions to update the active question list through `setQuestions`.

That means question flow is not strictly static.

The system supports conditional insertion, removal, or reshaping of later questions while still preserving the shell's "ordered array of questions" mental model.

This is one of the key patterns to preserve if a similar system is built elsewhere.

## Shared Field Architecture

### Base RHF bridge

`src/components/ui/forms.tsx` is the low-level bridge between UI controls and `react-hook-form`.

It provides:

- `Form`
- `FormField`
- `FormItem`
- `FormLabel`
- `FormControl`
- `FormDescription`
- `FormMessage`
- `useFormField`

This is the field-state plumbing layer.

It is generic and should stay reusable outside the household form.

### Canonical field wrappers

`src/components/forms/index.ts` exposes the canonical form controls used by question modules:

- `FieldInput`
- `FieldSelect`
- `FieldRadio`
- `FieldCombobox`
- `FieldCheckbox`
- `FieldMultiCheckInput`
- `FieldMultiCombobox`
- `FieldUnit`
- `FieldAlert`

The architectural intent is:

- question modules consume these wrappers
- wrappers consume the lower-level `ui/forms` primitives
- route shell code should not reimplement field behavior

### Route-specific question helpers

`src/app/_forms/components` contains question presentation helpers such as:

- `QuestionFrame`
- `QuestionSection`
- `QuestionPrompt`
- `QuestionPromptStack`
- `QuestionFieldPair`
- `QuestionUnitPair`
- `QuestionRepeaterSection`
- `QuestionRepeaterItem`
- `QuestionSelectableCard`
- `sideQuestion`

These are not generic form controls.

They are composition helpers for question layout patterns inside this form flow.

That distinction matters:

- `src/components/forms` = shared field controls
- `src/app/_forms/components` = household-form-specific question composition helpers

## Local Contexts

The household form uses two different kinds of context.

### FormContext

`src/app/form/_layout/_formContext.tsx`

Use this for shell/navigation concerns:

- tab state
- question indexes
- verify fields
- submit readiness

### BasicFormContext

`src/app/form/_components/basicFormContext.tsx`

Use this for local domain state needed across a subset of questions. In the current implementation it is used for heating-related toggles that affect related question rendering.

Rule of thumb:

- if state is about shell progression, use `FormContext`
- if state is about a local question family, use a narrower local context
- if state is actual submitted data, keep it in `react-hook-form`

## Hierarchy Rules To Reuse Elsewhere

If another flow should follow the same spirit, preserve these rules.

### 1. One composition root

Have one client entry file that:

- creates the root form
- wires the schema
- loads section question arrays
- hands control to the shell

### 2. One root schema

Define one top-level submission object and make all question field paths point into it.

Do not let individual questions invent disconnected local payload contracts.

### 3. Shell and questions stay separate

Keep route shell concerns separate from question content concerns.

Shell owns:

- step navigation
- progress
- submit
- cross-question review

Questions own:

- prompt/content
- local branching logic
- field composition

### 4. Sections are ordered question arrays

Represent each section as an explicit ordered list of question components.

This keeps flow easy to reason about and easy to restructure.

### 5. Shared fields stay centralized

Use one canonical field-control layer for all question modules.

Do not duplicate form controls inside each question family.

### 6. Question metadata is first-class

Every question should expose machine-readable metadata for:

- label
- fields
- optional future analytics, completion, or navigation features

This keeps shell behavior decoupled from question implementation details.

### 7. Step validation is scoped

Validate the fields relevant to the current question before advancing, rather than trying to treat the whole form as one flat submit-only experience.

## Folder Reading Guide

If you need to understand the system quickly, read files in this order:

1. `src/app/form/page.tsx`
2. `src/app/form/_components/formPageClient.tsx`
3. `src/app/form/_layout/_formContext.tsx`
4. `src/app/form/_components/container.tsx`
5. `src/app/form/_components/formTabs.tsx`
6. `src/app/_forms/types.ts`
7. `src/app/_forms/formSchema/index.ts`
8. `src/app/_forms/basic/transport/index.tsx`
9. `src/app/_forms/basic/energy/index.tsx`
10. `src/app/_forms/basic/food/index.tsx`
11. `src/components/ui/forms.tsx`
12. `src/components/forms/index.ts`

## Current Limits

This document describes the current architecture, not an idealized end-state.

Current limitations include:

- some question flow is still tightly coupled to specific question files
- some local domain state exists outside the schema in helper contexts
- the shell currently knows the active sections explicitly (`transport`, `energy`, `food`)
- inactive sections like waste and holiday/vacation are present in some places but not active in the root schema

These are implementation realities to be aware of when reusing the pattern.

## Short Version

If you only keep one mental model, keep this one:

- `src/app/form` is the shell
- `src/app/_forms/formSchema` is the data contract
- `src/app/_forms/basic/*` is the question flow
- `src/app/_forms/components` is question-layout support
- `src/components/forms` is the shared field-control layer
- `src/components/ui/forms.tsx` is the low-level RHF binding layer

That is the hierarchy.
