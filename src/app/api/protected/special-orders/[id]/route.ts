import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import { SpecialOrder } from "@/models/specialOrder";
import { verifyToken } from "@/helper/isVerified";

// Get one special order by ID (GET)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        { error: "Unauthorized: not an admin", success: false },
        { status: 401 }
      );
    }

    await connectDB();
    const order = await SpecialOrder.findById(params.id);
    if (!order) {
      return NextResponse.json(
        { error: "Special order not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: order, success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching special order:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// Mark as read (PATCH)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        { error: "Unauthorized: not an admin", success: false },
        { status: 401 }
      );
    }
    await connectDB();
    const updated = await SpecialOrder.findByIdAndUpdate(
      params.id,
      { isRead: true },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Special order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: updated, success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error marking special order as read:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
