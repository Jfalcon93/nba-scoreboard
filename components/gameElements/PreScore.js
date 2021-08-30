import react from "react";

const PreScore = ({ startTime, nationalTv }) => {
  return (
    <div className="flex flex row items-center justify-center space-x-7 flex-grow">
      <h5>{startTime}</h5>
      <p>${checkNationalTvGame(nationalTv)}</p>
    </div>
  );
};

export default PreScore;
