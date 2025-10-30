import {  z } from "zod";
import { union } from "../../utils";

const heating = z.object({
    heatPump: z.boolean().default(false).optional(),
    gasNetwork: z.boolean().default(false).optional(),
    heatNetwork: z.boolean().default(false).optional(),
    GPL: z.boolean().default(false).optional(),
    gasTank: z.boolean().default(false).optional(),
    fioul: z.boolean().default(false).optional(),
    charcoal: z.boolean().default(false).optional(),
    wood: z.boolean().default(false).optional(),
    electricHeating: z.boolean().default(false).optional(),
    electricalCentralHeating: z.boolean().default(false).optional(),
    system: z
      .object({
        charcoal: z.object({
          insert: z.boolean().default(false),
          woodPole: z.boolean().default(false),
          openFireplace: z.boolean().default(false),
          woodBoiler: z.boolean().default(false),
        }),
        wood: z.object({
          insert: z.boolean().default(false),
          woodPole: z.boolean().default(false),
          openFireplace: z.boolean().default(false),
          woodBoiler: z.boolean().default(false),
        }),
      })
      .optional(),
    quantities: z.object({
      GPL: z.object({
        types: z.object({
          big: z.object({
            butane: z.boolean().default(false), // 13 Kg
            propane: z.boolean().default(false), // 35 Kg
          }),
          small: z.object({
            butaneSmall: z.boolean().default(false), // 5.5kg
            butaneBig: z.boolean().default(false), // 10 kg
            propaneSmall: z.boolean().default(false), // 5 kg
            propaneBig: z.boolean().default(false), // 13 kg
          }),
        }),
        quantities: z.record(
          union(
            "butane",
            "butaneSmall",
            "butaneBig",
            "propane",
            "propaneSmall",
            "propaneBig",
          ),
          z
            .object({
              quantity: z.number(),
              frequency: union("month", "year"),
            })
            .nullable(),
        ),
      }),
      fioul: z.object({
        quantity: z.number().optional(),
        frequency: union("month", "year").optional(), // monthly
      }).optional(),
      gasTank: z.object({
        capacity: z.number().optional(),
        frequency: z.number().optional(), // yearly
      }).optional(),
      electricalHeating: z
        .object({
          energyLabel: union("A", "B", "C", "D", "E", "F", "G", "H", "I", "J"),
          dailyFrequency: z.number(), // h / day
          anualFrequency: z.number(), // week / year
          number: z.number(),
        })
        .optional(),
      electricalCentral: z.object({
        energyLabel: union("A", "B", "C", "D", "E", "F", "G", "H", "I", "J"),
        dailyFrequency: z.number(), // h / day
        anualFrequency: z.number(), // week / year
      }),
      charcoal: z.object({
        quantity: z.number().optional(),
        quantityUnit: union("m3" /*³*/, "kg").optional(),
        frequency: z.number().optional(),
        frequencyUnit: union("day", "week", "month", "year").optional(),
      }),
      wood: z.object({
        quantity: z.number().optional(),
        quantityUnit: union("m3", "kg", "stere").optional(),
        frequency: z.number().optional(),
        frequencyUnit: union("day", "week", "month", "year").optional(),
      }),
    }),
  })

  export default heating