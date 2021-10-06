import react from "react";
import BoxscoreHeader from "./BoxscoreHeader";
import PostBoxscore from "./boxscoreScoreboards/PostBoxscore";
import PreBoxscore from "./boxscoreScoreboards/PreBoxscore";
import LiveBoxscore from "./boxscoreScoreboards/LiveBoxscore";
import QuarterlyScoring from "./QuarterlyScoring";
import StatLeaders from "./StatLeaders";

const BoxscoreLayout = ({ game }) => {
  let scoreboard;
  if (game.basicGameData.statusNum === 1) {
    scoreboard = (
      <PreBoxscore
        startTime={game.basicGameData.startTimeEastern}
        nationalTv={game.basicGameData.watch.broadcast.broadcasters.national}
      />
    );
  } else if (game.basicGameData.statusNum === 2) {
    scoreboard = (
      <LiveBoxscore
        vTeamScore={game.basicGameData.vTeam.score}
        hTeamScore={game.basicGameData.hTeam.score}
        quarter={game.basicGameData.period.current}
        clock={game.basicGameData.clock}
      />
    );
  } else if (game.basicGameData.statusNum === 3) {
    scoreboard = (
      <PostBoxscore
        vTeamScore={game.basicGameData.vTeam.score}
        hTeamScore={game.basicGameData.hTeam.score}
      />
    );
  }
  return (
    <div>
      <BoxscoreHeader
        vTeam={game.basicGameData.vTeam.triCode}
        hTeam={game.basicGameData.hTeam.triCode}
      />
      {scoreboard}
      {game.basicGameData.statusNum === 1 ? (
        ""
      ) : (
        <>
          <QuarterlyScoring
            vTeam={game.basicGameData.vTeam}
            hTeam={game.basicGameData.hTeam}
          />
          <StatLeaders
            vLeader={game.stats.vTeam.leaders}
            hLeader={game.stats.hTeam.leaders}
          />
        </>
      )}{" "}
    </div>
  );
};

export default BoxscoreLayout;
