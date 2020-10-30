import interval from "../../../fetch";

export const getDjxmList = (params) => {
  return interval.get("djxm/getDjxmList/" + params).then((res) => res);
};

export const addDjfa = (params) => {
  return interval.post("djfa/addDjfa", params).then((res) => res);
};

export const getDefaultConfig = (params) => {
  return interval
    .get("defaultconfig/getDefaultConfig/" + params)
    .then((res) => res);
};
