import axios from "axios";
import router from "./src/router";
import { Message, Loading } from "element-ui";

var url = "  http://140.143.235.204:8081";

const interval = axios.create({
  baseURL: url,
});
let loading; //定义loading变量
function startLoading() {
  //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: "加载中...",
    background: "rgba(0, 0, 0, 0.7)",
  });
}
function endLoading() {
  //使用Element loading-close 方法
  loading.close();
}
function LoginOut() {
  router.push({ path: "/" });
}
function message(message) {
  Message.error({
    message: message,
  });
}

interval.interceptors.request.use(
  (config) => {
    // console.log(config)
    if (config.url == "/api-auth/oauth/token") {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      config.headers["x-requested-with"] = "XMLHttpRequest";
    } else {
      config.headers["Content-Type"] = "application/json;charset=UTF-8";
      config.headers["x-requested-with"] = "XMLHttpRequest";
      config.headers["Authorization"] =
        // "Bearer " + 
        window.localStorage.getItem("access_token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
interval.interceptors.response.use(
  (res) => {
    startLoading();
    endLoading();
    return res;
  },
  (error) => {
    // 错误提醒
    // endLoading()
    if (error.response) {
      // console.log(error.response)
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          error.message = "未授权，请登录";
          message("未授权，请登录");
          LoginOut();
          break;
        case 403:
          Message.error("token值无效，请重新登录");
          message("token值无效，请重新登录");
          // 清除token
          LoginOut();
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          message("服务器内部错误");
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
          error.message = "其他情况";
      }
    }
    return Promise.reject(error);
  }
);

export default interval;
