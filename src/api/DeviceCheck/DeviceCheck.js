import interval from "../../../fetch";

export const getDjfa = (params) => {
  return interval.post("djfa/getDjfa", params).then((res) => res);
};

export const commitDjfa = (params) => {
  return interval.put("djfa/commitDjfa", params).then((res) => res);
};

export const getSbDjxByType = (sbId, djzq) => {
  return interval
    .get("djxm-modify/getSbDjxByType/" + sbId + "/" + djzq)
    .then((res) => res);
};
