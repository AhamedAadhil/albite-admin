import { deleteFromCloudinary, uploadToCloudinary } from "@/config/cloudinary";
import connectDB from "@/config/db";
import { verifyToken } from "@/helper/isVerified";
import Dish from "@/models/dish";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Get dish by ID
// GET /api/protected/dishes/[dishId]
export const GET = async (
  req: NextRequest,
  { params }: { params: { dishId: string } }
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

    const dishId = params.dishId;
    const dish = await Dish.findById(dishId);
    if (!dish) {
      return NextResponse.json(
        { message: "Dish not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json({ dish, success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Failed to fetch dishes", error);
    return NextResponse.json(
      { message: "Server Error", error: error.message, success: false },
      { status: 500 }
    );
  }
};

// Update dish by ID
// PATCH /api/protected/dishes/[dishId]
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { dishId: string } }
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

    const dishId = params.dishId;
    if (!isValidObjectId(dishId)) {
      return NextResponse.json(
        { message: "Invalid dish ID", success: false },
        { status: 400 }
      );
    }

    const existingDish = await Dish.findById(dishId);
    if (!existingDish) {
      return NextResponse.json(
        { message: "Dish not found", success: false },
        { status: 404 }
      );
    }

    const data = await req.json();

    // ✅ Basic validation (you can use Joi or Zod for better schema)
    const requiredFields = ["name", "description", "price", "mainCategory"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}`, success: false },
          { status: 400 }
        );
      }
    }

    // ✅ If new base64 image is sent, delete old and upload new
    let newImageUrl = existingDish.image;

    if (data.image && data.image.startsWith("data:image")) {
      // Delete previous from Cloudinary
      await deleteFromCloudinary(existingDish.image);

      // Upload new image
      const uploadRes = await uploadToCloudinary(data.image, "albite/dishes");
      if (!uploadRes?.secure_url) {
        return NextResponse.json(
          { message: "Image upload failed", success: false },
          { status: 500 }
        );
      }

      newImageUrl = uploadRes.secure_url;
    }

    // ✅ Prepare sanitized update payload
    const updatePayload = {
      name: data.name,
      description: data.description,
      image: newImageUrl,
      price: Number(data.price),
      calories: Number(data.calories),
      servings: Number(data.servings),
      mainCategory: data.mainCategory,
      availableBefore: data.availableBefore || "11:00",
      maxPreorderDays: Number(data.maxPreorderDays || 3),
      parcelOptions: data.parcelOptions || [],
      isRecommended: Boolean(data.isRecommended),
      isNewDish: Boolean(data.isNewDish),
      isPopular: Boolean(data.isPopular),
      isActive: Boolean(data.isActive),
    };

    const updatedDish = await Dish.findByIdAndUpdate(dishId, updatePayload, {
      new: true,
    });

    return NextResponse.json({ dish: updatedDish, success: true });
  } catch (error: any) {
    console.error("Failed to update dish", error);
    return NextResponse.json(
      { message: "Server Error", error: error.message, success: false },
      { status: 500 }
    );
  }
};
