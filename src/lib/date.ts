const DAYS_SHORT = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const DAYS_LONG = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function getTimeOfDay(hour: number): string {
  if (hour < 6) return "late night";
  if (hour < 12) return "morning";
  if (hour < 15) return "afternoon";
  if (hour < 18) return "late afternoon";
  if (hour < 21) return "evening";
  return "night";
}

function formatEntryDate(d: Date): string {
  const day = DAYS_SHORT[d.getDay()];
  const dayNum = d.getDate();
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${day} ${dayNum} ${month} ${year} · ${h}:${m}`;
}

function formatHeaderDate(date: Date): string {
  const dayName = DAYS_LONG[date.getDay()];
  const d = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  const timeOfDay = getTimeOfDay(date.getHours());
  return `${dayName}, ${d} ${month} ${year} — ${timeOfDay}`;
}

export { formatEntryDate, formatHeaderDate };
