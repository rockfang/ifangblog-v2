/* eslint-disable */
import Vue from "vue"
import notifyTool from '../../../module/notifyTool.js'

const state = {
  tableManagers: [],
};
const mutations = {
  SET_TABLE_MANAGERS: (state, managers) => {
    state.tableManagers = managers;
  }
};

const actions = {
  initTableManagers: ({commit}) => {
    commit("SET_LOADING",true);
    Vue.http.get("admin/manager").then(response => {
      commit("SET_LOADING",false);
      if (response.body.success) {
        commit("SET_TABLE_MANAGERS", response.body.managers);
      }
    }, response => {
      commit("SET_LOADING",false);
    });

  },
  deleteManager: ({dispatch, commit}, params) => {
    Vue.http.get("admin/manager/delete?id=" + params.row._id).then(response => {
      if (response.body.success) {
        notifyTool.successTips(params.vm, '成功', response.body.msg);
        dispatch("initTableManagers");
      } else {
        notifyTool.errorTips(params.vm, '失败', response.body.msg);
      }
    }, response => {
      notifyTool.errorTips(params.vm, '失败', '删除失败');
    });
  },
  changeManagerState: ({commit}, params) => {
    Vue.http.post("admin/changeState", {
      id: params.row._id,
      collectionName: 'admin',
      attr: 'state'
    }).then(response => {
      if (response.body.success) {
        notifyTool.successTips(params.vm, '成功', response.body.msg);
        if (params.row.state === '1') {
          params.row.state = '0';
        } else {
          params.row.state = '1';
        }
      }
    }, response => {
      notifyTool.errorTips(params.vm, '失败', '删除失败');
    });
  },
  addNewManager: ({commit}, params) => {
    if (params.username.length < 3) {
      notifyTool.normalTips(params.vm, '', '用户名须不小于3位');
      return;
    }

    if (params.password.length < 3) {
      notifyTool.normalTips(params.vm, '', '密码须不小于3位');
      return;
    }

    if (params.password != params.repwd) {
      notifyTool.normalTips(params.vm, '', '两次输入密码不一致');
      return;
    }
    commit("SET_LOADING",true);
    Vue.http.post("admin/manager/doAdd", {
      username: params.username,
      password: params.password,
      repwd: params.repwd,
      state: params.state
    }).then(response => {
      commit("SET_LOADING",false);
      if (response.body.success) {
        notifyTool.successTips(params.vm, '成功', response.body.msg);
        params.vm.$router.push({path: '/manager/admin'});
      } else {
        notifyTool.errorTips(params.vm, '失败', response.body.msg);
      }
    }, response => {
      commit("SET_LOADING",false);
      notifyTool.errorTips(params.vm, '添加失败', '信息提交失败');

    });
  },

  changePassword: ({commit}, params) => {
    if (params.password.length < 3) {
      notifyTool.normalTips(params.vm, '', '密码须不小于3位');
      return;
    }

    if (params.password !== params.repwd) {
      notifyTool.normalTips(params.vm, '', '两次输入密码不一致');
      return;
    }
    commit("SET_LOADING",true);
    Vue.http.post("admin/manager/doEdit", {
      id: params.id,
      username: params.username,
      password: params.password,
      repwd: params.repwd,
    }).then(response => {
      commit("SET_LOADING",false);
      if (response.body.success) {
        notifyTool.successTips(params.vm, '成功', response.body.msg);
        params.vm.$router.push({path: '/manager/admin'});
      } else {
        notifyTool.errorTips(params.vm, '失败', response.body.msg);
      }
    }, response => {
      commit("SET_LOADING",false);
      notifyTool.errorTips(params.vm, '修改失败', '信息提交失败');
    });
  }
};

const getters = {
  tableManagers: (state) => {
    return state.tableManagers;
  },
};

export default {
  state, mutations, getters, actions
}
