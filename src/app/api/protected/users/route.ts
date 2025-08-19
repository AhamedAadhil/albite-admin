import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import { verifyToken } from "@/helper/isVerified";
import dayjs from "dayjs";
import { User, Order } from "@/models";

// Get all users
// GET /api/protected/users
export const GET = async (req: NextRequest) => {
  try {
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        { message: "Access denied: not an admin", success: false },
        { status: 403 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);

    const filters: any = {};

    // 1. Text search (name, email, mobile)
    const q = searchParams.get("q");
    if (q) {
      filters.$or = [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { mobile: { $regex: q, $options: "i" } },
      ];
    }

    // 2. isVerified filter
    const isVerified = searchParams.get("isVerified");
    if (isVerified === "true" || isVerified === "false") {
      filters.isVerified = isVerified === "true";
    }

    // 2. isActive filter
    const isActive = searchParams.get("isActive");
    if (isActive === "true" || isActive === "false") {
      filters.isActive = isActive === "true";
    }

    // 3. Region filter
    const region = searchParams.get("region");
    if (region) {
      filters.region = { $regex: region, $options: "i" };
    }

    // 4. hasCart filter
    const hasCart = searchParams.get("hasCart");
    if (hasCart === "true") {
      filters.cart = { $exists: true };
    } else if (hasCart === "false") {
      filters.cart = { $exists: false };
    }

    // 5. Role filter
    const role = searchParams.get("role");
    if (role) {
      filters.role = Number(role);
    }

    // 6. CreatedAt date range
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    if (from || to) {
      filters.createdAt = {};
      if (from) filters.createdAt.$gte = new Date(from);
      if (to) filters.createdAt.$lte = dayjs(to).endOf("day").toDate();
    }

    // 7. Dormant users
    const dormantDays = searchParams.get("dormantDays");
    if (dormantDays) {
      // Get the cutoff date
      const dormantSince = dayjs()
        .subtract(Number(dormantDays), "day")
        .toDate();

      // Find user IDs with orders after 'dormantSince'
      const activeUserIds = await Order.distinct("userId", {
        placedTime: { $gte: dormantSince },
      });

      // Only users NOT in activeUserIds (i.e., have NOT ordered recently)
      filters._id = { $nin: activeUserIds };
    }

    const users = await User.find(filters).sort({ createdAt: -1 });

    return NextResponse.json({ users, success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch users",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
};
