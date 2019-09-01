import Vue from "vue"
import notifyTool from '../../../module/notifyTool.js'

const state = {
  loginLoading: false
};
const mutations = {
  SET_LOGIN_LOADING: (state,loginLoading)=> {
    state.loginLoading = loginLoading;
  }
};

const actions = {
  sumitLogin:({commit},params)=> {
    let vm = params.vm;
    let username = params.username;
    let pass = params.pass;
    commit("SET_LOGIN_LOADING",true);
    Vue.http.post("admin/login/doLogin", {
      username: username,
      pass: pass,
    }).then(response => {
      commit("SET_LOGIN_LOADING",false);
      if(response.body.success) {
        notifyTool.successTips(vm,'登录成功','恭喜您登录成功！');
        localStorage.setItem('username',response.body.username);
        vm.$router.push({ path: '/manager/article'})
      } else {
        notifyTool.errorTips(vm,'登录失败',response.body.msg);
      }

    }, response => {
      commit("SET_LOGIN_LOADING",false);
      notifyTool.errorTips(vm,'登录失败','很遗憾,登录失败');
    });
  },
  loginOut: ({commit},vm)=> {
    Vue.http.get("admin/login/loginOut").then(response => {
      console.log(response.body);
      if(response.body.success) {
        notifyTool.normalTips(vm,'退出成功','您已退出登录！');
        localStorage.removeItem('username');
        vm.$router.push({ path: '/login'})
      }
    },response => {

    });
  }
};

const getters = {
  loginLoading: (state)=> {
    return state.loginLoading;
  }
};

export default {
  state,mutations,getters,actions
}
