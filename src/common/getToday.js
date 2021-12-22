export const getToday = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
};

export const getYesterday = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + (date.getDate() - 1)).slice(-2);

  return year + "-" + month + "-" + day;
};

export const getBeforeYesterday = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + (date.getDate() - 2)).slice(-2);

  return year + "-" + month + "-" + day;
};

const date = new Date();
export const year = date.getFullYear();
export const month = date.getMonth() + 1;
export const day = date.getDate();
