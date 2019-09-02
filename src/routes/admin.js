/**
 * 路由懒加载
 */

const routes = [
  { path: '/login', component: resolve => require(['../components/manager/Login.vue'], resolve)},
  {
    path: '/manager',
    beforeEnter: (routeTo, routeFrom, next)=> {
      let username = localStorage.getItem("username");
      if(!username) {
        next({ path: '/login'});
      } else {
        next();
      }
    },
    component: resolve => require(['../components/manager/Manager.vue'], resolve),
    children:[
      { path: '/', component: resolve => require(['../components/manager/child/Board.vue'], resolve) },
      { path: 'admin', component: resolve => require(['../components/manager/child/Admin.vue'], resolve) },
      { path: 'admin/add', component: resolve => require(['../components/manager/child/AdminAdd.vue'], resolve) },
      { path: 'admin/edit', component: resolve => require(['../components/manager/child/AdminEdit.vue'], resolve) },

      { path: 'articletype', component: resolve => require(['../components/manager/child/ArticleType.vue'], resolve) },
      { path: 'articletype/add', component: resolve => require(['../components/manager/child/ArticleTypeAdd.vue'], resolve) },
      { path: 'articletype/edit', component: resolve => require(['../components/manager/child/ArticleTypeEdit.vue'], resolve) },

      { path: 'tag', component: resolve => require(['../components/manager/child/Tag.vue'], resolve) },
      { path: 'tag/add', component: resolve => require(['../components/manager/child/TagAdd.vue'], resolve) },
      { path: 'tag/edit', component: resolve => require(['../components/manager/child/TagEdit.vue'], resolve) },

      { path: 'article', component: resolve => require(['../components/manager/child/Article.vue'], resolve) },
      { path: 'article/add', component: resolve => require(['../components/manager/child/ArticleAdd.vue'], resolve) },
      { path: 'article/edit', component: resolve => require(['../components/manager/child/ArticleEdit.vue'], resolve) },

      { path: 'link', component: resolve => require(['../components/manager/child/Link.vue'], resolve) },
      { path: 'link/add', component: resolve => require(['../components/manager/child/LinkAdd.vue'], resolve)  },

      { path: 'nav', component: resolve => require(['../components/manager/child/Nav.vue'], resolve) },
      { path: 'nav/add', component: resolve => require(['../components/manager/child/NavAdd.vue'], resolve) },
      { path: 'setting', component: resolve => require(['../components/manager/child/Setting.vue'], resolve) },

    ]

  },


  { path: '/404', component: resolve => require(['../components/default/child/404.vue'], resolve) },  /*默认跳转路由*/
  // { path: '*', redirect: '/404' }   /*默认跳转路由*/
  { path: '*', redirect: '/' }   /*默认跳转路由*/
];

export default  routes;
