// helper/transformGoogleAnalyticsData.ts
export const transformGoogleAnalyticsData = (report: any) => {
  if (!report?.rows) return [];

  const dimensionHeaders =
    report.dimensionHeaders?.map((d: any) => d.name) || [];
  const metricHeaders = report.metricHeaders?.map((m: any) => m.name) || [];

  // Map GA metric names → chart-friendly names
  const metricKeyMap: Record<string, string> = {
    activeUsers: "activeUsers",
    sessions: "sessions",
    screenPageViews: "pageViews", // rename for your chart
    engagedSessions: "engagedSessions", // optional if you want
  };

  return report.rows.map((row: any) => {
    const dimensions: Record<string, string> = {};
    const metrics: Record<string, number> = {};

    // Map dimensions dynamically
    row.dimensionValues.forEach((dim: any, i: number) => {
      let value = dim.value;

      // Format GA4 date if dimension is "date"
      if (dimensionHeaders[i] === "date") {
        value = formatDate(value);
      }

      dimensions[dimensionHeaders[i]] = value;
    });

    // Map metrics dynamically and rename keys
    row.metricValues.forEach((metric: any, i: number) => {
      const gaKey = metricHeaders[i];
      const chartKey = metricKeyMap[gaKey] || gaKey; // fallback to GA key if not mapped
      metrics[chartKey] = Number(metric.value);
    });

    return { ...dimensions, ...metrics };
  });
};

// Utility: Convert YYYYMMDD → Aug 22, 2025
function formatDate(yyyymmdd: string) {
  if (!yyyymmdd || yyyymmdd.length !== 8) return yyyymmdd;
  const year = parseInt(yyyymmdd.slice(0, 4));
  const month = parseInt(yyyymmdd.slice(4, 6)) - 1;
  const day = parseInt(yyyymmdd.slice(6, 8));
  const dateObj = new Date(year, month, day);

  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
