import Vue from "vue"
import notifyTool from '../../../module/notifyTool.js'
import msgTool from '../../../module/msgTool.js'
const state = {
  articleTypeTableData: [],

  //编辑,添加 页用
  pTypes:[],
  cTypeInfo: {
    title:"",
    parentType: '',
    description: '',
    state: '0',
    lock: '0',
    pid: ''
  },
};

const mutations = {
  SET_ARTICLETYPES: (state,articleTypes)=> {
    state.articleTypeTableData = articleTypes;
  },SET_PTYPES: (state,pTypes)=> {
    state.pTypes = pTypes;
  },SET_CTYPE_INFO: (state,cTypeInfo)=> {
    state.cTypeInfo = cTypeInfo;
  },SET_PID: (state,pid)=> {
    state.cTypeInfo.pid = pid;
  }
};

const actions = {
  getArticleTypes: ({commit})=> {
    Vue.http.get("admin/articletype").then(response => {
      if (response.body.success) {
        let articleTypes = response.body.articletypes;
        commit("SET_ARTICLETYPES",articleTypes);
      }
    },response => {

    });
  },
  changeArticleTypeState: ({commit},params)=> {
    let row = params.row;
    let attr = params.attr;
    let vm = params.vm;

    Vue.http.post("admin/changeState",{
      id: row._id,
      collectionName: "articletype",
      attr: attr,
    }).then(response => {
      if (response.body.success) {
        notifyTool.successTips(vm,'成功',response.body.msg);
        if (row[attr] == '1') {
          row[attr] = '0';
        } else {
          row[attr] = '1';
        }
      }
    },response => {
    });
  },

  deleteArticleType: ({commit,dispatch},params)=> {
    let id = params.id;
    let vm = params.vm;
    vm.$confirm('此操作将永久删除该分类及其子分类, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      vm.$http.get("admin/articletype/delete?id="+ id).then(response => {
        if (response.body.success) {
          msgTool.successTips(vm,'删除成功!');
          dispatch("getArticleTypes");
        } else {
          msgTool.errorTips(vm,response.body.msg);
        }
      },response => {
        msgTool.errorTips(vm,'删除失败');
      });

    }).catch(() => {
      msgTool.normalTips(vm,'已取消删除');
    });
  },

  getPTypes: ({commit,dispatch})=> {
    Vue.http.get("admin/articletype/getPtypes").then(response => {
      if (response.body.success) {
        let ptypes = response.body.ptypes;
        commit("SET_PTYPES",ptypes);
      }
    },response => {

    });
  },
  getCType: ({commit},id)=> {
    Vue.http.get("admin/articletype/getctype?id=" + id).then(response => {
      if (response.body.success) {
        commit("SET_CTYPE_INFO",{
          title: response.body.ctype.title,
          parentType: response.body.ctype.pid,
          description: response.body.ctype.description,
          state: response.body.ctype.state,
          lock: response.body.ctype.lock,
        });
      } else {
        notifyTool.errorTips(this,'错误',response.body.msg);
      }
    },response => {
      notifyTool.errorTips(this,'错误','未获取到数据');
    });

  },
  doAddType: ({state,dispatch},vm)=> {
    if (!state.cTypeInfo.title) {
      notifyTool.normalTips(vm,'','请填写分类名称');
      return;
    }
    if (!state.cTypeInfo.parentType) {
      notifyTool.normalTips(vm,'','请选择上层分类');
      return;
    }

    vm.$http.post("admin/articletype/doAdd",state.cTypeInfo).then(response => {
      if (response.body.success) {
        notifyTool.successTips(vm,'成功',response.body.msg);
        vm.$router.push({path:'/manager/articletype'});
      } else {
        notifyTool.errorTips(vm,'失败',response.body.msg);
      }
    },response => {
      notifyTool.errorTips(vm,'添加失败','信息提交失败');
    });
  },
  commitArticleTypeInfo: ({state,dispatch},vm)=> {
    if (!state.cTypeInfo.parentType) {
      notifyTool.normalTips(vm,'','请选择上层分类');
      return;
    }

    Vue.http.post("admin/articletype/doEdit",{
      id: vm.$route.query.id,
      pid: state.cTypeInfo.parentType,
      state: state.cTypeInfo.state,
      description: state.cTypeInfo.description,
      lock: state.cTypeInfo.lock
    }).then(response => {
      if (response.body.success) {
        notifyTool.successTips(vm,'成功',response.body.msg);
        vm.$router.push({path:'/manager/articletype'});
      } else {
        notifyTool.errorTips(vm,'失败',response.body.msg);
      }
    },response => {
      notifyTool.errorTips(vm,'修改失败','信息修改失败');
    });
  },
  cleanCTypeInfo: ({commit})=> {
    commit("SET_CTYPE_INFO",{
      title:"",
      parentType: '',
      description: '',
      state: '0',
      lock: '0',
    });
  }
};

const getters = {
  articleTypes: (state)=> {
    return state.articleTypeTableData;
  },
  pTypes: (state)=> {
    return state.pTypes;
  },
  cTypeInfo: (state)=> {
    return state.cTypeInfo;
  }
};

export default  {
  state,mutations,actions,getters
}
