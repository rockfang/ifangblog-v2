<template>
  <div class="add-con">
    分类名称：
    <el-input
      type="text"
      v-model="cTypeInfo.title"
      maxlength="15"
      show-word-limit
      disabled
    >
    </el-input>

    <div style="margin: 20px 0;"></div>
    <div style="float: left">
      　上级分类：
      <el-select v-model="cTypeInfo.parentType" placeholder="请选择">
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
      <el-select v-model="cTypeInfo.state" placeholder="请选择">
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
      <el-select v-model="cTypeInfo.lock" placeholder="请选择">
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
      v-model="cTypeInfo.description"
      show-word-limit
    >
    </el-input>
    <div style="text-align: right;margin-top: 20px">
      <el-button type="primary" class="commit-btn" @click="doEdit">提交</el-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import {mapActions} from "vuex"
  export default {
    computed: {
        ...mapGetters([
          "pTypes",
          "cTypeInfo",
        ])
    },
    methods: {
      ...mapActions(
        [
          "commitArticleTypeInfo",
          "getPTypes",
          "getCType"
        ]
      ),
      doEdit:function () {
        this.commitArticleTypeInfo(this)
      }
    },created() {
      this.getPTypes();
      this.getCType(this.$route.query.id);
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
