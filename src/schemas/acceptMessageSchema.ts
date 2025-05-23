import { z } from "zod";

// This schema defines the validation rules for accepting messages
// It validates:
// - message: A required non-empty string containing the message content
// - isAcceptingMessages: A boolean flag indicating if user accepts messages (defaults to true)
// Used for validating message acceptance requests before processing them
// This schema is used to validate the request body of the acceptMessage route
export const acceptMessageSchema = z.object({
  message: z.string().min(1, { message: "Message is required" }),
  isAcceptingMessages: z.boolean().default(true),
});
