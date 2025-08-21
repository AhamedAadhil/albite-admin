import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import { User, Cart, Dish, AddOn, Order } from "@/models";
import { verifyToken } from "@/helper/isVerified";
import mongoose from "mongoose";
import { createNotification } from "@/helper/createNotification";
import { getOrderStatusMessage } from "@/helper/getOrderStatusMessage";

// GET /api/protected/orders
export const GET = async (req: NextRequest) => {
  try {
    // Verify admin token
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        { message: "Access denied: not an admin", success: false },
        { status: 403 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);

    // Parse filters from query string
    const filters: any = {};

    // Status filter (can be multiple comma separated)
    const statusFilter = searchParams.get("status"); // e.g. "placed,delivered"
    if (statusFilter) {
      filters.status = { $in: statusFilter.split(",") };
    }

    // Delivery method filter
    const deliveryMethod = searchParams.get("deliveryMethod");
    if (deliveryMethod) {
      filters.deliveryMethod = deliveryMethod;
    }

    // User ID filter
    const userIdFilter = searchParams.get("userId");
    if (userIdFilter && mongoose.Types.ObjectId.isValid(userIdFilter)) {
      filters.userId = userIdFilter;
    }

    // Search by orderId or deliveryRegion (text search)
    const search = searchParams.get("search");
    if (search) {
      filters.$or = [
        { orderId: { $regex: search, $options: "i" } },
        { deliveryRegion: { $regex: search, $options: "i" } },
      ];
    }

    // Date range filter (placedTime between)
    const startDateStr = searchParams.get("startDate"); // e.g. 2023-01-01
    const endDateStr = searchParams.get("endDate"); // e.g. 2023-01-31
    if (startDateStr || endDateStr) {
      filters.placedTime = {};
      if (startDateStr) filters.placedTime.$gte = new Date(startDateStr);
      if (endDateStr) {
        // Include entire day by setting time to end of the day
        const endDate = new Date(endDateStr);
        endDate.setHours(23, 59, 59, 999);
        filters.placedTime.$lte = endDate;
      }
    }

    // Pagination params
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);
    const skip = (page - 1) * limit;

    // Sorting params
    const sortField = searchParams.get("sortField") || "placedTime";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;
    const sort = { [sortField]: sortOrder } as { [key: string]: 1 | -1 };

    // Query total count for pagination
    const totalOrders = await Order.countDocuments(filters);

    // Fetch orders matching filters, with sorting and pagination
    const orders = await Order.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("userId", "name email mobile") // Populate user info
      .populate("dishes.dish", "name price") // Populate dish info
      .populate("addons.addon", "name price") // Populate addon info
      .lean();

    return NextResponse.json({
      success: true,
      total: totalOrders,
      page,
      limit,
      totalPages: Math.ceil(totalOrders / limit),
      orders,
    });
  } catch (error: any) {
    console.error("Failed to fetch orders for admin", error);
    return NextResponse.json(
      { message: "Server Error", error: error.message, success: false },
      { status: 500 }
    );
  }
};

// PATCH /api/protected/orders/:id
export const PATCH = async (req: NextRequest, res: NextResponse) => {
  try {
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        { message: "Access denied: not an admin", success: false },
        { status: 403 }
      );
    }

    const { orderId, newStatus, rejectionReason } = await req.json();
    await connectDB();

    // Find the order to get necessary info (like userId, total, points used/earned)
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { message: "Order not found", success: false },
        { status: 404 }
      );
    }

    const updateData: any = { status: newStatus };

    // Update flags and timestamps according to newStatus
    if (newStatus === "accepted") {
      updateData.isAccepted = true;
      updateData.acceptedTime = new Date();
      updateData.status = "accepted";
    } else if (newStatus === "prepared") {
      updateData.isPrepared = true;
      updateData.preparedTime = new Date();
      updateData.status = "prepared";
    } else if (newStatus === "delivered") {
      updateData.isDelivered = true;
      updateData.deliveredTime = new Date();
      updateData.status = "delivered";

      // Update user's totalSpent and points
      await User.findByIdAndUpdate(order.userId, {
        $inc: {
          totalSpent: order.total,
          points: Number(order.earnedPoints) - Number(order.usedPoints),
        },
      });
    } else if (newStatus === "rejected") {
      updateData.isRejected = true;
      updateData.rejectionReason = rejectionReason || "";
      updateData.rejectedTime = new Date();
      updateData.status = "rejected";
    }

    // Update order document
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });

    const userId =
      typeof order.userId === "string"
        ? order.userId
        : order.userId instanceof mongoose.Types.ObjectId
        ? order.userId
        : order.userId || order.userId;

    await createNotification({
      message: getOrderStatusMessage(
        order.orderId,
        order.deliveryMethod,
        newStatus,
        rejectionReason
      ),
      type: "Order Status Update",
      recipientType: "User",
      recipientId: userId,
    });

    return NextResponse.json({
      message: "Order status updated successfully",
      success: true,
      order: updatedOrder,
    });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      {
        error: error.message,
        message: "Something went wrong",
        success: false,
      },
      { status: 500 }
    );
  }
};
