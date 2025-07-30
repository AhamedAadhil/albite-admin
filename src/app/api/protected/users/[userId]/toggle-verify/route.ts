import connectDB from "@/config/db";
import { verifyToken } from "@/helper/isVerified";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        { message: "Unauthorized: not an admin", success: false },
        { status: 401 }
      );
    }
    await connectDB();
    const { userId } = params;
    const { isVerified } = await req.json();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isVerified },
      { new: true }
    );
    return NextResponse.json({ updatedUser, success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error toggling user verification:", error);
    return NextResponse.json(
      {
        error: "Failed to toggle user verification",
        message:
          error.message || "An error occurred while toggling user verification",
        success: false,
      },
      { status: 500 }
    );
  }
};
