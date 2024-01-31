<template>
  <div>
    <el-row>
      <div class="box">
        <el-page-header @back="$router.back()" :content="info.name">
        </el-page-header>
      <el-col :span="12">
        <div class="pic">
        <img :src="info.url" alt="">
      </div>
      </el-col>
      <el-col :span="12" class="right">
        <h1 class="title">{{ info.name }}</h1>
        <p class="content" v-html="info.content"></p>
        <p class="price">NT${{ info.price }}</p>
        <br>
        <el-input-number size="mini" v-model="count"></el-input-number>
        <br>
        <el-button type="primary" icon="el-icon-shopping-cart-2" @click="addToCart()"
        >加入購物車</el-button
      >
      <el-button icon="el-icon-star-off" circle></el-button>
      </el-col>
    </div>
    </el-row>

  </div>
</template>

<script>
import { getDetailAPI, addToCartAPI } from '@/api/product'
import { mapState } from 'vuex'
export default {
  name: 'ProductPage',
  data () {
    return {
      info: {},
      count: '1'
    }
  },
  computed: {
    ...mapState('cart', ['list'])
  },
  async created () {
    const res = await getDetailAPI(this.$route.params.id)
    // console.log(res)
    this.info = res
    this.$store.dispatch('cart/getListAPI')
  },
  methods: {
    async addToCart () {
      // 要確認此商品是否已有在購物車裡，若有則修改數量，沒有則新增！！！！！
      const existItem = this.list.find(ele => ele.id === +this.$route.params.id)
      if (existItem) {
        // console.log('此商品已存在')
        await this.$store.dispatch('cart/updateCountAPI', { id: +this.$route.params.id, count: existItem.count + this.count })
        this.$message({
          message: '已加入購物車',
          type: 'success'
        })
      } else {
        const data = {
          id: +this.$route.params.id,
          count: this.count,
          price: +this.info.price,
          name: this.info.name,
          url: this.info.url
        }
        // 新增到cart list
        const res = await addToCartAPI(data)
        console.log(res)
        // 顯示新增成功輕提示
        console.log('成功')
        this.$message({
          message: '已加入購物車',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style>
.el-page-header {
  color: #d8d7d7;
  padding: 50px 0;
  .el-page-header__content {
    color: #d8d7d7;
}
}
.box {
  /* border: 1px solid rgb(136, 136, 136); */
  width: 80%;
  margin: 0 auto;
  .pic {
    width: 35vw;
    height: 40vw;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .right {
color: #d8d7d7;
.title {
  letter-spacing: 2px;
}
.content {
  letter-spacing: 1px;
  font-weight: lighter;
  line-height: 25px;
}
.price {
  font-size: 25px;
  letter-spacing: 1px;
  padding: 50px 0 10px 0;
}
.el-button {
  margin-top: 20px;
}
  }
}
</style>
