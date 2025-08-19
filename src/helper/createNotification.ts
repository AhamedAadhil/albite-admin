import { User, Notification } from "@/models";
import { INotification } from "@/models/notification";
import mongoose from "mongoose";

interface CreateNotificationInput {
  message: string;
  type: string;
  recipientType: "User" | "Admin";
  recipientId: mongoose.Schema.Types.ObjectId | string; // allow string for convenience
  meta?: Record<string, any>;
}

export async function createNotification({
  message,
  type,
  recipientType,
  recipientId,
  meta,
}: CreateNotificationInput): Promise<INotification> {
  const notification = new Notification({
    message,
    type,
    recipientType,
    recipientId,
    isRead: false,
    meta,
  });

  await notification.save();

  await User.findByIdAndUpdate(recipientId, {
    $push: {
      notifications: notification._id,
    },
  });
  return notification;
}
