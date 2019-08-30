import Vue from "vue"
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
    Vue.http.get("admin/link").then(response => {
      if (response.body.success) {
        commit("SET_Link_TABLE_DATA",response.body.links);
      }
    },response => {

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
  deleteLink: (params)=> {
    let id = params.id;
    let vm = params.vm;
    Vue.http.get('admin/link/delete?id='+ id).then(response => {
      if (response.body.success) {
        notifyTool.successTips(vm,'成功',response.body.msg);
        this.initData();
      } else {
        notifyTool.errorTips(vm,'失败',response.body.msg);
      }
    },response => {
      notifyTool.errorTips(vm,'失败','删除失败');
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
