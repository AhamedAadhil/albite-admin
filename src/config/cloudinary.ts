import { v2 as cloudinary } from "cloudinary";

process.env.NODE_ENV === "production"
  ? cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME_PRODUCTION,
      api_key: process.env.CLOUDINARY_API_KEY_PRODUCTION,
      api_secret: process.env.CLOUDINARY_API_SECRET_PRODUCTION,
    })
  : cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

export const uploadToCloudinary = async (
  base64Image: string,
  folder: string
) => {
  try {
    const res = await cloudinary.uploader.upload(base64Image, {
      folder,
    });
    return res;
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return null;
  }
};

export const deleteFromCloudinary = async (imageUrl: string) => {
  try {
    // Extract public_id from image URL
    const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];

    return await cloudinary.uploader.destroy(`albite/dishes/${publicId}`);
  } catch (err) {
    console.error("Cloudinary delete failed:", err);
  }
};

export default cloudinary;
