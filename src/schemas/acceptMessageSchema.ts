import { z } from "zod";

export const acceptMessageSchema = z.object({
  message: z.string().min(1, { message: "Message is required" }),
  isAcceptingMessages: z.boolean().default(true),
});
