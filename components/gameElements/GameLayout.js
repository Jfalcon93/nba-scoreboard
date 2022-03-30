import React, { useEffect } from "react";
import Link from "next/link";
import Team from "./Team";
import PreScore from "./PreScore";
import LiveScore from "./LiveScore";
import PostScore from "./PostScore";

const GameLayout = ({ game }) => {
  let scoreBoard;
  if (game.game.statusNum === 1) {
    scoreBoard = (
      <PreScore
        startTime={game.game.startTimeEastern}
        nationalTv={game.game.watch.broadcast.broadcasters.national}
      />
    );
  } else if (game.game.statusNum === 2) {
    scoreBoard = (
      <LiveScore
        vTeamScore={game.game.vTeam.score}
        hTeamScore={game.game.hTeam.score}
        quarter={game.game.period.current}
        clock={game.game.clock}
      />
    );
  } else if (game.game.statusNum === 3) {
    scoreBoard = (
      <PostScore
        vTeamScore={game.game.vTeam.score}
        hTeamScore={game.game.hTeam.score}
      />
    );
  }
  return (
    <div className="flex flex-row justify-center items-center mb-8">
      <Team
        logo={game.game.vTeam.triCode}
        wins={game.game.vTeam.win}
        losses={game.game.vTeam.loss}
      />
      <Link
        href={{
          pathname: "/boxscore/",
          query: { bid: game.game.gameId, date: game.game.homeStartDate },
        }}
      >
        <a className="w-full hover:text-gray-400">{scoreBoard}</a>
      </Link>
      <Team
        logo={game.game.hTeam.triCode}
        wins={game.game.hTeam.win}
        losses={game.game.hTeam.loss}
      />
    </div>
  );
};

export default GameLayout;
