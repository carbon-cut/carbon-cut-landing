## Goal

Define the only operations the AI is allowed to request against inventory forms.

## Scope

Create Zod schemas for the initial operation set:

```ts
setField;
addRecord;
updateRecord;
setMetadata;
```

Each operation should contain only the information required to perform that action.

Include support for:

- semantic field ID
- year where relevant
- value
- unit
- record identifier/index where relevant
- evidence/provenance
- confidence

Create a discriminated union such as:

```ts
type AIFormOperation =
  | SetFieldOperation
  | AddRecordOperation
  | UpdateRecordOperation
  | SetMetadataOperation;
```

The model must not be able to submit arbitrary JSON patches or arbitrary RHF paths.

## Acceptance criteria

- Every AI-requested form modification must parse through the operation Zod schema.
- Unknown operation types are rejected.
- Unknown fields are rejected.
- Arbitrary form paths cannot be supplied by the model.
- Operations support both year-based values and dynamic-record datasets.

**Estimated effort: 0.5 day**
