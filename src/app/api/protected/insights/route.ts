import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import { verifyToken } from "@/helper/isVerified";
import { User, Order, Dish } from "@/models";

function calculatePercentageChange(
  currentTotal: number,
  previousTotal: number
) {
  if (previousTotal === 0) {
    return currentTotal === 0 ? 0 : 100;
  }
  return ((currentTotal - previousTotal) / previousTotal) * 100;
}

export async function GET(req: NextRequest) {
  try {
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

    await connectDB();

    // End of yesterday (23:59:59.999)
    const endOfYesterday = new Date();
    endOfYesterday.setHours(0, 0, 0, 0);
    endOfYesterday.setMilliseconds(-1);

    // End of today (current moment)
    const now = new Date();

    // Users cumulative totals
    const usersTotalUntilYesterday = await User.countDocuments({
      createdAt: { $lte: endOfYesterday },
      role: 0,
    });
    const usersTotalUntilNow = await User.countDocuments({
      createdAt: { $lte: now },
      role: 0,
    });
    const usersGrowthToday = usersTotalUntilNow - usersTotalUntilYesterday;
    const usersGrowthPercent = calculatePercentageChange(
      usersTotalUntilNow,
      usersTotalUntilYesterday
    );

    // Orders cumulative totals
    const ordersTotalUntilYesterday = await Order.countDocuments({
      createdAt: { $lte: endOfYesterday },
    });
    const ordersTotalUntilNow = await Order.countDocuments({
      createdAt: { $lte: now },
    });
    const ordersGrowthToday = ordersTotalUntilNow - ordersTotalUntilYesterday;
    const ordersGrowthPercent = calculatePercentageChange(
      ordersTotalUntilNow,
      ordersTotalUntilYesterday
    );

    // Dish count (total up to now, no daily growth)
    const dishCount = await Dish.countDocuments({});

    // Revenue cumulative totals for delivered orders
    const revenueUntilYesterdayAgg = await Order.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: { $lte: endOfYesterday },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
        },
      },
    ]);
    const revenueUntilYesterday =
      revenueUntilYesterdayAgg.length > 0
        ? revenueUntilYesterdayAgg[0].totalRevenue
        : 0;

    const revenueUntilNowAgg = await Order.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: { $lte: now },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
        },
      },
    ]);
    const revenueUntilNow =
      revenueUntilNowAgg.length > 0 ? revenueUntilNowAgg[0].totalRevenue : 0;

    const revenueGrowthToday = revenueUntilNow - revenueUntilYesterday;
    const revenueGrowthPercent = calculatePercentageChange(
      revenueUntilNow,
      revenueUntilYesterday
    );

    // Aggregation to get total dishes served until yesterday
    const dishesServedUntilYesterdayAgg = await Order.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: { $lte: endOfYesterday },
        },
      },
      { $unwind: "$dishes" },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$dishes.quantity" }, // Sum dish quantities
        },
      },
    ]);
    const dishesServedUntilYesterday =
      dishesServedUntilYesterdayAgg.length > 0
        ? dishesServedUntilYesterdayAgg[0].totalQuantity
        : 0;

    // Aggregation to get total dishes served until now (today)
    const dishesServedUntilNowAgg = await Order.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: { $lte: now },
        },
      },
      { $unwind: "$dishes" },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$dishes.quantity" },
        },
      },
    ]);
    const dishesServedUntilNow =
      dishesServedUntilNowAgg.length > 0
        ? dishesServedUntilNowAgg[0].totalQuantity
        : 0;

    const dishesServedGrowthToday =
      dishesServedUntilNow - dishesServedUntilYesterday;
    const dishesServedGrowthPercent = calculatePercentageChange(
      dishesServedUntilNow,
      dishesServedUntilYesterday
    );

    return NextResponse.json({
      stats: {
        users: {
          total: usersTotalUntilNow,
          growthToday: usersGrowthToday,
          growthPercent: usersGrowthPercent,
        },
        orders: {
          total: ordersTotalUntilNow,
          growthToday: ordersGrowthToday,
          growthPercent: ordersGrowthPercent,
        },
        dishesServed: {
          total: dishesServedUntilNow,
          growthToday: dishesServedGrowthToday,
          growthPercent: dishesServedGrowthPercent,
        },
        revenue: {
          total: revenueUntilNow,
          growthToday: revenueGrowthToday,
          growthPercent: revenueGrowthPercent,
        },
      },
      success: true,
    });
  } catch (error: any) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch dashboard stats",
        message: error.message || "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
