import {
  createAIFieldCatalog,
  createGroupSchema,
  createMatrixSchema,
  type AIFieldCatalogEntry,
} from "./_shared";

type NonEmptyStringArray = [string, ...string[]];

const energyPriceKeys = ["electricity", "diesel", "petrol", "gpl", "gnv", "naturalGas"] as const;

const energyPriceUnits: Record<(typeof energyPriceKeys)[number], NonEmptyStringArray> = {
  electricity: ["currency/kWh"],
  diesel: ["currency/L"],
  petrol: ["currency/L"],
  gpl: ["currency/L"],
  gnv: ["currency/Nm3"],
  naturalGas: ["currency/Nm3"],
};

const priceAssumptionsSchema = createGroupSchema({
  energy: createMatrixSchema(energyPriceKeys, { unitsByKeys: energyPriceUnits }, true)
    .partial()
    .optional(),
});

const energyPriceLabels: Record<(typeof energyPriceKeys)[number], string> = {
  electricity: "Prix unitaire de l’électricité",
  diesel: "Prix unitaire du diesel",
  petrol: "Prix unitaire de l’essence",
  gpl: "Prix unitaire du GPL",
  gnv: "Prix unitaire du GNV",
  naturalGas: "Prix unitaire du gaz naturel",
};

const priceAssumptionsCatalogEntries: AIFieldCatalogEntry[] = [
  {
    datasetKey: "priceAssumptions",
    id: "priceAssumptions.energy",
    fieldPath: "priceAssumptions.energy.{energy}.value",
    label: "Prix unitaire annuel de l’énergie",
    description: "Prix utilisé pour convertir une dépense monétaire en donnée d’activité.",
    valueType: "number",
    expectedUnit: null,
    unitByDimension: {
      energy: Object.fromEntries(
        energyPriceKeys.map((energy) => [energy, energyPriceUnits[energy][0]])
      ),
    },
    dimensions: [{ key: "year" }, { key: "energy", allowedValues: energyPriceKeys }],
    aliases: ["prix énergie", "tarif", "prix unitaire"],
  },
];

const priceAssumptionsCatalog = createAIFieldCatalog(priceAssumptionsCatalogEntries);

export { energyPriceKeys, energyPriceUnits, priceAssumptionsCatalog, priceAssumptionsSchema };
