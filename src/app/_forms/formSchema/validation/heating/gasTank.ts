import { z } from "zod";
import heating from "./raw";
const gasTank = (input: unknown, ctx: z.RefinementCtx) => {
    const gasTankParse = heating.pick({
        gasTank: true,
    }).safeParse(input);
    const gasTankQuantityParse = heating.shape.quantities.unwrap().pick({
        gasTank: true,
    }).safeParse(
        //@ts-ignore
        input?.quantities
    );
    if (gasTankParse.success && gasTankQuantityParse.success) {
        const { gasTank } = gasTankParse.data;
        const { gasTank: gasTankQuantity } = gasTankQuantityParse.data;
        if (gasTank) {
            if (gasTankQuantity) {
                const { capacity, frequency } = gasTankQuantity;
                if (!capacity) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Required",
                        path: ["quantities.gasTank.capacity"],
                    });
                }
                if (!frequency) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Required",
                        path: ["quantities.gasTank.frequency"],
                    });
                }
            }
        }
    }
};
export default gasTank;