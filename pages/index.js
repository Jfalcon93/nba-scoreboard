import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import SectionHeading from "../components/SectionHeading";
import { LiveDot } from "../components/LiveBadge";
import DateNav from "../components/gameElements/DateNav";
import GameRow from "../components/gameElements/GameRow";
import useAutoRefresh from "../utils/useAutoRefresh";

const GROUPS = [
  { status: 2, title: "Live" },
  { status: 1, title: "Upcoming" },
  { status: 3, title: "Final" },
];

// Keep refreshing until every game on the day is final
const keepRefreshing = (data) => data.games.some((g) => g.gameStatus !== 3);

export default function Home() {
  const router = useRouter();
  // ?date=YYYYMMDD picks the day; no date means today
  const date = typeof router.query.date === "string" ? router.query.date : null;
  const url = router.isReady
    ? `/api/games${date ? `?date=${encodeURIComponent(date)}` : ""}`
    : null;
  const { data, loading } = useAutoRefresh(url, keepRefreshing);

  // Show the requested day right away, before its games load
  const shownDate = /^\d{8}$/.test(date ?? "")
    ? `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`
    : data?.date ?? null;

  const changeDate = (newDate) => {
    router.push(newDate ? { pathname: "/", query: { date: newDate } } : "/", undefined, {
      shallow: true,
    });
  };

  const liveCount = data ? data.games.filter((g) => g.gameStatus === 2).length : 0;

  let content;
  if (loading || !router.isReady) {
    content = <p className="mt-10">...loading</p>;
  } else if (!data) {
    content = <p className="mt-10">Unable to load games. Try again later.</p>;
  } else if (data.games.length < 1) {
    content = <p className="mt-10">No games on this day.</p>;
  } else {
    content = GROUPS.map((group) => {
      const games = data.games.filter((g) => g.gameStatus === group.status);
      if (games.length < 1) return null;
      return (
        <section key={group.status} className="mt-10">
          <SectionHeading className="mb-1">
            {group.title} · {games.length}
          </SectionHeading>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,400px),1fr))] gap-x-12">
            {games.map((game) => (
              <GameRow key={game.gameId} game={game} />
            ))}
          </div>
        </section>
      );
    });
  }

  return (
    <div className="min-h-screen font-sans text-white bg-black">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NBA Games</title>
      </Head>
      <div className="max-w-[1040px] mx-auto px-4 sm:px-8 lg:px-12 pb-24">
        <Navbar />
        <header className="flex flex-wrap justify-between items-end gap-4 mt-12">
          <div className="flex flex-col gap-1">
            <h1 className="text-[32px] font-medium tracking-tight">NBA Scores</h1>
            <DateNav date={shownDate} isToday={!date} onChange={changeDate} />
          </div>
          <Link
            href="/standings"
            className="inline-flex items-center min-h-[44px] text-[15px] text-blue-400 transition duration-300 ease-in-out hover:text-white"
          >
            [ standings ]
          </Link>
        </header>
        {liveCount > 0 && (
          <p className="flex items-center gap-2 mt-2 text-[13px] text-zinc-400">
            <LiveDot />
            {liveCount} live · scores update every 30 seconds
          </p>
        )}
        {content}
      </div>
    </div>
  );
}
