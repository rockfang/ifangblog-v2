let notifyTool = {
  successTips(vm,title,tips) {
    if(vm.notifyInstance) {
      vm.notifyInstance.close();
    }
    vm.$notify({
      title: title,
      message: tips,
      type: 'success',
      position: 'top-left',
      duration:2000
    });
  },

  warnTips(vm,title,tips) {
    if(vm.notifyInstance) {
      vm.notifyInstance.close();
    }
    vm.$notify({
      title: title,
      message: tips,
      type: 'warning',
      position: 'top-left',
      duration:2000
    });
  },

  normalTips(vm,title,tips) {
    if(vm.notifyInstance) {
      vm.notifyInstance.close();
    }
    vm.$notify.info({
      title: title,
      message: tips,
      position: 'top-left',
      duration:2000
    });
  },

  errorTips(vm,title,tips) {
    if(vm.notifyInstance) {
      vm.notifyInstance.close();
    }
    vm.$notify.error({
      title: title,
      message: tips,
      position: 'top-left',
      duration:2000
    });
  },errorTips2(vm,title,tips) {
    if(vm.notifyInstance) {
      vm.notifyInstance.close();
    }
    vm.$notify.error({
      title: title,
      message: tips,
      position: 'top-left',
      duration:5000
    });
  },
};
export default notifyTool;
