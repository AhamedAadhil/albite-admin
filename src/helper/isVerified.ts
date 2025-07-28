// libs/verifyToken.ts
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const verifyToken = (): { userId: string; role: number } | null => {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: number;
    };

    if (decoded.role !== 7) {
      console.warn("Access denied:not an admin");
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return null;
  }
};
