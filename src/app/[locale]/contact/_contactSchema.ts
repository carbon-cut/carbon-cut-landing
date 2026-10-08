import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(150),
  email: z.string().trim().email().max(254),
  topic: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
