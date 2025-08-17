"use client";

import { useEffect, useState } from "react";

export const useGetSMSBalance = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const url = `/api/protected/textlk`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchInsights();
  }, []);

  return { data, error };
};
