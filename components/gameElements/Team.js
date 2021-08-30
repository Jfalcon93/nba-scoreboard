import react from "react";
import Image from "next/image";
import { getTeamLogo } from "../../utils/utils";

const Team = ({ wins, losses, logo }) => {
  let team = getTeamLogo(logo);
  return (
    <div className="flex flex-col justify-items-center">
      <Image src={team} width="64" height="64" alt="team logo" />
      <p className="text-center text-sm font-light text-gray-500 mt-2">
        ({wins} - {losses})
      </p>
    </div>
  );
};

export default Team;
