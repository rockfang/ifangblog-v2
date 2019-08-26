<template>
  <div class="add-con">
    标签名称：
    <el-input
      type="text"
      v-model="typeName"
      maxlength="15"
      show-word-limit
      disabled
    >
    </el-input>

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

    <div class="icon-row">
      　　　图标：<span>(只能上传jpg/png文件，且不超过500kb。可不选。)</span>
    </div>

    <div style="clear:both;height:0;line-height:0;font-sizing:0;"></div>
    <div style="width: 100%;text-align: left;margin-left: 80px;padding: 10px" v-if="icon">
      <img :src="'https://'+ icon" class="tag-icon">
    </div>

    <div class="upload-row">
      <el-upload
        class="upload-demo"
        ref="upload"
        name="tagIcon"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="fileChange"
        :file-list="fileList"
        :on-exceed="handleExceed"
        :limit="1"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      </el-upload>
    </div>


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
        fileList:[],
        cTag:"",
        typeName: '',
        state: '1',
        sort:'',
        icon:"",
        CTAG_URL: Config.BASE_URL + 'admin/tag/getctag',
        Edit_URL: Config.BASE_URL + 'admin/tag/doEdit',
      }
    },methods: {
      init() {
        this.$http.get(this.CTAG_URL + '?id=' + this.$route.query.id).then(response => {
          if (response.body.success) {
            console.log(response.body.ctag.icon);
            this.cTag = response.body.ctag;
            this.typeName = this.cTag.name;
            this.state = this.cTag.state;
            this.sort = this.cTag.sort;
            this.icon = this.cTag.icon;
          } else {
            notifyTool.errorTips(this,'错误',response.body.msg);
          }
        },response => {
          notifyTool.errorTips(this,'错误','未获取到数据');

        });
      },
      fileChange(file){
        this.fileList.push(file.raw);//上传文件变化时将文件对象push进files数组
      },
      handleExceed(files, fileList) {
        msgTool.warnTips(this,`当前限制选择 1 个文件，如需更换请先移除选择的文件`)
      },
      submitUpload() {
        if (this.sort && !commonTool.checkNum(this.sort)) {
          notifyTool.normalTips(this,'','请填写数字排序序号');
          return;
        }
        let formData = new FormData();
        formData.append('id',this.$route.query.id);
        formData.append('tagIcon',this.fileList[0]);
        formData.append('typeName', this.typeName);
        formData.append('state', this.state);
        formData.append('sort', this.sort);
        // specify Content-Type, with formData as well
        this.$http.post(this.Edit_URL, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
          if (response.body.success) {
            notifyTool.successTips(this,'成功',response.body.msg);
            this.$router.push({path:'/manager/tag'});
          } else {
            notifyTool.errorTips(this,'失败',response.body.msg);
          }
        },response => {
          notifyTool.errorTips(this,'添加失败','信息提交失败');
        });
      },
      handleRemove() {
        this.fileList.splice(0,1);
      },
      handlePreview(file) {
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

    .state-row,.icon-row {
      float: left;
      margin-top: 20px;

      span {
        font-size: 10px
      }
    }

    .upload-row {
      margin-top: 10px;

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

    .tag-icon {
      width: 100px;
      height: 100px;
    }

  }
</style>
