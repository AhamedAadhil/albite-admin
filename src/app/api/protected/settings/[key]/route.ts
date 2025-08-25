import { NextResponse } from "next/server";
import { getValueByKey } from "@/helper/getValueByKey";
import { verifyToken } from "@/helper/isVerified";
import connectDB from "@/config/db";
export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  const key = params.key;
  try {
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        { error: "Unauthorized: not an admin", success: false },
        { status: 401 }
      );
    }
    await connectDB();
    const setting = await getValueByKey(key);
    if (!setting) {
      return NextResponse.json(
        { message: "Setting not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(setting, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
