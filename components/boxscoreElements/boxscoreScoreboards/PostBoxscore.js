import react from "react";

const PostBoxscore = ({ vTeamScore, hTeamScore }) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-16 flex-grow">
      <div className="text-5xl font-light">
        <h3>{vTeamScore}</h3>
      </div>
      <div className="text-gray-400">
        <p>Final</p>
      </div>
      <div className="text-5xl font-light">
        <h3>{hTeamScore}</h3>
      </div>
    </div>
  );
};

export default PostBoxscore;
