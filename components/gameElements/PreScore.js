import react from "react";
import { checkNationalTvGame } from "../../utils/utils";

const PreScore = ({ startTime, nationalTv }) => {
  return (
    <div className="flex flex-col text-sm text-center items-center justify-center">
      <h5>{startTime}</h5>
      <p className="text-gray-400">{checkNationalTvGame(nationalTv)}</p>
    </div>
  );
};

export default PreScore;
