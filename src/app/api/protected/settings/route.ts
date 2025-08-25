import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import { Settings } from "@/models/setting";
import { verifyToken } from "@/helper/isVerified";

export async function POST(request: Request) {
  try {
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        { error: "Unauthorized: not an admin", success: false },
        { status: 401 }
      );
    }
    await connectDB();

    const body = await request.json();
    // Accept either { key, value } or an array [{ key, value }]
    const updates = Array.isArray(body) ? body : [body];

    const results = [];
    for (const { key, value } of updates) {
      if (!key || !value) continue;
      const setting = await Settings.findOneAndUpdate(
        { key },
        { value },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).exec();
      results.push(setting);
    }

    return NextResponse.json({
      message: "Settings saved",
      settings: results,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
