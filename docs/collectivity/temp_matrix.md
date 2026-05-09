We need 4 small pieces, in this order:

## 1 src/components/table/matrix/types.ts

add a way to describe dynamic row support
decide whether rows are:
a fixed rows prop plus editable row metadata, or
a field-array-backed list
keep the existing year-column behavior unchanged

## 2 src/components/table/matrix/index.tsx

teach MatrixTable how to receive row state from the form when rows are dynamic
keep the current year-column creation logic
do not touch the cell rendering yet unless needed

## 3 src/components/table/matrix/cells.tsx

if row keys become editable/dynamic, update how field names are built
make sure row identity comes from the dynamic row source, not hardcoded props

## 4 The dataset surface that will use it first

probably transport/port/surface.tsx
switch it from static rows=[...] to the new dynamic-row shape once the matrix component can handle it

## The cleanest step-by-step order is:

first define the row data shape
then update MatrixTable types
then update MatrixTable rendering
then update one surface to use it
If you want, I can now inspect the matrix files and tell you exactly which one to edit first, with no code yet.
