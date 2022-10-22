import react from "react";

const StandingsTeam = ({ team }) => {
  let teamStreak;

  if (team.isWinStreak) {
    teamStreak = (
      <td className="md:pr-12 pr-1 text-center lg:text-right text-green-500">
        +{team.streak}
      </td>
    );
  } else {
    teamStreak = (
      <td className="md:pr-12 pr-1 text-center lg:text-right text-red-500">
        -{team.streak}
      </td>
    );
  }

  return (
    <tr className="text-right hover:bg-zinc-700">
      <td className="md:pr-12 pr-1 py-1">{team.sortKey.defaultOrder}</td>
      <td className="md:pr-12 pr-1 font-bold">
        {team.teamSitesOnly.teamTricode}
      </td>
      <td className="md:pr-12 pr-1">
        {team.win}-{team.loss}
      </td>
      <td className="md:pr-12 pr-1">{team.winPct}</td>
      <td className="md:pr-12 pr-1">{team.gamesBehind}</td>
      {teamStreak}
      <td className="md:pr-12 pr-1">
        {team.lastTenWin}-{team.lastTenLoss}
      </td>
      <td className="md:pr-12 pr-1">
        {team.homeWin}-{team.homeLoss}
      </td>
      <td className="md:pr-12 pr-1">
        {team.awayWin}-{team.awayLoss}
      </td>
    </tr>
  );
};

export default StandingsTeam;
