<template>
  <div class="shop">
    <!-- 麵包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/shop">Shop</a></el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col :span="8" v-for="item in productList" :key="item.id">
        <el-card>
          <div class="image">
            <img :src="item.url" alt="" />
          </div>
          <span class="name">{{ item.name }}</span>
          <span class="price">${{ item.price }}</span>
          <el-button
            class="cart-icon"
            type="plain"
            icon="el-icon-shopping-cart-2"
            @click="addToCart(item.id)"
          >加入購物車</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAllProductAPI, getDetailAPI, addToCartAPI } from '@/api/product'
import { mapState } from 'vuex'
export default {
  name: 'ShopIndex',
  data () {
    return {
      productList: []
    }
  },
  computed: {
    ...mapState('cart', ['list'])
  },
  async created () {
    const res = await getAllProductAPI()
    // console.log(res)
    this.productList = res
    this.$store.dispatch('cart/getListAPI')
  },
  methods: {
    async addToCart (myid) {
      // 要確認此商品是否已有在購物車裡，若有則修改數量，沒有則新增！！！！！
      // console.log(id, this.list)
      const existItem = this.list.find(ele => ele.id === myid)
      if (existItem) {
        await this.$store.dispatch('cart/updateCountAPI', { id: myid, count: existItem.count + 1 })
        this.$message({
          message: '已加入購物車',
          type: 'success'
        })
      } else {
        // 就id撈完整資料
        const res = await getDetailAPI(myid)
        const { id, price, url, name } = res
        // 新增到cart list
        const res2 = await addToCartAPI({ id, price, url, name, count: 1 })
        console.log(res2)
        // 顯示新增成功輕提示
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
.shop {
  .el-breadcrumb {
    margin-left: 13%;
    .el-breadcrumb__inner.is-link,
    .el-breadcrumb__inner a {
      color: #b7b7b7;
      font-size: 16px;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover {
      color: #6e6c6c;
    }
  }
  .el-row {
    width: 70%;
    margin-left: 20%;
    .el-col {
      /* width: 90%; */
      text-align: center;
      .el-card {
        border-radius: 5%;
        margin: 20px auto;
        width: 90%;
        height: 350px;
        background-color: rgba(255, 255, 255, 0);
        .el-card__body {
          padding: 10px;
        }
        .image {
          height: 220px;
          padding-bottom: 10px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        }
        .name {
          color: #fff;
          font-size: 20px;
          letter-spacing: 1px;
          padding-bottom: 50px;
        }
        .price {
          display: block;
          font-weight: 100;
          letter-spacing: 1px;
          color: #fff;
          padding: 8px 0;
          font-size: 16px;
        }
        .cart-icon {
          font-size: 14px;
          padding: 10px;
        }
      }
    }
  }
}
</style>
