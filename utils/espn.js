// Helpers shared by the API routes for turning ESPN game data into what the
// components display

// ESPN state is "pre" | "in" | "post"; postponed/canceled games are "post"
// but not completed, so show them like an upcoming game with ESPN's status text
export const getGameStatus = (status) => {
  if (status.type.state === "in") return 2;
  if (status.type.state === "post" && status.type.completed) return 3;
  return 1;
};

export const getStatusText = (status, date) => {
  if (status.type.state !== "pre") {
    return status.type.shortDetail;
  }
  const startTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  }).format(new Date(date));
  return `${startTime} ET`;
};

export const getClock = (status) => {
  if (status.type.name === "STATUS_HALFTIME") return "Half";
  if (status.type.name === "STATUS_END_PERIOD") return "End";
  return status.displayClock;
};
