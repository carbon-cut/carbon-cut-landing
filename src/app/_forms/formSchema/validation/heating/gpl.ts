import { z } from "zod";
import heating from "./raw";

const gplBig = ["propane", "butane"] as const;
const gplSmall = [
  "butaneSmall",
  "butaneBig",
  "propaneBig",
  "propaneSmall",
] as const;

const Gpl = (input: unknown, ctx: z.RefinementCtx) => {
  const GplParse = heating
    .pick({
      GPL: true,
    })
    .safeParse(input);
  const GplQuantityParse = heating.shape.quantities
    .pick({
      //gasTank: true,
      GPL: true,
    })
    .safeParse(
      //@ts-ignore
      input?.quantities
    );
  if (GplParse.success && GplQuantityParse.success) {
    const { GPL } = GplQuantityParse.data;

    const { quantities, types } = GPL!;

    function verify(
      used: boolean | undefined,
      type: (typeof gplBig)[number] | (typeof gplSmall)[number]
    ) {
      if (used) {
        const element = quantities?.[type];
        if (element) {
          const { quantity, frequency } = element;
          if (!quantity) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Required",
              path: [`quantities.GPL.quantities.${type}.quantity`],
            });
          }
          if (!frequency) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Required",
              path: [`quantities.GPL.quantities.${type}.frequency`],
            });
          }
        }
      }
    }

    gplBig.forEach((type) => {
      const used = types.big[type];
      verify(used, type);
    });
    
    gplSmall.forEach((type) => {
      const used = types.small[type];
      verify(used, type);
    });
  }
};
export default Gpl;
