import connectDB from "@/config/db";
import { verifyToken } from "@/helper/isVerified";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const { userId } = params;

  try {
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Unauthorized: not an admin",
          success: false,
        },
        { status: 401 }
      );
    }

    await connectDB();

    const singleUser = await User.findById(userId).select("-password -__v");
    //   .populate([
    //     { path: "cart" },
    //     { path: "favorites" },
    //     { path: "orders" },
    //     { path: "reviews" },
    //   ]);

    return NextResponse.json(
      { data: singleUser, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch user data",
        message: error.message || "An error occurred while fetching user data",
        success: false,
      },
      { status: 500 }
    );
  }
};
