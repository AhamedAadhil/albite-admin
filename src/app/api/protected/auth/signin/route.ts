import connectDB from "@/config/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST /api/protected/auth/signin
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { email, password } = await req.json();
    // validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }
    // connect to the database
    await connectDB();

    // validate user credentials
    const admin = await User.findOne({
      email,
      role: 7,
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // check if the user is verified
    if (!admin.isVerified) {
      return NextResponse.json(
        { success: false, message: "Please verify your mobile number first" },
        { status: 403 }
      );
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        userId: admin._id,
        email: admin.email,
        mobile: admin.mobile,
        name: admin.name,
        role: admin.role || 0,
        isVerified: admin.isVerified,
      },
      process.env.JWT_SECRET! as string,
      { expiresIn: "7d" }
    );

    // 6. Return success + token
    const res = NextResponse.json(
      {
        success: true,
        message: `Welcome, ${admin.name}!`,
        user: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          mobile: admin.mobile,
          role: admin.role || 0,
          isVerified: admin.isVerified,
          token: token,
        },
      },
      { status: 200 }
    );
    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });
    return res;
  } catch (error: any) {
    console.error("Error in POST /api/auth/signin:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};
