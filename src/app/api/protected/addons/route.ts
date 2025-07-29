import cloudinary, { uploadToCloudinary } from "@/config/cloudinary";
import connectDB from "@/config/db";
import { verifyToken } from "@/helper/isVerified";
import AddOn from "@/models/addon";
import { NextRequest, NextResponse } from "next/server";

// create addons
// POST /api/protected/addons
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        {
          message: "Access denied: not an admin",
          success: false,
        },
        { status: 403 }
      );
    }
    const { name, price, image, mainCategory } = await req.json();

    if (!name || !price || !image || !mainCategory) {
      return NextResponse.json(
        {
          message: "All fields are required",
          success: false,
        },
        { status: 400 }
      );
    }

    await connectDB();

    // upload the image to cloudinary
    const imageUrl = await uploadToCloudinary(image, "albite/addons");
    if (!imageUrl?.secure_url) {
      return NextResponse.json(
        { message: "Image upload failed", success: false },
        { status: 500 }
      );
    }

    const addOn = await AddOn.create({
      name,
      price,
      image: imageUrl.secure_url,
      mainCategory,
    });

    return NextResponse.json(
      { message: "Add-on created successfully", addOn, success: true },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Failed to create add-on", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
};

// get all addons
// GET /api/protected/addons
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
    const addons = await AddOn.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ addons, success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Failed to fetch addons", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
};
