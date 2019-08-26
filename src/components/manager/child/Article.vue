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
        label="序号"
        width="80"
        align="left">
        <template slot-scope="scope">
          <span style="text-align: left">{{ scope.row.createId }}</span>
        </template>
      </el-table-column>


      <el-table-column
        label="标题"
        width="220"
        align="left">
        <template slot-scope="scope">
          <span style="text-align: left">{{ scope.row.title }}</span>
        </template>
      </el-table-column>



      <el-table-column
        label="标签"
        width="250"

        align="center">
        <template slot-scope="scope" >
          <template  v-for="tag in scope.row.tags">
            <el-tag type="success" style="margin-left:5px">{{tag.name}}</el-tag>
          </template>
        </template>
      </el-table-column>


      <el-table-column
        label="归类"
        width="120"
        align="center">
        <template slot-scope="scope">
          <span style="text-align: left">{{ scope.row.atname }}</span>
        </template>
      </el-table-column>


      <el-table-column
        label="状态"
        width="100"
        align="center">
        <template slot-scope="scope">
          <el-button type="success" size="mini" v-if="scope.row.state == 1" @click="changeState(scope.row,'state')" >已发布</el-button>
          <el-button type="info" plain size="mini" v-else @click="changeState(scope.row,'state')" >待发布</el-button>
        </template>
      </el-table-column>

      <el-table-column
        label="公开"
        width="80"
        align="center">
        <template slot-scope="scope" >
            <i @click="changeState(scope.row,'lock')" v-if="scope.row.lock == 0" class="el-icon-success" style="color: #5CB6FF;cursor: pointer"></i>
            <i @click="changeState(scope.row,'lock')" v-else class="el-icon-lock" style="color: #C76E00;cursor: pointer"></i>
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
        ARTICLE_URL: Config.BASE_URL + 'admin/article',
        CHANGE_STATE_URL: Config.BASE_URL + 'admin/changeState',
        DELETE_URL: Config.BASE_URL + 'admin/article/delete',
        tableData: [], //

        pageSize:10,//每页显示多少条前端固定
        pageCount:0,
        hideSinglePage: true,

      }
    },
    methods: {
      currentChange: function (page) {
        this.getPageArticles(page);
      },
      getPageArticles:function (page) {
        //请求服务器，获取pageCount,pageSize
        this.$http.get(this.ARTICLE_URL + "?pageSize=" + this.pageSize + "&page=" + page)
          .then(response => {
            if (response.body.success) {
              this.tableData = response.body.articles;
              this.pageCount = response.body.pageCount;
              console.log("pageCount:" + response.body.pageCount);
            }
          },response => {

          });
      },
      handleEdit(index, row) {
        this.$router.push({path:'/manager/article/edit',query: { id: row._id}});
      },
      handleDelete(index, row) {

        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$http.get(this.DELETE_URL + '?id='+ row._id).then(response => {
            if (response.body.success) {
              msgTool.successTips(this,'删除成功!');
              this.getPageArticles(1);
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
      },changeState: function (row,field) {
        this.$http.post(this.CHANGE_STATE_URL,{
          id: row._id,
          collectionName:'article',
          attr: field
        }).then(response => {
          if (response.body.success) {
            notifyTool.successTips(this,'成功',response.body.msg);
            if (row[field] == '1') {
              row[field] = '0';
            } else {
              row[field] = '1';
            }
          }
        },response => {
        });
      }
      },mounted() {
      this.getPageArticles(1);
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

</style>
