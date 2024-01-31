<template>
  <div>
    <el-page-header @back="$router.back()" :content="article.title">
    </el-page-header>
    <div class="box">
      <!-- title -->
      <h1 class="title">
        {{ article.title }}
      </h1>
      <div class="pic">
        <img :src="article.url" alt="" />
      </div>
      <!-- content -->
      <main class="content" v-html="article.content"></main>
    </div>
  </div>
</template>

<script>
import { getDetailAPI } from '@/api/articles'

export default {
  name: 'DetailPage',
  data () {
    return {
      article: {}
    }
  },
  async created () {
    // console.log(this.$route.params.id)
    const res = await getDetailAPI(this.$route.params.id)
    // console.log(res)
    this.article = res
    // console.log(this.article)
  }
}
</script>

<style>
.el-page-header {
  color: #d8d7d7;
  padding-left: 50px;
  .el-page-header__content {
    color: #d8d7d7;
}
}
.box {
  border: 0.5px solid rgb(136, 136, 136);
  width: 90%;
  margin: 50px auto;
  .title {
    text-align: center;
    color: #d6d6d6;
    padding: 50px 0 50px 0;
    letter-spacing: 3px;
    font-size: 40px;
  }
  .pic {
    margin: 0 auto 80px;
    width: 60vw;
    height: 50vh;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content {
    color: #b7b7b7;
    padding-bottom: 100px;
    margin: 0 auto;
    width: 70%;
    text-align: left;
    letter-spacing: 1px;
    line-height: 30px;
    font-weight: 100;
  }
}
</style>
