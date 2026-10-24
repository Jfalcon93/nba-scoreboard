import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import BoxscoreLayout from "../components/boxscoreElements/BoxscoreLayout";
import useAutoRefresh from "../utils/useAutoRefresh";

// Keep refreshing until the game is final
const keepRefreshing = (game) => game.gameStatus !== 3;

const Boxscore = () => {
  const router = useRouter();
  const { bid } = router.query;
  const url = bid ? `/api/boxscore/${encodeURIComponent(bid)}` : null;
  const { data, error, loading } = useAutoRefresh(url, keepRefreshing);

  let content;
  if (router.isReady && !bid) {
    content = <p className="my-7">Game not found.</p>;
  } else if (loading || !router.isReady) {
    content = <p className="my-7">...loading</p>;
  } else if (!data) {
    content = (
      <p className="my-7">
        {error?.response?.status === 404
          ? "Game not found."
          : "Unable to load boxscore. Try again later."}
      </p>
    );
  } else {
    content = <BoxscoreLayout game={data} />;
  }

  const title = data
    ? `${data.awayTeam.name} at ${data.homeTeam.name} | NBA Games`
    : "NBA Games";

  return (
    <div className="min-h-screen font-sans text-white bg-black">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </Head>
      <div className="max-w-[1040px] mx-auto px-4 sm:px-8 lg:px-12 pb-24">
        <Navbar />
        <Link
          href="/"
          className="inline-flex items-center min-h-[44px] mt-8 text-[15px] text-indigo-400 transition duration-300 ease-in-out hover:text-white"
        >
          [ ← scores ]
        </Link>
        {content}
      </div>
    </div>
  );
};

export default Boxscore;
