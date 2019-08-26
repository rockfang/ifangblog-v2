<template>
    <div>
      我是控制台
    </div>
</template>

<script>
  import Config from '../../../module/config.js'
  import notifyTool from '../../../module/notifyTool.js'
    export default {
        name: "Board",

      data: function () {
        return {
          BOARD_URL: Config.BASE_URL + '/manager/board',
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
