import interval from "../../../fetch";

export const getSbDetail = (params) => {
  return interval.get("sbxx/getSbDetail/" + params).then(res => res);
};

export const getSblxPicture = (params) => {
  return interval.get("sblx/getSblxPicture/" + params).then(res => res);
};

export const getCsdetail = (params) => {
  return interval.post("sbcs/getCsdetail", params).then(res => res);
};
