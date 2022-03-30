import react from "react";

const QuarterlyScoring = ({ vTeam, hTeam }) => {
  return (
    <div className="flex flex-column my-7 lg:my-12">
      <table className="table-fixed mx-auto">
        <thead>
          <tr>
            <th className="w-24 ... h-12"></th>
            <th className="w-20 ...">Q1</th>
            <th className="w-20 ...">Q2</th>
            <th className="w-20 ...">Q3</th>
            <th className="w-20 ...">Q4</th>
            <th className="w-20 ...">TOL</th>
          </tr>
        </thead>
        <tbody className="text-center text-gray-400">
          <tr>
            <td className="text-left text-white h-12">{vTeam.triCode}</td>
            <td>{vTeam.linescore[0].score}</td>
            <td>{vTeam.linescore[1].score}</td>
            <td>{vTeam.linescore[2].score}</td>
            <td>{vTeam.linescore[3].score}</td>
            <td className="text-white">{vTeam.score}</td>
          </tr>
          <tr>
            <td className="text-left text-white">{hTeam.triCode}</td>
            <td>{hTeam.linescore[0].score}</td>
            <td>{hTeam.linescore[1].score}</td>
            <td>{hTeam.linescore[2].score}</td>
            <td>{hTeam.linescore[3].score}</td>
            <td className="text-white">{hTeam.score}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuarterlyScoring;
