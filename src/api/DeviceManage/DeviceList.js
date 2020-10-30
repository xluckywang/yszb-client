import interval from "../../../fetch";

export const getDevList = (params) => {
  return interval.post('sbxx/list',params).then(res=>res);
};

export const getTypeName = (params) => {
  return interval.get('sblx/getSblxName/'+params).then(res=>res);
}

export const updateSbxx = (params) =>{
  return interval.post('sbxx/updateSbxx',params).then(res=>res);
}

export const addSbxx = (params) =>{
  return interval.post('sbxx/addSbxx',params).then(res=>res);
}