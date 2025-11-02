import { z } from "zod";
import heating from "./raw";

const heatingBill = (input: unknown, ctx: z.RefinementCtx) => {
    const fioulParse = heating.pick({
        heatNetwork: true,
    }).safeParse(input);
    const fiouqntityParse = heating.shape.quantities.pick({
        heatingNetwork: true,
    }).safeParse(
    //@ts-ignore
        input?.quantities
    );
    if (fioulParse.success && fiouqntityParse.success) {
        const { heatNetwork } = fioulParse.data;
        const { heatingNetwork: fioulQuantity,  } = fiouqntityParse.data
        if (heatNetwork) {
          if (fioulQuantity) {
            const { money, total,  } = fioulQuantity;
            if (!total && !money) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Required",
                path: ["quantities.heatingNetwork.total"],
              });
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Required",
                path: ["quantities.heatingNetwork.money"],
              });
            }
          }
        }
    }
}

export default heatingBill;