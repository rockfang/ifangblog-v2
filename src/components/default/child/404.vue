<template>
  <section class="app-main">
    <div class="errPage-container">
      <button type="button" class="el-button pan-back-btn el-button--default el-button--medium">
        <!----><i class="arrow-left"></i><span>
    返回
  </span></button>
      <div class="el-row">
        <div  class="el-col el-col-12"><h1 data-v-6fb1594e="" class="text-jumbo text-ginormous">
          Oops!
        </h1>
          gif来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a> 页面
          <h2 >你没有权限去该页面</h2> <h6 >如有不满请联系你领导</h6>
          <ul  class="list-unstyled">
            <li >或者你可以去:</li>
            <li class="link-type"><a  href="#/dashboard" class="">
              回首页
            </a></li>
            <li  class="link-type"><a data-v-6fb1594e="" href="https://www.taobao.com/">随便看看</a></li>
            <li ><a data-v-6fb1594e="" href="#">点我看图</a></li>
          </ul>
        </div>
        <div class="el-col el-col-12">
          <img src="../../../assets/images/404.gif"
              width="313" height="428"alt="Girl has dropped her ice cream."></div>
      </div>
      <div data-v-6fb1594e="" class="el-dialog__wrapper" style="display: none;">
        <div role="dialog" aria-modal="true" aria-label="随便看" class="el-dialog" style="margin-top: 15vh;">
          <div class="el-dialog__header"><span class="el-dialog__title">随便看</span>
            <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i
              class="el-dialog__close el-icon el-icon-close"></i></button>
          </div><!----><!----></div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "404"
  }
</script>

<style scoped>

</style>
