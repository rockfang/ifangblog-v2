<template>
    <div v-cloak>
      <div class="content-detail">
        <!-- 添加空的markdown-body 类名目的是使得引用到mavonEditor中的样式-->
        <div class="article markdown-body" :style="articleHeight" v-html="article" >

        </div>
      </div>
      <v-bottomBar v-if="article"></v-bottomBar>
    </div>
</template>

<script>

  import BottomBar from '../public/BottomBar.vue'
  import '../../../assets/css/basic.scss';
  import 'mavon-editor/dist/markdown/github-markdown.min.css'
  import 'mavon-editor/dist/highlightjs/styles/gruvbox-dark.min.css'

  /**
   * import 'mavon-editor/dist/highlightjs/styles/atelier-estuary-dark.min.css'
     import 'mavon-editor/dist/highlightjs/styles/atelier-cave-dark.min.css'
     import 'mavon-editor/dist/highlightjs/styles/atelier-dune-dark.min.css'
     import 'mavon-editor/dist/highlightjs/styles/atelier-heath-dark.min.css'
   */


  export default {
    name: "ArticleDetail",
    data:function() {
      return {
        articleHeight: {
          'min-height': window.innerHeight - 360 + 'px'
        },
      }
    },
    computed: {
      article() {
        return this.$store.getters.detailArticle
      }
    },
    components: {
      'v-bottomBar': BottomBar,
    },created() {
      this.$store.dispatch("initArticleDetail",this.$route.query.id);
    }
  }
</script>

<style lang="scss">
  [v-cloak] {
    display:none;

  }

  .content-detail {
    margin-top: 60px;
    display: flex;
    width: 100%;
    justify-content: center;

    .article {
      width: 65%;
      min-height: 560px;
      text-align: left;
      background: white;
      margin: 30px 0;
      padding: 30px 45px;
      border-radius: 10px;
    }

    pre {
      padding: 0;
      .hljs {
      border-radius: 5px !important;
        padding-left: 20px;
      }
    }
  }
</style>
