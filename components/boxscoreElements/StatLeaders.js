import react from "react";
import PlayerLeader from "./PlayerLeader";

const CATEGORIES = [
  { key: "points", label: "Points" },
  { key: "rebounds", label: "Rebounds" },
  { key: "assists", label: "Assists" },
];

const StatLeaders = ({ vLeader, hLeader }) => {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:justify-evenly">
      {CATEGORIES.map(({ key, label }) => (
        <div
          key={key}
          className="grid grid-cols-3 justify-items-center items-center justify-center mb-8"
        >
          <PlayerLeader leader={vLeader[key]} />
          <h3 className="text-center">{label}</h3>
          <PlayerLeader leader={hLeader[key]} />
        </div>
      ))}
    </div>
  );
};

export default StatLeaders;
