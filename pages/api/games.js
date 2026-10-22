import axios from "axios";
import { getGameStatus, getStatusText, getClock } from "../../utils/espn";

const SCOREBOARD_URL =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard";

const formatTeam = (competitor) => {
  const [wins, losses] = (competitor.records?.[0]?.summary ?? "0-0").split("-");
  return {
    teamId: competitor.team.id,
    tricode: competitor.team.abbreviation,
    name: competitor.team.name,
    // Site background is black, so prefer the dark-mode logo
    logo: competitor.team.logoDark ?? competitor.team.logo,
    wins,
    losses,
    score: competitor.score,
  };
};

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

export default async function handler(req, res) {
  try {
    const response = await axios.get(SCOREBOARD_URL);
    res.status(200).json({ games: response.data.events.map(formatGame) });
  } catch (error) {
    console.log(error.message);
    res.status(502).json({ error: "Unable to load games" });
  }
}
