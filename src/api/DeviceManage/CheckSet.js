import interval from "../../../fetch";

export const getDjxmList = (params) => {
  return interval.get("djxm/getDjxmList/" + params).then((res) => res);
};

export const addSbDjxm = (params) => {
  return interval.post("sb-djxm/addSbDjxm", params).then((res) => res);
};

export const getSbDjxmBySbId = (params) => {
  return interval.get("sb-djxm/getSbDjxmBySbId/" + params).then((res) => res);
};

export const getSbDjxmById = (params) => {
  return interval.get("djxm-modify/getSbDjxmById/" + params).then((res) => res);
};