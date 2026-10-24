import { useState } from "react";
import SectionHeading from "../SectionHeading";

// ESPN column labels, in the order the table shows them
const COLUMNS = ["MIN", "PTS", "REB", "AST", "FG", "3PT", "FT", "STL", "BLK", "TO", "PF", "+/-"];

const stickyCell = "sticky left-0 bg-black";

const GroupRow = ({ label }) => (
  <tr>
    <th
      colSpan={COLUMNS.length + 1}
      scope="colgroup"
      className={`${stickyCell} pt-4 pb-1.5 text-left text-xs font-semibold uppercase tracking-[0.08em] text-zinc-400`}
    >
      {label}
    </th>
  </tr>
);

const PlayerRow = ({ player }) => (
  <tr className="border-b border-zinc-900">
    <th scope="row" className={`${stickyCell} py-2 pr-3 text-left font-normal whitespace-nowrap`}>
      {player.name} <span className="text-[11px] text-zinc-400">{player.position}</span>
    </th>
    {COLUMNS.map((col) => (
      <td
        key={col}
        className={`text-right ${col === "PTS" ? "font-semibold text-white" : "text-zinc-300"}`}
      >
        {player.stats[col]}
      </td>
    ))}
  </tr>
);

const PlayerStats = ({ vTeam, hTeam, players }) => {
  const [selected, setSelected] = useState("away");
  const team = selected === "away" ? vTeam : hTeam;
  const box = players[selected];

  const toggleClass = (side) =>
    `min-h-[44px] px-3 text-[15px] text-indigo-400 transition duration-300 ease-in-out hover:text-white ${
      selected === side ? "underline decoration-2 underline-offset-4" : ""
    }`;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
        <SectionHeading>Box score</SectionHeading>
        <div className="flex -mr-3">
          <button
            type="button"
            aria-pressed={selected === "away"}
            onClick={() => setSelected("away")}
            className={toggleClass("away")}
          >
            [ {vTeam.name} ]
          </button>
          <button
            type="button"
            aria-pressed={selected === "home"}
            onClick={() => setSelected("home")}
            className={toggleClass("home")}
          >
            [ {hTeam.name} ]
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] text-sm tabular-nums">
          <caption className="sr-only">{team.name} player stats</caption>
          <thead>
            <tr className="border-b border-zinc-800 text-xs text-zinc-400">
              <th scope="col" className={`${stickyCell} w-[168px] py-2 text-left font-normal`}>
                Player
              </th>
              {COLUMNS.map((col) => (
                <th key={col} scope="col" className="w-14 text-right font-normal">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <GroupRow label="Starters" />
            {box.starters.map((player) => (
              <PlayerRow key={player.id} player={player} />
            ))}
            {box.bench.length > 0 && <GroupRow label="Bench" />}
            {box.bench.map((player) => (
              <PlayerRow key={player.id} player={player} />
            ))}
            <tr className="border-t border-zinc-800 font-semibold">
              <th scope="row" className={`${stickyCell} py-2.5 text-left`}>
                Totals
              </th>
              {COLUMNS.map((col) => (
                <td key={col} className="text-right">
                  {box.totals[col]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      {box.didNotPlay.length > 0 && (
        <p className="mt-3 text-[13px] text-zinc-400">
          Did not play: {box.didNotPlay.join(", ")}
        </p>
      )}
    </div>
  );
};

export default PlayerStats;
