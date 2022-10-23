import react from "react";
import { quarterFormat } from "../../utils/utils";

const LiveScore = ({ vTeamScore, hTeamScore, quarter, clock }) => {
  const formatClock = (clock) => {
    let arr = clock.split(" ");
    if (arr[0] === "Half") {
      return "Half";
    } else {
      return arr[1];
    }
  };
  return (
    <div className="flex flex row items-center justify-center space-x-7 md:space-x-5 flex-grow">
      <div className="text-4xl md:text-3xl font-extralight">
        <h3>{vTeamScore}</h3>
      </div>
      <div className="text-sm text-gray-400 text-center">
        <p>{quarterFormat(quarter)}</p>
        <p>{formatClock(clock)}</p>
      </div>
      <div className="text-4xl md:text-3xl font-extralight">
        <h3>{hTeamScore}</h3>
      </div>
    </div>
  );
};

export default LiveScore;
