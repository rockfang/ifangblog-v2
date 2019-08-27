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
    Vue.http.get("index?pageSize=" + pageInfo.pageSize + "&page=" + pageInfo.page)
      .then(response => {
        if (response.body.success) {
          console.log('------------');
          console.log(response.body.articles);

          commit("SET_HOME_ARTICLES",response.body.articles);
          commit("SET_HOME_PAGECOUNT",response.body.pageCount);
        }
      },response => {

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
