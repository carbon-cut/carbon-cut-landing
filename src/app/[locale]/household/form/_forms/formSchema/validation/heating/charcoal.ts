import { z } from "zod";
import heating from "./raw";

const charcoal = (input: unknown, ctx: z.RefinementCtx) => {
  const charcoalParse = heating
    .pick({
      charcoal: true,
    })
    .safeParse(input);
  const charcoalQuantityParse = heating.shape.quantities
    .unwrap()
    .pick({
      charcoal: true,
    })
    .safeParse(
      //@ts-ignore
      input?.quantities
    );
  if (charcoalParse.success && charcoalQuantityParse.success) {
    const { charcoal } = charcoalParse.data;
    const { charcoal: charcoalQuantity } = charcoalQuantityParse.data;
    if (charcoal) {
      if (charcoalQuantity) {
        const { quantity, frequency, frequencyUnit } = charcoalQuantity;
        if (!quantity) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: ["quantities.charcoal.quantity"],
          });
        }
        if (!frequency) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: ["quantities.charcoal.frequency"],
          });
        }
        if (!frequencyUnit) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: ["quantities.charcoal.frequencyUnit"],
          });
        }
      }
    }
  }
};

export default charcoal;
