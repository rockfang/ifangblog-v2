/* eslint-disable */
import Vue from "vue"
import commonTool from '../../../module/commonTool.js'
import notifyTool from '../../../module/notifyTool.js'
const state = {
  linkTableData: [],
};
const mutations = {
  SET_Link_TABLE_DATA: (state,linkTableData)=> {
    state.linkTableData = linkTableData;
  }
};

const actions = {
  initLinksData:({commit})=> {
    commit("SET_LOADING",true);
    Vue.http.get("admin/link").then(response => {
      commit("SET_LOADING",false);
      if (response.body.success) {
        commit("SET_Link_TABLE_DATA",response.body.links);
      }
    },response => {
      commit("SET_LOADING",false);
    });
  },
  changeLinkSort: ({commit},params)=> {
    Vue.http.post("admin/changeSort",params).then(response => {
      if (response.body.success) {
      }
    },response => {
    });
  },
  changeLinkState: ({commit},params)=> {
    let vm = params.vm;
    let row = params.row;
    Vue.http.post("admin/changeState",{
      id: row._id,
      collectionName:'link',
      attr: 'state'
    }).then(response => {
      if (response.body.success) {
        notifyTool.successTips(vm,'成功',response.body.msg);
        if (row.state == '1') {
          row.state = '0';
        } else {
          row.state = '1';
        }
      }
    },response => {
    });
  },
  deleteLink: ({commit,dispatch},params)=> {
    let id = params.id;
    let vm = params.vm;
    Vue.http.get('admin/link/delete?id='+ id).then(response => {
      if (response.body.success) {
        notifyTool.successTips(vm,'成功',response.body.msg);
        dispatch("initLinksData");
      } else {
        notifyTool.errorTips(vm,'失败',response.body.msg);
      }
    },response => {
      notifyTool.errorTips(vm,'失败','删除失败');
    });
  },submitNewLink: ({commit},params)=> {
    let vm = params.vm;
    if (!params.link) {
      notifyTool.normalTips(vm,'','请填写链接地址');
      return;
    }
    if (params.sort && !commonTool.checkNum(params.sort)) {
      notifyTool.normalTips(vm,'','请填写数字排序序号');
      return;
    }
    commit("SET_LOADING",true);
    Vue.http.post("admin/link/doAdd",{
      name: params.name,
      link: params.link,
      owner: params.owner,
      state: params.state,
      sort: params.sort
    }).then(response => {
      commit("SET_LOADING",false);
      if (response.body.success) {
        notifyTool.successTips(vm,'成功',response.body.msg);
        vm.$router.push({path:'/manager/link'});
      } else {
        notifyTool.errorTips(vm,'失败',response.body.msg);
      }
    },response => {
      commit("SET_LOADING",false);
      notifyTool.errorTips(vm,'添加失败','信息提交失败');
    });
  }
};

const getters = {
  linkTableData: (state)=> {
    return state.linkTableData;
  }
};

export default {
  state,mutations,getters,actions
}
