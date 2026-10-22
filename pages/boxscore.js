import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import BoxscoreLayout from "../components/boxscoreElements/BoxscoreLayout";

const Boxscore = () => {
  const router = useRouter();
  const { bid } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bid) return;
    axios
      .get(`/api/boxscore/${encodeURIComponent(bid)}`)
      .then((response) => setData(response.data))
      .catch((err) =>
        setError(
          err.response?.status === 404
            ? "Game not found."
            : "Unable to load boxscore. Try again later."
        )
      )
      .finally(() => setLoading(false));
  }, [bid]);

  let content;
  if (router.isReady && !bid) {
    content = <div className="my-7">Game not found.</div>;
  } else if (loading) {
    content = <div>...loading</div>;
  } else if (error) {
    content = <div className="my-7">{error}</div>;
  } else {
    content = <BoxscoreLayout game={data} />;
  }

  return (
    <div className="px-4 md:px-16 lg:px-64 flex flex-col font-sans text-white bg-black">
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
      {content}{" "}
      <h3 className="pb-16 pt-8">
        <Link href="/" className="w-full text-indigo-300 hover:text-white">
          [ home ]
        </Link>
      </h3>
    </div>
  );
};

export default Boxscore;
