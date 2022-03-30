// All date functions exported and used across app

const getToday = () => {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  let date = ("0" + currentDate.getDate()).slice(-2);
  // Formatted for api call for current day
  return `${year}${month}${date}`;
};

const formatDate = (date) => {
  let currentDate = date;
  let year = currentDate.getFullYear();
  let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  let day = ("0" + currentDate.getDate()).slice(-2);
  return `${year}${month}${day}`;
};

// Need to create test for end of month to see if it autocalculates to the next month or previous
const getWeek = () => {
  let currentDate = new Date();
  let currentWeek = [];

  for (let i = 3; i >= 1; i--) {
    let today = new Date();
    let first = today.getDate() - i;
    let day = new Date(today.setDate(first));
    currentWeek.push(formatDate(day));
  }

  currentWeek.push(formatDate(currentDate));

  for (let i = 1; i <= 3; i++) {
    let today = new Date();
    let first = today.getDate() + i;
    let day = new Date(today.setDate(first));
    currentWeek.push(formatDate(day));
  }

  return currentWeek;
};

const getDisplayDate = () => {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let options = { month: "long" };
  let month = new Intl.DateTimeFormat("en-US", options).format(currentDate);
  let date = ("0" + currentDate.getDate()).slice(-2);
  // Formatted for display
  return `${month} ${date}, ${year}`;
};

module.exports.getToday = getToday;
module.exports.getDisplayDate = getDisplayDate;
