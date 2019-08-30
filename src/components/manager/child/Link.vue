<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >

      <el-table-column
        label="名称"
        width="180"
        align="center">
        <template slot-scope="scope">
          <span style="text-align: center">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="链接"
        width="180"
        align="center">
        <template slot-scope="scope">
          <span style="text-align: center">{{ scope.row.link }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        width="180"
        align="center">
        <template slot-scope="scope">
          <i @click="changeState(scope.row)" v-if="scope.row.state == 1" class="el-icon-success"
             style="color: #5CB6FF;cursor: pointer"></i>
          <i @click="changeState(scope.row)" v-else class="el-icon-error" style="color: red;cursor: pointer"></i>
        </template>
      </el-table-column>


      <el-table-column
        label="排序"
        width="60"
        align="center">
        <template slot-scope="scope">
          <el-input size="mini"
                    :id="scope.row._id"
                    v-model="scope.row.sort"
                    @blur="changeSort"></el-input>
        </template>
      </el-table-column>


      <el-table-column
        label="站长"
        width="180"
        align="center">
        <template slot-scope="scope">
          <span style="text-align: center">{{ scope.row.owner }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="left">
        <template slot-scope="scope">
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

<script>
  import {mapActions} from "vuex"

  export default {
    computed: {
      tableData() {
        return this.$store.getters.linkTableData;
      }
    },
    methods: {
      ...mapActions(
        [
          "initLinksData",
          "changeLinkSort",
          "deleteLink",
          "changeLinkState",
        ]
      ), changeSort: function (event) {
        this.changeLinkSort({
          id: event.target.id,
          sort: event.target.value,
          collectionName: 'link',
        });
      },
      handleDelete(index, row) {
        this.deleteLink({
          id: row._id,
          vm: this,
        });
      }, tableRowClassName({row, rowIndex}) {
        if (this.tableData[rowIndex]) {
          if (this.tableData[rowIndex].state == '0') {
            return 'warning-row';
          } else {
            //return 'success-row';
          }
        }
        return '';
      }, changeState: function (row) {
        this.changeLinkState({row: row, vm: this});

      }
    }, created() {
      this.initLinksData();
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
