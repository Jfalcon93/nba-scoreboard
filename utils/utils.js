export const getTeamLogo = (team) => {
  let lowerTeam = team.toLowerCase();
  return `http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${lowerTeam}.png`;
};

export const checkNationalTvGame = (arr) => {
  if (arr.length < 1) {
    return `League Pass`;
  } else {
    return arr[0].shortName;
  }
};
