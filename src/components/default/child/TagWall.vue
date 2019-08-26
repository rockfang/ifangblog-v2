<template>
  <div v-cloak>
    <!--<v-headNavBar  :path="this.$route.path"></v-headNavBar>-->

    <div class="content">
      <div class="main" :style="mainHeight">

        <div class="wall-title">
          <img src="../../../assets/images/tag.png" alt="">
          标签墙
        </div>
        <div class="tag-con">
          <el-tag class="tag-item" :type="getRandomType()"
                  v-for="(tag,index) in tags"
                  :key="index"
                  @click="tagArticleList(tag.name)">
            {{tag.name}}
          </el-tag>

        </div>
      </div>
    </div>
    <v-bottomBar v-if="ready"></v-bottomBar>

  </div>

</template>

<script>
  import HeadNavBar from '../public/HeadNavBar.vue'
  import ArticelTagBar from '../public/ArticelTagBar.vue'
  import BottomBar from '../public/BottomBar.vue'
  import '../../../assets/css/basic.scss';
  import Config from '../../../module/config.js'


  export default {
    data() {
      return {
        TAGS_URL: Config.BASE_WEB_URL + 'tags',
        tags: [],
        ready: false,
        mainHeight: {
        'min-height': window.innerHeight - 350 + 'px'
      },
      }
    }, components: {
      'v-headNavBar': HeadNavBar,
      'v-articleTagBar': ArticelTagBar,
      'v-bottomBar': BottomBar,
    }, methods: {
      initTagData: function () {
        this.$http.get(this.TAGS_URL).then(response => {
          if (response.body.success) {
            this.tags = response.body.tags;
            this.ready = true;//处理底部栏闪屏出现
          }
        }, response => {

        });
      },tagArticleList: function(name) {
        this.$router.push({path:'/tagarticle/' + name});
      },
      getRandomType: function () {
        let randomNum = Math.ceil(Math.random() * 4);
        let type = "";
        if(randomNum == 0) {
          type = 'success';
        } else if(randomNum == 1) {
          type = 'info';
        } else if(randomNum == 2) {
          type = 'warning';
        } else if(randomNum == 3){
          type = 'danger';
        }
        return type;
      }
    }, mounted() {
      this.initTagData();
    }
  }
</script>

<style lang="scss" scoped>
  [v-cloak] {
    display: none;

  }

  .content {
    margin: 65px 20px 20px 20px;

    text-align: center;
    background: #F7F7F7;

    .main {
      display: inline-block;
      text-align: left;
      width: 72%;
      margin: 30px 45px;
      padding: 30px 45px;
      min-height: 600px;
      border-radius: 10px;
      background: white;

      .wall-title {
        height: 40px;
        display: flex;
        align-items: center;

        img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
      }

      .tag-con {
        margin: 15px 0;
        display: flex;
        flex-wrap: wrap;

        .tag-item {
          cursor: pointer;
          margin: 10px;
        }

        :hover {
          color: #4FC08D;
          border-color: #4FC08D;
        }
      }
    }
  }

</style>
