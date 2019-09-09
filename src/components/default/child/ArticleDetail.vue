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
    },watch: {
      article: function () {
        this.$nextTick(()=>{
          /*生成复制按钮*/
          const codecopys = document.getElementsByTagName('pre');
          console.log(codecopys.length);
          for (let i = 0; i < codecopys.length; i++) {
            //pre元素对象
            let codecopy = codecopys[i];
            //生成复制按钮
            let html_temp = '<div class="codecopy-btn" data-title="复制" data-clipboard-action="copy" data-clipboard-target="#code_' + i + '">复制</div>';
            codecopy.firstChild.id = 'code_' + i;//找到pre标签的第一个子元素（要复制代码所在元素）赋予id

            //将复制按钮追加至页面
            codecopy.innerHTML = codecopy.innerHTML + html_temp;

            //添加click事件和mouseout事件
            let copyDom = document.getElementsByClassName("codecopy-btn")[i];
            copyDom.addEventListener("click",function () {
              copyDom.innerHTML = '复制成功';
            });
            copyDom.addEventListener("mouseout",function () {
              setTimeout(function () {
                copyDom.innerHTML = '复制';
              },1000);
            });
          }
          /*初始化复制功能*/
          const clipboardJs = new ClipboardJS('.codecopy-btn');
          /*复制成功事件*/
          clipboardJs.on('success', function (e) {
          });
          /*复制失败事件*/
          clipboardJs.on('error', function (e) {
          });
        })
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
    },
    beforeRouteLeave(to, from, next) {
      //清除数据,处理退出重新加载同一个详情页，watch触发，添加copy功能
      this.$store.commit("SET_DETAIL_AETICLE","");
      next();
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
      position: relative;

      .hljs {
      border-radius: 5px !important;
        padding-left: 20px;
      }
    }
    /*pre标签悬浮 复制按钮出现*/
    pre:hover .codecopy-btn{
      display: block;
    }
  }

  /*复制按钮样式*/
  .codecopy-btn{
    display: none;
    position: absolute;
    right: 4px;
    top: 0;
    font-size: 12px;
    color: white;
    background-color: transparent;
    padding: 2px 8px;
    margin: 8px;
    border-radius: 4px;
    cursor: pointer;
    /*box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05);*/
  }
</style>
