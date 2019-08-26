<template>
  <div class="add-con">
    分类名称：
    <el-input
      type="text"
      v-model="cType.title"
      maxlength="15"
      show-word-limit
      disabled
    >
    </el-input>

    <div style="margin: 20px 0;"></div>
    <div style="float: left">
      　上级分类：
      <el-select v-model="parentType" placeholder="请选择">
        <el-option
          key="-1"
          label="顶层分类"
          value="0">
        </el-option>
        <template v-for="(item,index) in pTypes">
          <!--若当前修改的是顶层分类，不能选自己作为顶层分类-->
          <el-option
            :key="index"
            :label="item.title"
            :value="item._id"
            v-if="item._id != $route.query.id">
          </el-option>
        </template>
      </el-select>
    </div>

    <div style="margin-top: 80px;"></div>
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

    <div style="margin-top: 140px"></div>
    <div style="float: left">
      　是否公开：
      <el-select v-model="lock" placeholder="请选择">
        <el-option
          key="0"
          label="公开"
          value='0'>
        </el-option>
        <el-option
          key="1"
          label="不公开"
          value='1'>
        </el-option>
      </el-select>
    </div>
    <div style="margin-top: 200px"></div>
    简要说明：
    <el-input
      type="text"
      v-model="description"
      show-word-limit
    >
    </el-input>
    <div style="text-align: right;margin-top: 20px">
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
        pTypes:[],
        cType: '',
        parentType: '',
        description: '',
        state: '0',
        lock: '0',
        EDIT_URL: Config.BASE_URL + 'admin/articletype/doEdit',
        ARTICLE_CTYPE_URL: Config.BASE_URL + 'admin/articletype/getctype',
        ARTICLE_PTYPE_URL: Config.BASE_URL + 'admin/articletype/getPtypes',
      }
    },methods: {
      init:function() {
        this.$http.get(this.ARTICLE_PTYPE_URL).then(response => {
          if (response.body.success) {
            this.pTypes = response.body.ptypes;
            console.log(this.pTypes);
            this.getCtype();
          }
        },response => {

        });
      },
      getCtype:function() {
        this.$http.get(this.ARTICLE_CTYPE_URL + '?id=' + this.$route.query.id).then(response => {
          if (response.body.success) {
            this.cType = response.body.ctype;
            this.parentType = this.cType.pid;
            this.state = this.cType.state;
            this.lock = this.cType.lock;
            this.description = this.cType.description;
          } else {
            notifyTool.errorTips(this,'错误',response.body.msg);
          }
        },response => {
          notifyTool.errorTips(this,'错误','未获取到数据');

        });
      },
      doEdit:function () {
        if (!this.parentType) {
          notifyTool.normalTips(this,'','请选择上层分类');
          return;
        }

        this.$http.post(this.EDIT_URL,{
          id: this.$route.query.id,
          pid: this.parentType,
          state: this.state,
          description: this.description,
          lock: this.lock
        }).then(response => {
          if (response.body.success) {
            notifyTool.successTips(this,'成功',response.body.msg);
            this.$router.push({path:'/manager/articletype'});
          } else {
            notifyTool.errorTips(this,'失败',response.body.msg);
          }
        },response => {
          notifyTool.errorTips(this,'修改失败','信息修改失败');
        });

      }
    },mounted() {
      this.init();
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
