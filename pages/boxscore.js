import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { getGame } from "../utils/games";
import BoxscoreLayout from "../components/boxscoreElements/BoxscoreLayout";

const Boxscore = () => {
  const router = useRouter();
  const { bid, date } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.query.bid) {
      getGame(date, bid).then((game) => {
        setData(game);
        setLoading(false);
      });
    }
  }, [bid, date, router.query.bid]);

  return (
    <div className="px-4 md:px-16 lg:px-64 flex flex-col font-sans text-white bg-black">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NBA Games</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      {loading ? <div>...loading</div> : <BoxscoreLayout game={data} />}{" "}
      <h3 className="pb-16 pt-8">
        <Link href="/">
          <a className="w-full text-indigo-300 hover:text-white">[ home ]</a>
        </Link>
      </h3>
    </div>
  );
};

export default Boxscore;
