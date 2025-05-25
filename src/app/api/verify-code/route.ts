import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signupSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { username, code } = body;
    const decodedUsername = decodeURIComponent(username);
    const user = await userModel.findOne({ username: decodedUsername });
    // If user not found, return 404 error
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    // If user is already verified, return 400 error
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = user.verifyCodeExpiry > new Date();
    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return NextResponse.json(
        { success: true, message: "Email verified successfully" },
        { status: 200 }
      );
    } else if (!isCodeValid) {
      return NextResponse.json(
        { success: false, message: "Invalid verification code" },
        { status: 400 }
      );
    } else if (!isCodeNotExpired) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Verification code has expired, please signup again to get a new code",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Verify code error:", error);
    return NextResponse.json(
      { success: false, message: "Verify code error" },
      { status: 500 }
    );
  }
}
