<template>
  <div class="shop">
    <!-- 麵包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/shop">Shop</a></el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 側邊欄 -->
    <el-aside width="150px">
      <el-divider></el-divider>
      <el-menu>
        <el-menu-item index="1" @click="getAllProduct">所有商品</el-menu-item>
        <el-menu-item index="2" @click="filter('incense')">香氛</el-menu-item>
        <el-menu-item index="3" @click="filter('essential-oil')">精油</el-menu-item>
        <el-menu-item index="4" @click="filter('face-care')">臉部保養</el-menu-item>
        <el-menu-item index="5" @click="filter('body-care')">身體保養</el-menu-item>
      </el-menu>
    </el-aside>

    <el-row>
      <el-col :span="8" v-for="item in productList" :key="item.id">
        <el-card @click.native="$router.push(`/product/${item.id}`)">
          <div class="image">
            <img :src="item.url" alt="" />
          </div>
          <span class="name">{{ item.name }}</span>
          <span class="price">${{ item.price }}</span>
          <el-button
            class="cart-icon"
            type="plain"
            icon="el-icon-shopping-cart-2"
            @click.stop="addToCart(item.id)"
            >加入購物車</el-button
          >
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
      productList: [],
      originalProductList: []
    }
  },
  computed: {
    ...mapState('cart', ['list'])
  },
  created () {
    this.getAllProduct()
  },
  methods: {
    async getAllProduct () {
      const res = await getAllProductAPI()
      // console.log(res)
      this.productList = res
      this.originalProductList = [...res]
      this.$store.dispatch('cart/getListAPI')
    },
    filter (category) {
      // 将 productList 还原为最初获取的产品列表
      this.productList = [...this.originalProductList]
      // 过滤 productList
      const resList = this.productList.filter(ele => ele.category === category)
      this.productList = resList
    },
    async addToCart (myid) {
      // 要確認此商品是否已有在購物車裡，若有則修改數量，沒有則新增！！！！！
      // console.log(id, this.list)
      const existItem = this.productList.find((ele) => ele.id === myid)
      if (existItem) {
        await this.$store.dispatch('cart/updateCountAPI', {
          id: myid,
          count: existItem.count + 1
        })
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
    margin-top: 20px;
    margin-left: 80px;
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
  .el-aside {
    position: absolute;
    left: 60px;
    top: 288px;
    .el-divider {
      background-color: #8b8989;
    }
    .el-menu {
      background-color: transparent;
      border: transparent;
      .el-menu-item {
        color: #b7b7b7;
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        padding-left: 0;
      }
    }
  }
  .el-row {
    width: 70%;
    margin-left: 20%;
    .el-col {
      /* width: 90%; */
      text-align: center;
      .el-card {
        cursor: pointer;
        border-radius: 5%;
        margin: 20px auto;
        width: 300px;
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
