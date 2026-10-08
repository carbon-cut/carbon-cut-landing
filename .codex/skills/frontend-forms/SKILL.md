---
name: frontend-forms
description: Use for frontend forms, React Hook Form, Zod validation, form schemas, field arrays, form state, or form submission behavior.
---

# Frontend forms

- Forms use `react-hook-form` + `zod` schemas from `src/app/[locale]/household/form/_forms/formSchema` with shared form context.

- Form Schemas produce a pattern through a shared folder. don't invent a new pattern / shema unless there is no option.

-Schemas are organized by index / config files. config files are for shared constants, enums. probably columns. that are then called in the surface. this guarentee one source of truth to the form and the ui.

-when a field / row / column is vague, we have a component `src/components/ui/field-help.tsx` that gets attached to the ui to indicate informations. in the same way, if the field / row / column is required we have a component named FieldRequired in the same `src/components/ui/field-help.tsx` file.
