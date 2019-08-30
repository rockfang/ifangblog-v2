<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName">

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
          <i @click="changeState(scope.row)" v-if="scope.row.state == 1" class="el-icon-success"
             style="color: #5CB6FF;cursor:pointer;"></i>
          <i @click="changeState(scope.row)" v-else class="el-icon-error" style="color: red;cursor:pointer;"></i>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="left">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改密码
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
  /*这里不使用scoped 不然设置el表格样式无效*/
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
<script>
  export default {
    computed: {
      tableData() {
        return this.$store.getters.tableManagers;
      }
    },
    methods: {
      handleEdit(index, row) {
        this.$router.push({path: '/manager/admin/edit', query: {id: row._id, username: row.username}});
      },
      handleDelete(index, row) {
        this.$store.dispatch("deleteManager", {row:row,vm:this});
      },
      changeState: function (row) {
        this.$store.dispatch("changeManagerState", {row:row,vm:this});
      },
      tableRowClassName({row, rowIndex}) {
        if (this.tableData[rowIndex]) {
          if (this.tableData[rowIndex].state == '0') {
            return 'warning-row';
          } else {
            return 'success-row';
          }
        }
        return '';
      }
    }, created() {
      this.$store.dispatch("initTableManagers");
    }
  }
</script>

