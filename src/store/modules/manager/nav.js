import Vue from "vue"
import commonTool from '../../../module/commonTool.js'
import notifyTool from '../../../module/notifyTool.js'
const state = {
  navTableData: [],
};
const mutations = {
  SET_NAV_TABLE_DATA: (state,navTableData)=> {
    state.navTableData = navTableData;
  }
};

const actions = {
  initNavData:({commit})=> {
    Vue.http.get("admin/nav").then(response => {
      if (response.body.success) {
        commit("SET_NAV_TABLE_DATA",response.body.nav);
      }
    },response => {

    });
  },
  changeNavSort: ({commit},params)=> {
    Vue.http.post("admin/changeSort",params).then(response => {
      if (response.body.success) {
      }
    },response => {
    });
  },
  changeNavState: ({commit},params)=> {
    let vm = params.vm;
    let row = params.row;
    Vue.http.post("admin/changeState",{
      id: row._id,
      collectionName:'nav',
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
  deleteNav: ({commit,dispatch},params)=> {
    let id = params.id;
    let vm = params.vm;
    Vue.http.get('admin/nav/delete?id='+ id).then(response => {
      if (response.body.success) {
        notifyTool.successTips(vm,'成功',response.body.msg);
        dispatch("initNavData");
      } else {
        notifyTool.errorTips(vm,'失败',response.body.msg);
      }
    },response => {
      notifyTool.errorTips(vm,'失败','删除失败');
    });
  },submitNewNav: ({commit},params)=> {
    let vm = params.vm;
    if (!params.name) {
      notifyTool.normalTips(vm,'','请填写导航名称');
      return;
    }

    if (!params.route) {
      notifyTool.normalTips(vm,'','路由不能为空');
      return;
    }
    if (params.sort && !commonTool.checkNum(params.sort)) {
      notifyTool.normalTips(vm,'','请填写数字排序序号');
      return;
    }
    Vue.http.post("admin/nav/doAdd",{
      name: params.name,
      route: params.route,
      state: params.state,
      sort: params.sort
    }).then(response => {
      if (response.body.success) {
        notifyTool.successTips(vm,'成功',response.body.msg);
        vm.$router.push({path:'/manager/nav'});

      } else {
        notifyTool.errorTips(vm,'失败',response.body.msg);
      }
    },response => {
      notifyTool.errorTips(vm,'添加失败','信息提交失败');
    });
  }
};

const getters = {
  navTableData: (state)=> {
    return state.navTableData;
  }
};

export default {
  state,mutations,getters,actions
}
