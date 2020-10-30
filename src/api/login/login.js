import interval from "../../../fetch";

export const login = (params) => {
  return interval.post("user/login", params).then((res) => res);
};

export const register = (params) => {
  return interval.post("user/register", params).then((res) => res);
};

export const reset = (username, Email) => {
  return interval
    .get("user/resetPwd/" + username + "/" + Email)
    .then((res) => res);
};

export const getAllCompany = () => {
  return interval.get("company/getAllCompany").then((res) => res);
};
