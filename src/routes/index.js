// /**
//  * 配置路由并暴露出去，供main.js挂载
//  */
// import Blog from "../components/default/Blog.vue"
// const routes = [

//   {
//     path: '/',
//     component: Blog,
//     children:[
//       { path: '/',
//         component: resolve => require.ensure(['../components/default/child/Home.vue'],()=> {
//           resolve(require('../components/default/child/Home.vue'));
//         }),
//         meta: {
//           keepAlive: true,
//         }
//       },
//       { path: '/article',
//         component: resolve => require.ensure(['../components/default/child/ArticleDetail.vue'],()=> {
//           resolve(require('../components/default/child/ArticleDetail.vue'));
//         })
//       },
//       { path: '/article0',
//         component: resolve => require.ensure(['../components/default/child/ArticleDetail.vue'],()=> {
//           resolve(require('../components/default/child/ArticleDetail0.vue'));
//         })
//       },
//       { path: '/tagwall',
//         component: resolve => require.ensure(['../components/default/child/TagWall.vue'],()=> {
//           resolve(require('../components/default/child/TagWall.vue'));
//         }),
//         meta: {
//           keepAlive: true,
//         }
//       },
//       { path: '/tagarticle/:name',
//         component: resolve => require.ensure(['../components/default/child/TagArticle.vue'],()=> {
//           resolve(require('../components/default/child/TagArticle.vue'));
//         }),
//         meta: {
//           keepAlive: true,
//         }
//       },
//       { path: '/about',
//         component: resolve => require.ensure(['../components/default/child/About.vue'],()=> {
//           resolve(require('../components/default/child/About.vue'));
//         }),
//         meta: {
//           keepAlive: true,
//         }
//       },
//     ]
//   },
// ];

// export default  routes;
