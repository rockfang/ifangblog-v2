<template>
  <div class="site-header" v-if="!hideHeader">
    <div class="site-header-brand">

      <span class="site-header-brand-title">
        <a href="/">ICAIFUN</a>
      </span>

      <span class="site-header-brand-motto"> | 安静的阿根</span>

    </div>
    <div class="site-header-right">
      <nav class="site-header-navigation">
        <router-link to="/" :class="{active : this.path == '/'}">主页</router-link>
        <router-link to="/tagwall" :class="{active : isTagWall()}">&nbsp&nbsp&nbsp标签墙</router-link>
        <!--<router-link to="/">&nbsp&nbsp&nbsp小工具</router-link>-->
        <!--<router-link to="/">&nbsp&nbsp&nbsp友情链接</router-link>-->
        <router-link to="/about" :class="{active : this.path == '/about'}">&nbsp&nbsp&nbsp关于本站</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
    export default {
      props:['path'],
      methods: {
        isTagWall: function () {
          if (!this.path) {
            return false;
          }
          return this.path.indexOf('/tagwall') > -1 || this.path.indexOf('/tagarticle') > -1
        }
      },computed: {
      hideHeader() {
        return this.path.indexOf('/login') > -1 || this.path.indexOf('/manager') > -1
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
    /*background: #4FC08D;*/
    background: #F7F7F7;
    z-index: 300;

    .site-header-brand {
      height: 60px;
      line-height: 60px;
      /*color: #ECFCF9;*/
      .site-header-brand-title {
        font-size: 22px;
        font-weight: bold;
      }
      .site-header-brand-motto {
        font-size: 18px;
      }
    }

    .site-header-right {
      margin-right: 40px;
      /*color: #ECFCF9;*/

      height: 60px;
      line-height: 60px;
      display: flex;
      justify-content: space-between;

      .active {
        color:#4FC08D;
      }
    }

    a {
      color: #212121;
      text-decoration: none;
    }

    a:hover {
      text-decoration: none;
      color: #212121;
    }
  }
</style>
