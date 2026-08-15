# Result Charts: Frontend Architecture

This document records the agreed frontend approach for the result page charts. It is implementation guidance, not a backend contract.

## Charting Library

Use Apache ECharts for result-page visualizations.

ECharts is selected to support the required stacked bars, lines, pie charts, tooltips, tabs, and future linked-chart interactions. The first version does **not** implement linked views or cross-filtering: every chart is initially independent.

## Client Components

Components that initialize ECharts are client components.

The route/page itself does not need to become a client component solely because it renders charts. Keep browser-only ECharts work in the chart-component boundary.

## Instance Lifecycle

Centralize the ECharts instance lifecycle in one base component.

- Initialize only after the chart container has valid dimensions.
- Dispose the instance when its container is removed, so React unmounting does not leak resources.
- Individual chart components must not duplicate initialization or disposal logic.

Conceptually, the base component owns this pattern:

```tsx
useEffect(() => {
  const chart = echarts.init(containerRef.current!);

  return () => {
    chart.dispose();
  };
}, []);
```

## Responsive and Hidden Charts

Chart sizing must be handled deliberately.

- A browser window resize can trigger an ECharts resize.
- If a chart's CSS/layout dimensions change without a window resize, use `ResizeObserver` if the implementation needs it.
- Do not initialize an ECharts instance while its tab or panel is `display: none`, because the container may have no usable dimensions.
- When a tab becomes visible, resize the existing instance rather than rebuilding it, where possible.

## Theme and Configuration

- Define and register a project-owned ECharts theme to keep visuals stable across ECharts upgrades.
- Chart configuration objects can be large. Keep them primarily component-owned, rather than allowing each route/page to create its own ECharts options.
- Provide shared option helpers for repeated chart behavior, but retain domain-specific configuration in the relevant high-level chart component.

## Component Hierarchy

Use layers that separate ECharts mechanics, reusable chart primitives, and result-domain compositions.

```text
src/components/charts/
  base/        ECharts lifecycle, sizing, theme registration
  shared/      chart Title, Description, tooltip helpers, chart frame
  options/     reusable option-building helpers
  pie.tsx      reusable pie-chart primitive
  bar.tsx      reusable bar-chart primitive

src/app/.../result/
  _charts/     result-domain chart compositions, such as GHG development
               and emissions by scope
```

- Shared chart `Title`, `Description`, and related presentational components are built on the existing `Typography` primitive.
- Generic chart primitives own generic chart concerns.
- Result-domain compositions own the business-facing structure, labels, and mappings for charts such as GHG development and emissions by scope.
- This structure should allow result-domain charts to be reused by a future dashboard page without building that dashboard now.
