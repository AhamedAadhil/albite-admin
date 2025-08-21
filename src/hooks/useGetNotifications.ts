"use client";

import { useEffect, useState } from "react";

export const useGetNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotifications = async () => {
    try {
      const url = `/api/protected/notifications`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const jsonData = await res.json();
      setNotifications(jsonData.data.notifications);
      return;
    } catch (err) {
      setError(err as Error);
      return;
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  console.log("notifications", notifications);
  return { notifications, error, refetchNotifications: fetchNotifications };
};
