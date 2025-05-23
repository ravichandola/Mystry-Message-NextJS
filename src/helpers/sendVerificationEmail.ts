import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

// This function sends a verification email to the user
// It uses the resend library to send the email
// It returns a promise that resolves to an ApiResponse object
// The ApiResponse object contains the success status, message, and isAcceptingMessages flag
// The function is used to send a verification email to the user when they sign up
// The function is used to send a verification email to the user when they request a new verification code
export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: "Verification email sent successfully",
      isAcceptingMessages: true,
    };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
      isAcceptingMessages: false,
    };
  }
}
