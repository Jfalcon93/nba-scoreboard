import React, { useEffect } from "react";
import Link from "next/link";
import Team from "./Team";
import PreScore from "./PreScore";
import LiveScore from "./LiveScore";
import PostScore from "./PostScore";

const GameLayout = ({ game }) => {
  let scoreBoard;
  if (game.game.gameStatus === 1) {
    scoreBoard = (
      <PreScore
        startTime={game.game.gameStatusText}
        //nationalTv={game.game.watch.broadcast.broadcasters.national}
      />
    );
  } else if (game.game.gameStatus === 2) {
    scoreBoard = (
      <LiveScore
        vTeamScore={game.game.awayTeam.score}
        hTeamScore={game.game.homeTeam.score}
        quarter={game.game.period}
        clock={game.game.gameStatusText}
      />
    );
  } else if (game.game.gameStatus === 3) {
    scoreBoard = (
      <PostScore
        vTeamScore={game.game.awayTeam.score}
        hTeamScore={game.game.homeTeam.score}
      />
    );
  }
  return (
    <div className="flex flex-row justify-center items-center mb-8">
      <Team
        wins={game.game.awayTeam.wins}
        losses={game.game.awayTeam.losses}
        teamId={game.game.awayTeam.teamId}
      />
      {/* <Link
        href={{
          pathname: "/boxscore",
          query: { bid: game.game.gameId, date: game.game.homeStartDate },
        }}
      >
        <a className="w-full hover:text-gray-400">{scoreBoard}</a>
      </Link> */}
      <div className="w-full hover:text-gray-400">{scoreBoard}</div>
      <Team
        wins={game.game.homeTeam.wins}
        losses={game.game.homeTeam.losses}
        teamId={game.game.homeTeam.teamId}
      />
    </div>
  );
};

export default GameLayout;
