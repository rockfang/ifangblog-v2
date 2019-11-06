<template>
  <div>
    <div class="filter-con">
      <el-form :inline="true" :model="filterData" class="demo-form-inline" size="small">
        <el-form-item >
          <el-input size="small" v-model="filterData.keyword" placeholder="关键字"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="onSubmit" type="primary" plain size="small">筛选</el-button>
        </el-form-item>

        <el-form-item style="margin-left: 30px">
          <el-select size="small" v-model="filterData.tagName" placeholder="标签">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

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
        <template slot-scope="scope">
          <template v-for="tag in scope.row.tags">
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
          <el-button type="success" size="mini" v-if="scope.row.state == 1" @click="changeState(scope.row,'state')">
            已发布
          </el-button>
          <el-button type="info" plain size="mini" v-else @click="changeState(scope.row,'state')">待发布</el-button>
        </template>
      </el-table-column>

      <el-table-column
        label="公开"
        width="80"
        align="center">
        <template slot-scope="scope">
          <i @click="changeState(scope.row,'lock')" v-if="scope.row.lock == 0" class="el-icon-success"
             style="color: #5CB6FF;cursor: pointer"></i>
          <i @click="changeState(scope.row,'lock')" v-else class="el-icon-lock"
             style="color: #C76E00;cursor: pointer"></i>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="left">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
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
  export default {
    data:function() {
      return {
        filterData: {
          keyword: '',
          tagName: ''
        }
      }
    },
    computed: {
      tableData: function () {
        return this.$store.getters.mangerArticles;
      },
      pageCount: function () {
        return this.$store.getters.managerArticlePageCount;
      },
      pageSize: function () {
        return this.$store.getters.managerArticlesPageSize;
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      currentChange: function (page) {
        this.getPageArticles(page);
      },
      getPageArticles: function (page) {
        this.$store.dispatch("requestManagerArticles", page);
      },
      handleEdit(index, row) {
        this.$router.push({path: '/manager/article/edit', query: {id: row._id}});
      },
      handleDelete(index, row) {
        this.$store.dispatch("deleteArticle", {id: row._id, vm: this});
      }, tableRowClassName({row, rowIndex}) {
        if (this.tableData[rowIndex]) {
          if (this.tableData[rowIndex].state == '0') {
            return 'warning-row';
          } else {
            // return 'success-row';
          }
        }
        return '';
      }, changeState: function (row, field) {
        this.$store.dispatch("changeArticleState", {
          row: row,
          field: field,
          vm: this
        });
      }
    }, created() {
      this.getPageArticles(1);
    }
  }
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .filter-con {
    background: #ffffff;
    border-radius: 2px;
    padding: 10px 10px 0;
    margin: 5px 0;
  }


  .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
</style>
