import { z } from "zod";

// This schema defines the validation rules for signing up
// It validates:
// - username: A required string field that must be:
//   - At least 3 characters long
//   - No more than 20 characters long
//   - Only contain letters and numbers
export const usernameValidation = z
  .string()
  .min(3, "username must be at least 3 characters long")
  .max(20, "username must be less than 20 characters long")
  .regex(/^[a-zA-Z0-9]+$/, "username must not contain special characters");

export const signupSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
