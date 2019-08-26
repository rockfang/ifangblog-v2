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
        :hide-on-single-page="hideSinglePage"
        @current-change="currentChange"
        :page-size="pageSize"
        :page-count="pageCount">
      </el-pagination>
    </template>
  </div>
</template>

<script>
  import Config from '../../../module/config.js'
  import notifyTool from '../../../module/notifyTool.js'
  import msgTool from '../../../module/msgTool.js'
  export default {
    data() {
      return {
        TAG_TYPE_URL: Config.BASE_URL + 'admin/tag',
        CHANGE_STATE_URL: Config.BASE_URL + 'admin/changeState',
        CHANGE_SORT_URL: Config.BASE_URL + 'admin/changeSort',
        DELETE_URL: Config.BASE_URL + 'admin/tag/delete',
        tableData: [], //

        pageSize:5,//每页显示多少条前端固定
        pageCount:0,
        hideSinglePage: true,
       }
    },
    methods: {
      currentChange: function (page) {
        this.getPageTags(page);
      },getPageTags:function (page) {
      //请求服务器，获取pageCount,pageSize
      this.$http.get(this.TAG_TYPE_URL + "?pageSize=" + this.pageSize + "&page=" + page)
        .then(response => {
          if (response.body.success) {
            this.tableData = response.body.tags;
            this.pageCount = response.body.pageCount;
            console.log("pageCount:" + response.body.pageCount);
          }
        },response => {

        });
    },changeSort: function(event) {
        this.$http.post(this.CHANGE_SORT_URL,{
          id: event.target.id,
          sort: event.target.value,
          collectionName:'tag',
        }).then(response => {
          if (response.body.success) {
          }
        },response => {
        });
      },
      handleEdit(index, row) {
        this.$router.push({path:'/manager/tag/edit',query: { id: row._id}});
      },
      handleDelete(index, row) {

        this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$http.get(this.DELETE_URL + '?id='+ row._id).then(response => {
            if (response.body.success) {
              msgTool.successTips(this,'删除成功!');
              this.getPageTags(1);
            } else {
              msgTool.errorTips(this,response.body.msg);
            }
          },response => {
            msgTool.errorTips(this,'删除失败');
          });

        }).catch(() => {
          msgTool.normalTips(this,'已取消删除');
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
          collectionName:'tag',
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
