import connectDB from "@/config/db";
import { verifyToken } from "@/helper/isVerified";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
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
    const { points } = await req.json();
    const { userId } = params;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { points },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json({ updatedUser, success: true }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      {
        error: error.message,
        success: false,
        message: "Failed to update points",
      },
      { status: 500 }
    );
  }
};
