import { NextRequest, NextResponse } from "next/server";

import cloudinary, { uploadToCloudinary } from "@/config/cloudinary";
import { verifyToken } from "@/helper/isVerified";
import connectDB from "@/config/db";
import Dish from "@/models/dish";

// POST /api/protected/create-dish
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    // Check if the user is an admin
    const user = verifyToken();

    if (!user) {
      return NextResponse.json(
        { message: "Access denied: not an admin", success: false },
        { status: 403 }
      );
    }

    // Parse the request body
    const {
      name,
      description,
      image,
      price,
      calories,
      servings,
      isRecommended,
      isNewDish,
      isPopular,
      mainCategory,
      availableBefore,
      maxPreorderDays,
      parcelOptions,
    } = await req.json();
    if (
      !name ||
      !description ||
      !image ||
      !price ||
      !calories ||
      !servings ||
      !mainCategory ||
      !availableBefore ||
      !maxPreorderDays ||
      !parcelOptions
    ) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    // validate the price, calories, servings, maxPreorderDays
    if (
      typeof price !== "number" ||
      typeof calories !== "number" ||
      typeof servings !== "number" ||
      typeof maxPreorderDays !== "number"
    ) {
      return NextResponse.json(
        {
          message:
            "Price, calories, servings, and maxPreorderDays must be numbers",
          success: false,
        },
        { status: 400 }
      );
    }

    if (price < 0 || calories < 0 || servings < 0 || maxPreorderDays < 0) {
      return NextResponse.json(
        {
          message:
            "Price, calories, servings, and maxPreorderDays cannot be negative",
          success: false,
        },
        { status: 400 }
      );
    }

    // 🔌 Upload image to Cloudinary
    const uploadRes = await uploadToCloudinary(image, "albite/dishes");

    if (!uploadRes?.secure_url) {
      return NextResponse.json(
        { message: "Image upload failed", success: false },
        { status: 500 }
      );
    }

    await connectDB();

    // 🥘 Create the dish
    const newDish = await Dish.create({
      name,
      description,
      image: uploadRes.secure_url,
      price,
      calories,
      servings,
      isRecommended: isRecommended || false,
      isNewDish: isNewDish || false,
      isPopular: isPopular || false,
      mainCategory,
      availableBefore,
      maxPreorderDays,
      parcelOptions: parcelOptions || [],
      isActive: true,
    });

    return NextResponse.json(
      {
        message: "Dish created successfully",
        dish: newDish,
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Internal Server Error", error);
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
