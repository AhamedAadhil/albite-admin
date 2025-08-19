import connectDB from "@/config/db";
import { verifyToken } from "@/helper/isVerified";
import { User, Cart, Dish, AddOn, Order, Review } from "@/models";
import mongoose from "mongoose";

import { NextRequest, NextResponse } from "next/server";

// get single user
// GET /api/protected/users/:userId
export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const { userId } = params;

  try {
    // ✅ Auth check
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Only admin can view this",
          success: false,
        },
        { status: 401 }
      );
    }

    // ✅ Ensure DB is connected first
    await connectDB();

    // ✅ Fetch user with nested populate
    const singleUser = await User.findById(userId)
      .select("-password -__v")
      .populate({
        path: "cart",
        populate: [
          { path: "dishes.dish", model: "Dish" },
          { path: "addons.addon", model: "AddOn" },
        ],
      })
      .populate({
        path: "orders",
        populate: [
          { path: "dishes.dish", model: "Dish" },
          { path: "addons.addon", model: "AddOn" },
        ],
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "favourites",
        model: "Dish",
        // ✅ Optionally populate nested fields in favourite dishes if needed
        select: "name image price isPopular isRecommended mainCategory",
      })
      .populate({
        path: "reviews",
        model: "Review",
        options: { sort: { createdAt: -1 } }, // optional sort to get recent reviews first
      })
      .sort({ createdAt: -1 });
    if (!singleUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    const categoryDistribution = await Order.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$dishes" },
      {
        $lookup: {
          from: "dishes",
          localField: "dishes.dish",
          foreignField: "_id",
          as: "dishDetails",
        },
      },
      { $unwind: "$dishDetails" },
      {
        $group: {
          _id: "$dishDetails.mainCategory",
          totalQuantity: { $sum: "$dishes.quantity" },
        },
      },
    ]);

    const orderStatusDistribution = await Order.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const ordersByMonth = await Order.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            year: { $year: "$placedTime" },
            month: { $month: "$placedTime" },
          },
          count: { $sum: 1 },
          totalSpent: { $sum: "$total" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    return NextResponse.json(
      {
        data: singleUser,
        ordersByMonth,
        categoryDistribution,
        orderStatusDistribution,
        success: true,
      },
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

// PATCH /api/protected/users/:userId
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  try {
    const { userId } = params;
    const { points } = await req.json();

    // ✅ Auth check
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Only admin can view this",
          success: false,
        },
        { status: 401 }
      );
    }

    // ✅ Ensure DB is connected first
    await connectDB();

    // Update points of user by admin
    const dbUser = await User.findByIdAndUpdate(
      userId,
      { points },
      { new: true }
    );

    return NextResponse.json({ data: dbUser, success: true }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
