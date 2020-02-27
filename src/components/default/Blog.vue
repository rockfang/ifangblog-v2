<template>
  <div class="main">
    <template>
      <el-backtop target=".main" :bottom="20" :visibility-height="10" :right="20">
        <div class="back_up">UP</div>
      </el-backtop>
    </template>
    <HeadNavBar :path="this.$route.path" class="header_nav"></HeadNavBar>
    <transition name="slide" mode="out-in">
      <router-view v-loading="blogLoading"></router-view>
    </transition>
  </div>
</template>

<script>
import HeadNavBar from "./public/HeadNavBar";

export default {
  components: {
    HeadNavBar
  },
  computed: {
    blogLoading() {
      return this.$store.getters.getLoading;
    }
  }
};
</script>

<style scoped>
/*处理动画导致header晃动问题*/
.main {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}

.back_up {
  height: 100%;
  width: 100%;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}
</style>
