import { z } from "zod";
import heating from "./raw";

type WoodCharcoalType = {
  [key in "wood" | "charcoal"]?: true;
};

const woodCharcoal = (input: unknown, ctx: z.RefinementCtx, type: "wood" | "charcoal") => {
  const rawParse = heating
    .pick({
      [type]: true,
    } as WoodCharcoalType)
    .safeParse(input);
  const rawQuantityParse = heating.shape.quantities
    .unwrap()
    .pick({
      [type]: true,
    } as WoodCharcoalType)
    .safeParse(
      //@ts-ignore
      input?.quantities
    );
  if (rawParse.success && rawQuantityParse.success) {
    const { [type]: stuff } = rawParse.data;
    const { [type]: stuffQuantity } = rawQuantityParse.data;
    if (stuff) {
      if (stuffQuantity) {
        const { quantity, frequency, quantityUnit, frequencyUnit } = stuffQuantity;
        if (!quantity) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: [`quantities.${type}.quantity`],
          });
        }
        if (!frequency) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: [`quantities.${type}.frequency`],
          });
        }
        if (!quantityUnit) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: [`quantities.${type}.quantityUnit`],
          });
        }
        if (!frequencyUnit) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: [`quantities.${type}.frequencyUnit`],
          });
        }
      }
    }
  }
};
export default woodCharcoal;
