import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    //重定向
    path: "/",
    redirect: "/login",
  },
  {
    path:'/test',
    component:()=>import('../views/ChartsTest.vue')
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Login/Register.vue"),
  },
  {
    path: "/reset",
    name: "reset",
    component: () => import("../views/Login/Reset.vue"),
  },
  {
    path: "/home",
    name: "Home",
    // meta: {
    //   requireAuth: true, //添加该字段，表示进入这个路由是需要登录的
    // },
    component: () => import("../views/Home.vue"),
    // alias:'/b', //别名
    children: [
      // 概览
      {
        path: "overview",
        name: "overview",
        component: () => import("../views/Overview/Overview.vue"),
      },
      // 设备管理
      {
        path: "deviceManage",
        name: "deviceManage",
        component: () => import("../views/DeviceManage/DeviceType.vue"),
      },
      {
        path: "checkManage",
        name: "checkManage",
        component: () => import("../views/DeviceManage/CheckManage.vue"),
      },
      {
        path: "deviceList/:id",
        name: "deviceList",
        component: () => import("../views/DeviceManage/DeviceList.vue"),
      },
      {
        path: "allDevice",
        name: "allDevice",
        component: () => import("../views/DeviceManage/AllDevice.vue"),
      },
      {
        path: "checkSet/:id",
        name: "checkSet",
        component: () => import("../views/DeviceManage/CheckSet.vue"),
      },
      {
        path: "deviceDetail/:id",
        name: "deviceDetail",
        component: () => import("../views/DeviceManage/DeviceDetail.vue"),
      },
      {
        path: "parameters/:id",
        name: "parameters",
        component: () => import("../views/DeviceManage/Parameters.vue"),
      },
      {
        path: "deviceCheck",
        name: "deviceCheck",
        component: () => import("../views/DeviceCheck/DeviceCheck.vue"),
      },
      {
        path: "deviceAlert",
        name: "deviceAlert",
        component: () => import("../views/DeviceAlert/DeviceAlert.vue"),
      },
      {
        path: "diagnosis",
        name: "diagnosis",
        component: () => import("../views/Diagnosis/Diagnosis.vue"),
      },
      {
        path: "diagnosisContent/:id",
        name: "diagnosisContent",
        component: () => import("../views/Diagnosis/DiagnosisContent.vue"),
      },
      {
        path: "userManage",
        name: "userManage",
        component: () => import("../views/UserManage/UserManage.vue"),
      },
      {
        path:"modifyInfo",
        name:"modifyInfo",
        component:()=>import("../views/UserManage/ModifyInfo.vue")
      },
      {
        path: "model",
        name: "model",
        component: () => import("../views/Model/Model.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//解决重复点击报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;

// 导航守卫
// router.beforeEach((to, from, next) => {
//   //判断是不是登陆页面
//   if (to.path === "/login") return next();
//   const tokenStr = window.localStorage.getItem("access_token");
//   if (!tokenStr) return next("/login");
//   next();
// });
