import { useState, useEffect } from "react";
import { getTeamData } from "../../utils/games";
import { getFullTeamName } from "../../utils/utils";
import { getDisplayDate } from "../../utils/date";

const BoxscoreHeader = ({ vTeam, hTeam }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamData().then((game) => {
      setData(game);
      setLoading(false);
    });
  }, []);
  return (
    <div className="my-7">
      <h1 className="text-3xl">
        {getFullTeamName(vTeam)} vs. {getFullTeamName(hTeam)}
      </h1>
      <h3 className="mt-2 text-gray-400">{getDisplayDate()}</h3>
    </div>
  );
};

export default BoxscoreHeader;
