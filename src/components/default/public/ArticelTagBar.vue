<template>
    <div class="article-tag">
      <div class="tag-item" v-for="tag in this.tags" @click="goTagArticle(tag.name)">
        <a href="" class="a-tag">
          <img :src="'https://' + tag.icon" alt="" v-if="tag.icon">
          <img src="../../../assets/images/tag.png" alt="" v-else>
          <span>{{tag.name}}</span>
        </a>
      </div>
    </div>
</template>

<script>
    export default {
      data: function() {
        return {
        }
      },
      props:["tags"],
      methods: {
        goTagArticle: function (name) {
          this.$router.push({path:'/tagarticle/' + name});
        }
      }

    }
</script>

<style lang="scss" scoped>
  .article-tag {
    background: white;
    height: 50px;
    padding: 10px;
    margin-top: 20px;
    text-align: center;
    display: flex;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    border-top: 1px solid #eee;

    .tag-item {
      background: #EEEEEE;
      height: 20px;
      margin: 5px 10px;
      padding: 5px;
      border: 1px solid #eee;
      border-radius: 5px;
      .a-tag {
        display: flex;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          margin-right: 2px;
        }
      }
    }

    .tag-item:hover {
      color: #4FC08D;
      border-color: #4FC08D;
    }
    .tag-item a:hover {
      color: #4FC08D;
      border-color: #4FC08D;
    }
  }
</style>
