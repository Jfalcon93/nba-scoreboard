import Image from "next/image";

// Away and home values side by side, with bars growing out from the center.
// The larger value's bar is drawn lighter. Made-attempted stats like "20-48"
// get no bar.
const StatRow = ({ stat }) => {
  const isPct = stat.label.endsWith("%");
  const away = Number(stat.away);
  const home = Number(stat.home);
  const showBar = !stat.away.includes("-");
  const max = Math.max(away, home) || 1;
  const bar = (value, other) => ({
    width: `${(value / max) * 100}%`,
    className: value >= other ? "bg-zinc-200" : "bg-zinc-600",
  });
  const awayBar = bar(away, home);
  const homeBar = bar(home, away);

  return (
    <div className="grid grid-cols-[72px_minmax(0,1fr)_72px] items-center gap-y-1.5 py-2.5 border-b border-zinc-900">
      <span className="text-[15px] tabular-nums">
        {stat.away}
        {isPct && "%"}
      </span>
      <span className="text-center text-[13px] text-zinc-400">{stat.label}</span>
      <span className="text-right text-[15px] tabular-nums">
        {stat.home}
        {isPct && "%"}
      </span>
      {showBar && (
        <div aria-hidden="true" className="col-span-3 flex gap-1 h-1">
          <div className="flex-1 flex justify-end bg-zinc-900">
            <div className={awayBar.className} style={{ width: awayBar.width }} />
          </div>
          <div className="flex-1 flex bg-zinc-900">
            <div className={homeBar.className} style={{ width: homeBar.width }} />
          </div>
        </div>
      )}
    </div>
  );
};

const TeamStats = ({ vTeam, hTeam, stats }) => {
  return (
    <div>
      <div className="flex justify-between items-center pb-2 border-b border-zinc-800 text-sm font-semibold">
        <span className="flex items-center gap-2">
          <Image src={vTeam.logo} width={22} height={22} alt="" className="w-[22px] h-[22px]" />
          {vTeam.tricode}
        </span>
        <span className="flex items-center gap-2">
          {hTeam.tricode}
          <Image src={hTeam.logo} width={22} height={22} alt="" className="w-[22px] h-[22px]" />
        </span>
      </div>
      {stats.map((stat) => (
        <StatRow key={stat.label} stat={stat} />
      ))}
    </div>
  );
};

export default TeamStats;
