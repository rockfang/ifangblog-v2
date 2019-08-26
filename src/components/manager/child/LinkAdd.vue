<template>
  <div class="add-con">
    友链名称：
    <el-input
      type="text"
      v-model="name"
      maxlength="15"
      show-word-limit
    >
    </el-input>
    <div style="margin: 20px 0;"></div>
    链接地址：
    <el-input  v-model="friendLink"></el-input>

    <div class="state-row">
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

    <div style="margin-top: 80px"></div>
    　　序号：
    <el-input
      type="text"
      v-model="sort"
    >
    </el-input>

    <div style="margin-top: 20px"></div>
    站长：
    <el-input
      type="text"
      v-model="author"
      maxlength="15"
      show-word-limit
    >
    </el-input>

    <div style="text-align: right;margin-top: 20px;">
      <el-button type="primary" class="commit-btn" @click="submitUpload">提交</el-button>
    </div>
  </div>
</template>

<script>
  import Config from '../../../module/config.js'
  import notifyTool from '../../../module/notifyTool.js'
  import msgTool from '../../../module/msgTool.js'
  import commonTool from '../../../module/commonTool.js'

  export default {
    data() {
      return {
        name: '',
        friendLink:'',
        author: '',
        state: '1',
        sort:'',
        ADD_URL: Config.BASE_URL + 'admin/link/doAdd',
      }
    },methods: {

      submitUpload() {
        if (!this.friendLink) {
          notifyTool.normalTips(this,'','请填写链接地址');
          return;
        }
        if (this.sort && !commonTool.checkNum(this.sort)) {
          notifyTool.normalTips(this,'','请填写数字排序序号');
          return;
        }
        this.$http.post(this.ADD_URL,{
          name: this.name,
          link: this.friendLink,
          owner: this.author,
          state: this.state,
          sort: this.sort
        }).then(response => {
          if (response.body.success) {
            notifyTool.successTips(this,'成功',response.body.msg);
            this.$router.push({path:'/manager/link'});
          } else {
            notifyTool.errorTips(this,'失败',response.body.msg);
          }
        },response => {
          notifyTool.errorTips(this,'添加失败','信息提交失败');
        });
      },
    },mounted() {
    }
  }
</script>

<style scoped lang="scss">
  .add-con {
    width: 400px;
    text-align: right;

    .state-row,.icon-row {
      float: left;
      margin-top: 20px;

      span {
        font-size: 10px
      }
    }

    .upload-row {
      margin-top: 60px;

      .upload-label {
        margin-left: 0px;
      }

      .upload-demo {

        width: 300px;
        display: inline-block;
        text-align: left;
      }

      .el-upload__tip {
        display: inline-block;
        font-size: 14px;
      }
    }

    .el-input {
      width: 300px;
    }

    .commit-btn {
      width: 120px;
    }

  }
</style>
