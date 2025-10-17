import { z } from "zod";

type Primitive = string | number | boolean | null | undefined;
const union = <
  v1 extends Primitive,
  v2 extends Primitive,
  v3 extends readonly Primitive[],
>(
  ...args: [v1, v2, ...v3]
) => {
  // Map each string to a ZodLiteral and assert the type
  const t = args.map((e) => z.literal(e)) as [
    z.ZodLiteral<v1>,
    z.ZodLiteral<v2>,
    ...Array<z.ZodLiteral<v3[number]>>,
  ];

  // Return a union of the mapped literals
  return z.union(t);
};

const carType = z.union([
  z.literal("Electrique"),
  z.literal("Diesel"),
  z.literal("Gasoline"),
  z.literal("Plug-in Hybrid"),
  z.literal("mild Hybrid"),
  z.literal("natural Gaz"),
  z.literal("other"),
]);

export {
  union,
  carType
}