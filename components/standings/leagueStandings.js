import Head from "next/head";
import Link from "next/link";
import StandingsTeam from "./standingsTeam";

const LeagueStandings = ({ teams }) => {
  return (
    <div className="flex flex-col my-7">
      <table className="table-auto text-xxs md:text-base">
        <thead>
          <tr className="text-right border-b border-zinc-700 rounded-md">
            <th className="md:pr-12 pr-1"></th>
            <th className="md:pr-12 pr-1"></th>
            <th className="md:pr-12 pr-1">W-L</th>
            <th className="md:pr-12 pr-1">PCT</th>
            <th className="md:pr-12 pr-1">GB</th>
            <th className="md:pr-12 pr-1">STRK</th>
            <th className="md:pr-12 pr-1">L10</th>
            <th className="md:pr-12 pr-1">HOME</th>
            <th className="md:pr-12 pr-1">AWAY</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, i) => {
            return <StandingsTeam team={team} key={i} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueStandings;
