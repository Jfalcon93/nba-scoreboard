import react from "react";

const LiveBoxscore = ({ vTeamScore, hTeamScore, quarter, clock }) => {
  return (
    <div className="flex flex row items-center justify-center space-x-7 flex-grow">
      <div>
        <h3>{vTeamScore}</h3>
      </div>
      <div>
        <p>{quarterFormat(quarter)}</p>
        <p>{clock}</p>
      </div>
      <div>
        <h3>{hTeamScore}</h3>
      </div>
    </div>
  );
};

export default LiveBoxscore;
