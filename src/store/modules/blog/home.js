import Vue from "vue"

const state = {
  homeArticles: [],
  homePageCount: 0
};
const mutations = {
  SET_HOME_ARTICLES: (state,articles)=> {
    state.homeArticles = articles;
  },
  SET_HOME_PAGECOUNT: (state,pageCount)=> {
    state.homePageCount = pageCount;
  },
};

const actions = {

  requestHomeArticles:({commit},pageInfo)=> {
    commit("SET_LOADING",true);
    Vue.http.get("index?pageSize=" + pageInfo.pageSize + "&page=" + pageInfo.page)
      .then(response => {
        if (response.body.success) {
          commit("SET_LOADING",false);
          commit("SET_HOME_ARTICLES",response.body.articles);
          commit("SET_HOME_PAGECOUNT",response.body.pageCount);
        }
      },response => {
          commit("SET_LOADING",false);
      });
  },
};

const getters = {
  homePageCount: (state)=> {
    return state.homePageCount;
  },
  homeArticles: (state)=> {
    return state.homeArticles;
  }
};

export default {
  state,mutations,getters,actions
}
