import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signupSchema";
import { NextResponse } from "next/server";
//import user from "@/model/user";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  //localhost:3000/api/cuu?username=test
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    // validate query params with zod
    const resultQuery = UsernameQuerySchema.safeParse(queryParam);
    if (!resultQuery.success) {
      const usernameErrors = resultQuery.error.format().username?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
          errors: usernameErrors,
        },
        { status: 400 }
      );
    }

    // check if username is unique in database
    const { username } = resultQuery.data;
    const user = await userModel.findOne({
      username,
      isVerified: true,
    });
    if (user) {
      return NextResponse.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Username is available" },
      { status: 200 }
    );
    //
  } catch (error) {
    console.error(" Username check error: " + error);
    return NextResponse.json(
      {
        success: false,
        message: "Username check error",
      },
      { status: 500 }
    );
  }
}
