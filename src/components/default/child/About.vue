<template>
  <div v-cloak>
    <!--<v-headNavBar  :path="this.$route.path"></v-headNavBar>-->

    <div class="content-about">
      <div class="main" :style="mainHeight">

        <h3 class="about-title">
          关于本站
        </h3>
        <div class="about-con">
          本站于2019年7月发布第一个简单版本。采用Vue + ElementUI + Node实现的一个简单的前后端分离博客。
          <br>
          <br>
          说是博客，更多的是希望对自己的学习的一个记录吧。
          <br>
          <br>
          后续会不定期更新文章，以及丰富本站功能。
          <br>
          <br>
          技术交流或者发现本站bug，欢迎通过下面联系方式和我交流。
        </div>
        <br>
        <h3 class="contact-title">联系方式</h3>
        <br>
        <ul>
          <li>Email: cooldish1245@163.com</li>
          <br>
          <li>QQ： 657297417</li>
          <br>
          <li>Github：<a href="https://github.com/rockfang">https://github.com/rockfang</a></li>

        </ul>
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

  .content-about {
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

      .about-title,.contact-title {
        height: 40px;
        border-bottom: 1px dashed #000;
      }

      .about-con {
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


      a {
        color: #3eaf7c;
        cursor: pointer;
      }
    }
  }

</style>
