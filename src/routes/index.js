/**
 * 配置路由并暴露出去，供main.js挂载
 */

import ArticleDetail from '../components/default/child/ArticleDetail.vue'
// import TagArticle from '../components/default/TagArticle.vue'
import Home from '../components/default/child/Home.vue'
// import TagWall from '../components/default/TagWall.vue'
// import About from '../components/default/About.vue'
// import ArticleDetail0 from '../components/default/ArticleDetail0.vue'
const routes = [

  {
    path: '/',
    component: resolve => require(['../components/default/Blog.vue'], resolve),
    children:[
      { path: '/', component: resolve => require(['../components/default/child/Home.vue'], resolve)},//处理详情页因为懒加载经常出现跳转无效
      { path: '/article', component: resolve => require(['../components/default/child/ArticleDetail.vue'], resolve)},//处理详情页因为懒加载经常出现跳转无效
      { path: '/tagwall', component: resolve => require(['../components/default/child/TagWall.vue'], resolve)},
      { path: '/tagarticle/:name', component: resolve => require(['../components/default/child/TagArticle.vue'], resolve)},
      { path: '/about', component: resolve => require(['../components/default/child/About.vue'], resolve)},
    ]
  },

  //嵌套路由

  // {
  //   path: '/',
  //   component: resolve => require(['../components/default/Blog.vue'], resolve),
  //   children:[
  //     { path: '/', component: Home},//处理详情页因为懒加载经常出现跳转无效
  //     { path: '/article', component: ArticleDetail},//处理详情页因为懒加载经常出现跳转无效
  //     { path: '/tagwall', component: resolve => require(['../components/default/child/TagWall.vue'], resolve)},
  //     { path: '/tagarticle/:name', component: resolve => require(['../components/default/child/TagArticle.vue'], resolve)},
  //     { path: '/about', component: resolve => require(['../components/default/child/About.vue'], resolve)},
  //   ]
  // },
];

export default  routes;
