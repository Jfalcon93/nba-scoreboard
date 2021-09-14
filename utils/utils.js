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

let fullTeamName = {
  ATL: "Hawks",
  BOS: "Celtics",
  BKN: "Nets",
  CHA: "Hornets",
  CHI: "Bulls",
  CLE: "Cavaliers",
  DAL: "Mavericks",
  DEN: "Nuggets",
  DET: "Pistons",
  GSW: "Warriors",
  HOU: "Rockets",
  IND: "Pacers",
  LAC: "Clippers",
  LAL: "Lakers",
  MEM: "Grizzlies",
  MIA: "Heat",
  MIL: "Bucks",
  MIN: "Timberwolves",
  NOP: "Pelicans",
  NYK: "Knicks",
  OKC: "Thunder",
  ORL: "Magic",
  PHI: "76ers",
  PHX: "Suns",
  POR: "Trailblazers",
  SAC: "Kings",
  SAS: "Spurs",
  TOR: "Raptors",
  UTA: "Jazz",
  WAS: "Wizards",
};

export const getFullTeamName = (triCode) => {
  return fullTeamName[triCode];
};
