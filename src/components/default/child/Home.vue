<template>
  <div v-cloak>
    <div class="content">
      <div class="main-home">

        <div class="article-item" v-for="item in articles">
          <div class="article-time-head">
            <img src="../../../assets/images/calenter.png" alt="">
            <span>{{item.createTime}}</span>
          </div>
          <div class="article-title">{{item.title}}</div>
          <div class="article-message" v-html="item.description">
          </div>
          <div class="article-readmore" @click="goArticle(item._id)">
            <a href="">查看更多</a>
            <img src="../../../assets/images/more.png" alt="">
          </div>
          <v-articleTagBar :tags="item.tags"></v-articleTagBar>
        </div>

        <template>
          <el-pagination
            small
            layout="prev, pager, next,jumper"
            hide-on-single-page="true"
            @current-change="currentChange"
            :page-size="pageSize"
            :page-count="pageCount">
          </el-pagination>

        </template>
      </div>
    </div>
    <v-bottomBar v-if="ready"></v-bottomBar>

  </div>

</template>

<script>
  import ArticelTagBar from '../public/ArticelTagBar.vue'
  import BottomBar from '../public/BottomBar.vue'
  import '../../../assets/css/basic.scss';
  import Config from '../../../module/config.js'


  export default {
    data() {
      return {
        pageSize: 2,//每页显示条数，前端固定

        ARTICLE_INDEX_URL: Config.BASE_WEB_URL,
        articles: [],
        ready: false,
        defaultMore: true
      }
    }, components: {
      'v-articleTagBar': ArticelTagBar,
      'v-bottomBar': BottomBar,
    }, methods: {
      requestArticleIndex: function () {
        this.$http.get(this.ARTICLE_INDEX_URL).then(response => {
          if (response.body.success) {
            this.articles = response.body.articles;
            console.log(this.articles);
            this.ready = true;//处理底部栏闪屏出现
          }
        }, response => {

        });
      }, goArticle: function (id) {
        this.$router.push({path: '/article', query: {id: id}});
      }
    }, mounted() {
      this.requestArticleIndex();
    }
  }
</script>

<style lang="scss">
  [v-cloak] {
    display: none;

  }

  .content {
    margin: 65px 20px 20px 20px;

    text-align: center;
    background: #F7F7F7;

    .main-home {
      display: inline-block;
      text-align: left;
      width: 78%;

      .article-item {
        display: block;
        /*min-height: 330px;*/
        background: white;
        margin: 30px 0;
        padding: 30px 45px 0 45px;
        border-radius: 10px;
        font-size: 16px;

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
