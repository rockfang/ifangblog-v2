import Vue from "vue"

const state = {
  detailArticle: "",
};
const mutations = {
  SET_DETAIL_AETICLE: (state,detailArticle)=> {
    state.detailArticle = detailArticle;
  }
};

const actions = {
  initArticleDetail:({commit},id)=> {
    commit("SET_LOADING",true);
    Vue.http.get("index/articleDetail?id=" + id).then(response => {
        if (response.body.success) {
          commit("SET_LOADING",false);
          commit("SET_DETAIL_AETICLE",response.body.article.renderText);
        }
      },response => {
          commit("SET_LOADING",false);
      });
  }
};

const getters = {
  detailArticle: (state)=> {
    return state.detailArticle;
  }
};

export default {
  state,mutations,getters,actions
}
