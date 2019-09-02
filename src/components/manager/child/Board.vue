<template>
    <div>
      我是控制台
    </div>
</template>

<script>
    export default {
        name: "Board",

      data: function () {
        return {
          loading: true
        }
      },methods: {
          requestBoardData: function () {
            // this.showLoading();
            //
            // let vm = this;
            // setTimeout(function () {
            //   vm.hideLoading();
            // },500);
          }
      },mounted() {
          this.requestBoardData();
      },props: ['showLoading','hideLoading']
    }
</script>

<style scoped lang="scss">
</style>
