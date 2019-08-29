<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName"
      row-key="_id"
      :tree-props="{children: 'list'}"
    >

      <el-table-column
        label="文章分类"
        width="180"
        align="left">
        <template slot-scope="scope">
          <span style="text-align: left">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        width="80"
        align="center">
        <template slot-scope="scope">
          <i @click="changeState(scope.row,'state')" v-if="scope.row.state == 1" class="el-icon-success"
             style="color: #5CB6FF;cursor:pointer;"></i>
          <i @click="changeState(scope.row,'state')" v-else class="el-icon-error"
             style="color: red;cursor:pointer;"></i>
        </template>
      </el-table-column>

      <el-table-column
        label="公开"
        width="80"
        align="center">
        <template slot-scope="scope">
          <i @click="changeState(scope.row,'lock')" v-if="scope.row.lock == 0" class="el-icon-success"
             style="color: #5CB6FF;cursor:pointer;"></i>
          <i @click="changeState(scope.row,'lock')" v-else class="el-icon-lock"
             style="color: #C76E00;cursor:pointer;"></i>
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
  </div>
</template>

<script>
  export default {
    computed: {
      tableData() {
        return this.$store.getters.articleTypes;
      }
    },
    methods: {
      handleEdit(index, row) {
        this.$router.push({path: '/manager/articletype/edit', query: {id: row._id}});
      },
      handleDelete(index, row) {
        this.$store.dispatch("deleteArticleType", {
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
      }, changeState: function (row, field) {
        this.$store.dispatch("changeArticleTypeState", {
          row: row,
          vm: this,
          attr: field
        });
      }
    }, created() {
      this.$store.dispatch("getArticleTypes");
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
