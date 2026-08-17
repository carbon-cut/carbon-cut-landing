## Goal

Translate validated AI operations into safe React Hook Form changes.

## Scope

Create an application-controlled executor responsible for:

```text
AI operation
→ resolve semantic field
→ validate operation
→ resolve RHF path
→ update form
```

Implement execution for:

- `setField`
- `addRecord`
- `updateRecord`
- `setMetadata`

Support:

- year-keyed values
- regular fields
- dynamic field arrays
- units

Run validation against the relevant inventory Zod schema after changes are prepared.

The model must never call `setValue`, `append`, or other RHF APIs directly.

## Acceptance criteria

- A valid `setField` operation updates the expected RHF value.
- Year-based values resolve to the correct year.
- Dynamic records can be added through `useFieldArray`.
- Invalid operations do not modify form state.
- Invalid resulting values are rejected by Zod.
- The executor contains no AI/model-specific logic.

**Estimated effort: 0.75 day**
