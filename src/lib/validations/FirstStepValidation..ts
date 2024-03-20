import { z } from "zod";

export const FirstStepValidationSchema = z.string();

export type FirstStepValidation = z.infer<typeof FirstStepValidationSchema>;