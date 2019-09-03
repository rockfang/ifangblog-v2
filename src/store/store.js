import Vue from "vue"
import VueX from "vuex"
Vue.use(VueX);
import home from "./modules/blog/home"
import tagArticle from "./modules/blog/tagArticle"
import tagWall from "./modules/blog/tagWall"
import articleDetail from "./modules/blog/articleDetail"
import login from "./modules/manager/login"
import admin from "./modules/manager/admin"
import article from "./modules/manager/article"
import articleType from "./modules/manager/articleType"
import link from "./modules/manager/link"
import nav from "./modules/manager/nav"
import tag from "./modules/manager/tag"
export default new VueX.Store({
  modules:[
    home,
    tagArticle,
    tagWall,
    articleDetail,
    login,
    admin,
    article,
    articleType,
    link,
    nav,
    tag,
  ],
  state: {
    loading: false
  },
  mutations: {
    SET_LOADING: (state,loading)=> {
      return state.loading = loading;
    }
  },
  actions: {

  },
  getters: {
    getLoading: (state)=> {
      return state.loading;
    }
  }
});
