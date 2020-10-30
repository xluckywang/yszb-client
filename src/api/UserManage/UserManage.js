import interval from "../../../fetch";

export const getUserList = (params) => {
  return interval.post("user/pageUser", params).then((res) => res);
};

export const getUnauthorizedUser = () => {
  return interval.get("user/getUnauthorizedUser").then((res) => res);
};

export const updateUser = (params) => {
  return interval.put("user/updateUser", params).then((res) => res);
};

export const deleteUserbyPhone = (params) => {
  return interval.delete("user/deleteUserbyPhone/" + params).then((res) => res);
};


export const updatePwd = (params) => {
  return interval.put("user/updatePwd", params).then((res) => res);
};