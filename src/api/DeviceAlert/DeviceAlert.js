import interval from "../../../fetch";

export const getYjfaList = (params) => {
  return interval.post("yjfa/getYjfaList", params).then((res) => res);
};

export const commitYjfa = (params) => {
  return interval.post("yjfa/commitYjfa", params).then((res) => res);
};
