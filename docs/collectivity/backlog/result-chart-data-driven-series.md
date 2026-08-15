# Result chart data-driven series

Result charts must derive their years, categories, sources, and series from the
`resultRows` actually returned by the result API.

Do not predeclare chart series from fixtures, previous payloads, or expected
possibilities. Localize and order the emitted identifiers that are present, but
do not render categories with no corresponding result rows.
