import react from "react";
import { checkNationalTvGame } from "../../../utils/utils";

const PreBoxscore = ({ startTime, nationalTv }) => {
  return (
    <div className="flex flex-col text-center text-lg items-center justify-center">
      <h5>{startTime}</h5>
      <p>{checkNationalTvGame(nationalTv)}</p>
    </div>
  );
};

export default PreBoxscore;
