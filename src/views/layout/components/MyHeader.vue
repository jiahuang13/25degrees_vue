<template>
  <div class="header">
    <el-row type="flex" justify="center">
      <el-col :span="8" class="text-links">
        <!-- 下拉式選單shop -->
        <el-dropdown>
          <span class="el-dropdown-link">
            Shop<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-link href="/shop">所有商品</el-link>
            </el-dropdown-item>

            <el-dropdown-item>
              <el-link>香氛</el-link>
            </el-dropdown-item>

            <el-dropdown-item>
              <el-link>臉部保養</el-link>
            </el-dropdown-item>

            <el-dropdown-item>
              <el-link>身體保養</el-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-button type="text" class="texts"
          ><a href="/massage">精油按摩</a></el-button
        >
        <el-button type="text" class="texts"
          ><a href="/article">專欄</a></el-button
        >
        <el-button type="text" class="texts"
          ><a href="/about">關於25°C</a></el-button
        >
      </el-col>

      <el-col :span="4" class="logo">
        <a href="/">
          <img src="@/assets/img/25degrees_logo.png" height="150" />
        </a>
      </el-col>

      <el-col :span="8" class="buttons">
        <el-button type="primary" icon="el-icon-user"><a href="/login">登入/註冊</a></el-button>
        <!-- <el-button type="primary">登出</el-button> -->
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
import { mapState, mapGetters } from 'vuex'

export default {
  components: { cartItem },
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapState('cart', ['list']),
    ...mapGetters('cart', ['total', 'totalPrice'])
  },
  created () {},
  methods: {
    handleOpen () {
      // console.log('open')
      this.$store.dispatch('cart/getListAPI')
    }
  }
}
</script>

<style>
.header {
  padding-top: 20px;
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
    .texts a {
      margin: 0 15px 0 15px;
      padding-bottom: 10px;
      font-size: 16px;
      text-decoration: none;
      color: #516b56;
      transition: 0.5s all;
    }
    .texts a:hover {
      color: #97b79d;
      border-bottom: 1px solid #97b79d;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #516b56;
      padding: 0 15px;
      font-size: 16px;
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
