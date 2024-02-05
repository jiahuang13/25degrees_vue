<template>
  <div class="goods-container">
    <!-- 左侧图片区域 -->
    <div class="left">
      <img :src="item.url" class="avatar" alt="">
    </div>
    <!-- 右侧商品区域 -->
    <div class="right">
      <!-- 标题 -->
      <div class="title">{{ item.name }}</div>
      <div class="info">
        <!-- 单价 -->
        <span class="price">${{ item.price }}</span>
        <div class="btns">
          <!-- 按钮区域 -->
          <button class="btn btn-light" @click="countChange(-1)">-</button>
          <span class="count">{{ item.count }}</span>
          <button class="btn btn-light" @click="countChange(1)">+</button>
        </div>
        <!-- close -->
        <el-button size="mini" icon="el-icon-close" circle @click="deleteItem(item.id)">
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteCartProductAPI } from '@/api/product'
export default {
  name: 'CartItem',
  methods: {
    countChange (step) {
      const newCount = this.item.count + step
      console.log(this.item.id, newCount)
      this.$store.dispatch('cart/updateCountAPI', { id: this.item.id, count: newCount })
    },
    async deleteItem (id) {
      // console.log(id)
      await deleteCartProductAPI(id)
      this.$store.dispatch('cart/getListAPI')
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-container {
  display: flex;
  padding: 20px;
  + .goods-container {
    border-top: 1px solid #f8f8f8;
  }
  .left {
    .avatar {
      width: 80px;
      height: 80px;
    }
    margin-right: 10px;
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 10px;
    flex: 1;
    position: relative;
      .el-button {
        position: sticky;
        // top: 0;
        // right: 20px;
        background-color: transparent;
        color: #091b0c;
        border-color:#091b0c;
      }
      .el-button--mini {
        font-size: 8px;
      }
      .el-button--mini.is-circle {
        padding: 3px;
      }
    }
    .title {
      font-weight: light;
      font-size: 20px;
      padding-top: 10px;
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      .price {
        color: #091b0c;
        font-weight: 200;
        font-size: 16px;
      }
      .btns {
        .count {
          display: inline-block;
          width: 30px;
          text-align: center;
        }
      }
    }
  }

.custom-control-label::before,
.custom-control-label::after {
  top: 3.6rem;
}
</style>
