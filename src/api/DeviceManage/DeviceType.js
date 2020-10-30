import interval from "../../../fetch";

// export const login = params =>{
//   return interval.post('user/login',params).then(res=>res)
// }

export const getTypeList = (params) => {
  return interval.get('sblx/list',params).then(res=>res);
};
