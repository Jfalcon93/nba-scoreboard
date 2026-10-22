import react from "react";

const periodLabel = (i) => {
  if (i < 4) return `Q${i + 1}`;
  if (i === 4) return "OT";
  return `${i - 3}OT`;
};

const QuarterlyScoring = ({ vTeam, hTeam }) => {
  // Always show four quarters, plus any overtime periods played
  const periods = Math.max(4, vTeam.linescore.length, hTeam.linescore.length);
  const columns = [...Array(periods).keys()];

  const teamRow = (team, rowClass) => (
    <tr>
      <td className={`text-left text-white ${rowClass}`}>{team.tricode}</td>
      {columns.map((i) => (
        <td key={i}>{team.linescore[i] ?? "-"}</td>
      ))}
      <td className="text-white">{team.score}</td>
    </tr>
  );

  return (
    <div className="flex flex-column my-7 lg:my-12">
      <table className="table-fixed mx-auto">
        <thead>
          <tr>
            <th className="w-24 h-12"></th>
            {columns.map((i) => (
              <th key={i} className="w-20">
                {periodLabel(i)}
              </th>
            ))}
            <th className="w-20">TOT</th>
          </tr>
        </thead>
        <tbody className="text-center text-gray-400">
          {teamRow(vTeam, "h-12")}
          {teamRow(hTeam, "")}
        </tbody>
      </table>
    </div>
  );
};

export default QuarterlyScoring;
