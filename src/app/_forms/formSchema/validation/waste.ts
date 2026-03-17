import { z } from "zod";
import { requiredNumber, union } from "../utils";

const wasteBagVolume = union("10", "20", "30", "40", "50", "60", "70", "80", "90", "100");

const wasteBase = z.object({
  amount: requiredNumber(),
  amountUnit: union("bag", "kg"),
  frequencyUnit: union("day", "week"),
  bagVolume: wasteBagVolume.optional(),
});

const withBagVolumeValidation = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((input, ctx) => {
    const parsed = schema.safeParse(input);
    if (!parsed.success) return input;

    const { amountUnit, bagVolume } = parsed.data as {
      amountUnit?: "bag" | "kg";
      bagVolume?: string;
    };

    if (amountUnit === "bag" && !bagVolume) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["bagVolume"],
      });
    }

    return parsed.data;
  }, schema);

const wasteGeneral = withBagVolumeValidation(wasteBase);

const wasteOrganic = withBagVolumeValidation(
  wasteBase.extend({
    destination: union("idk", "biomethan", "compost"),
  })
).optional();

const wasteRecycle = withBagVolumeValidation(
  wasteBase.extend({
    destination: union("idk", "incineration", "recycling"),
  })
).optional();

const wastePaper = withBagVolumeValidation(
  wasteBase.extend({
    destination: union("idk", "incineration", "recycling", "biomethan", "compost"),
  })
).optional();

const wasteGlass = withBagVolumeValidation(
  wasteBase.extend({
    destination: union("idk", "recycling", "biomethan", "incineration"),
  })
).optional();

export { wasteGeneral, wasteOrganic, wasteRecycle, wastePaper, wasteGlass };
