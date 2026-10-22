import react from "react";
import BoxscoreHeader from "./BoxscoreHeader";
import PostBoxscore from "./boxscoreScoreboards/PostBoxscore";
import PreBoxscore from "./boxscoreScoreboards/PreBoxscore";
import LiveBoxscore from "./boxscoreScoreboards/LiveBoxscore";
import QuarterlyScoring from "./QuarterlyScoring";
import StatLeaders from "./StatLeaders";

const BoxscoreLayout = ({ game }) => {
  let scoreboard;
  if (game.gameStatus === 1) {
    scoreboard = (
      <PreBoxscore
        startTime={game.gameStatusText}
        nationalTv={game.nationalTv}
      />
    );
  } else if (game.gameStatus === 2) {
    scoreboard = (
      <LiveBoxscore
        vTeamScore={game.awayTeam.score}
        hTeamScore={game.homeTeam.score}
        quarter={game.period}
        clock={game.clock}
      />
    );
  } else if (game.gameStatus === 3) {
    scoreboard = (
      <PostBoxscore
        vTeamScore={game.awayTeam.score}
        hTeamScore={game.homeTeam.score}
      />
    );
  }
  return (
    <div>
      <BoxscoreHeader
        vTeam={game.awayTeam.name}
        hTeam={game.homeTeam.name}
        date={game.gameDate}
      />
      {scoreboard}
      {game.gameStatus === 1 ? (
        ""
      ) : (
        <>
          <QuarterlyScoring vTeam={game.awayTeam} hTeam={game.homeTeam} />
          <StatLeaders
            vLeader={game.awayTeam.leaders}
            hLeader={game.homeTeam.leaders}
          />
        </>
      )}{" "}
    </div>
  );
};

export default BoxscoreLayout;
