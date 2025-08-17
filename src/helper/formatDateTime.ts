export function formatDateTime(isoDateStr: string | Date): string {
  const dateObj =
    typeof isoDateStr === "string" ? new Date(isoDateStr) : isoDateStr;

  if (isNaN(dateObj.getTime()))
    return typeof isoDateStr === "string" ? isoDateStr : dateObj.toString(); // fallback

  const day = dateObj.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const timeFormatted = `${hours
    .toString()
    .padStart(2, "0")}.${minutesStr} ${ampm}`;

  return `${day} ${month} ${year} at ${timeFormatted}`;
}
