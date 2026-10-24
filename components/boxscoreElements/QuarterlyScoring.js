import Image from "next/image";

const columnLabel = (i) => {
  if (i < 4) return `Q${i + 1}`;
  if (i === 4) return "OT";
  return `${i - 3}OT`;
};

const QuarterlyScoring = ({ vTeam, hTeam }) => {
  // Always show four quarters, plus any overtime periods played
  const periods = Math.max(4, vTeam.linescore.length, hTeam.linescore.length);
  const columns = [...Array(periods).keys()];

  const teamRow = (team, other) => (
    <tr className="border-b border-zinc-900 text-[15px]">
      <th scope="row" className="py-3 text-left font-semibold">
        <span className="flex items-center gap-2.5">
          <Image src={team.logo} width={22} height={22} alt="" className="w-[22px] h-[22px]" />
          {team.tricode}
        </span>
      </th>
      {columns.map((i) => (
        <td key={i} className="text-center text-zinc-300">
          {team.linescore[i] ?? "–"}
        </td>
      ))}
      <td
        className={`text-right font-semibold ${
          Number(team.score) >= Number(other.score) ? "text-white" : "text-zinc-400"
        }`}
      >
        {team.score}
      </td>
    </tr>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[320px] tabular-nums">
        <caption className="sr-only">Scoring by quarter</caption>
        <thead>
          <tr className="border-b border-zinc-800 text-xs text-zinc-400">
            <th scope="col" className="py-2 text-left font-normal">
              Team
            </th>
            {columns.map((i) => (
              <th key={i} scope="col" className="w-11 sm:w-14 text-center font-normal">
                {columnLabel(i)}
              </th>
            ))}
            <th scope="col" className="w-12 sm:w-16 text-right font-normal">
              T
            </th>
          </tr>
        </thead>
        <tbody>
          {teamRow(vTeam, hTeam)}
          {teamRow(hTeam, vTeam)}
        </tbody>
      </table>
    </div>
  );
};

export default QuarterlyScoring;
