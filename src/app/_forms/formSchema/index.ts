import { z } from "zod";
import { transport } from "./transport";
import { energie } from "./energy";
import { waste } from "./waste";
import { food } from "./food";
import { holiday } from "./holiday";

export const formSchema = z.object({
  uid: z.string(),
  transport: transport.optional(),
  energie: energie.optional(),
  food: food.optional(),
  waste: waste,
  //holiday,
});
