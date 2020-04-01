/**
 * 路由懒加载
 */

const routes = [
  {
    path: "/",
    beforeEnter: (routeTo, routeFrom, next) => {
      let username = localStorage.getItem("username");
      if (!username) {
        next({ path: "/login" });
      } else {
        next({ path: "/manager" });
      }
    },
    component: resolve => require(["../components/manager/Index.vue"], resolve)
  },
  {
    path: "/login",
    component: resolve => require(["../components/manager/Login.vue"], resolve)
  },
  {
    path: "/manager",
    beforeEnter: (routeTo, routeFrom, next) => {
      let username = localStorage.getItem("username");
      if (!username) {
        next({ path: "/login" });
      } else {
        next();
      }
    },
    component: resolve =>
      require.ensure(["../components/manager/Manager.vue"], () => {
        resolve(require("../components/manager/Manager.vue"));
      }),
    children: [
      {
        path: "/",
        component: resolve =>
          require.ensure(["../components/manager/child/Board.vue"], () => {
            resolve(require("../components/manager/child/Board.vue"));
          })
      },
      {
        path: "admin",
        component: resolve =>
          require.ensure(["../components/manager/child/Admin.vue"], () => {
            resolve(require("../components/manager/child/Admin.vue"));
          })
      },
      {
        path: "admin/add",
        component: resolve =>
          require.ensure(["../components/manager/child/AdminAdd.vue"], () => {
            resolve(require("../components/manager/child/AdminAdd.vue"));
          })
      },
      {
        path: "admin/edit",
        component: resolve =>
          require.ensure(["../components/manager/child/AdminEdit.vue"], () => {
            resolve(require("../components/manager/child/AdminEdit.vue"));
          })
      },
      {
        path: "articletype",
        component: resolve =>
          require.ensure(
            ["../components/manager/child/ArticleType.vue"],
            () => {
              resolve(require("../components/manager/child/ArticleType.vue"));
            }
          )
      },
      {
        path: "articletype/add",
        component: resolve =>
          require.ensure(
            ["../components/manager/child/ArticleTypeAdd.vue"],
            () => {
              resolve(
                require("../components/manager/child/ArticleTypeAdd.vue")
              );
            }
          )
      },

      {
        path: "articletype/edit",
        component: resolve =>
          require.ensure(
            ["../components/manager/child/ArticleTypeEdit.vue"],
            () => {
              resolve(
                require("../components/manager/child/ArticleTypeEdit.vue")
              );
            }
          )
      },
      {
        path: "tag",
        component: resolve =>
          require.ensure(["../components/manager/child/Tag.vue"], () => {
            resolve(require("../components/manager/child/Tag.vue"));
          })
      },
      {
        path: "tag/add",
        component: resolve =>
          require.ensure(["../components/manager/child/TagAdd.vue"], () => {
            resolve(require("../components/manager/child/TagAdd.vue"));
          })
      },

      {
        path: "tag/edit",
        component: resolve =>
          require.ensure(["../components/manager/child/TagEdit.vue"], () => {
            resolve(require("../components/manager/child/TagEdit.vue"));
          })
      },
      {
        path: "article",
        component: resolve =>
          require.ensure(["../components/manager/child/Article.vue"], () => {
            resolve(require("../components/manager/child/Article.vue"));
          }),

        meta: {
          keepAlive: true,
        }
      },
      {
        path: "article/add",
        component: resolve =>
          require.ensure(["../components/manager/child/ArticleAdd.vue"], () => {
            resolve(require("../components/manager/child/ArticleAdd.vue"));
          })
      },

      {
        path: "article/edit",
        component: resolve =>
          require.ensure(
            ["../components/manager/child/ArticleEdit.vue"],
            () => {
              resolve(require("../components/manager/child/ArticleEdit.vue"));
            }
          )
      },
      {
        path: "link",
        component: resolve =>
          require.ensure(["../components/manager/child/Link.vue"], () => {
            resolve(require("../components/manager/child/Link.vue"));
          })
      },
      {
        path: "link/add",
        component: resolve =>
          require.ensure(["../components/manager/child/LinkAdd.vue"], () => {
            resolve(require("../components/manager/child/LinkAdd.vue"));
          })
      },
      {
        path: "nav",
        component: resolve =>
          require.ensure(["../components/manager/child/Nav.vue"], () => {
            resolve(require("../components/manager/child/Nav.vue"));
          })
      },
      {
        path: "nav/add",
        component: resolve =>
          require.ensure(["../components/manager/child/NavAdd.vue"], () => {
            resolve(require("../components/manager/child/NavAdd.vue"));
          })
      },
      {
        path: "setting",
        component: resolve =>
          require.ensure(["../components/manager/child/Setting.vue"], () => {
            resolve(require("../components/manager/child/Setting.vue"));
          })
      }
    ]
  },/*默认跳转路由*/,
  // { path: '*', redirect: '/404' }   /*默认跳转路由*/
  { path: "*", redirect: "/" } /*默认跳转路由*/
];

export default routes;
