import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { Settings } from "@/models/setting";
import connectDB from "@/config/db";

const defaultSettings = [
  { key: "AKKARAIPATTU_DELIVERY_FEE", value: "0" },
  { key: "PALAMUNAI_DELIVERY_FEE", value: "150" },
  { key: "ADDALAICHENAI_DELIVERY_FEE", value: "100" },
  { key: "SAGAMAM_DELIVERY_FEE", value: "100" },
  { key: "KUDIYIRUPPU_DELIVERY_FEE", value: "100" },
  { key: "POINTS_PER_RUPEE", value: "0.0005" },
];

async function seed() {
  try {
    await connectDB();

    for (const setting of defaultSettings) {
      const exists = await Settings.findOne({ key: setting.key });
      if (!exists) {
        await new Settings(setting).save();
        console.log(`Inserted setting ${setting.key}`);
      } else {
        console.log(`Setting ${setting.key} already exists`);
      }
    }

    console.log("Seeding complete");
  } catch (error) {
    console.error("Error seeding settings:", error);
  } finally {
    mongoose.connection.close();
  }
}

seed();
