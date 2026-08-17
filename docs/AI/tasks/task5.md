## Goal

Convert TXT, CSV, XLS and XLSX files into a predictable representation that can be given to the AI.

## Scope

Implement the upload/parser layer for:

- `.txt`
- `.md`
- `.csv`
- `.xls`
- `.xlsx`

Use deterministic parsers rather than asking the model to decode spreadsheets.

For spreadsheet data preserve:

- workbook filename
- sheet name
- row
- column/cell when practical
- raw value
- displayed/text value when useful

Produce a normalized internal representation such as:

```ts
{
  filename,
  type,
  sections: [
    {
      name,
      rows
    }
  ]
}
```

Preserve enough source location information to later attach provenance to extracted values.

## Acceptance criteria

- TXT/Markdown content can be normalized.
- CSV files are converted into rows/columns.
- XLS/XLSX workbooks expose their individual sheets.
- Empty cells do not break parsing.
- Sheet names are preserved.
- Parsed values retain enough positional information to identify their source later.
- The result can be serialized and sent to the AI extraction layer.

**Estimated effort: 0.75 day**
