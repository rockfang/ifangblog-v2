import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import index from './routes/index.js'
import admin from './routes/admin.js'
//vuex引入
import store from "./store/store"
//vue-rource使用
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.withCredentials = true;//处理跨域session失效问题.含义是允许传跨域传cookie
Vue.http.options.root = "https://api.icaifun.com";
// Vue.http.options.root = "http://localhost:3005/";
//mavonEditor使用
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor);

const router = new VueRouter(
  {
    mode: 'history',
    routes: [
      ...index,
      ...admin
    ],

  }
);
//路由守卫，处理，路由切换后都滑动到顶部。 .main为router-view所在的外层div
router.beforeEach((to, from, next) => {
    let main = document.querySelector(".main");
    let managerCon = document.querySelector(".out-con");
    if(main) {
      main.scrollTop = 0;
    }

    if(managerCon) {
      managerCon.scrollTop = 0;
    }
  next()
});

//注册element-ui组件
require("./module/element");

import notifyTool from './module/notifyTool.js'

/**
 * vue-resource拦截器
 */
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if(response.body.code == 1002) {
      notifyTool.errorTips2(vm,'请登录','未登录或登录失效,请登录');
      router.push('/login');
      return response
    }
  });
});

let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
