import interval from "../../../fetch";

export const getDjxmList = () => {
  return interval.get("djxm-modify/getDjxmList").then((res) => res);
};

