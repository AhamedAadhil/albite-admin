import { deleteFromCloudinary, uploadToCloudinary } from "@/config/cloudinary";
import connectDB from "@/config/db";
import { verifyToken } from "@/helper/isVerified";
import AddOn from "@/models/addon";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Get add-on by ID
// GET /api/protected/addons/:addOnId
export const GET = async (
  req: NextRequest,
  { params }: { params: { addOnId: string } }
) => {
  try {
    const user = verifyToken();

    if (!user || user.role !== 7) {
      return NextResponse.json(
        { message: "Access denied: not an admin", success: false },
        { status: 403 }
      );
    }

    await connectDB();

    const addOnId = params.addOnId;
    const addOn = await AddOn.findById(addOnId);
    if (!addOn) {
      return NextResponse.json(
        { message: "Dish not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ addOn, success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Failed to fetch add-on", error);
    return NextResponse.json(
      { message: "Server Error", error: error.message, success: false },
      { status: 500 }
    );
  }
};

// update addon
// PATCH /api/protected/addons/:id
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { addOnId: string } }
) => {
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
    const addOnId = params.addOnId;
    if (!isValidObjectId(addOnId)) {
      return NextResponse.json(
        { message: "Invalid dish ID", success: false },
        { status: 400 }
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

    const existingAddon = await AddOn.findById(addOnId);
    if (!existingAddon) {
      return NextResponse.json(
        { message: "Dish not found", success: false },
        { status: 404 }
      );
    }

    // ✅ If new base64 image is sent, delete old and upload new
    let newImageUrl = existingAddon.image;

    if (image && image.startsWith("data:image")) {
      // Delete previous from Cloudinary
      await deleteFromCloudinary(existingAddon.image);

      // Upload new image
      const uploadRes = await uploadToCloudinary(image, "albite/addons");
      if (!uploadRes?.secure_url) {
        return NextResponse.json(
          { message: "Image upload failed", success: false },
          { status: 500 }
        );
      }

      newImageUrl = uploadRes.secure_url;
    }

    const addOn = await AddOn.findByIdAndUpdate(
      addOnId,
      {
        name,
        price,
        image: newImageUrl,
        mainCategory,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Add-on updated successfully", addOn, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Failed to update add-on", error);
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
