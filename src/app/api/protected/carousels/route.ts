import { deleteFromCloudinary, uploadToCloudinary } from "@/config/cloudinary";
import connectDB from "@/config/db";
import { verifyToken } from "@/helper/isVerified";
import { Carousel } from "@/models/carousel";
import { NextRequest, NextResponse } from "next/server";

//create carousel
// POST /api/protected/carousels
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Unauthorized: not an admin",
          success: false,
        },
        { status: 401 }
      );
    }

    await connectDB();

    const { title, link, image } = await req.json();
    if (!title || !link || !image) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          message: "Title, description, and image are required",
          success: false,
        },
        { status: 400 }
      );
    }

    let imageUrl = "";
    const cloudinaryResponse = await uploadToCloudinary(
      image,
      "albite/carousels"
    );
    if (cloudinaryResponse && cloudinaryResponse.secure_url) {
      imageUrl = cloudinaryResponse.secure_url;
    }

    const carousel = await Carousel.create({
      title,
      link,
      image: imageUrl,
    });

    return NextResponse.json(
      {
        data: carousel,
        message: "Carousel created successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating carousel:", error);
    return NextResponse.json(
      {
        error: "Failed to create carousel",
        message: error.message || "An error occurred while creating carousel",
        success: false,
      },
      { status: 500 }
    );
  }
};

// get all carousels
// GET /api/protected/carousels
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Unauthorized: not an admin",
          success: false,
        },
        { status: 401 }
      );
    }

    await connectDB();

    const carousels = await Carousel.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { data: carousels, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching carousels:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch carousels",
        message: error.message || "An error occurred while fetching carousels",
        success: false,
      },
      { status: 500 }
    );
  }
};

// delete carousel
// DELETE /api/protected/carousels

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const user = verifyToken();
    if (!user || user.role !== 7) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Unauthorized: not an admin",
          success: false,
        },
        { status: 401 }
      );
    }

    await connectDB();
    const { carouselId } = await req.json();
    if (!carouselId) {
      return NextResponse.json(
        {
          error: "Missing carousel ID",
          message: "Carousel ID is required",
          success: false,
        },
        { status: 400 }
      );
    }

    const carousel = await Carousel.findById(carouselId);
    if (!carousel) {
      return NextResponse.json(
        {
          error: "Carousel not found",
          message: "Carousel not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // delete the image of the carousel from Cloudinary
    await deleteFromCloudinary(carousel.image);

    // delete the carousel from the database
    await Carousel.findByIdAndDelete(carouselId);

    // get all existing carousels after deletion
    const existingCarousels = await Carousel.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        data: existingCarousels,
        message: "Carousel deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting carousel:", error);
    return NextResponse.json(
      {
        error: "Failed to delete carousel",
        message: error.message || "An error occurred while deleting carousel",
        success: false,
      },
      { status: 500 }
    );
  }
};
