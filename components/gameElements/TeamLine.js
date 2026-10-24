import Image from "next/image";

// One team's line in a game row: logo, abbreviation, name, record, score.
// `lost` dims the losing team of a finished game.
const TeamLine = ({ team, lost, showScore }) => {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={team.logo}
        width={28}
        height={28}
        alt=""
        className="w-7 h-7 flex-none"
      />
      <span
        className={`w-12 flex-none text-[15px] ${
          lost ? "text-zinc-400" : "font-semibold text-white"
        }`}
      >
        {team.tricode}
      </span>
      <span className="flex-1 min-w-0 flex items-baseline gap-2 whitespace-nowrap overflow-hidden">
        <span
          className={`text-sm truncate ${
            lost ? "text-zinc-400" : "text-zinc-300"
          }`}
        >
          {team.name}
        </span>
        <span className="text-xs text-zinc-400">{team.record}</span>
      </span>
      <span
        className={`min-w-[48px] text-right text-2xl tabular-nums ${
          lost ? "text-zinc-500" : "font-semibold text-white"
        }`}
      >
        {showScore ? team.score : ""}
      </span>
    </div>
  );
};

export default TeamLine;
