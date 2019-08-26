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
  import Config from '../../../module/config.js'
  import notifyTool from '../../../module/notifyTool.js'
  export default {
    data() {
      return {
        password: '',
        repwd: '',
        MANAGER_Edit_URL: Config.BASE_URL + 'admin/manager/doEdit',

      }
    },methods: {
      doEdit:function () {
        if (this.password.length < 3) {
          notifyTool.normalTips(this,'','密码须不小于3位');
          return;
        }

        if (this.password != this.repwd) {
          notifyTool.normalTips(this,'','两次输入密码不一致');
          return;
        }

        this.$http.post(this.MANAGER_Edit_URL,{
          id: this.$route.query.id,
          username: this.$route.query.username,
          password: this.password,
          repwd: this.repwd,
        }).then(response => {
          if (response.body.success) {
            notifyTool.successTips(this,'成功',response.body.msg);
            this.$router.push({path:'/manager/admin'});
          } else {
            notifyTool.errorTips(this,'失败',response.body.msg);
          }
        },response => {
          notifyTool.errorTips(this,'修改失败','信息提交失败');
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
