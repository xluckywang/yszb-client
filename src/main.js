import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
import echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
// import Axios from 'axios';

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

// //配置Axios
// Vue.prototype.$axios = Axios;
// Axios.defaults.baseURL = '/api/'

new Vue({
  router,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
