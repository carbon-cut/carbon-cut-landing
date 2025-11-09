import { z } from "zod";
import heating from "./raw";

const fioul = (input: unknown, ctx: z.RefinementCtx) => {
    const fioulParse = heating.pick({
        fioul: true,
    }).safeParse(input);
    const fiouqntityParse = heating.shape.quantities.unwrap().pick({
        fioul: true,
    }).safeParse(
    //@ts-ignore
        input?.quantities
    );
    if (fioulParse.success && fiouqntityParse.success) {
        const { fioul } = fioulParse.data;
        const { fioul: fioulQuantity } = fiouqntityParse.data
        if (fioul) {
          if (fioulQuantity) {
            const { quantity, frequency } = fioulQuantity;
            if (!quantity) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Required",
                path: ["quantities.fioul.quantity"],
              });
            }
            if (!frequency) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Required",
                path: ["quantities.fioul.frequency"],
              });
            }
          }
        }
    }
}

export default fioul;