import axios from "axios";

const STANDINGS_URL =
  "https://site.api.espn.com/apis/v2/sports/basketball/nba/standings";

const getStat = (entry, type) => entry.stats.find((s) => s.type === type);

const formatTeam = (entry) => {
  const wins = getStat(entry, "wins").value;
  const losses = getStat(entry, "losses").value;
  return {
    teamId: entry.team.id,
    tricode: entry.team.abbreviation,
    name: entry.team.name,
    wins,
    losses,
    winPct: getStat(entry, "winpercent").displayValue,
    // ESPN streak value is +N for a win streak, -N for a losing streak, 0 for none
    streak: getStat(entry, "streak").value,
    // Teams that haven't played yet have no last ten stat
    lastTen: getStat(entry, "lasttengames")?.displayValue ?? "0-0",
    home: getStat(entry, "home").displayValue,
    away: getStat(entry, "road").displayValue,
  };
};

// ESPN's entry order and playoff seed are projections, so rank by win
// percentage ourselves. Teams with no games count as .500 so they sit between
// winning and losing teams early in the season.
const sortKey = (team) =>
  team.wins + team.losses === 0 ? 0.5 : team.wins / (team.wins + team.losses);

const formatGamesBehind = (leader, team) => {
  const gb = (leader.wins - team.wins + (team.losses - leader.losses)) / 2;
  return gb === 0 ? "-" : String(gb);
};

const rankTeams = (teams) => {
  const sorted = [...teams].sort(
    (a, b) =>
      sortKey(b) - sortKey(a) ||
      b.wins - a.wins ||
      a.name.localeCompare(b.name)
  );
  return sorted.map((team, i) => ({
    ...team,
    rank: i + 1,
    gamesBehind: formatGamesBehind(sorted[0], team),
  }));
};

export default async function handler(req, res) {
  try {
    const response = await axios.get(STANDINGS_URL);
    const getConference = (abbreviation) =>
      response.data.children
        .find((c) => c.abbreviation === abbreviation)
        .standings.entries.map(formatTeam);
    const east = getConference("East");
    const west = getConference("West");
    res.status(200).json({
      east: rankTeams(east),
      west: rankTeams(west),
      league: rankTeams([...east, ...west]),
    });
  } catch (error) {
    console.log(error.message);
    res.status(502).json({ error: "Unable to load standings" });
  }
}
