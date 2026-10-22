import Head from "next/head";
import { useState, useEffect } from "react";
import { getDisplayDate } from "../utils/date";
import Navbar from "../components/Navbar";
import GameLayout from "../components/gameElements/GameLayout";
import Link from "next/link";
import axios from "axios";

const REFRESH_INTERVAL = 30 * 1000;

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Refresh scores until every game is final. Skip refreshes while the tab is
  // hidden and catch up as soon as it's visible again.
  useEffect(() => {
    let timer;
    let cancelled = false;

    const loadGames = async () => {
      clearTimeout(timer);
      let keepRefreshing = true;
      try {
        const response = await axios.get("/api/games");
        if (cancelled) return;
        setGames(response.data.games);
        setError(false);
        keepRefreshing = response.data.games.some((g) => g.gameStatus !== 3);
      } catch {
        if (cancelled) return;
        setError(true);
      }
      setLoading(false);
      if (keepRefreshing && !document.hidden) {
        timer = setTimeout(loadGames, REFRESH_INTERVAL);
      }
    };

    const onVisibilityChange = () => {
      if (!document.hidden) loadGames();
    };

    loadGames();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // A failed refresh keeps showing the last scores we loaded
  let content;
  if (loading) {
    content = <div>...loading</div>;
  } else if (games.length > 0) {
    content = games.map((game) => (
      <div key={game.gameId}>
        <GameLayout game={game} />
      </div>
    ));
  } else if (error) {
    content = <div> Unable to load games. Try again later. </div>;
  } else {
    content = <div> No Games Today </div>;
  }

  return (
    <>
      <div className="px-4 md:px-16 lg:px-64 2xl:px-96 flex flex-col font-sans text-white bg-black">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
            rel="stylesheet"
          />
          <title>NBA Games</title>
        </Head>
        <Navbar />
        <div className="my-7">
          <h1 className="text-2xl md:text-3xl">NBA Scores</h1>
          <h3 className="mt-2 mb-7 text-gray-400">{getDisplayDate()}</h3>
          <Link
            href="/standings"
            className="transition duration-300 ease-in-out text-blue-400 hover:text-white"
          >
            [ standings ]
          </Link>
        </div>
        <div className="mt-4 flex flex-col md:grid md:gap-x-16 xl:gap-x-32 md:grid-cols-2 2xl:gap-x-48">
          {content}
        </div>
        <footer className="pb-32"></footer>
      </div>
    </>
  );
}
