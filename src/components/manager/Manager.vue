<template>

  <div>
    <ManagerHeadBar></ManagerHeadBar>
    <ManagerContent></ManagerContent>
  </div>
</template>

<script>
    export default {
        components: {
          ManagerHeadBar:resolve => {
            require(['./ManagerHeadBar.vue'], resolve)
          },ManagerContent:resolve => {
            require(['./ManagerContent.vue'], resolve)
          },
      }
    }
</script>

<style scoped>

</style>
