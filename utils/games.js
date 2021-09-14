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

const getBoxScore = async (date, gameId) => {
  try {
    const response = await axios.get(
      `http://data.nba.net/data/10s/prod/v1/${date}/${gameId}_boxscore.json`
    );
    return response.data;
  } catch (error) {
    console.log(error.response.statusText);
    return error.response.statusText;
  }
};

export const getTeamData = async () => {
  try {
    const response = await axios.get(
      `https://data.nba.net/data/10s/prod/v1/2021/teams.json`
    );
    return response.data;
  } catch (error) {
    console.log(error.response.statusText);
    return error.response.statusText;
  }
};

export const getGames = async () => {
  let today = await getToday();
  return await getTodaysScore(today);
};

export const getGame = async (date, gameId) => {
  return await getBoxScore(date, gameId);
};
