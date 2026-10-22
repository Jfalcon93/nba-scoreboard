import React from "react";
import Link from "next/link";
import Team from "./Team";
import PreScore from "./PreScore";
import LiveScore from "./LiveScore";
import PostScore from "./PostScore";

const GameLayout = ({ game }) => {
  let scoreBoard;
  if (game.gameStatus === 1) {
    scoreBoard = (
      <PreScore startTime={game.gameStatusText} nationalTv={game.nationalTv} />
    );
  } else if (game.gameStatus === 2) {
    scoreBoard = (
      <LiveScore
        vTeamScore={game.awayTeam.score}
        hTeamScore={game.homeTeam.score}
        quarter={game.period}
        clock={game.clock}
      />
    );
  } else if (game.gameStatus === 3) {
    scoreBoard = (
      <PostScore
        vTeamScore={game.awayTeam.score}
        hTeamScore={game.homeTeam.score}
      />
    );
  }
  return (
    <div className="flex flex-row justify-center items-center mb-8">
      <Team
        wins={game.awayTeam.wins}
        losses={game.awayTeam.losses}
        logo={game.awayTeam.logo}
        name={game.awayTeam.name}
      />
      <Link
        href={{
          pathname: "/boxscore",
          query: { bid: game.gameId },
        }}
        className="w-full hover:text-gray-400"
      >
        {scoreBoard}
      </Link>
      <Team
        wins={game.homeTeam.wins}
        losses={game.homeTeam.losses}
        logo={game.homeTeam.logo}
        name={game.homeTeam.name}
      />
    </div>
  );
};

export default GameLayout;
