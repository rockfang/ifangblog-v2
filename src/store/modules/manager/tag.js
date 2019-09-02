import Vue from "vue"
import commonTool from '../../../module/commonTool.js'
import notifyTool from '../../../module/notifyTool.js'
import msgTool from '../../../module/msgTool.js'
const state = {
  managerTagTableData: [],
  managerTagPageCount: 0,
  managerTagPageSize: 10,
  //tag 编辑
  managerTagInfo: {
    fileList:[],
    typeName: '',
    state: '1',
    sort:'',
    icon:"",
  }
};
const mutations = {
  SET_TAGS_TABLEDATA: (state,managerTagTableData)=> {
    state.managerTagTableData = managerTagTableData;
  },
  SET_TAGS_PAGECOUNT: (state,managerTagPageCount)=> {
    state.managerTagPageCount = managerTagPageCount;
  },
  SET_MANAGER_TAGINFO: (state,managerTagInfo)=> {
    state.managerTagInfo = managerTagInfo;
  }
};

const actions = {
  initManagerTagData:({commit},params)=> {
    Vue.http.get("admin/tag?pageSize=" + params.pageSize + "&page=" + params.page)
      .then(response => {
        if (response.body.success) {
          commit("SET_TAGS_TABLEDATA",response.body.tags);
          commit("SET_TAGS_PAGECOUNT",response.body.pageCount);
        }
      },response => {

      });
  },
  changeTagSort: ({commit},params)=> {
    Vue.http.post("admin/changeSort",{
      id: params.id,
      sort: params.sort,
      collectionName:'tag',
    }).then(response => {
      if (response.body.success) {
      }
    },response => {
    });
  },
  deleteManagerTag: ({commit,dispatch,getters},params)=> {
    let vm = params.vm;
    let id = params.id;

    vm.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {

      vm.$http.get('admin/tag/delete?id='+ id).then(response => {
        if (response.body.success) {
          msgTool.successTips(vm,'删除成功!');
          dispatch("initManagerTagData",{
            pageSize: getters.managerTagPageSize,
            page: 1,
          });
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
  changeTagState: ({commit},params)=> {
    let vm = params.vm;
    let row = params.row;

    Vue.http.post("admin/changeState",{
      id: row._id,
      collectionName:'tag',
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
  getCurrentTagInfo: ({commit},params)=> {
    let id = params.id;
    let vm = params.vm;
    Vue.http.get('admin/tag/getctag?id=' + id).then(response => {
      if (response.body.success) {
        let ctag = response.body.ctag;
        commit("SET_MANAGER_TAGINFO",{
          fileList:[],
          typeName: ctag.name,
          state: cTag.state,
          sort: cTag.sort,
          icon: cTag.icon,
        });
      } else {
        notifyTool.errorTips(vm,'错误',response.body.msg);
      }
    },response => {
      notifyTool.errorTips(vm,'错误','未获取到数据');

    });
  },
  submitTagInfo: ({commit,getters,state},params)=> {
    let id = params.id;
    let vm = params.vm;
    if (state.managerTagInfo.sort && !commonTool.checkNum(state.managerTagInfo.sort)) {
      notifyTool.normalTips(vm,'','请填写数字排序序号');
      return;
    }
    let formData = new FormData();
    formData.append('id',id);
    formData.append('tagIcon',this.fileList[0]);
    formData.append('typeName', this.typeName);
    formData.append('state', this.state);
    formData.append('sort', this.sort);
    // specify Content-Type, with formData as well
    this.$http.post(this.Edit_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      if (response.body.success) {
        notifyTool.successTips(this,'成功',response.body.msg);
        this.$router.push({path:'/manager/tag'});
      } else {
        notifyTool.errorTips(this,'失败',response.body.msg);
      }
    },response => {
      notifyTool.errorTips(this,'添加失败','信息提交失败');
    });
  }
};

const getters = {
  managerTagTableData: (state)=> {
    return state.managerTagTableData;
  },
  managerTagPageCount: (state)=> {
    return state.managerTagPageCount;
  },
  managerTagPageSize: (state)=> {
    return state.managerTagPageSize;
  },
  managerTagInfo: (state)=> {
    return state.managerTagInfo;
  }
};

export default {
  state,mutations,getters,actions
}
