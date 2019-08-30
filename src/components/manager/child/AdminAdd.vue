<template>
    <div class="add-con">
      　用户名：
      <el-input
        type="text"
        v-model="name"
        maxlength="10"
        minlength="3"
        show-word-limit
      >
      </el-input>
      <div style="margin: 20px 0;"></div>
      　　密码：
      <el-input  v-model="password" show-password></el-input>
      <div style="margin: 20px 0;"></div>
      确认密码：
      <el-input v-model="repwd" show-password></el-input>
      <div style="margin: 20px 0;"></div>
      <div style="float: left">
        　　　状态：
        <el-select v-model="state" placeholder="请选择">
          <el-option
            key="0"
            label="待审核"
            value="0">
          </el-option>
          <el-option
            key="1"
            label="通过"
            value="1">
          </el-option>
        </el-select>
      </div>
      <div style="text-align: right;margin-top: 80px">
       <el-button type="primary" class="commit-btn" @click="doAdd">提交</el-button>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        password: '',
        repwd: '',
        state: '0',
      }
    },methods: {
      doAdd: function () {
        this.$store.dispatch("addNewManager", {
          username: this.name,
          password: this.password,
          repwd: this.repwd,
          state: this.state,
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
