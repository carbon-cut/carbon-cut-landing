import { z } from "zod";
import { raw as energy } from "../energy";
const elems =['gaz', 'electricity'] as const
const bills = (input: unknown, ctx: z.RefinementCtx) => {
  const rawParse = energy
    .pick({
      gaz: true,
      electricity: true,
    })
    .safeParse(input);

  if (rawParse.success) {
    
    elems.forEach((elem) => {
        const {money, total} = rawParse.data[elem];
        if (!money && !total) {
            ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: [`${elem}.total`],
          });
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: [`${elem}.money`],
          });
        }
    })
    
  }
};

export default bills;
