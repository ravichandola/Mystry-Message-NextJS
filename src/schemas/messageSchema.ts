import { z } from "zod";

// This schema defines the validation rules for sending messages
// It validates:
// - message: A required string field that must be:
//   - At least 10 characters long
//   - No more than 300 characters long
// Used for validating message content before saving to database
// This schema is used to validate the request body when sending new messages
export const messageSchema = z.object({
  message: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" })
    .max(300, { message: "Content must be less than 300 characters long" }),
});
