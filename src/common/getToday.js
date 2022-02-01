export const getToday = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
};

export const getYesterday = () => {
  let now = new Date()
  let yesterday = new Date(now.setDate(now.getDate() - 1));
  let year = yesterday.getFullYear();
  let month = ("0" + (1 + yesterday.getMonth())).slice(-2);
  let day = ("0" + (yesterday.getDate())).slice(-2);

  return {
    date: year + "-" + month + "-" + day,
    day,
    month
  };
};

export const getBeforeYesterday = () => {
  let now = new Date()
  let beforeYesterday = new Date(now.setDate(now.getDate() - 2));
  let year = beforeYesterday.getFullYear();
  let month = ("0" + (1 + beforeYesterday.getMonth())).slice(-2);
  let day = ("0" + (beforeYesterday.getDate())).slice(-2);

  return {
    date: year + "-" + month + "-" + day,
    day,
    month
  };
};

const date = new Date();
export const year = date.getFullYear();
export const month = date.getMonth() + 1;
export const day = date.getDate();
