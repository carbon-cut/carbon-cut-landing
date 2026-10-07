# Result Page Requirements

Working notes for the inventory result page. These describe the planned content and should be refined before implementation.

## Summary Cards

Display four cards at the top of the page:

- Emissions
- Net emissions
- Absorptions
- Emissions per capita

## Units

- Units are owned by the backend and are returned alongside each result value, as they are for submitted form values.
- The frontend must display the unit returned for the community; it must not derive or hard-code units.
- `tCO₂e` is the expected unit for community emissions results.

## Charts

### 1. GHG Development

Show inventory years as vertical stacked bars.

- Each bar represents one inventory year.
- The positive part of a bar is divided by emissions family: Energy, AFAT, and Waste.
- Absorptions appear below the zero baseline as a negative segment.
- Segments represent their percentage contribution to that year's total.
- Overlay a black dashed line for total gross emissions.
- Display the total gross-emissions value directly above each inventory year, with a connector line to the data point where needed.
- Include a legend for each emissions family and the total-emissions line.

#### Reference Example

The provided example, titled _Évolution des émissions brutes du Grand Sfax (téCO2)_, establishes the intended reading pattern:

- years on the horizontal axis;
- an absolute emissions scale on the vertical axis;
- stacked yearly columns;
- a dotted black `TOTAL Emissions (brutes)` line over the columns; and
- total values labelled above the yearly points.

The example contains Energy, AFAT (emissions), and Waste in its legend. For the result page, retain the same visual structure while also showing absorptions below zero when available.

### 2. Municipal Assets

Show a stacked chart for the municipal assets (_patrimoine municipal_).

### 3. Emissions by Sector

Show emissions by sector as a pie chart.

- Provide a year selector.
- The selected year controls the pie-chart data.

### 4. Emissions by Scope

Show emissions by scope as a pie chart.

- The current scope is limited to scopes 1 and 2.

### 5. Emissions Breakdown Over Time

Provide a detailed counterpart to the GHG-development chart.

- Include tabs for Energy, Transport, and AFAT.
- The selected tab shows inventory years as columns.
- Each year's column may contain multiple stacked rectangles for the selected category's underlying contributors.
- This chart is intended to make a high number of contributors readable without overloading the overall GHG-development chart.

### Category Hierarchy

- Energy, AFAT, and Waste are top-level emissions families.
- Transport and Industry are sectors within the Energy family; they are not peers of Energy.
- A detailed chart may allow direct selection of a sector such as Transport, but its hierarchy must identify it as part of Energy.

## Open Decisions

- Define the calculation for each summary card, especially net emissions and emissions per capita.
- Define which dimensions and measures compose the municipal-assets chart.
- Confirm whether the GHG-development bar segments encode absolute values, percentage shares, or absolute values with percentage shares available through tooltips/labels. The supplied reference uses an absolute vertical scale.
- Confirm the final name of the detailed tabbed chart and its contributor hierarchy.
