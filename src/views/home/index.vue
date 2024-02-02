<template>
  <div class="home">
    <!-- 走馬燈 -->
    <el-carousel height="50vw">
      <el-carousel-item>
        <img
          src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </el-carousel-item>
      <el-carousel-item>
        <img
          src="https://images.unsplash.com/photo-1497211419994-14ae40a3c7a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
    <!-- 文字：絕對定位 -->
    <div class="welcome-text">
      <h2>在忙碌的城市中，找一個靜下心來的空間，及療癒的生活選品。</h2>
      <h4>Find your peace at 25 degrees.</h4>
      <el-button type="primary">前往選購</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  data () {
    return {
      welcomeUrl:
        'https://images.unsplash.com/photo-1497211419994-14ae40a3c7a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  },
  created () {
    this.$notify({
      title: '歡迎回到25°C',
      message: ('i', { style: 'color: teal' }, '限時三天香氛商品全系列85折起'),
      position: 'bottom-right',
      duration: 0
    })
  }
}
</script>

<style>
.home {
  position: relative;
  .welcome-text {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    color: #fff;
    h2 {
      letter-spacing: 7px;
      font-weight: 100;
      font-size: 30px;
      line-height: 40px;
    }
    h4 {
      font-weight: 100;
      letter-spacing: 5px;
    }
    .el-button {
      opacity: 75%;
    }
  }
}
</style>
