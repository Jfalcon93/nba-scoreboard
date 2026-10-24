import axios from "axios";
import {
  getGameStatus,
  getStatusText,
  getClock,
  getLogo,
} from "../../utils/espn";

const SCOREBOARD_URL =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard";

const formatTeam = (competitor) => ({
  teamId: competitor.team.id,
  tricode: competitor.team.abbreviation,
  name: competitor.team.name,
  logo: getLogo(competitor.team),
  record: competitor.records?.[0]?.summary ?? "0-0",
  score: competitor.score,
  winner: competitor.winner === true,
});

const formatGame = (event) => {
  const competition = event.competitions[0];
  const away = competition.competitors.find((c) => c.homeAway === "away");
  const home = competition.competitors.find((c) => c.homeAway === "home");
  return {
    gameId: event.id,
    gameStatus: getGameStatus(event.status),
    gameStatusText: getStatusText(event.status, event.date),
    period: event.status.period,
    clock: getClock(event.status),
    nationalTv: (competition.broadcasts ?? [])
      .filter((b) => b.market === "national")
      .flatMap((b) => b.names),
    awayTeam: formatTeam(away),
    homeTeam: formatTeam(home),
  };
};

// "20261021" -> "2026-10-21"
const toIsoDate = (date) =>
  `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;

export default async function handler(req, res) {
  // Optional ?date=YYYYMMDD; without it ESPN returns today's games
  const { date } = req.query;
  if (date !== undefined && !/^\d{8}$/.test(date)) {
    return res.status(400).json({ error: "date must be YYYYMMDD" });
  }
  try {
    const response = await axios.get(SCOREBOARD_URL, {
      params: date ? { dates: date } : {},
    });
    res.status(200).json({
      // ESPN only reports the day when we didn't ask for one
      date: date ? toIsoDate(date) : response.data.day.date,
      games: response.data.events.map(formatGame),
    });
  } catch (error) {
    console.log(error.message);
    res.status(502).json({ error: "Unable to load games" });
  }
}
