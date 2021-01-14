import instance from '../../../fetch2'

export const auth = (params) => {
  return instance.post("dev-auth/auth/clientAuth", params).then((res) => res);
};

export const queryDeviceData = (params) => {
  return instance.post("dev-device/api/v1/queryDeviceData",params).then((res)=>res);
}

export const getDeviceHistoryData = (params) => {
  return instance.post("dev-device/api/v1/getDeviceHistoryData",params).then((res)=>res);
}

export const getThingModelByTenant = (params) => {
  return instance.post("dev-thing/api/v1/getThingModelByTenant",params).then((res)=>res);
}

export const getThingModel = (params) => {
  return instance.post("dev-thing/api/v1/getThingModel",params).then((res)=>res);
}