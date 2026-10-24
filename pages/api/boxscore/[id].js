import axios from "axios";
import {
  getGameStatus,
  getStatusText,
  getClock,
  getLogo,
} from "../../../utils/espn";

const SUMMARY_URL =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary";

const LEADER_CATEGORIES = ["points", "rebounds", "assists"];

// ESPN's label for each stat we show -> the label the page uses
const TEAM_STATS = [
  ["FG", "FG"],
  ["Field Goal %", "FG%"],
  ["3PT", "3PT"],
  ["Three Point %", "3P%"],
  ["Free Throw %", "FT%"],
  ["Rebounds", "Rebounds"],
  ["Assists", "Assists"],
  ["Turnovers", "Turnovers"],
  ["Steals", "Steals"],
  ["Blocks", "Blocks"],
  ["Points in Paint", "Points in paint"],
  ["Fast Break Points", "Fast break points"],
];

// Leaders are empty before tipoff, and a category can be missing early in a game
const formatLeaders = (teamLeaders) => {
  const leaders = {};
  for (const category of LEADER_CATEGORIES) {
    const leader = teamLeaders?.leaders.find((l) => l.name === category)
      ?.leaders[0];
    leaders[category] = leader
      ? { name: leader.athlete.shortName, value: leader.displayValue }
      : null;
  }
  return leaders;
};

const formatTeam = (competitor, allLeaders) => ({
  teamId: competitor.team.id,
  tricode: competitor.team.abbreviation,
  name: competitor.team.name,
  location: competitor.team.location,
  logo: getLogo(competitor.team),
  record: competitor.record?.[0]?.summary ?? "0-0",
  score: competitor.score ?? "0",
  winner: competitor.winner === true,
  linescore: (competitor.linescores ?? []).map((l) => l.displayValue),
  leaders: formatLeaders(
    allLeaders.find((l) => l.team.id === competitor.team.id)
  ),
});

const formatTeamStats = (boxscoreTeams, awayId, homeId) => {
  const statsFor = (teamId) => {
    const team = boxscoreTeams.find((t) => t.team.id === teamId);
    return Object.fromEntries(
      (team?.statistics ?? []).map((s) => [s.label, s.displayValue])
    );
  };
  const away = statsFor(awayId);
  const home = statsFor(homeId);
  return TEAM_STATS.filter(([espnLabel]) => espnLabel in away)
    .map(([espnLabel, label]) => ({
      label,
      away: away[espnLabel],
      home: home[espnLabel] ?? "",
    }));
};

// Each player's stats keyed by ESPN's column label (MIN, PTS, FG, 3PT, ...)
const formatPlayers = (teamPlayers) => {
  const table = teamPlayers?.statistics[0];
  if (!table) return null;
  const withLabels = (values) =>
    Object.fromEntries(table.labels.map((label, i) => [label, values[i]]));
  const toPlayer = (a) => ({
    id: a.athlete.id,
    name: a.athlete.shortName,
    position: a.athlete.position?.abbreviation ?? "",
    stats: withLabels(a.stats),
  });
  const played = table.athletes.filter((a) => !a.didNotPlay);
  return {
    starters: played.filter((a) => a.starter).map(toPlayer),
    bench: played.filter((a) => !a.starter).map(toPlayer),
    didNotPlay: table.athletes
      .filter((a) => a.didNotPlay)
      .map((a) => a.athlete.shortName),
    totals: withLabels(table.totals),
  };
};

const formatGameDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date(date));

const formatBoxscore = (summary) => {
  const competition = summary.header.competitions[0];
  const { status } = competition;
  const away = competition.competitors.find((c) => c.homeAway === "away");
  const home = competition.competitors.find((c) => c.homeAway === "home");
  const leaders = summary.leaders ?? [];
  const gameStatus = getGameStatus(status);
  const playersFor = (competitor) =>
    formatPlayers(
      summary.boxscore.players?.find((p) => p.team.id === competitor.team.id)
    );
  return {
    gameId: summary.header.id,
    gameStatus,
    gameStatusText: getStatusText(status, competition.date),
    gameDate: formatGameDate(competition.date),
    period: status.period ?? 0,
    clock: getClock(status),
    venue: summary.gameInfo?.venue?.fullName ?? "",
    nationalTv: (competition.broadcasts ?? [])
      .filter((b) => b.isNational)
      .map((b) => b.media.shortName),
    awayTeam: formatTeam(away, leaders),
    homeTeam: formatTeam(home, leaders),
    // Before tipoff ESPN sends season averages here, not game stats
    teamStats:
      gameStatus === 1
        ? []
        : formatTeamStats(summary.boxscore.teams ?? [], away.team.id, home.team.id),
    players: { away: playersFor(away), home: playersFor(home) },
  };
};

export default async function handler(req, res) {
  // ESPN game ids are numeric; anything else can't be a game
  if (!/^\d+$/.test(req.query.id)) {
    return res.status(404).json({ error: "Game not found" });
  }
  try {
    const response = await axios.get(SUMMARY_URL, {
      params: { event: req.query.id },
    });
    res.status(200).json(formatBoxscore(response.data));
  } catch (error) {
    console.log(error.message);
    if (error.response?.status === 404) {
      res.status(404).json({ error: "Game not found" });
    } else {
      res.status(502).json({ error: "Unable to load boxscore" });
    }
  }
}
