import { z } from "zod";

// This schema defines the validation rules for signing in
// It validates:
// - username: A required string field that must be at least 3 characters long
// - password: A required string field that must be at least 8 characters long
// Used for validating user login credentials before processing them
// This schema is used to validate the request body of the signIn route
export const signInSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
