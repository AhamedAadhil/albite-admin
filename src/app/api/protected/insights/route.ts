import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
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

    const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: "https://www.googleapis.com/auth/analytics.readonly",
    });

    const analyticsDataClient = google.analyticsdata({
      version: "v1beta",
      auth,
    });

    const propertyId = process.env.PROPERTY_ID;

    // 1. Daily trends
    const dailyReport = await analyticsDataClient.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "engagedSessions" },
        ],
        dimensions: [{ name: "date" }],
      },
    });

    // 2. Country distribution
    const countryReport = await analyticsDataClient.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
        dimensions: [{ name: "country" }],
      },
    });

    // 3. Device breakdown
    const deviceReport = await analyticsDataClient.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
        dimensions: [{ name: "deviceCategory" }],
      },
    });

    // 4. Top pages
    const pageReport = await analyticsDataClient.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [{ name: "screenPageViews" }],
        dimensions: [{ name: "pagePath" }],
        limit: "10",
        orderBys: [
          {
            desc: true,
            metric: { metricName: "screenPageViews" },
          },
        ],
      },
    });

    // Combine into a single response for your UI
    const googleReports = {
      daily: dailyReport.data,
      byCountry: countryReport.data,
      byDevice: deviceReport.data,
      topPages: pageReport.data,
    };

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

    // 1. Total Revenue Over Time (daily for last 30 days)
    const revenueOverTimeAgg = await Order.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          dailyRevenue: { $sum: "$total" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);
    const revenueOverTime = revenueOverTimeAgg.map((item) => ({
      date: `${item._id.year}-${String(item._id.month).padStart(
        2,
        "0"
      )}-${String(item._id.day).padStart(2, "0")}`,
      revenue: item.dailyRevenue,
    }));

    // 2. Number of Orders Over Time (daily for last 30 days)
    const ordersOverTimeAgg = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          dailyOrders: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);
    const ordersOverTime = ordersOverTimeAgg.map((item) => ({
      date: `${item._id.year}-${String(item._id.month).padStart(
        2,
        "0"
      )}-${String(item._id.day).padStart(2, "0")}`,
      orders: item.dailyOrders,
    }));

    // 3. Order Status Distribution
    const orderStatusAgg = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const orderStatusDistribution = orderStatusAgg.map((item) => ({
      status: item._id,
      count: item.count,
    }));

    // 4. Dishes Sold Breakdown (top 10 dishes by quantity)
    const dishesSoldAgg = await Order.aggregate([
      {
        $match: { status: "delivered" }, // Only delivered orders considered
      },
      { $unwind: "$dishes" },
      {
        $group: {
          _id: "$dishes.dish",
          quantitySold: { $sum: "$dishes.quantity" },
        },
      },
      {
        $lookup: {
          from: "dishes",
          localField: "_id",
          foreignField: "_id",
          as: "dishInfo",
        },
      },
      { $unwind: "$dishInfo" },
      { $sort: { quantitySold: -1 } },
      { $limit: 10 },
    ]);

    const dishesSoldBreakdown = dishesSoldAgg.map((item) => ({
      dishName: item.dishInfo.name || "Unknown",
      quantitySold: item.quantitySold,
    }));

    // 5. Delivery Method Distribution
    const deliveryMethodAgg = await Order.aggregate([
      {
        $group: {
          _id: "$deliveryMethod",
          count: { $sum: 1 },
        },
      },
    ]);
    const deliveryMethodDistribution = deliveryMethodAgg.map((item) => ({
      deliveryMethod: item._id,
      count: item.count,
    }));

    // 6. Discount vs Revenue Comparison (daily for last 30 days)
    const discountRevenueAgg = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          dailyDiscount: { $sum: "$discount" },
          dailyRevenue: { $sum: "$total" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);
    const discountVsRevenue = discountRevenueAgg.map((item) => ({
      date: `${item._id.year}-${String(item._id.month).padStart(
        2,
        "0"
      )}-${String(item._id.day).padStart(2, "0")}`,
      discount: item.dailyDiscount,
      revenue: item.dailyRevenue,
    }));

    // 7. Points Earned and Used by Customers (last 30 days)
    const pointsAgg = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          earnedPoints: { $sum: "$earnedPoints" },
          usedPoints: { $sum: "$usedPoints" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);
    const pointsOverTime = pointsAgg.map((item) => ({
      date: `${item._id.year}-${String(item._id.month).padStart(
        2,
        "0"
      )}-${String(item._id.day).padStart(2, "0")}`,
      earnedPoints: item.earnedPoints,
      usedPoints: item.usedPoints,
    }));

    // 8. Order Processing Time (average intervals between statuses)
    // Calculate average time from placed to accepted, accepted to prepared, prepared to delivered
    const statusTimesAgg = await Order.aggregate([
      {
        $match: {
          isPlaced: true,
          isAccepted: true,
          isPrepared: true,
          isDelivered: true,
        },
      },
      {
        $project: {
          placedToAccepted: { $subtract: ["$acceptedTime", "$placedTime"] },
          acceptedToPrepared: { $subtract: ["$preparedTime", "$acceptedTime"] },
          preparedToDelivered: {
            $subtract: ["$deliveredTime", "$preparedTime"],
          },
        },
      },
      {
        $group: {
          _id: null,
          avgPlacedToAccepted: { $avg: "$placedToAccepted" },
          avgAcceptedToPrepared: { $avg: "$acceptedToPrepared" },
          avgPreparedToDelivered: { $avg: "$preparedToDelivered" },
        },
      },
    ]);
    const processingTimes =
      statusTimesAgg.length > 0
        ? {
            avgPlacedToAcceptedMinutes:
              statusTimesAgg[0].avgPlacedToAccepted / (1000 * 60),
            avgAcceptedToPreparedMinutes:
              statusTimesAgg[0].avgAcceptedToPrepared / (1000 * 60),
            avgPreparedToDeliveredMinutes:
              statusTimesAgg[0].avgPreparedToDelivered / (1000 * 60),
          }
        : null;

    //USERS INSIGHTS
    const activeUsersCount = await User.countDocuments({
      isActive: true,
      role: 0,
    });
    const inactiveUsersCount = await User.countDocuments({
      isActive: false,
      role: 0,
    });
    const verifiedUsersCount = await User.countDocuments({
      isVerified: true,
      role: 0,
    });
    const unverifiedUsersCount = await User.countDocuments({
      isVerified: false,
      role: 0,
    });

    // users role distribution
    const adminCount = await User.countDocuments({ role: 7 });
    const normalUserCount = await User.countDocuments({ role: 0 });

    // total spending
    const spendingBracketsAgg = await User.aggregate([
      { $match: { role: 0 } },
      {
        $bucket: {
          groupBy: "$totalSpent",
          boundaries: [0, 100, 500, 1000, 5000, 10000, Infinity],
          default: "Other",
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    // signup trends over time
    const userSignupTrendAgg = await User.aggregate([
      {
        $match: {
          role: 0,
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);
    const userSignupTrend = userSignupTrendAgg.map((item) => ({
      date: `${item._id.year}-${String(item._id.month).padStart(
        2,
        "0"
      )}-${String(item._id.day).padStart(2, "0")}`,
      count: item.count,
    }));

    // order counts per user
    const ordersPerUserAgg = await User.aggregate([
      { $match: { role: 0 } },
      {
        $lookup: {
          from: "orders",
          localField: "orders",
          foreignField: "_id",
          as: "userOrders",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          ordersCount: { $size: "$userOrders" },
        },
      },
      { $sort: { ordersCount: -1 } },
      { $limit: 10 }, // Top 10 users by orders count
    ]);

    // region distribution
    const regionDistribution = await User.aggregate([
      { $match: { role: 0 } },
      {
        $group: {
          _id: "$region",
          count: { $sum: 1 },
        },
      },
    ]);

    // active otp count
    const activeOtpCount = await User.countDocuments({
      otpExpires: { $gte: new Date() },
      otp: { $ne: "" },
    });

    return NextResponse.json({
      stats: {
        users: {
          total: usersTotalUntilNow,
          growthToday: usersGrowthToday,
          growthPercent: usersGrowthPercent,
          activeUsers: activeUsersCount,
          inactiveUsers: inactiveUsersCount,
          verifiedUsers: verifiedUsersCount,
          unverifiedUsers: unverifiedUsersCount,
          admins: adminCount,
          normalUsers: normalUserCount,
          spendingBrackets: spendingBracketsAgg,
          signupTrend: userSignupTrend,
          topUsersByOrders: ordersPerUserAgg,
          regionDistribution,
          activeOtpCount,
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
        reports: {
          revenueOverTime,
          ordersOverTime,
          orderStatusDistribution,
          dishesSoldBreakdown,
          deliveryMethodDistribution,
          discountVsRevenue,
          pointsOverTime,
          processingTimes,
        },
        googleAnalytics: googleReports,
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
