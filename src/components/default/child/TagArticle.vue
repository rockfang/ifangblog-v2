<template>
  <div v-cloak>
    <div class="content">
      <div class="main-atag" :style="mainHeight">
        <div class="tag-title">
          <img :src="'https://'+ taginfo.icon" alt="" v-if="taginfo.icon">
          <img src="../../../assets/images/tag.png" alt="" v-else>
          <h2>{{taginfo.name}} 标签</h2>
        </div>
        <div class="article-item" v-for="item in articles">
          <div class="article-time-head">
            <img src="../../../assets/images/calenter.png" alt="">
            <span>{{item.createTime}}</span>
          </div>
          <div class="article-title">{{item.title}}</div>
          <div class="article-message markdown-body" v-html="item.description">
          </div>
          <!--<div class="article-readmore" @click="goArticle(item._id)"><a href="">查看更多...</a></div>-->

          <router-link :to="'/article?id=' + item._id" tag="div" class="article-readmore">
            <a href="">查看更多</a>
            <img src="../../../assets/images/more.png" alt="">
          </router-link>
        </div>
        <div v-if="!articles || articles.length == 0" class="empty-tips">本标签暂无文章</div>

        <template>
          <el-pagination
            small
            layout="prev, pager, next,jumper"
            :hide-on-single-page="Boolean(true)"
            @current-change="currentChange"
            :page-size="pageSize"
            :page-count="pageCount">
          </el-pagination>

        </template>
      </div>
    </div>

    <v-bottomBar v-if="pageCount"></v-bottomBar>

  </div>

</template>

<script>
  import ArticelTagBar from '../public/ArticelTagBar.vue'
  import BottomBar from '../public/BottomBar.vue'
  import '../../../assets/css/basic.scss';
  import {mapGetters} from "vuex"

  import 'mavon-editor/dist/markdown/github-markdown.min.css'
  import 'mavon-editor/dist/highlightjs/styles/gruvbox-dark.min.css'

  /**
   * import 'mavon-editor/dist/highlightjs/styles/atelier-estuary-dark.min.css'
   import 'mavon-editor/dist/highlightjs/styles/atelier-cave-dark.min.css'
   import 'mavon-editor/dist/highlightjs/styles/atelier-dune-dark.min.css'
   import 'mavon-editor/dist/highlightjs/styles/atelier-heath-dark.min.css'
   */

  export default {
    data() {
      return {
        pageSize: 10,//每页显示条数，前端固定
        mainHeight: {
          'min-height': window.innerHeight - 265 + 'px'
        },
        name: ""
      }
    }, computed: {
      ...mapGetters([
        "taginfo",
        "pageCount",
        "articles",
      ]),
    },
    components: {
      'v-articleTagBar': ArticelTagBar,
      'v-bottomBar': BottomBar,
    }, methods: {
      currentChange: function (page) {
        this.requestTagArticles(page);
      }, requestTagArticles: function (page) {
        this.$store.dispatch("requestTagArticles", {
          pageSize: this.pageSize,
          page: page,
          tagName: this.$route.params.name
        });
      },
      goArticle: function (id) {
        this.$router.push({path: '/article', query: {id: id}});
      }
    }, created() {
      this.$store.dispatch("getTagInfo", this.$route.params.name);
      this.requestTagArticles(1);
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    margin: 65px 20px 20px 20px;
    text-align: center;
    /*background: #F7F7F7;*/

    .main-atag {
      display: inline-block;
      text-align: left;
      width: 78%;

      .tag-title {
        height: 40px;
        display: flex;
        margin-top: 30px;
        align-items: center;

        img {
          width: 30px;
          height: 30px;
          margin-right: 5px;
        }
      }

      .article-item {
        display: block;
        /*min-height: 330px;*/
        background: white;
        margin: 30px 0;
        padding: 30px 45px 30px 45px;
        border-radius: 10px;

        .article-time-head {
          height: 20px;
          display: flex;
          align-items: center;

          img {
            height: 100%;
          }

          span {
            font-size: 16px;
            margin-left: 5px;
          }
        }

        .article-title {
          font-size: 26px;
          line-height: 42px;
          margin: 20px 0 25px;
        }

        .article-message {
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          line-height: 2;
          letter-spacing: 0.2px;
          word-break: break-word;
        }

        .article-readmore {
          display: flex;
          align-items: center;
          width: 100%;
          margin-top: 15px;
          margin-left: 0;
          font-weight: 400;
          font-size: 18px;
          font-style: italic;

          :hover {
            color: #4FC08D;
            border-color: #4FC08D;
          }

          img {
            height: 38px;
            margin: 2px 0 0 5px;
            cursor: pointer;
          }
        }

      }

      .empty-tips {
        margin: 30px 0 0 20px;
      }

      .el-pagination {
      }
    }

    a {
      color: #212121;
      text-decoration: none;
    }

    a:hover {
      text-decoration: none;
      color: #212121;
    }

  }

</style>
