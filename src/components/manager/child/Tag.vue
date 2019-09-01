<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName"
      row-key="_id"
    >

      <el-table-column
        label="标签名称"
        width="180"
        align="left">
        <template slot-scope="scope">
          <el-tag type="success">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        width="80"
        align="center">
        <template slot-scope="scope">
          <i @click="changeState(scope.row)" v-if="scope.row.state == 1" class="el-icon-success" style="color: #5CB6FF;cursor:pointer;"></i>
          <i @click="changeState(scope.row)" v-else class="el-icon-error" style="color: red;cursor:pointer;"></i>
        </template>
      </el-table-column>


      <el-table-column
        label="排序"
        width="70"
        align="center">
        <template slot-scope="scope">
          <el-input size="mini"
                    :id="scope.row._id"
                    v-model="scope.row.sort"
                    @blur="changeSort"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="left">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <template>
      <el-pagination
        small
        layout="prev, pager, next"
        :hide-on-single-page="Boolean(true)"
        @current-change="currentChange"
        :page-size="pageSize"
        :page-count="pageCount">
      </el-pagination>
    </template>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import {mapActions} from "vuex"
  export default {
    computed: {
      ...mapGetters({
        tableData: "managerTagTableData",
        pageCount: "managerTagPageCount",
        pageSize: "managerTagPageSize",
      }),
    },
    methods: {
      ...mapActions(
        [
          "initManagerTagData",
          "changeTagSort",
          "deleteManagerTag",
          "changeTagState",
        ]
      ),
      currentChange: function (page) {
        this.getPageTags(page);
      },getPageTags:function (page) {
        this.initManagerTagData({
          pageSize: this.pageSize,
          page: page,
        });
    },changeSort: function(event) {
        this.changeTagSort({
          id: event.target.id,
          sort: event.target.value,
        });
      },
      handleEdit(index, row) {
        this.$router.push({path:'/manager/tag/edit',query: { id: row._id}});
      },
      handleDelete(index, row) {
        this.deleteManagerTag({
          id: row._id,
          vm: this
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
        this.changeTagState({
          row: row,
          vm: this
        });
      }
    },mounted() {
      this.getPageTags(1);
    }
  }
</script>

<style  scoped lang="scss">
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  el-input__inner {
    text-align: center;
  }

  .el-pagination {
    margin-top: 10px;
  }

</style>
