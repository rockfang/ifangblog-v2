import Vue from "vue"
import VueX from "vuex"
Vue.use(VueX);
import home from "./modules/blog/home"
import tagArticle from "./modules/blog/tagArticle"
export default new VueX.Store({
  modules:[home,tagArticle]
});
