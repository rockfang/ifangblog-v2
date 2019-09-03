import Vue from "vue"

const state = {
  tags: [],
};
const mutations = {
  SET_TAGS_WALL: (state,tags)=> {
    state.tags = tags;
  }
};

const actions = {
  initTagData:({commit})=> {
    commit("SET_LOADING",true);
    Vue.http.get("index/tags").then(response => {
        if (response.body.success) {
          commit("SET_LOADING",false);
          commit("SET_TAGS_WALL",response.body.tags);
        }
      },response => {
          commit("SET_LOADING",false);
      });
  }
};

const getters = {
  wallTags: (state)=> {
    return state.tags;
  }
};

export default {
  state,mutations,getters,actions
}
