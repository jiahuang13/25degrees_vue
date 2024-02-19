<template>
  <div class="article">
    <!-- <h1>專欄</h1> -->
    <el-row>
      <el-col :span="8" v-for="item in list" :key="item.id">
        <el-card
          :body-style="{ padding: '0px' }"
          @click.native="handleClick(item.id)"
        >
          <img :src="item.url" class="image" />
          <div class="title">
            <span>{{ item.title }}</span>
          </div>
          <!-- <hr> -->
          <div class="content" v-html="item.content"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAllArticlesAPI } from '@/api/articles'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      list: []
    }
  },
  async created () {
    const res = await getAllArticlesAPI()
    console.log(res)
    this.list = res.sort((a, b) => parseInt(b.id) - parseInt(a.id))
  },
  methods: {
    handleClick (id) {
      // console.log(id)
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style>
.article {
  h1 {
    color: #b7b7b7;
    text-align: center;
    letter-spacing: 5px;
    padding: 20px 0;
  }
  .el-row {
    margin: 3% auto 0 auto;
    text-align: center;
    width: 80%;
    .el-col {
      margin: 0 auto;
      text-align: center;
      .el-card {
        width: 90%;
        height: 60vh;
        text-align: center;
        background-color: transparent;
        border: 0.1px solid #b7b7b7;
        margin-bottom: 50px;
        cursor: pointer;
        .image {
          width: 100%;
          height: 30vh;
          object-fit: cover;
        }
        .title {
          height: 50px;
          text-align: center;
          padding: 20px 10px 20px 10px;
          span {
            font-size: 24px;
            letter-spacing: 1px;
            color: #fff;
            line-height: 35px;
          }
        }
        .content {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
          color: #fff;
          font-size: 14px;
          padding: 0 20px;
          margin: 0;
          line-height: 25px;
        }
      }
      .el-card:hover {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
      }
    }
  }
}
</style>
