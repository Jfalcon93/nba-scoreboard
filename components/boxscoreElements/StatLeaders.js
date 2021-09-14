import react from "react";
import PlayerLeader from "./PlayerLeader";

const StatLeaders = ({ vLeader, hLeader }) => {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:justify-evenly">
      <div className="grid grid-cols-3 justify-items-center items-center mb-8">
        <PlayerLeader
          firstName={vLeader.points.players[0].firstName}
          lastName={vLeader.points.players[0].lastName}
          stat={vLeader.points.value}
        />
        <h3 className="text-center">Points</h3>
        <PlayerLeader
          firstName={hLeader.points.players[0].firstName}
          lastName={hLeader.points.players[0].lastName}
          stat={hLeader.points.value}
        />
      </div>
      <div className="grid grid-cols-3 justify-items-center items-center justify-center mb-8">
        <PlayerLeader
          firstName={vLeader.rebounds.players[0].firstName}
          lastName={vLeader.rebounds.players[0].lastName}
          stat={vLeader.rebounds.value}
        />
        <h3 className="text-center">Rebounds</h3>
        <PlayerLeader
          firstName={hLeader.rebounds.players[0].firstName}
          lastName={hLeader.rebounds.players[0].lastName}
          stat={hLeader.rebounds.value}
        />
      </div>
      <div className="grid grid-cols-3 justify-items-center items-center justify-center mb-8">
        <PlayerLeader
          firstName={vLeader.assists.players[0].firstName}
          lastName={vLeader.assists.players[0].lastName}
          stat={vLeader.assists.value}
        />
        <h3 className="text-center">Assists</h3>
        <PlayerLeader
          firstName={hLeader.assists.players[0].firstName}
          lastName={hLeader.assists.players[0].lastName}
          stat={hLeader.assists.value}
        />
      </div>
    </div>
  );
};

export default StatLeaders;
