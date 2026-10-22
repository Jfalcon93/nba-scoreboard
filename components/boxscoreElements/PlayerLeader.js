import react from "react";

const PlayerLeader = ({ leader }) => {
  return (
    <div className="flex flex-col text-center flex-grow h-16">
      <h2 className="text-2xl items-start">{leader ? leader.value : "-"}</h2>
      <p className="text-xs items-end font-light text-gray-400 mt-2">
        {leader ? leader.name : ""}
      </p>
    </div>
  );
};

export default PlayerLeader;
