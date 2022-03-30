import react from "react";

const PlayerLeader = ({ firstName, lastName, stat }) => {
  return (
    <div className="flex flex-col text-center flex-grow h-16">
      <h2 className="text-2xl items-start">{stat}</h2>
      <p className="text-xs items-end font-light text-gray-400 mt-2">
        {firstName} {lastName}
      </p>
    </div>
  );
};

export default PlayerLeader;
