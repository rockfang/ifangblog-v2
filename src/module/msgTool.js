let msgTool = {
  successTips(vm,tips) {
    vm.$message({
      type: 'success',
      message: tips
    });
  },
  warnTips(vm,tips) {
    vm.$message({
      type: 'warning',
      message: tips
    });
  },
  normalTips(vm,tips) {
    vm.$message({
      type: 'info',
      message: tips
    });
  },
  errorTips(vm,tips) {
    vm.$message({
      type: 'error',
      message: tips
    });
  },
};
export default msgTool;
