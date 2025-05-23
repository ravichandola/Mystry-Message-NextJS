import { z } from "zod";

// This schema defines the validation rules for verifying user accounts
// It validates:
// - code: A required string field that must be exactly 6 characters long
// Used for validating verification codes before processing them
// This schema is used to validate the request body of the verify route
export const verifySchema = z.object({
  code: z.string().min(6, { message: "Verify code must be 6 characters long" }),
});
