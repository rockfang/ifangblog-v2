<template>
  <div class="site-header">
    <div class="site-header-brand">

      <span class="site-header-brand-icon">
        <a href="/manager">
          <img src="../../assets/images/cabbage.png" alt="">
        </a>
      </span>

      <span class="site-header-brand-motto">　　ICAIFUN管理系统</span>

    </div>
    <div class="site-header-right" v-if="username">
      <img src="../../assets/images/portrait.jpg" alt="">
      <div class="welcome">
        <span class="comename">欢迎</span>
        <span class="avatarname">{{username}}</span>
      </div>

      <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit-outline" @click.native="clickDropItem(0)">修改信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-setting" @click.native="clickDropItem(1)">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-delete" @click.native="clickDropItem(2)">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>

  import Config from '../../module/config.js'
  import notifyTool from '../../module/notifyTool.js'
  export default {
    data: function () {
      return {
        username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
        LOGIN_OUT_URL: Config.BASE_URL + 'admin/login/loginOut',
      }
    },methods: {
      clickDropItem:function (index) {
        if(index == 2) {
          this.loginOut();
        }
      },loginOut: function () {
        this.$http.get(this.LOGIN_OUT_URL).then(response => {
          console.log(response.body);
          if(response.body.success) {
            notifyTool.normalTips(this,'退出成功','您已退出登录！');
            localStorage.removeItem('username');
            this.$router.push({ path: '/login'})
          }
        },response => {

        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .site-header {
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    border-bottom: #4FC08D solid 2px;
    padding: 0 10px;
    background: #3B5999;
    color: white;
    z-index: 300;

    .site-header-brand {
      height: 60px;
      line-height: 60px;
      text-align: center;
      display: flex;

      .site-header-brand-icon {
        height: 100%;

        a {
          display: flex;
          align-items: center;
          height: 100%;

          img {
            width: 40px;
            height: 40px;
          }
        }
      }

      .site-header-brand-motto {
        font-size: 18px;
      }
    }

    .site-header-right {
      margin-right: 65px;
      color: white;
      height: 60px;
      display: flex;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
      }

      .welcome {

        width: 40px;
        height: 40px;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        span {
          font-size: 14px;
        }
      }
    }


    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      margin-left: 10px;
      font-size: 18px;
    }
  }
</style>
