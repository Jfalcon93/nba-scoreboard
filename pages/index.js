import Head from "next/head";
import { useState, useEffect } from "react";
import { getGames } from "../utils/games";
import { getDisplayDate } from "../utils/date";
import Navbar from "../components/Navbar";
import GameLayout from "../components/gameElements/GameLayout";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState({ games: [] });

  useEffect(() => {
    let mounted = true;
    getGames().then((games) => {
      if (mounted) {
        setData(games);
      }
    });
    return () => (mounted = false);
  }, []);
  return (
    <div className="px-4 md:px-16 lg:px-64 2xl:px-96 flex flex-col font-sans text-white bg-black">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
          href={{
            pathname: "/standings/",
          }}
        >
          <a className="transition duration-300 ease-in-out text-blue-400 hover:text-white">
            [ standings ]
          </a>
        </Link>
      </div>
      <div className="mt-4 flex flex-col md:grid md:gap-x-16 xl:gap-x-32 md:grid-cols-2 2xl:gap-x-48">
        {data.games.length < 1 ? (
          <div> No Games Today </div>
        ) : (
          data.games.map((game, i) => {
            return (
              <div key={i}>
                <GameLayout game={{ game }} />
              </div>
            );
          })
        )}
      </div>
      <footer className="pb-32"></footer>
    </div>
  );
}
