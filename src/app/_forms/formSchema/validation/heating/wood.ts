import { z } from "zod";
import heating from "./raw";

type WoodType = "hardwood" | "softwood";
type WoodQuantity = {
  quantity?: number;
  quantityUnit?: string;
  frequency?: number;
  frequencyUnit?: string;
};

const hasAnyValue = (value?: WoodQuantity) =>
  Boolean(
    value &&
      Object.values(value).some((field) => field !== undefined && field !== null && field !== "")
  );

type WoodCheckStatus = "success" | "some" | "full";
type WoodCheckResult = {
  status: WoodCheckStatus;
  issues: z.ZodIssue[];
};

const checkWoodType = (
  type: WoodType,
  woodQuantity?: Partial<Record<WoodType, WoodQuantity>>
): WoodCheckResult => {
  const quantity = woodQuantity?.[type];
  if (!hasAnyValue(quantity)) {
    return { status: "full", issues: [] };
  }

  const issues: z.ZodIssue[] = [];
  const missingQuantity = !quantity?.quantity;
  const missingFrequency = !quantity?.frequency;

  if (missingQuantity) {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: "Required",
      path: [`quantities.wood.${type}.quantity`],
    });
  }
  if (missingFrequency) {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: "Required",
      path: [`quantities.wood.${type}.frequency`],
    });
  }
  if (!quantity?.quantityUnit) {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: "Required",
      path: [`quantities.wood.${type}.quantityUnit`],
    });
  }
  if (!quantity?.frequencyUnit) {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: "Required",
      path: [`quantities.wood.${type}.frequencyUnit`],
    });
  }

  if (issues.length === 0) {
    return { status: "success", issues: [] };
  }

  if (missingQuantity && missingFrequency) {
    return { status: "full", issues: [] };
  }

  return { status: "some", issues };
};

const wood = (input: unknown, ctx: z.RefinementCtx) => {
  const woodParse = heating
    .pick({
      wood: true,
    })
    .safeParse(input);
  const woodQuantityParse = heating.shape.quantities
    .unwrap()
    .pick({
      wood: true,
    })
    .safeParse(
      //@ts-ignore
      input?.quantities
    );
  if (woodParse.success && woodQuantityParse.success) {
    const { wood } = woodParse.data;
    const { wood: woodQuantity } = woodQuantityParse.data;
    if (wood) {
      const hardwoodResult = checkWoodType("hardwood", woodQuantity);
      const softwoodResult = checkWoodType("softwood", woodQuantity);

      if (hardwoodResult.status === "full" && softwoodResult.status === "full") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "woodTypeRequired",
          path: ["quantities.wood.hardwood"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "woodTypeRequired",
          path: ["quantities.wood.softwood"],
        });
        return;
      }

      if (hardwoodResult.status === "some") {
        hardwoodResult.issues.forEach((issue) => ctx.addIssue(issue));
      }

      if (softwoodResult.status === "some") {
        softwoodResult.issues.forEach((issue) => ctx.addIssue(issue));
      }
    }
  }
};

export default wood;
