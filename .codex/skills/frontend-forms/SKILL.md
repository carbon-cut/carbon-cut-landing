---
name: frontend-forms
description: Use for frontend forms, React Hook Form, Zod validation, form schemas, field arrays, form state, or form submission behavior.
---

# Frontend forms

- Use React Hook Form and Zod for form state and validation.
- Keep schemas with the form or feature that owns them. Collectivity inventory forms must follow the existing schema modules and shared configuration under `src/app/[locale]/collectivity/projects/[planId]/ghg-inventory/InventorySchema`; extend that pattern instead of inventing another one. This pattern is specific to inventory forms and is not the generic schema pattern for other forms.
- `FormMessage` translates Zod message keys through the shared `forms.errors` locale entries. Use the shared `"Required"` key for required-field errors. Leave Zod's `.email()` message unchanged; its default `"Invalid email"` key is localized through the same map. Add or update both English and French entries there when a shared message needs localization. Do not call `t()` inside the schema for these messages, because `FormMessage` performs the translation.
- When a field needs help text or a required indicator, use `FieldHelp` or `FieldRequired` from `src/components/ui/field-help.tsx`.
