import Image from "next/image";

const CATEGORIES = [
  { key: "points", title: "Points" },
  { key: "rebounds", title: "Rebounds" },
  { key: "assists", title: "Assists" },
];

// Higher of the two leaders is emphasized; a missing leader shows "-"
const isTop = (leader, other) =>
  Boolean(leader) && (!other || Number(leader.value) >= Number(other.value));

const LeaderRow = ({ team, leader, top }) => {
  return (
    <div className="flex items-center gap-2.5 py-2.5 border-b border-zinc-900">
      <Image src={team.logo} width={22} height={22} alt={team.tricode} className="w-[22px] h-[22px]" />
      <span className={`flex-1 min-w-0 text-sm ${top ? "text-white" : "text-zinc-300"}`}>
        {leader ? leader.name : ""}
      </span>
      <span
        className={`text-[22px] tabular-nums ${
          top ? "font-semibold text-white" : "text-zinc-400"
        }`}
      >
        {leader ? leader.value : "-"}
      </span>
    </div>
  );
};

const StatLeaders = ({ vTeam, hTeam }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-12 gap-y-4">
      {CATEGORIES.map(({ key, title }) => {
        const away = vTeam.leaders[key];
        const home = hTeam.leaders[key];
        return (
          <div key={key} className="flex flex-col">
            <h3 className="pb-2 border-b border-zinc-800 text-[13px] font-medium text-zinc-300">
              {title}
            </h3>
            <LeaderRow team={vTeam} leader={away} top={isTop(away, home)} />
            <LeaderRow team={hTeam} leader={home} top={isTop(home, away)} />
          </div>
        );
      })}
    </div>
  );
};

export default StatLeaders;
