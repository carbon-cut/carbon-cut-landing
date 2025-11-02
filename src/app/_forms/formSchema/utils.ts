import { z } from "zod";

type Primitive = string | number | boolean | null | undefined;
const union = <
  v1 extends Primitive,
  v2 extends Primitive,
  v3 extends readonly Primitive[]
>(
  ...args: [v1, v2, ...v3]
) => {
  // Map each string to a ZodLiteral and assert the type
  const t = args.map((e) => z.literal(e, {  errorMap: (s) => ({ message: 'Required' })})) as [
    z.ZodLiteral<v1>,
    z.ZodLiteral<v2>,
    ...Array<z.ZodLiteral<v3[number]>>
  ];

  // Return a union of the mapped literals
  return z.union(t);
};

const carType = z
  .union([
    z.literal("Electrique").optional(),
    z.literal("Diesel").optional(),
    z.literal("Gasoline").optional(),
    z.literal("Plug-in Hybrid").optional(),
    z.literal("mild Hybrid").optional(),
    z.literal("natural Gaz").optional(),
    z.literal("other"),
    z.literal(false)
  ])
  .superRefine((v, ctx) => {
    if (!v) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
      });
    }
  });

export { union, carType };
