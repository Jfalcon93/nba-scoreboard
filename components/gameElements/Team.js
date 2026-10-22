import react from "react";
import Image from "next/image";

const Team = ({ wins, losses, logo, name }) => {
  return (
    <div className="flex flex-col justify-items-center w-20">
      <Image src={logo} width="64" height="64" alt={`${name} logo`} />
      <p className="text-center text-xs font-light text-gray-400 mt-2">
        ({wins} - {losses})
      </p>
    </div>
  );
};

export default Team;
