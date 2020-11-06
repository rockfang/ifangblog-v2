<template>
  <div class="loginpage">
    <div class="content">
      <div class="title">ICAIFUN登陆</div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input placeholder="用户名" prefix-icon="el-icon-user-solid" autocomplete="off" v-model="ruleForm.username">
          </el-input>
        </el-form-item>

        <el-form-item prop="pass">
          <el-input placeholder="密码" type="password" v-model="ruleForm.pass" autocomplete="off">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="submitForm('ruleForm')"  :loading="loading">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import notifyTool from '../../module/notifyTool.js'
  export default {
    data() {
      var validateUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名'));
        }
        setTimeout(() => {
          if (value.length < 3) {
            callback(new Error('用户名长度须不小于3位'));
          } else {
            callback();
          }
        }, 1000);
      };

      var validatePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };

      return {
        ruleForm: {
          username: '',
          pass: '',
        },
        rules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          username: [
            {validator: validateUser, trigger: 'blur'}
          ]
        }
      };
    }, computed: {
      loading() {
        return this.$store.getters.loginLoading;
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch("sumitLogin",{
              username: this.ruleForm.username,
              pass: this.ruleForm.pass,
              vm: this
            });
          } else {
            notifyTool.errorTips(this,'登录失败','请核对用户名及密码');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      let vm = this;

      document.onkeydown = function(e) {
        let key = window.event.keyCode;
        if (key === 13) {
          vm.submitForm('ruleForm');
        }
      }
    },
    beforeDestroy() {
      document.onkeydown = function (e) {
        let key = window.event.keyCode;
        if (key === 13) {

        }
      }
    }
  }
</script>

<style lang="scss">
body {
  margin: 0 !important;
}
  .loginpage {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #909399;
    background-size: 100% 100%;

    .content {
      width: 350px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 5px;
      text-align: center;

      .title {
        font-family: cursive;
        font-weight: 700;
        font-size: 26px;
        color: #409EFF;
        padding-bottom: 20px;
      }
    }
  }


  .el-input__icon {
    color: #409EFF;

  }
</style>
