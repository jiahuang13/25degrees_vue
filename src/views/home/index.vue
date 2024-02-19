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

    <!-- 商品輪播 -->
    <div class="myslides">
      <vueper-slides
        class="no-shadow"
        :visible-slides="6"
        slideMultiple
        :gap="2"
        :slide-ratio="1 / 6"
        :dragging-distance="200"
        :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
        :infinite="true"
        :autoplay="true"
        :duration="3000"
        :arrows="false"
      >
        <vueper-slide
          v-for="(slide, i) in slides"
          :key="i"
          :image="slide.url"
          :link="slide.id"
          :title="slide.name"
          :content="slide.price"
        />
      </vueper-slides>
    </div>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { getAllProductAPI } from '@/api/product'

export default {
  name: 'HomeIndex',
  data () {
    return {
      welcomeUrl:
        'https://images.unsplash.com/photo-1497211419994-14ae40a3c7a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      slides: []
    }
  },
  components: { VueperSlides, VueperSlide },
  async created () {
    this.$notify({
      title: '歡迎回到25°C',
      message: ('i', { style: 'color: teal' }, '限時三天香氛商品全系列85折起'),
      position: 'bottom-right',
      duration: 0
    })
    const res = await getAllProductAPI()
    // 遍歷 res，修改 id 屬性
    this.slides = res.map((item) => {
      return {
        ...item,
        price: `NT.${item.price}`,
        id: `/product/${item.id}` // 將 id 改為 /product/:id
      }
    })
  },
  methods: {}
}
</script>

<style>
.home {
  position: relative;
  .welcome-text {
    text-align: center;
    position: absolute;
    top: 400px;
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
  .myslides {
    padding-top: 100px;
  }
}
</style>
