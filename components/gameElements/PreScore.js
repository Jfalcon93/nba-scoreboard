import react from "react";
import { checkNationalTvGame } from "../../utils/utils";

const PreScore = ({ startTime, nationalTv }) => {
  return (
    <div className="flex flex-col text-center items-center justify-center">
      <h5>{startTime}</h5>
      <p>{checkNationalTvGame(nationalTv)}</p>
    </div>
  );
};

export default PreScore;
