import axios from "axios";
import { getToday } from "./date";

const getTodaysScore = async (date) => {
  try {
    const response = await axios.get(
      `https://data.nba.net/data/10s/prod/v1/${date}/scoreboard.json`
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
      `https://data.nba.net/data/10s/prod/v1/${date}/${gameId}_boxscore.json`
    );
    return response.data;
  } catch (error) {
    console.log(error.response.statusText);
    return error.response.statusText;
  }
};

export const getStandings = async () => {
  try {
    const response = await axios.get(
      `https://data.nba.net/10s/prod/v1/current/standings_all.json`
    );
    return response.data;
  } catch (error) {
    console.log(error.response.statusText);
    return error.response.statusText;
  }
};

export const getConferenceStandings = async () => {
  try {
    const response = await axios.get(
      `https://data.nba.net/10s/prod/v1/current/standings_conference.json`
    );
    return response;
  } catch (error) {
    console.log(error.response.statusText);
    return error.response.statusText;
  }
};

export const getPlayerPic = async (playerId) => {
  try {
    const response = await axios.get(
      `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`
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
