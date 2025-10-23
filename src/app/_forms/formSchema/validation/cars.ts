import { z } from "zod";
import { carType, union } from "../utils";

const car = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  engine: carType,
  otherEngine: z.string().optional(),
  secondThermal: union(
    "Gasoline",
    "Diesel",
    "natural Gaz",
    "other",
    false
  ).optional(),
  otherSecondThermal: z.string().optional(),
  distanceWeekly: z.number().optional(),
  //thermal
  thermalAvg: z.number().optional(),
  thermalConsumption: z.number().optional(),
  moneyThermalConsumption: z.number().optional(),
  //electric
  electricAvg: z.number().optional(),
  electricConsumption: z.number().optional(),
  moneyElectricConsumption: z.number().optional(),
  //prices
  thermalPrice: z.number().optional(),
  electricPrice: z.number().optional(),

  carCalculatedConsumption: z.number().optional(),
  mileage: z.number(),
});

const output = z.preprocess((input, ctx) => {
  function parseThermal() {
    const out: z.IssueData[] = [];
    const thermalParse = car
      .pick({
        thermalConsumption: true,
        moneyThermalConsumption: true,
        thermalPrice: true,
      })
      .safeParse(input);
    if (thermalParse.success) {
      const { thermalConsumption, moneyThermalConsumption, thermalPrice } =
        thermalParse.data;
      if (!thermalConsumption) {
        if (!moneyThermalConsumption)
          out.push({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: ["moneyThermalConsumption"],
          });
        if (!thermalPrice)
          out.push({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: ["thermalPrice"],
          });
        if (!moneyThermalConsumption || !thermalPrice) {
          out.push({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: ["thermalConsumption"],
          });
        }
      }
    }
    return out;
  }
  function parseElectric() {
    const out: z.IssueData[] = [];
    const electricParse = car
      .pick({
        electricConsumption: true,
        moneyElectricConsumption: true,
        electricPrice: true,
      })
      .safeParse(input);
    if (electricParse.success) {
      const { electricConsumption, moneyElectricConsumption, electricPrice } =
        electricParse.data;
      if (!electricConsumption) {
        if (!moneyElectricConsumption)
          out.push({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: ["moneyElectricConsumption"],
          });
        if (!electricPrice)
          out.push({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: ["electricPrice"],
          });
        if (!moneyElectricConsumption || !electricPrice) {
          out.push({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: ["electricConsumption"],
          });
        }
      }
    }
    return out;
  }

  function parseThermalAvg() {
    const out: z.IssueData[] = [];
    const avgParse = car
      .pick({
        distanceWeekly: true,
      })
      .safeParse(input);
    if (avgParse.success) {
      const { distanceWeekly } = avgParse.data;
      if (!distanceWeekly)
        out.push({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["distanceWeekly"],
        });
    }
    return out;
  }

  function parseElectricAvg() {
    const out: z.IssueData[] = [];
    const avgParse = car
      .pick({
        distanceWeekly: true,
      })
      .safeParse(input);
    if (avgParse.success) {
      const { distanceWeekly } = avgParse.data;
      if (!distanceWeekly)
        out.push({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["distanceWeekly"],
        });
    }
    return out;
  }

  const engineParse = car
    .pick({
      engine: true,
      otherEngine: true,
      secondThermal: true,
      thermalAvg: true,
      electricAvg: true,
    })
    .safeParse(input);
  if (engineParse.success) {
    const { engine, otherEngine, secondThermal, thermalAvg, electricAvg } =
      engineParse.data;
    if (engine === "other" && !otherEngine) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["otherEngine"],
      });
    } else if (engine === "Plug-in Hybrid" || engine === "mild Hybrid") {
      if (!secondThermal) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["secondThermal"],
        });
      } else if (secondThermal === "other" && !otherEngine) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["otherSecondThermal"],
        });
      }
      if (engine === "Plug-in Hybrid") {
        const pct = parseThermal();
        const pat = parseThermalAvg();
        const pce = parseElectric();
        const pae = parseElectricAvg();

        if (!thermalAvg) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: ["thermalAvg"],
          });
        }

        if (!electricAvg) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Required",
            path: ["electricAvg"],
          });
        }

        if (pct.length > 0 && pat.length > 0) {
          ctx.addIssue(pat[0]);
          pct.forEach((issue) => {
            ctx.addIssue(issue);
          });
        }
        if (pce.length > 0 && pae.length > 0) {
          ctx.addIssue(pae[0]);
          pce.forEach((issue) => {
            ctx.addIssue(issue);
          });
        }
      }
    } else if (engine === "Electrique") {
      if (!electricAvg) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["electricAvg"],
        });
      }

      const pc = parseElectric();
      const pa = parseElectricAvg();
      if (pa.length > 0 && pc.length > 0) {
        ctx.addIssue(pa[0]);
        pc.forEach((issue) => {
          ctx.addIssue(issue);
        });
      }
    } else {
      if (!thermalAvg) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["thermalAvg"],
        });
      }

      const pc = parseThermal();
      const pa = parseThermalAvg();
      if (pa.length > 0 && pc.length > 0) {
        ctx.addIssue(pa[0]);
        pc.forEach((issue) => {
          ctx.addIssue(issue);
        });
      }
    }
  }

  return input;
}, car);

export default output;
