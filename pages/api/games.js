import axios from "axios";
import { getToday } from "../../utils/date";

export default async function handler(req, res) {
  let today = await getToday();
  const response = await axios
    .get(
      `https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json`
    )
    .then((response) => {
      return response.data.scoreboard;
    })
    .catch((error) => {
      console.log(error.response.statusText);
      return error.response.statusText;
    });
  res.status(200).json(response);
}
