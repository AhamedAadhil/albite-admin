import { NextRequest, NextResponse } from "next/server";

// GET api/protected/auth/logout
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const response = NextResponse.json(
      { message: "Logout successful", success: true },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error: any) {
    console.error("Logout error", error);
    return NextResponse.json(
      { message: "Something went wrong", success: false, error: error.message },
      { status: 500 }
    );
  }
};
