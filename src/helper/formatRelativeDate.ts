import dayjs from "dayjs";

export function formatRelativeDate(date: string | Date): string {
  const input = dayjs(date);
  const now = dayjs();

  const daysDiff = now.startOf("day").diff(input.startOf("day"), "day");

  if (daysDiff === 0) return "Today";
  if (daysDiff === 1) return "Yesterday";
  if (daysDiff <= 7) return `${daysDiff} days ago`;

  return input.format("MMM D, YYYY h:mm A");
}
