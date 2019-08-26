<template>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :row-class-name="tableRowClassName"
        >

        <el-table-column
          label="姓名"
          width="180"
          align="center">
          <template slot-scope="scope">
            <span style="text-align: center">{{ scope.row.username }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="上次登录时间"
          width="180"
          align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="text-align: center">{{ scope.row.last_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="180"
          align="center">
          <template slot-scope="scope">
            <i @click="changeState(scope.row)" v-if="scope.row.state == 1" class="el-icon-success" style="color: #5CB6FF;cursor:pointer;"></i>
            <i @click="changeState(scope.row)" v-else class="el-icon-error" style="color: red;cursor:pointer;"></i>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="left">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改密码</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import Config from '../../../module/config.js'
  import notifyTool from '../../../module/notifyTool.js'
  export default {
    data() {
      return {
        MANAGER_URL: Config.BASE_URL + 'admin/manager',
        CHANGE_STATE_URL: Config.BASE_URL + 'admin/changeState',
        DELETE_URL: Config.BASE_URL + 'admin/manager/delete',
        tableData: []
      }
    },
    methods: {
      initData() {
        this.$http.get(this.MANAGER_URL).then(response => {
          if (response.body.success) {
            this.tableData = response.body.managers;
          }
        },response => {

        });
      },
      handleEdit(index, row) {
        this.$router.push({path:'/manager/admin/edit',query: { id: row._id, username: row.username}});
      },
      handleDelete(index, row) {
        console.log(row._id);
        this.$http.get(this.DELETE_URL + '?id='+ row._id).then(response => {
          if (response.body.success) {
            notifyTool.successTips(this,'成功',response.body.msg);
            this.initData();
          } else {
            notifyTool.errorTips(this,'失败',response.body.msg);
          }
        },response => {
          notifyTool.errorTips(this,'失败','删除失败');
        });
      }, tableRowClassName({row, rowIndex}) {
          if(this.tableData[rowIndex]) {
            if(this.tableData[rowIndex].state == '0') {
              return 'warning-row';
            } else {
              //return 'success-row';
            }
          }
          return '';
      },changeState: function (row) {
        this.$http.post(this.CHANGE_STATE_URL,{
          id: row._id,
          collectionName:'admin',
          attr: 'state'
        }).then(response => {
          if (response.body.success) {
            notifyTool.successTips(this,'成功',response.body.msg);
            if (row.state == '1') {
              row.state = '0';
            } else {
              row.state = '1';
            }
          }
        },response => {
        });
      }
    },mounted() {
      this.initData();
    }
  }
</script>

<style scoped lang="scss">
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
