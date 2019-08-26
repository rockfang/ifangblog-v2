<template>
    <div class="bottom-msg">
      <p class="base-row">
        Copyright © 2019 caifun
      </p>
      <div class="base-row">
        <div>您是本站第<span>N</span>位访客</div>
        <p class="base-row">
          蜀ICP备19016691号-1
        </p>
      </div>
      <p class="base-row">
        联系方式：cooldish1245@163.com
      </p>
      <p class="base-row" >
        博客推荐：<a href="https://www.zhangbj.com" class="link">程序员技术之旅</a></p>
    </div>
</template>

<script>
    export default {
        name: "BottomBar"
    }
</script>

<style scoped lang="scss">

  .bottom-msg {
    background: #819198;
    color: #d9d9d9;
    width: 100%;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;

    .base-row {
      margin: 5px 0;
      width: 100%;
      text-align: center;
    }

    .link {
      color: #d9d9d9;
    }
    a {
      cursor: pointer;
      text-decoration: underline;
    }

  }
</style>
