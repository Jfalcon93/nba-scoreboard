import react from "react";

const PostScore = ({ vTeamScore, hTeamScore }) => {
  return (
    <div className="flex flex row items-center justify-center space-x-7 md:space-x-5 flex-grow">
      <div className="text-4xl md:text-3xl font-extralight">
        <h3>{vTeamScore}</h3>
      </div>
      <div className="text-sm text-gray-400">
        <p>Final</p>
      </div>
      <div className="text-4xl md:text-3xl font-extralight">
        <h3>{hTeamScore}</h3>
      </div>
    </div>
  );
};

export default PostScore;
