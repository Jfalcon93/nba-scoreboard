const BoxscoreHeader = ({ vTeam, hTeam, date }) => {
  return (
    <div className="my-7">
      <h1 className="text-3xl">
        {vTeam} vs. {hTeam}
      </h1>
      <h3 className="mt-2 text-gray-400">{date}</h3>
    </div>
  );
};

export default BoxscoreHeader;
