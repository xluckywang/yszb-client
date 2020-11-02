import interval from "../../../fetch";

export const getDjxmList = () => {
  return interval.get("djxm-modify/getDjxmList").then((res) => res);
};

export const addDjxm = (params) => {
  return interval.post("djxm-modify/addDjxm", params).then((res) => res);
};

export const delDjxm = (params) => {
  return interval.delete("djxm-modify/delDjxm/" + params).then((res) => res);
};

export const modityDjxm = (params) => {
  return interval.post("djxm-modify/modityDjxm", params).then((res) => res);
};
