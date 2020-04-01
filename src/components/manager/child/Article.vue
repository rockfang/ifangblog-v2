<template>
  <div>
    <div class="filter-con">
      <el-form :inline="true" class="demo-form-inline" size="small">
        <el-form-item>
          <el-select v-model="atValue" clearable filterable placeholder="请选择分类">
            <el-option
              v-for="item in atypes"
              :key="item._id"
              :label="item.title"
              :value="item.title"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="queryByAtype" type="primary" plain size="small">分类过滤</el-button>
        </el-form-item>

        <el-form-item>
          <el-select v-model="tagValue" clearable filterable placeholder="请选择标签">
            <el-option v-for="item in aTags" :key="item._id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="queryByTag" type="primary" plain size="small">标签过滤</el-button>
        </el-form-item>

        <el-form-item>
          <el-input
            autosize
            placeholder="请输入id"
            v-model="filterId"
            clearable
          ></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button @click="queryById" type="primary" plain size="small">id过滤</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :data="tableData"
      border
      @cell-click="openDetailPage"
      @cell-mouse-enter="showTips"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      row-key="_id"
    >
      <el-table-column label="序号" width="80" align="left">
        <template slot-scope="scope">
          <span style="text-align: left">{{ scope.row.createId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标题" width="220" align="left">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="点击前往详情页" placement="top">
            <span style="text-align: left">{{ scope.row.title }}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="标签" width="250" align="center">
        <template slot-scope="scope">
          <template v-for="(tag,index) in scope.row.tags">
            <el-tag type="success" style="margin-left:5px" :key="index">{{tag.name}}</el-tag>
          </template>
        </template>
      </el-table-column>

      <el-table-column label="归类" width="120" align="center">
        <template slot-scope="scope">
          <span style="text-align: left">{{ scope.row.atname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            v-if="scope.row.state == 1"
            @click="changeState(scope.row,'state')"
          >已发布</el-button>
          <el-button
            type="info"
            plain
            size="mini"
            v-else
            @click="changeState(scope.row,'state')"
          >待发布</el-button>
        </template>
      </el-table-column>

      <el-table-column label="公开" width="80" align="center">
        <template slot-scope="scope">
          <i
            @click="changeState(scope.row,'lock')"
            v-if="scope.row.lock == 0"
            class="el-icon-success"
            style="color: #5CB6FF;cursor: pointer"
          ></i>
          <i
            @click="changeState(scope.row,'lock')"
            v-else
            class="el-icon-lock"
            style="color: #C76E00;cursor: pointer"
          ></i>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="left">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        :page-count="pageCount"
      ></el-pagination>
    </template>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      atValue: "",
      tagValue: "",
      dataType: 0, // 0表示默认/分类数据列表，1表示tag数据列表
      filterId: '',
    };
  },
  computed: {
    aTags: function() {
      return this.$store.getters.allTags;
    },
    atypes: function() {
      return this.$store.getters.articleTypes;
    },
    tableData: function() {
      return this.$store.getters.mangerArticles;
    },
    pageCount: function() {
      return this.$store.getters.managerArticlePageCount;
    },
    pageSize: function() {
      return this.$store.getters.managerArticlesPageSize;
    }
  },
  methods: {
    showTips(row, column, event, cell) {
      if (column.label !== "标题") {
        return;
      }
    },
    openDetailPage(row, column, event, cell) {
      if (column.label !== "标题") {
        return;
      }
      let routeUrl = this.$router.resolve({
        path: "/article",
        query: { id: row._id }
      });
      window.open(routeUrl.href, "_blank");
    },
    queryByTag() {
      this.dataType = 1;
      this.$store.dispatch("manageTagArticles", {
        page: 1,
        tagName: this.tagValue,
        vm: this
      });
    },
    queryByAtype() {
      this.dataType = 0;
      this.getPageArticles({ page: 1, atname: this.atValue });
    },
    queryById() {
      this.$store.dispatch('manageIdArticle',this.filterId);
    },
    currentChange: function(page) {
      if (this.dataType == 0) {
        this.getPageArticles({ page: page, atname: this.atValue });
      } else {
        this.$store.dispatch("manageTagArticles", {
          page: page,
          tagName: this.tagValue,
          vm: this
        });
      }
    },
    getPageArticles: function(params) {
      this.$store.dispatch("requestManagerArticles", params);
    },
    getAtypes: function() {
      this.$store.dispatch("getRawArticleTypes");
    },
    getAllTags: function() {
      this.$store.dispatch("requestAllTags");
    },
    handleEdit(index, row) {
      this.$router.push({
        path: "/manager/article/edit",
        query: { id: row._id }
      });
    },
    handleDelete(index, row) {
      this.$store.dispatch("deleteArticle", { id: row._id, vm: this });
    },
    tableRowClassName({ row, rowIndex }) {
      if (this.tableData[rowIndex]) {
        if (this.tableData[rowIndex].state == "0") {
          return "warning-row";
        } else {
          // return 'success-row';
        }
      }
      return "";
    },
    changeState: function(row, field) {
      this.$store.dispatch("changeArticleState", {
        row: row,
        field: field,
        vm: this
      });
    }
  },
  created() {
    this.getPageArticles({ page: 1, atname: this.atValue });
    this.getAtypes();
    this.getAllTags();
  }
};
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
