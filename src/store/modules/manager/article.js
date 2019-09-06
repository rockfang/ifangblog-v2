import Vue from "vue"
import notifyTool from "../../../module/notifyTool";
import msgTool from '../../../module/msgTool.js'

const state = {
  mangerArticles: [],
  managerArticlePageCount: 0,
  pageSize: 11, //每页显示11条数据

  //编辑文章信息
  articleInfo: {
    id: "",
    pid: "0",
    title: "",
    state: "",
    description: "",
    keywords: [],
    rawText: "## ",
    renderText: "",
    tags: [],
    parentType: "",
  },
  isNormalLeaveArticle: false//路由守卫判断用，正常提价不守卫
};
const mutations = {
  SET_MANAGER_ARTICLES: (state,articles)=> {
    state.mangerArticles = articles;
  },
  SET_MANAGER_PAGE_COUNT: (state,pageCount)=> {
    state.managerArticlePageCount = pageCount;
  },
  SET_ARTICLE_INFO: (state,articleInfo)=> {
    state.articleInfo = articleInfo;
  },
  SET_NORMAL_LEAVE_ARTICLE: (state,isNormalLeaveArticle)=> {
    state.isNormalLeaveArticle = isNormalLeaveArticle;
  }
};

const actions = {
  requestManagerArticles:({commit,state},page)=> {
    commit("SET_LOADING",true);
    Vue.http.get("admin/article?pageSize=" + state.pageSize + "&page=" + page)
      .then(response => {
        commit("SET_LOADING",false);
        if (response.body.success) {
          commit("SET_MANAGER_ARTICLES",response.body.articles);
          commit("SET_MANAGER_PAGE_COUNT",response.body.pageCount);
        }
      },response => {
        commit("SET_LOADING",false);
      });
  },
  changeArticleState: ({commit}, params) => {
    Vue.http.post("admin/changeState", {
      id: params.row._id,
      collectionName: 'article',
      attr: params.field
    }).then(response => {
      if (response.body.success) {
        notifyTool.successTips(params.vm, '成功', response.body.msg);
        if (params.row[params.field] == '1') {
          params.row[params.field] = '0';
        } else {
          params.row[params.field] = '1';
        }
      }
    }, response => {
      notifyTool.errorTips(params.vm, '失败', '删除失败');
    });
  }, deleteArticle: ({dispatch, commit}, params) => {
    let vm = params.vm;
    let id = params.id;

    vm.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      Vue.http.get('admin/article/delete?id='+ id).then(response => {
        if (response.body.success) {
          msgTool.successTips(vm,'删除成功!');
          dispatch("requestManagerArticles",1);
        } else {
          msgTool.errorTips(vm,response.body.msg);
        }
      },response => {
        msgTool.errorTips(vm,'删除失败');
      });
    }).catch(() => {
      msgTool.normalTips(vm,'已取消删除');
    });
  }, publishArticle: ({commit},params)=> {
    let articleInfo = params.articleInfo;
    let vm = params.vm;

    if (!articleInfo.title || articleInfo.title.trim().length === 0) {
      msgTool.warnTips(vm, "请填写标题");
      return;
    }
    if (!articleInfo.description || articleInfo.description.trim().length === 0) {
      msgTool.warnTips(vm, "请填写文章摘要");
      return;
    }

    if (!articleInfo.parentType || articleInfo.parentType.trim().length === 0) {
      msgTool.warnTips(vm, "请选择文章分类");
      return;
    }
    commit("SET_LOADING",true);

    Vue.http.post("admin/article/doAdd", articleInfo).then(response => {
      commit("SET_LOADING",false);
      if (response.body.success) {
        commit("SET_NORMAL_LEAVE_ARTICLE",true);
        notifyTool.successTips(vm, '成功', response.body.msg);
        vm.$router.push({path: '/manager/article'});
      } else {
        notifyTool.errorTips(vm, '失败', response.body.msg);
      }
    }, response => {
      commit("SET_LOADING",false);
      notifyTool.errorTips(vm, '添加失败', '信息提交失败');
    });
  }, getEditArticle: ({commit},params)=> {
    let id = params.id;
    let vm = params.vm;
    commit("SET_LOADING",true);
    Vue.http.get("admin/article/getarticle?id=" + id).then(response => {
      commit("SET_LOADING",false);
      if (response.body.success) {
        commit("SET_ARTICLE_INFO", {
          title: response.body.article.title,
          description: response.body.article.description,
          tags: response.body.article.tags,
          rawText: response.body.article.rawText,
          renderText: response.body.article.renderText,
          pid: response.body.article.pid,
          parentType: response.body.article.atname,
        });
      } else {
        notifyTool.errorTips(vm, '错误', response.body.msg);
      }
    },response => {
      commit("SET_LOADING",false);
      notifyTool.errorTips(vm,'错误','未获取到数据');
    });
  }, submitEditArticle: ({getters},params)=> {
    let vm = params.vm;
    getters.editArticleInfo.state = params.state;
    getters.editArticleInfo.id = vm.$route.query.id;

    if (!getters.editArticleInfo.title || getters.editArticleInfo.title.trim().length === 0) {
      msgTool.warnTips(vm,"请填写标题");
      return;
    }
    if(!getters.editArticleInfo.description || getters.editArticleInfo.description.trim().length === 0) {
      msgTool.warnTips(vm,"请填写文章摘要");
      return;
    }

    if(!getters.editArticleInfo.parentType || getters.editArticleInfo.parentType.trim().length === 0) {
      msgTool.warnTips(vm,"请选择文章分类");
      return;
    }
    commit("SET_LOADING",true);
    Vue.http.post("admin/article/doEdit",getters.editArticleInfo).then(response => {
      commit("SET_LOADING",false);
      if (response.body.success) {
        notifyTool.successTips(vm,'成功',response.body.msg);
        vm.$router.push({path:'/manager/article'});
      } else {
        notifyTool.errorTips(vm,'失败',response.body.msg);
      }
    },response => {
      commit("SET_LOADING",false);
      notifyTool.errorTips(vm,'修改失败','信息修改失败');
    });
  }
};

const getters = {
  mangerArticles: (state)=> {
    return state.mangerArticles;
  },
  managerArticlePageCount: (state)=> {
    return state.managerArticlePageCount;
  },
  managerArticlesPageSize: (state)=> {
    return state.pageSize;
  },
  editArticleInfo: (state)=> {
    return state.articleInfo
  },
  isNormalLeaveArticle: (state)=> {
    return state.isNormalLeaveArticle
  }
};

export default {
  state,mutations,getters,actions
}
