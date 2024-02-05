<template>
  <div class="header">
    <el-row type="flex" justify="center">
      <el-col :span="8" class="text-links">
        <el-button type="text" class="texts" :class="{ 'highlighted': isShopPage }" @click="$router.push('/shop')"
          >Shop</el-button
        >
        <el-button type="text" class="texts" :class="{ 'highlighted': isMassagePage }" @click="$router.push('/massage')"
          >精油按摩</el-button
        >
        <el-button type="text" class="texts" :class="{ 'highlighted': isArticlePage }" @click="$router.push('/article')"
          >專欄</el-button
        >
        <el-button type="text" class="texts" :class="{ 'highlighted': isAboutPage }" @click="$router.push('/about')"
          >關於25°C</el-button
        >
      </el-col>

      <el-col :span="4" class="logo">
        <a href="/">
          <img src="@/assets/img/25degrees_logo.png" height="150" />
        </a>
      </el-col>

      <el-col :span="8" class="buttons">
        <el-button type="primary" icon="el-icon-user" v-if="isLogin === false" @click="$router.push('/login')">登入/註冊</el-button>
        <el-button type="primary" icon="el-icon-user" v-if="isLogin === true" @click="$router.push('/login')">會員中心</el-button>
        <el-button type="primary" v-if="isLogin === true" @click="logOut">登出</el-button>
        <el-button
          type="primary"
          icon="el-icon-shopping-cart-2"
          @click="drawer = true"
          >購物車</el-button
        >
      </el-col>
    </el-row>
    <el-divider></el-divider>

    <!-- 抽屜 -->
    <el-drawer
      title="購物車"
      :visible.sync="drawer"
      direction="rtl"
      @open="handleOpen"
    >
      <div class="body">
        <cartItem v-for="item in list" :key="item.id" :item="item"></cartItem>
      </div>

      <div class="bottom">
        <!-- 中间的合计 -->
        <div>
          <span>共 {{ total }} 件商品，合計：</span>
          <span class="price">${{ totalPrice }}</span>
        </div>
        <!-- 右侧结算按钮 -->
        <button class="btn btn-success btn-settle">結帳</button>
      </div>

    </el-drawer>
  </div>
</template>

<script>
import cartItem from '@/views/layout/components/cart/cartItem.vue'
import { getToken, removeToken } from '@/utils/auth'
import { mapState, mapGetters } from 'vuex'

export default {
  components: { cartItem },
  data () {
    return {
      drawer: false,
      isLogin: false
    }
  },
  computed: {
    ...mapState('cart', ['list']),
    ...mapGetters('cart', ['total', 'totalPrice']),
    isShopPage () {
      return this.$route.path === '/shop'
    },
    isMassagePage () {
      return this.$route.path === '/massage'
    },
    isArticlePage () {
      return this.$route.path === '/article'
    },
    isAboutPage () {
      return this.$route.path === '/about'
    }
  },
  created () {
    const token = getToken()
    if (token) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  methods: {
    handleOpen () {
      // console.log('open')
      this.$store.dispatch('cart/getListAPI')
    },
    logOut () {
      this.$confirm('確定登出嗎', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeToken()
        location.reload()
        this.$message({
          type: 'success',
          message: '登出成功'
        })
      })
    }
  }
}
</script>

<style>
.header {
  padding-top: 20px;
  .el-divider--horizontal {
    margin-bottom: 0;
  }
  .el-drawer {
    background-color: #88988b;
    .el-drawer__header {
      background-color: #091b0c;
      height: 10%;
      color: #d6d6d6;
      font-size: 25px;
      margin-bottom: 0;
    }
    .body {
      padding: 0 30px 50px 30px;
      /* height: 70%; */
    }
    .el-drawer__body {
      /* overflow: hidden; */
      width: 100%;
      position: relative;
    }
    .bottom {
      background-color: #88988b;
      height: 70px;
      /* border-top: 1px solid #f8f8f8; */
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 999;
      font-size: 16px;
      .price {
        color: #091b0c;
        font-weight: bold;
        margin-right: 10px;
        font-size: 25px;
      }
      .btn-settle {
        height: 50px;
        min-width: 120px;
        margin-right: 20px;
        border-radius: 60px;
        background: #091b0c;
        border: none;
        color: white;
        font-size: 16px;
        letter-spacing: 3px;
      }
    }
  }
  .text-links {
    text-align: center;
    margin: auto 0;
    .el-button {
      margin: 0 15px 0 15px;
      padding-bottom: 10px;
      font-size: 16px;
      text-decoration: none;
      color: #516b56;
      transition: 0.5s all;
    }
    .el-button:hover, .el-button.highlighted {
    color: #97b79d;
      border-bottom: 1px solid #97b79d;
      border-radius: 0;
    }
  }
  .logo {
    padding: 15px 0;
    text-align: center;
    img {
      transition: all 0.5s;
    }
    img:hover {
      transform: scale(1.05);
    }
  }
  .buttons {
    text-align: end;
    margin: auto 0;
    a:-webkit-any-link {
    color: #fff;
    text-decoration: none;
}
  }
}
</style>
