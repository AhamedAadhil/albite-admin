import { verifyToken } from "@/helper/isVerified";
import { NextResponse } from "next/server";

// GET /api/protected/textlk
export const GET = async () => {
  try {
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        { error: "Unauthorized: not an admin", success: false },
        { status: 401 }
      );
    }

    const res = await fetch(
      "https://app.text.lk/api/http/balance?api_token=" +
        process.env.TEXT_LK_API_TOKEN
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const jsonData = await res.json();

    return NextResponse.json(
      {
        data: jsonData,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      {
        error: error.message,
        message: "Something went wrong",
        success: false,
      },
      { status: 50 }
    );
  }
};
