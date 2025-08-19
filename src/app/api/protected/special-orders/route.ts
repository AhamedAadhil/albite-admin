import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import { SpecialOrder } from "@/models/specialOrder";
import { verifyToken } from "@/helper/isVerified";

// Get all special orders (GET)
export async function GET(req: NextRequest) {
  try {
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        { error: "Unauthorized: not an admin", success: false },
        { status: 401 }
      );
    }

    await connectDB();
    const orders = await SpecialOrder.find().sort({ isRead: 1, createdAt: -1 });
    return NextResponse.json({ data: orders, success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching special orders:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
