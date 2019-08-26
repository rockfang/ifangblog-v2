import Vue from "vue"
const state = {
  tagInfo: {icon:"",name:""},
  ready: false,
  articles: [],
  pageCount: 0
};
const mutations = {
  SET_TAGINFO: (state,tagInfo)=> {
    state.tagInfo = tagInfo;
  },
  SET_ARTICLES: (state,articles)=> {
    state.articles = articles;
  },
  SET_PAGECOUNT: (state,pageCount)=> {
    state.pageCount = pageCount;
  },
};

const actions = {
  getTagInfo: ({commit},tagName)=> {
    Vue.http.get("index/taginfo" + "?name=" + tagName).then(response => {
      if (response.body.success) {
        commit("SET_TAGINFO",{
          icon:response.body.taginfo.icon,
          name:response.body.taginfo.name,
        });
      }
    }, response => {
      console.log(response);
    });
  },
  requestTagArticles:({commit},pageInfo)=> {

    //请求服务器，获取pageCount
    Vue.http.get("index/tagarticle?pageSize=" + pageInfo.pageSize + "&page=" + pageInfo.page + "&tagName=" + pageInfo.tagName)
      .then(response => {
        if (response.body.success) {
          console.log('------------');
          console.log(response.body.articles);

          commit("SET_ARTICLES",response.body.articles);
          commit("SET_PAGECOUNT",response.body.pageCount);
        }
      },response => {

      });
  },
};

const getters = {
  taginfo: (state)=> {
    return state.tagInfo;
  },
  pageCount: (state)=> {
    return state.pageCount;
  },
  articles: (state)=> {
    return state.articles;
  }
};

export default {
  state,mutations,getters,actions
}
