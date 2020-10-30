import interval from "../../../fetch";

export const getUserInfo = (params) => {
  return interval.get("user/getUserInfo/" + params).then((res) => res);
};

export const getMySbxx = (params) => {
  return interval.get("sbxx/getMySbxx/" + params).then((res) => res);
};

export const commitIsRead = (params) => {
  return interval.get("userMessage/commitIsRead/" + params).then((res) => res);
};

