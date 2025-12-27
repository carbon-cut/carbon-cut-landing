import { z, ZodTypeAny } from "zod";

/*const CartypesLiterals: z.ZodLiteral<FuelTypes>[] = [
    z.literal('Electrique'),
    z.literal('Diesel'),
    z.literal('Gasoline'),
    z.literal('Plug-in Hybrid'),
    z.literal('mild Hybrid'),
    z.literal('natural Gaz'),
]*/
const carType = z.union([
  z.literal("Electrique"),
  z.literal("Diesel"),
  z.literal("Gasoline"),
  z.literal("Plug-in Hybrid"),
  z.literal("mild Hybrid"),
  z.literal("natural Gaz"),
  z.literal("other"),
]);
export const formSchema = z.object({
  transport: z.object({
    hasCar: z.coerce.number().nullable().optional(),
    hasMoto: z.coerce.number().nullable().optional(),
    hasAir: z.coerce.boolean().nullable().optional(),
    hasSea: z.coerce.boolean().nullable().optional(),
    cars: z
      .array(
        z.object({
          carMake: z.string().nullable().optional(),
          carModel: z.string().nullable().optional(),
          carType: carType.nullable().optional(),
          carTypeOther: z.string().nullable().optional(),
          carEngine: z.string().nullable().optional(),
          carConsumption: z.coerce.number().nullable().optional(),
          carCalculatedConsumption: z.coerce.number().nullable().optional(),
          carEConsmption: z.coerce.number().nullable().optional(),
          carLConsumption: z.coerce.number().nullable().optional(),
          carMoneyConsumption: z.coerce.number().nullable().optional(),
          carMoneyEConsumption: z.coerce.number().nullable().optional(),
          carDistanceConsumption: z.coerce.number().nullable().optional(),
          carMileage: z.coerce.number().optional(),
        })
      )
      .nullable()
      .optional(),
    motos: z
      .array(
        z.object({
          motoMake: z.string().nullable().optional(),
          motoModel: z.string().min(1).nullable().optional(),
          motoType: carType.nullable().optional(),
          motoEngine: z.string().nullable().optional(),
          motoConsumption: z.coerce.number().nullable().optional(),
          motoCalculatedConsumption: z.coerce.number().nullable().optional(),
          motoEConsmption: z.coerce.number().nullable().optional(),
          motoLConsumption: z.coerce.number().nullable().optional(),
          motoMoneyConsumption: z.coerce.number().nullable().optional(),
          motoMoneyEConsumption: z.coerce.number().nullable().optional(),
          motoDistanceConsumption: z.coerce.number().nullable().optional(),
          motoMileage: z.coerce.number().nullable().optional(),
        })
      )
      .nullable()
      .optional(),
    auxilary: z
      .object({
        bicycle: z.coerce.number().nullable().optional(),
        scooter: z.coerce.number().nullable().optional(),
        car: z.coerce.number().nullable().optional(),
      })
      .nullable()
      .optional(),
    airs: z
      .array(
        z.object({
          origin: z.string().nullable().optional(),
          destination: z.string().nullable().optional(),
          stopover: z.string().nullable().optional(),
          carbonEmissions: z.coerce.number().nullable().optional(),
          distance: z.coerce.number().nullable().optional(),
          aircraftType: z
            .union([
              z.literal("A220"),
              z.literal("A319"),
              z.literal("A320"),
              z.literal("A321"),
              z.literal("A330"),
              z.literal("Boeing737"),
              z.literal("Boeing757"),
              z.literal("Boeing767"),
              z.literal("Boeing777"),
              z.literal("Boeing787"),
              z.literal("other"),
            ])
            .nullable()
            .optional(),
          class: z
            .union([
              z.literal("economy"),
              z.literal("premium"),
              z.literal("business"),
              z.literal("first"),
            ])
            .nullable()
            .optional(),
          roundTrip: z.boolean().default(false),
          frequency: z.coerce.number().nullable().optional(),
        })
      )
      .nullable()
      .optional(),
    seas: z
      .array(
        z
          .object({
            distance: z.coerce.number().nullable().optional(),
            frequency: z.coerce.number().nullable().optional(),
            withCar: z.boolean().nullable().optional(),
            type: z
              .union([z.literal("fluvial"), z.literal("ferry"), z.literal("cruise")])
              .nullable()
              .optional(),
          })
          .nullable()
      )
      .nullable()
      .optional(),
    commonTransport: z
      .object({
        shortDistances: z.object({
          bus: z
            .array(
              z
                .object({
                  busType: z
                    .union([z.literal("thermique"), z.literal("Electrique")])
                    .nullable()
                    .optional(),
                  distance: z.coerce.number().nullable().optional(),
                  frequency: z.coerce.number().nullable().optional(),
                  nbPeople: z.coerce.number().nullable().optional(),
                })
                .nullable()
                .optional()
            )
            .nullable()
            .optional(),
          metro: z
            .array(
              z
                .object({
                  distance: z.coerce.number().nullable().optional(),
                  frequency: z.coerce.number().nullable().optional(),
                  nbPeople: z.coerce.number().nullable().optional(),
                })
                .nullable()
                .optional()
            )
            .nullable()
            .optional(),
          tramway: z
            .array(
              z
                .object({
                  distance: z.coerce.number().nullable().optional(),
                  frequency: z.coerce.number().nullable().optional(),
                })
                .nullable()
                .optional()
            )
            .nullable()
            .optional(),
          covoiturage: z
            .array(
              z
                .object({
                  make: z.string().nullable().optional(),
                  carType: carType.nullable().optional(),
                  distance: z.coerce.number().nullable().optional(),
                  pepole: z.coerce.number().nullable().optional(),
                  frequency: z.coerce.number().nullable().optional(),
                })
                .nullable()
                .optional()
            )
            .nullable()
            .optional(),
        }),
        longueDistances: z
          .object({
            bus: z.array(
              z
                .object({
                  busType: z
                    .union([z.literal("thermique"), z.literal("Electrique")])
                    .nullable()
                    .optional(),
                  distance: z.coerce.number().nullable().optional(),
                  frequency: z.coerce.number(),
                  nbPeople: z.coerce.number().nullable().optional(),
                })
                .nullable()
                .optional()
            ),
            TGV: z.array(
              z
                .object({
                  distance: z.coerce.number(),
                  frequency: z.coerce.number(),
                })
                .nullable()
                .optional()
            ),
            train: z.array(
              z
                .object({
                  distance: z.coerce.number(),
                  frequency: z.coerce.number(),
                })
                .nullable()
                .optional()
            ),
            covoiturage: z.array(
              z
                .object({
                  make: z.string(),
                  carType: carType,
                  distance: z.coerce.number(),
                  pepole: z.coerce.number(),
                  frequency: z.coerce.number(),
                })
                .nullable()
                .optional()
            ),
          })
          .nullable()
          .optional(),
      })
      .nullable()
      .optional(),
  }),
  energie: z.object({
    heating: z
      .object({
        heatPump: z.coerce.number().nullable().optional(),
        electricity: z.coerce.number().nullable().optional(),
        gazNetwork: z.coerce.number().nullable().optional(),
        heatNetwork: z
          .union([
            z.coerce.number().nullable().optional(),
            z.object({
              frequency: z.coerce.number().nullable().optional(),
              volume: z.coerce.number().nullable().optional(),
            }),
          ])
          .nullable()
          .optional(),
        GPL: z.coerce.number().nullable().optional(),
        gazTank: z.coerce.number().nullable().optional(),
        fioul: z.coerce.number().nullable().optional(),
        charcoal: z.coerce.number().nullable().optional(),
        wood: z.coerce.number().nullable().optional(),
      })
      .nullable()
      .optional(),
    electricity: z.object({
      kWh: z
        .record(
          z
            .string()
            .regex(
              /^(0?[1-9]|1[0-2])\/\d{4}$/,
              "Key must follow the format monthNumber/year (e.g., 1/2025)"
            ),
          z.coerce.number()
        )
        .nullable()
        .optional(),
      total: z.coerce.number().nullable().optional(),
      money: z.coerce.number().nullable().optional(),
      index: z.coerce.number().nullable().optional(),
    }),
    gaz: z.object({
      m: z
        .record(
          z
            .string()
            .regex(
              /^(0?[1-9]|1[0-2])\/\d{4}$/,
              "Key must follow the format monthNumber/year (e.g., 1/2025)"
            ),
          z.coerce.number()
        )
        .nullable()
        .optional(),
      total: z.coerce.number().nullable().optional(),
      money: z.coerce.number().nullable().optional(),
      index: z.coerce.number().nullable().optional(),
    }),
  }),
});
