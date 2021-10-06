import react from "react";
import { quarterFormat } from "../../../utils/utils";

const LiveBoxscore = ({ vTeamScore, hTeamScore, quarter, clock }) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-16 flex-grow">
      <div className="text-5xl font-light">
        <h3>{vTeamScore}</h3>
      </div>
      <div className="text-gray-500 text-center">
        <p>{quarterFormat(quarter)}</p>
        <p>{clock}</p>
      </div>
      <div className="text-5xl font-light">
        <h3>{hTeamScore}</h3>
      </div>
    </div>
  );
};

export default LiveBoxscore;
