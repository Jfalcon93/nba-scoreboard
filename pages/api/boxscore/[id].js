import axios from "axios";
import { getGameStatus, getStatusText, getClock } from "../../../utils/espn";

const SUMMARY_URL =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary";

const LEADER_CATEGORIES = ["points", "rebounds", "assists"];

// Leaders are empty before tipoff, and a category can be missing early in a game
const formatLeaders = (teamLeaders) => {
  const leaders = {};
  for (const category of LEADER_CATEGORIES) {
    const leader = teamLeaders?.leaders.find((l) => l.name === category)
      ?.leaders[0];
    leaders[category] = leader
      ? { name: leader.athlete.displayName, value: leader.displayValue }
      : null;
  }
  return leaders;
};

const formatTeam = (competitor, allLeaders) => ({
  teamId: competitor.team.id,
  tricode: competitor.team.abbreviation,
  name: competitor.team.name,
  score: competitor.score ?? "0",
  linescore: (competitor.linescores ?? []).map((l) => l.displayValue),
  leaders: formatLeaders(
    allLeaders.find((l) => l.team.id === competitor.team.id)
  ),
});

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
  return {
    gameId: summary.header.id,
    gameStatus: getGameStatus(status),
    gameStatusText: getStatusText(status, competition.date),
    gameDate: formatGameDate(competition.date),
    period: status.period ?? 0,
    clock: getClock(status),
    nationalTv: (competition.broadcasts ?? [])
      .filter((b) => b.isNational)
      .map((b) => b.media.shortName),
    awayTeam: formatTeam(away, leaders),
    homeTeam: formatTeam(home, leaders),
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
