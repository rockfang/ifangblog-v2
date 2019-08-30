<template>
    <div class="add-con">
      　用户名：
      <el-input
        type="text"
        v-model="this.$route.query.username"
        maxlength="10"
        minlength="3"
        show-word-limit
        disabled
      >
      </el-input>
      <div style="margin: 20px 0;"></div>

      　新密码：
      <el-input  v-model="password" show-password></el-input>
      <div style="margin: 20px 0;"></div>
      确认密码：
      <el-input v-model="repwd" show-password></el-input>
      <div style="margin: 20px 0;"></div>
      <div style="text-align: right;">
       <el-button type="primary" class="commit-btn" @click="doEdit">提交</el-button>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        password: '',
        repwd: '',
      }
    },methods: {
      doEdit:function () {
        this.$store.dispatch("changePassword",{
          id: this.$route.query.id,
          username: this.$route.query.username,
          password: this.password,
          repwd: this.repwd,
          vm: this
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .add-con {
    width: 400px;
    text-align: right;
    .el-input {
      width: 300px;
    }
    .commit-btn {
      width: 120px;
    }
  }
</style>
