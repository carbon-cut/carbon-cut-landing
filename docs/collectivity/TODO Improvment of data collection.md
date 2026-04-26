What I would still improve in this layer

Not calculation logic. But collection metadata.

Your data-collection layer should capture not only the value, but also how reliable that value is.

For each dataset/table/row, I would add:

source?: {
organization?: string; // STEG, municipality, ONAS, CRDA, etc.
documentName?: string;
contactPerson?: string;
collectionDate?: string;
sourceType?: "invoice" | "report" | "excel" | "manual" | "estimate";
}

Also add:

quality?: {
status: "missing" | "provided" | "estimated" | "verified";
confidence?: "low" | "medium" | "high";
comment?: string;
}

And most importantly:

unit?: string;

Because for user data collection, units are the biggest danger.

Example:

{
key: "electricity_consumption",
label: "Electricity consumption",
unit: "kWh",
values: ["2019", "2020", "2021"]
}
The important distinction

Do not put this in the collection schema:

emissionFactor
co2e
scope
BaU
BaC
reduction
investment

Those belong to later layers.

But do put this:

unit
source
data quality
required/optional
validation rule
accepted format

Because those are necessary to make the user-input layer robust.

Clean architecture I recommend

Your current schema should become:

inventoryCollectionSchema

Then later you create separate schemas:

inventorySubmissionSchema // actual user-filled values
emissionCalculationSchema // calculated emissions
scenarioProjectionSchema // BaU / BaC
climateActionPlanSchema // actions and investments
reportGenerationSchema // final PAEDC/report structure

So yes: your schema is not wrong. My earlier comment was judging it as if it were the whole GHG app schema. If its job is only data collection, then it is correctly scoped.

My main recommendation: keep it focused on collection, but strengthen units, source, provenance, validation, and data-quality status.
