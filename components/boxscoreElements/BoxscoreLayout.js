import SectionHeading from "../SectionHeading";
import Scorebug from "./Scorebug";
import QuarterlyScoring from "./QuarterlyScoring";
import StatLeaders from "./StatLeaders";
import TeamStats from "./TeamStats";
import PlayerStats from "./PlayerStats";

const BoxscoreLayout = ({ game }) => {
  const { awayTeam, homeTeam, gameStatus } = game;
  const meta = [
    game.gameDate,
    game.venue,
    ...game.nationalTv,
    gameStatus !== 3 ? "updates every 30 seconds" : null,
  ].filter(Boolean);

  return (
    <div>
      <Scorebug game={game} />
      <p className="mt-6 text-center text-[13px] text-zinc-400">{meta.join(" · ")}</p>
      {gameStatus !== 1 && (
        <>
          <section className="mt-12">
            <SectionHeading className="mb-3">Scoring</SectionHeading>
            <QuarterlyScoring vTeam={awayTeam} hTeam={homeTeam} />
          </section>
          <section className="mt-12">
            <SectionHeading className="mb-3">Leaders</SectionHeading>
            <StatLeaders vTeam={awayTeam} hTeam={homeTeam} />
          </section>
          {game.teamStats.length > 0 && (
            <section className="mt-12">
              <SectionHeading className="mb-3">Team stats</SectionHeading>
              <TeamStats vTeam={awayTeam} hTeam={homeTeam} stats={game.teamStats} />
            </section>
          )}
          {game.players.away && game.players.home && (
            <section className="mt-12">
              <PlayerStats vTeam={awayTeam} hTeam={homeTeam} players={game.players} />
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default BoxscoreLayout;
