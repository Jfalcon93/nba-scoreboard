import axios from "axios";
import { getToday } from "./date";

const getTodaysScore = async (date) => {
  try {
    const response = await axios.get(
      `http://data.nba.net/data/10s/prod/v1/${date}/scoreboard.json`
    );
    return response.data;
  } catch (error) {
    console.log(error.response.statusText);
    return error.response.statusText;
  }
};

export const getGames = async () => {
  let today = await getToday();
  return await getTodaysScore("20210815");
};
