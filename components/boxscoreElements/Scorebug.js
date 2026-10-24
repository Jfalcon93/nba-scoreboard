import Image from "next/image";
import LiveBadge from "../LiveBadge";
import { liveStatus } from "../../utils/utils";

const ScoreTeam = ({ team }) => {
  return (
    <div className="flex flex-col items-center gap-1.5 min-w-0 text-center">
      <Image
        src={team.logo}
        width={72}
        height={72}
        alt=""
        className="w-12 h-12 sm:w-[72px] sm:h-[72px]"
      />
      <span className="text-base sm:text-[22px] font-semibold">{team.name}</span>
      <span className="text-[13px] text-zinc-400">
        {team.location} · {team.record}
      </span>
    </div>
  );
};

// Big score header: away team, score + status, home team
const Scorebug = ({ game }) => {
  const { awayTeam, homeTeam, gameStatus } = game;
  // A finished game dims the loser's score
  const scoreClass = (opponent) =>
    gameStatus === 3 && opponent.winner ? "text-zinc-500" : "text-white";

  let center;
  if (gameStatus === 1) {
    center = (
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-2xl sm:text-3xl font-light">{game.gameStatusText}</span>
        <span className="text-[13px] text-zinc-400">
          {game.nationalTv[0] ?? "League Pass"}
        </span>
      </div>
    );
  } else {
    center = (
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-baseline gap-3 sm:gap-8 text-[40px] sm:text-6xl md:text-7xl font-light tabular-nums leading-none">
          <span className={scoreClass(homeTeam)}>{awayTeam.score}</span>
          <span aria-hidden="true" className="text-[0.5em] text-zinc-600">
            –
          </span>
          <span className={scoreClass(awayTeam)}>{homeTeam.score}</span>
        </div>
        <span className="text-[13px]">
          {gameStatus === 2 ? (
            <LiveBadge>
              {game.clock === "Half" ? "Halftime" : liveStatus(game.period, game.clock)}
            </LiveBadge>
          ) : (
            <span className="font-semibold tracking-wide text-zinc-400">
              {game.gameStatusText.toUpperCase()}
            </span>
          )}
        </span>
      </div>
    );
  }

  return (
    <section
      aria-label="Score"
      className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 mt-6"
    >
      <ScoreTeam team={awayTeam} />
      {center}
      <ScoreTeam team={homeTeam} />
    </section>
  );
};

export default Scorebug;
