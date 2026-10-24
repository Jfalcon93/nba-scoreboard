import Link from "next/link";
import TeamLine from "./TeamLine";
import LiveBadge from "../LiveBadge";
import { liveStatus } from "../../utils/utils";

const GameRow = ({ game }) => {
  const { awayTeam, homeTeam } = game;
  const isPre = game.gameStatus === 1;
  const isLive = game.gameStatus === 2;
  const isFinal = game.gameStatus === 3;
  const status = isLive ? liveStatus(game.period, game.clock) : game.gameStatusText;
  // National TV only matters for games that haven't finished
  const tv = isFinal ? "" : game.nationalTv[0] ?? "";

  const label = isPre
    ? `${awayTeam.name} at ${homeTeam.name}, ${status}`
    : `${awayTeam.name} ${awayTeam.score}, ${homeTeam.name} ${homeTeam.score}, ${status}`;

  return (
    <Link
      href={{ pathname: "/boxscore", query: { bid: game.gameId } }}
      aria-label={`${label}. Open boxscore`}
      className="flex flex-col gap-2.5 py-4 border-t border-zinc-800 transition-opacity duration-300 hover:opacity-80"
    >
      <div className="flex justify-between items-center min-h-[16px] text-xs tracking-wide text-zinc-400">
        <div className="flex items-center gap-2">
          {isLive && <LiveBadge />}
          <span>{status}</span>
        </div>
        <span>{tv}</span>
      </div>
      <TeamLine
        team={awayTeam}
        lost={isFinal && homeTeam.winner}
        showScore={!isPre}
      />
      <TeamLine
        team={homeTeam}
        lost={isFinal && awayTeam.winner}
        showScore={!isPre}
      />
    </Link>
  );
};

export default GameRow;
