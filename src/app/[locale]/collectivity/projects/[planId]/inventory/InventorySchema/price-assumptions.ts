import { createGroupSchema, createMatrixSchema } from "./_shared";

type NonEmptyStringArray = [string, ...string[]];

const energyPriceKeys = ["electricity", "diesel", "petrol", "gpl", "gnv", "naturalGas"] as const;

const energyPriceUnits: Record<(typeof energyPriceKeys)[number], NonEmptyStringArray> = {
  electricity: ["currency/kWh"],
  diesel: ["currency/L"],
  petrol: ["currency/L"],
  gpl: ["currency/L"],
  gnv: ["currency/kg"],
  naturalGas: ["currency/Nm3"],
};

const priceAssumptionsSchema = createGroupSchema({
  energy: createMatrixSchema(energyPriceKeys, { unitsByKeys: energyPriceUnits }, true)
    .partial()
    .optional(),
});

export { energyPriceKeys, energyPriceUnits, priceAssumptionsSchema };
