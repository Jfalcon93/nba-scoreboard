import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { getDisplayDate } from "../utils/date";
import LeagueStandings from "../components/standings/leagueStandings";
import ConferenceStandings from "../components/standings/conferenceStandings";

const Standings = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [view, setView] = useState("league");

  useEffect(() => {
    axios
      .get("/api/standings")
      .then((response) => setData(response.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const tabClass = (target) =>
    `mr-4 text-indigo-500 hover:text-white ${
      view === target ? "underline decoration-2" : ""
    }`;

  let content;
  if (loading) {
    content = <div>...loading</div>;
  } else if (error) {
    content = <div> Unable to load standings. Try again later. </div>;
  } else if (view === "league") {
    content = <LeagueStandings teams={data.league} />;
  } else {
    content = (
      <>
        <h3 className="mt-4 text-gray-400">Eastern Conference</h3>
        <ConferenceStandings teams={data.east} />
        <h3 className="text-gray-400">Western Conference</h3>
        <ConferenceStandings teams={data.west} />
      </>
    );
  }

  return (
    <div className="px-4 md:px-16 lg:px-32 2xl:px-96 flex flex-col font-sans text-white bg-black">
      <Head>
        <meta charSet="utf-8" />
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
          <li>
            <button
              className={tabClass("conference")}
              onClick={() => setView("conference")}
            >
              [ Conference ]
            </button>
          </li>
          <li>
            <button
              className={tabClass("league")}
              onClick={() => setView("league")}
            >
              [ League ]
            </button>
          </li>
        </ul>
        {content}
      </div>
      <h3 className="pb-16 pt-8">
        <Link href="/" className="w-full text-indigo-300 hover:text-white">
          [ home ]
        </Link>
      </h3>
    </div>
  );
};

export default Standings;
