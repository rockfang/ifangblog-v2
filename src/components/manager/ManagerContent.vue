<template>
  <div class="out-con">
    <el-container :style="cheight">

      <!--左侧导航区-->
      <el-aside width="">
        <div class="leftBar">
          <el-menu background-color="transparent" default-active="2-4-1" class="el-menu-vertical-demo"
                   :router="true"
                   @open="handleOpen"
                   @close="handleClose"
                   :collapse="isCollapse"
                   :default-active="$route.path"
                   @select="handleMenuSelect">

            <el-menu-item index="/manager">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">控制台</span>
            </el-menu-item>

            <el-submenu index="2" :disabled="Boolean(hideManagers)">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">管理员列表</span>
              </template>
              <el-menu-item-group >
                <el-menu-item index="/manager/admin" :disabled="Boolean(hideManagers)">管理员列表</el-menu-item>
                <el-menu-item index="/manager/admin/add" :disabled="Boolean(hideManagers)">增加管理员</el-menu-item>
              </el-menu-item-group>
            </el-submenu>


            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">文章分类管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/manager/articletype">分类列表</el-menu-item>
                <el-menu-item index="/manager/articletype/add">增加分类</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-collection-tag"></i>
                <span slot="title">标签管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/manager/tag">标签列表</el-menu-item>
                <el-menu-item index="/manager/tag/add">增加标签</el-menu-item>
              </el-menu-item-group>
            </el-submenu>


            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">文章管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/manager/article">文章列表</el-menu-item>
                <el-menu-item index="/manager/article/add">增加文章</el-menu-item>
              </el-menu-item-group>
            </el-submenu>


            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-link"></i>
                <span slot="title">友情链接管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/manager/link">友情链接列表</el-menu-item>
                <el-menu-item index="/manager/link/add">增加友情链接</el-menu-item>
              </el-menu-item-group>
            </el-submenu>


            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-discover"></i>
                <span slot="title">导航管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/manager/nav">导航列表</el-menu-item>
                <el-menu-item index="/manager/nav/add">增加导航</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="/manager/setting">
              <i class="el-icon-s-tools"></i>
              <span slot="title">系统设置</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>

      <!--右侧面包屑 + 内容展示区-->
      <el-container>
        <el-header height="40px">
          <i @click="isCollapse = !isCollapse"  :class="{'el-icon-s-fold':!isCollapse,'el-icon-s-unfold':isCollapse}"></i>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/manager' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in breads" :key="index">
              {{item}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>

        <el-main  v-loading="loading">

          <transition name="fade" mode="out-in">
            <router-view>
            </router-view>
          </transition>

        </el-main>
        <el-footer height="40px">蜀ICP备19016691号</el-footer>
      </el-container>
    </el-container>

  </div>

</template>

<script>
  import '../../assets/css/basic.scss';
  export default {
      data() {
        return {
          isCollapse: false,
          hideManagers: true,
          breads:[],
        };
      },
      created: function() {
        this.hideManagers = localStorage.getItem('role') !== "root";
        //处理刷新面包屑显示问题
        this.handleMenuSelect(this.$route.path);
      },
      computed: {
        //动态设置整个内容区高度，作用是让el中aside,header,content,footer内容布局能完整展示footer
        cheight: function () {
          return {
            height: window.innerHeight - 60 + 'px'
          }
        },
        loading() {
          return this.$store.getters.getLoading;
        }
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        //面包屑显示
        handleMenuSelect(index,indexPath){
          this.breads = [];
          let arr = index.substr(1).split('/');//["manager", "link"]
          // if (arr.indexOf('manager') > -1) {
          //   this.breads.push('首页');
          // }
          //管理员
          if (arr.indexOf('admin') > -1){
            this.breads.push('管理员管理');
            if (arr.indexOf('add') > -1) {
              this.breads.push('增加管理员');
            } else {
              this.breads.push('管理员列表');
            }
          }
          //文章分类
          if (arr.indexOf('articletype') > -1){
            this.breads.push('文章分类管理');
            if (arr.indexOf('add') > -1) {
              this.breads.push('增加文章分类');
            } else{
              this.breads.push('文章分类列表');
            }
          }
          //Tag分类
          if (arr.indexOf('tag') > -1){
            this.breads.push('标签管理');
            if (arr.indexOf('add') > -1) {
              this.breads.push('增加标签');
            } else {
              this.breads.push('标签列表');
            }
          }
          //文章列表
          if (arr.indexOf('article') > -1){
            this.breads.push('文章管理');
            if (arr.indexOf('add') > -1) {
              this.breads.push('增加文章');
            } else  {
              this.breads.push('文章列表');
            }
          }
          //友情链接列表
          if (arr.indexOf('link') > -1){
            this.breads.push('友情链接管理');
            if (arr.indexOf('add') > -1) {
              this.breads.push('增加友情链接');
            } else {
              this.breads.push('友情链接列表');
            }
          }
          //导航列表
          if (arr.indexOf('nav') > -1){
            this.breads.push('导航栏管理');
            if (arr.indexOf('add') > -1) {
              this.breads.push('增加导航');
            } else {
              this.breads.push('导航栏列表');
            }
          }
          //系统设置列表
          if (arr.indexOf('setting') > -1){
            this.breads.push('系统设置');
          }
        }

      }
    }
</script>

<style scoped lang="scss">
  .out-con {
    margin-top: 60px;

    .leftBar {
      min-height: 100%;
      background-color: #324057;
      .el-menu-vertical-demo {
        top: 0;
        left: 0;
        height: 100%;
        z-index: 99;
      }

      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 100%;
      }

      /*修改含子菜单条目颜色 el-submenu*/
      .el-submenu__title * {
        color: white;
      }

      /*子菜单颜色*/
      .el-menu-item {
        background-color: transparent  !important;
        color: white;
      }

      /*字体颜色：*/
      .el-aside {
        color: white;
      }
      /*鼠标悬浮时，子菜单的样式：*/
      .el-menu-item:hover{
        outline: 0 !important;
        color: #409EFF !important;
      }
      /*鼠标选中条目样式*/
      .el-menu-item.is-active {
        color: #fff !important;
        background: #409EFF !important;
      }
      /*4.鼠标悬浮时，主菜单的样式：*/
      .el-submenu__title:focus, .el-submenu__title:hover {
        outline: 0 !important;
        color: #409EFF !important;
        background: none !important;
      }

    }


    .el-header {
      background: #EFF2F7;
      width: 100%;
      display: flex;
      align-items: center;
      .el-breadcrumb {
        line-height: 40px;
        margin-left: 15px;
      }
    }


    .el-footer {
      line-height: 40px;
      text-align: center;
      background: #324057;
      color: white;
    }
  }


  /*fade路由动画*/
  .fade-enter-active {
    animation: fade-in 200ms ease-out forwards;
  }
  .fade-leave-active {
    animation: fade-out 200ms ease-out forwards;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }


</style>
