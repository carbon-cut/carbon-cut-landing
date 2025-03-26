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
]);
export const formSchema = z.object({
  transport: z.object({
    hasCar: z.coerce.number().nullable().optional(),
    hasMoto: z.coerce.number().nullable().optional(),
    hasAir: z.coerce.boolean().nullable().optional(),
    hasSea: z.coerce.boolean().nullable().optional(),
    cars: z.array(
      z.object({
        carMake: z.string().nullable().optional(),
        carModel: z.string().nullable().optional(),
        carType: carType.nullable().optional(),
        carEngine: z.string().nullable().optional(),
        carConsumption: z.number().nullable().optional(),
        carCalculatedConsumption: z.number().nullable().optional(),
        carEConsmption: z.number().nullable().optional(),
        carLConsumption: z.number().nullable().optional(),
        carMoneyConsumption: z.number().nullable().optional(),
        carMoneyEConsumption: z.number().nullable().optional(),
        carDistanceConsumption: z.number().nullable().optional(),
        carMileage: z.number().optional(),
      }),
    ).nullable().optional(),
    motos: z.array(
      z.object({
        motoMake: z.string().nullable().optional(),
        motoModel: z.string().min(1).nullable().optional(),
        motoType: carType.nullable().optional(),
        motoEngine: z.string().nullable().optional(),
        motoConsumption: z.number().nullable().optional(),
        motoCalculatedConsumption: z.number().nullable().optional(),
        motoEConsmption: z.number().nullable().optional(),
        motoLConsumption: z.number().nullable().optional(),
        motoMoneyConsumption: z.number().nullable().optional(),
        motoMoneyEConsumption: z.number().nullable().optional(),
        motoDistanceConsumption: z.number().nullable().optional(),
        motoMileage: z.number().nullable().optional(),
      }),
    ).nullable().optional(),
    auxilary: z.object({
      bicycle: z.number().nullable().optional(),
      scooter: z.number().nullable().optional(),
      car: z.number().nullable().optional(),
    }).nullable().optional(),
    airs: z.array(
      z.object({
        origin: z.string().nullable().optional(),
        destination: z.string().nullable().optional(),
        stopover: z.string().nullable().optional(),
        carbonEmissions: z.number().nullable().optional(),
        distance: z.number().nullable().optional(),
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
          .nullable().optional(),
        class: z
          .union([
            z.literal("economy"),
            z.literal("premium"),
            z.literal("business"),
            z.literal("first"),
          ])
          .nullable().optional(),
        roundTrip: z.boolean().default(false),
        frequency: z.number().nullable().optional(),
      }),
    ).nullable().optional(),
    seas: z.array(
      z
        .object({
          distance: z.number().nullable().optional(),
          frequency: z.number().nullable().optional(),
          withCar: z.boolean().nullable().optional(),
          type: z
            .union([
              z.literal("fluvial"),
              z.literal("ferry"),
              z.literal("cruise"),
            ])
            .nullable().optional(),
        })
        .nullable(),
    ).nullable().optional(),
    commonTransport: z.object({
      shortDistances: z.object({
        bus: z.array(
          z.object({
            busType: z.union([z.literal("thermique"), z.literal("Electrique")]).nullable().optional(),
            distance: z.number().nullable().optional(),
            frequency: z.number().nullable().optional(),
            nbPeople: z.number().nullable().optional(),
          }).nullable().optional(),
        ).nullable().optional(),
        metro: z.array(
          z.object({
            distance: z.number().nullable().optional(),
            frequency: z.number().nullable().optional(),
            nbPeople: z.number().nullable().optional(),
          }).nullable().optional(),
        ).nullable().optional(),
        tramway: z.array(
          z.object({
            distance: z.number().nullable().optional(),
            frequency: z.number().nullable().optional(),
          }).nullable().optional(),
        ).nullable().optional(),
        covoiturage: z.array(
          z.object({
            make: z.string().nullable().optional(),
            carType: carType.nullable().optional(),
            distance: z.number().nullable().optional(),
            pepole: z.number().nullable().optional(),
            frequency: z.number().nullable().optional(),
          }).nullable().optional(),
        ).nullable().optional(),
      }),
      longueDistances: z.object({
        bus: z.array(
          z
            .object({
              busType: z.union([
                z.literal("thermique"),
                z.literal("Electrique"),
              ]).nullable().optional(),
              distance: z.number().nullable().optional(),
              frequency: z.number(),
              nbPeople: z.number().nullable().optional(),
            })
            .nullable().optional(),
        ),
        TGV: z.array(
          z
            .object({
              distance: z.number(),
              frequency: z.number(),
            })
            .nullable().optional(),
        ),
        train: z.array(
          z
            .object({
              distance: z.number(),
              frequency: z.number(),
            })
            .nullable().optional(),
        ),
        covoiturage: z.array(
          z
            .object({
              make: z.string(),
              carType: carType,
              distance: z.number(),
              pepole: z.number(),
              frequency: z.number(),
            })
            .nullable().optional(),
        ),
      }).nullable().optional(),
    }).nullable().optional(),
  }),
  energie: z.object({
    heating: z.object({
      heatPump: z.number().nullable().optional(),
      electricity: z.number().nullable().optional(),
      gazNetwork: z.number().nullable().optional(),
      heatNetwork: z.union([
        z.number().nullable().optional(),
        z.object({
          frequency: z.number().nullable().optional(),
          volume: z.number().nullable().optional(),
        }),
      ]).nullable().optional(),
      GPL: z.number().nullable().optional(),
      gazTank: z.number().nullable().optional(),
      fioul: z.number().nullable().optional(),
      charcoal: z.number().nullable().optional(),
      wood: z.number().nullable().optional(),
    }).nullable().optional(),
    electricity: z.object({
      kWh: z.record(
        z.string().regex(/^(0?[1-9]|1[0-2])\/\d{4}$/, "Key must follow the format monthNumber/year (e.g., 1/2025)"),
        z.number()
      ).nullable().optional(),
      total: z.number().nullable().optional(),
      money: z.number().nullable().optional(),
      index: z.number().nullable().optional()
    }),
    gaz: z.object({
      m: z.record(
        z.string().regex(/^(0?[1-9]|1[0-2])\/\d{4}$/, "Key must follow the format monthNumber/year (e.g., 1/2025)"),
        z.number()
      ).nullable().optional(),
      total: z.number().nullable().optional(),
      money: z.number().nullable().optional(),
      index: z.number().nullable().optional()
    }),
  }),
});
