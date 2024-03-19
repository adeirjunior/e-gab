import { z } from "zod";

export const FirstStepValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  tel: z.string(),
});

export type FirstStepValidation = z.infer<typeof FirstStepValidationSchema>;