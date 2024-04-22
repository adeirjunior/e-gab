import { z } from "zod";

export const messageValidator = z.object({
  id: z.string(),
  userId: z.string(),
  text: z.string(),
  file: z.string().optional(),
  createdAt: z.date(),
});

export const messageArrayValidator = z.array(messageValidator);

export type Message = z.infer<typeof messageValidator>;
