export const periodLabel = (period) => {
  if (period === 1) {
    return `1st`;
  } else if (period === 2) {
    return `2nd`;
  } else if (period === 3) {
    return `3rd`;
  } else if (period === 4) {
    return `4th`;
  } else if (period === 5) {
    return `OT`;
  } else {
    return `${period - 4}OT`;
  }
};

// "3rd · 5:42", "Half", or "End of 3rd"
export const liveStatus = (period, clock) => {
  if (clock === "Half") return "Half";
  if (clock === "End") return `End of ${periodLabel(period)}`;
  return `${periodLabel(period)} · ${clock}`;
};

// "2026-10-21" -> "Tuesday, October 21, 2026"
export const formatLongDate = (isoDate) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T12:00:00Z`));

// "2026-10-21", -1 -> "20261020" (the format /api/games?date= takes)
export const shiftDate = (isoDate, days) => {
  const date = new Date(`${isoDate}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10).replaceAll("-", "");
};
