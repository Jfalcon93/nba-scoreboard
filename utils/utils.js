export const checkNationalTvGame = (arr) => {
  if (arr.length < 1) {
    return `League Pass`;
  } else {
    return arr[0];
  }
};

export const quarterFormat = (quarter) => {
  if (quarter === 1) {
    return `1st Qtr`;
  } else if (quarter === 2) {
    return `2nd Qtr`;
  } else if (quarter === 3) {
    return `3rd Qtr`;
  } else if (quarter === 4) {
    return `4th Qtr`;
  } else if (quarter === 5) {
    return `OT`;
  } else {
    return `${quarter - 4}OT`;
  }
};
