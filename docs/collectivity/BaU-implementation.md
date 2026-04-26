# BaU Methodology

## Global principles

BaU means continuation of existing practices without additional climate action.

The BaU scenario is built source by source / sector by sector, using future activity-data trajectories rather than applying one single global emissions growth rate.

BaU assumptions are defined case by case depending on the activity, the available historical data, and whether the historical trend is considered relevant.

When historical data is available and relevant, the report uses past activity growth as the basis for projection.

When historical trends are not reliable or not representative, the report uses a specific assumption such as stagnation, latest reliable value, or an expert/admin assumption.

After individual sector/source projections are built, they are compiled into an overall BaU trajectory.

BaU emissions are calculated from projected activity data using the same emission-factor basis as the reference inventory.

## Projection methods

The report does not define a fixed list of named projection methods.  
The following method categories are extracted from how the report builds BaU trajectories by source.

- Historical activity trend
- Recent activity trend
- Population / household evolution
- Vehicle-fleet evolution
- Stable unit consumption / constant intensity
- Constant value / stagnation
- Latest reliable value
- Recent average value
- Proxy growth assumption
- Expert/report-specific assumption

- Historical activity trend: use past activity growth when historical data exists and is considered relevant.

- Population-driven growth: use population evolution when the activity is mainly driven by population.

- Household-driven growth: use household evolution when the activity is more directly linked to households than total population.

- Vehicle-fleet-driven growth: use vehicle fleet evolution when projecting road transport activity.

- Constant value / stagnation: keep the activity stable when the report treats the sector as stable or when past trends are not considered reproducible.

- Latest reliable year: carry forward the latest reliable value when the report does not use a trend.

- Recent average or recent trend: use a recent period when the report explicitly bases the projection on recent observed evolution.

- Expert/admin assumption: use when the report relies on a specific assumption because historical data is weak, exceptional, or not representative.

### Electricity

Collected from: electricity dataset

Algorithm:

For each electricity category / sector:

Inputs:

- historical year value
- reference year value
- comparison year value(s)

Decision logic:

1. If historical year → reference year increased:
   - Method: Historical activity trend
   - Annual growth is extracted from historical year → reference year.

2. If historical year → reference year decreased:
   - Check reference year → comparison year(s).

     2.1. If comparison year(s) show recovery above the reference year: - Method: Recent activity trend - Annual growth is extracted from reference year → comparison year.

     2.2. If comparison year(s) stay below the reference year: - Method: Constant value / stagnation - Annual growth is set to 0%. - Activity is held at the reference year value.

Report implications:

- Residential electricity:
  2010 → 2019: +3.8%/year
  => Historical activity trend

- Industrial electricity:
  2010 → 2019: +2.6%/year
  => Historical activity trend

- Tertiary electricity:
  2010 → 2019: same approach as industry
  => Historical activity trend

- Agricultural electricity:
  2010 → 2019: decreased
  2019 → 2021: increased
  => Recent activity trend

- Pumping electricity:
  2010 → 2019: -26%
  2019 → 2021: slow recovery, 2021 stayed below 2019
  applied BaU growth: 0%/year
  => Constant value / stagnation at 2019 basis

User-facing explanation:
Electricity demand is projected by sector. If demand increased between the historical year and the reference year, the historical annual trend is used. If demand decreased, recent comparison years are checked. If recent demand recovered above the reference year, the recent trend is used. If it remained below the reference year, demand is held constant at the reference-year level with 0% annual growth.

### Natural gas / thermal energy

Collected from: naturalGas dataset

Algorithm:

For each gas / thermal energy category:

Inputs:

- historical year value
- reference year value
- comparison year value(s), if available
- exceptional / non-reproducible context flag, if detected or provided

Decision logic:

1. If historical year → reference year increased:
   - Method: Historical activity trend
   - Annual growth is extracted from historical year → reference year.

2. If historical year → reference year decreased:
   - The app detects the trend shape and flags possible anomaly / exceptional context.
   - Expert/admin/user confirms whether the decrease is normal or exceptional.

     2.1. If the decrease is confirmed as exceptional / non-reproducible: - Method: Constant value / stagnation - Annual growth is set to 0%. - Activity is held at the reference year value.

     2.2. If the decrease is not confirmed as exceptional: - Use the reviewed method selected by the expert/admin.

3. If a sub-sector has a distinct clear trajectory from the parent sector:
   - Treat the sub-sector separately.

Report implications:

- Residential thermal consumption:
  2010 → 2019: +0.8%/year
  => Historical activity trend

- Industrial thermal consumption:
  2010 → 2019: strong decrease
  exceptional / non-reproducible context: yes
  applied BaU growth: 0%/year
  => Constant value / stagnation at 2019 basis

- Tertiary thermal consumption:
  same approach as industry
  exceptional / non-reproducible context: yes
  applied BaU growth: 0%/year
  => Constant value / stagnation at 2019 basis

- Hotel thermal consumption:
  2010 → 2019: +1.1%/year
  trajectory: linear
  => Historical activity trend

User-facing explanation:
Thermal energy demand is projected by sector. If demand increased between the historical year and the reference year, the historical annual trend is used. If demand decreased, the app flags the trend for review. When the decrease is confirmed as exceptional or non-reproducible, demand is held constant at the reference-year level with 0% annual growth. If a sub-sector has a distinct trajectory, it is projected separately.

### TODO

activity data trend
→ app detects trend shape
→ app flags possible anomaly / exceptional context
→ expert/admin confirms the interpretation
→ BaU method is selected

trendAssessment: {
historicalTrend: "increase" | "decrease" | "stable";
recentTrend: "increase" | "decrease" | "stable" | "not_available";
anomalyStatus: "normal" | "possibly_exceptional" | "confirmed_exceptional" | "unknown";
selectedMethod: "historical_activity_trend" | "recent_activity_trend" | "constant_value_stagnation" | "expert_assumption";
reasonCode?: string;
expertNote?: string;
}
