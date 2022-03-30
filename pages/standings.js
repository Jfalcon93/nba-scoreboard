import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { getConferenceStandings, getStandings } from "../utils/games";
import { getDisplayDate } from "../utils/date";
import StandingsTeam from "../components/standings/standingsTeam";
import LeagueStandings from "../components/standings/leagueStandings";

const Standings = () => {
  const router = useRouter();
  const { bid, date } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStandings().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="px-4 md:px-16 lg:px-64 flex flex-col font-sans text-white bg-black">
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
      <div className="flex flex-col my-7">
        <h3 className="text-2xl md:text-3xl">NBA Standings</h3>
        <h3 className="mt-2 mb-7 text-gray-400">{getDisplayDate()}</h3>
        <ul className="flex flex-row mb-4">
          <li className="mr-4 text-indigo-500 hover:text-white">
            [ Conference ]
          </li>
          <li className="mr-4 text-indigo-500 underline decoration-2 hover:text-white">
            [ League ]
          </li>
        </ul>
        {loading ? (
          <tr>...loading</tr>
        ) : (
          <LeagueStandings teams={data.league.standard.teams} />
        )}{" "}
      </div>
      <h3 className="pb-16 pt-8">
        <Link href="/">
          <a className="w-full text-indigo-300 hover:text-white">[ home ]</a>
        </Link>
      </h3>
    </div>
  );
};

export default Standings;
