import react from "react";

const StandingsTeam = ({ team }) => {
  let teamStreak;

  if (team.streak > 0) {
    teamStreak = (
      <td className="md:pr-12 pr-1 text-center lg:text-right text-green-500">
        +{team.streak}
      </td>
    );
  } else if (team.streak < 0) {
    teamStreak = (
      <td className="md:pr-12 pr-1 text-center lg:text-right text-red-500">
        {team.streak}
      </td>
    );
  } else {
    teamStreak = (
      <td className="md:pr-12 pr-1 text-center lg:text-right text-gray-400">
        -
      </td>
    );
  }

  return (
    <tr className="text-right even:bg-zinc-800 hover:bg-zinc-700">
      <td className="md:pr-12 pr-1 py-1">{team.rank}</td>
      <td className="md:pr-12 pr-1 font-bold">{team.tricode}</td>
      <td className="md:pr-12 pr-1">
        {team.wins}-{team.losses}
      </td>
      <td className="md:pr-12 pr-1">{team.winPct}</td>
      <td className="md:pr-12 pr-1">{team.gamesBehind}</td>
      {teamStreak}
      <td className="md:pr-12 pr-1">{team.lastTen}</td>
      <td className="md:pr-12 pr-1">{team.home}</td>
      <td className="md:pr-12 pr-1">{team.away}</td>
    </tr>
  );
};

export default StandingsTeam;
