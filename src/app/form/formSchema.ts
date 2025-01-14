import { z } from "zod";

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
    hasCar: z.coerce.number(),
    hasMoto: z.coerce.number(),
    hasAir: z.coerce.boolean(),
    hasSea: z.coerce.boolean(),
    cars: z.array(
      z.object({
        carMake: z.string().min(1),
        carModel: z.string().min(1),
        carType: carType,
        carEngine: z.string(),
        carConsumption: z.number(),
        carCalculatedConsumption: z.number(),
        carEConsmption: z.number(),
        carLConsumption: z.number(),
        carMoneyConsumption: z.number(),
        carMoneyEConsumption: z.number(),
        carDistanceConsumption: z.number(),
        carMileage: z.number(),
      }),
    ),
    motos: z.array(
      z.object({
        motoMake: z.string().min(1),
        motoModel: z.string().min(1),
        motoType: carType,
        motoEngine: z.string(),
        motoConsumption: z.number(),
        motoCalculatedConsumption: z.number(),
        motoEConsmption: z.number(),
        motoLConsumption: z.number(),
        motoMoneyConsumption: z.number(),
        motoMoneyEConsumption: z.number(),
        motoDistanceConsumption: z.number(),
        motoMileage: z.number(),
      }),
    ),
    auxilary: z.object({
      bicycle: z.number().nullable(),
      scooter: z.number().nullable(),
      car: z.number().nullable(),
    }),
    airs: z.array(
      z.object({
        origin: z.string().nullable(),
        destination: z.string().nullable(),
        stopover: z.string().nullable(),
        carbonEmissions: z.number().nullable(),
        distance: z.number(),
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
          .nullable(),
        class: z
          .union([
            z.literal("economy"),
            z.literal("premium"),
            z.literal("business"),
            z.literal("first"),
          ])
          .nullable(),
        roundTrip: z.boolean().default(false),
        frequency: z.number().nullable(),
      }),
    ),
    seas: z.array(
      z
        .object({
          distance: z.number().nullable(),
          frequency: z.number().nullable(),
          withCar: z.boolean().nullable(),
          type: z
            .union([
              z.literal("fluvial"),
              z.literal("ferry"),
              z.literal("cruise"),
            ])
            .nullable(),
        })
        .nullable(),
    ),
    commonTransport: z.object({
      shortDistances: z.object({
        bus: z.array(
          z.object({
            busType: z.union([z.literal("thermique"), z.literal("Electrique")]),
            distance: z.number(),
            frequency: z.number(),
            nbPeople: z.number().nullable(),
          }),
        ),
        metro: z.array(
          z.object({
            distance: z.number(),
            frequency: z.number(),
            nbPeople: z.number().nullable(),
          }),
        ),
        tramway: z.array(
          z.object({
            distance: z.number(),
            frequency: z.number(),
          }),
        ),
        covoiturage: z.array(
          z.object({
            make: z.string(),
            carType: carType,
            distance: z.number(),
            pepole: z.number(),
            frequency: z.number(),
          }),
        ),
      }),
      longueDistances: z.object({
        bus: z.array(
          z
            .object({
              busType: z.union([
                z.literal("thermique"),
                z.literal("Electrique"),
              ]),
              distance: z.number(),
              frequency: z.number(),
              nbPeople: z.number().nullable(),
            })
            .nullable(),
        ),
        TGV: z.array(
          z
            .object({
              distance: z.number(),
              frequency: z.number(),
            })
            .nullable(),
        ),
        train: z.array(
          z
            .object({
              distance: z.number(),
              frequency: z.number(),
            })
            .nullable(),
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
            .nullable(),
        ),
      }),
    }),
  }),
  energie: z.object({
    heating: z.object({
      heatPump: z.number().nullable(),
      electricity: z.number().nullable(),
      gazNetwork: z.number().nullable(),
      heatNetwork: z.union([
        z.number().nullable(),
        z.object({
          frequency: z.number().nullable(),
          volume: z.number().nullable(),
        }),
      ]),
      GPL: z.number().nullable(),
      gazTank: z.number().nullable(),
      fioul: z.number().nullable(),
      charcoal: z.number().nullable(),
      wood: z.number().nullable(),
    }),
    electricity: z.object({
      kWh: z.record(
        z.string().regex(/^(0?[1-9]|1[0-2])\/\d{4}$/, "Key must follow the format monthNumber/year (e.g., 1/2025)"),
        z.number()
      ),
      total: z.number(),
      money: z.number().nullable(),
      index: z.number()
    }),
    gaz: z.object({
      m: z.record(
        z.string().regex(/^(0?[1-9]|1[0-2])\/\d{4}$/, "Key must follow the format monthNumber/year (e.g., 1/2025)"),
        z.number()
      ),
      total: z.number(),
      money: z.number().nullable(),
      index: z.number()
    }),
  }),
});
