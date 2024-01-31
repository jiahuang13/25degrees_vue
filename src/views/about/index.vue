<template>
  <div class="about">
    <div class="about-title">
      <h1>The Story of 25°C</h1>
    </div>

    <div class="set">
      <div class="photo">
        <img src="@/assets/img/blog01.jpg" alt="" />
      </div>
      <div class="text">
        <p>
          25°C，不只是一個品牌，更是一個呵護身心靈的生活伴侶。我們深知現代城市生活的繁忙和壓力，因此我們致力於為您締造一個能夠停下腳步、尋找平靜的空間。
        </p>
      </div>
    </div>

    <div class="set">
      <div class="photo"><img src="@/assets/img/blog02.jpg" alt="" /></div>
      <div class="text">
        <p>
          我們的產品涵蓋香氛和精油，能夠在您的生活中播撒一抹自然的芬芳，為您帶來身心的寧靜。我們追求細緻的香氛調配，希望每一款產品都能夠為您營造一種舒適的氛圍，讓您在家中或工作場所都感受到25°C的溫暖。
        </p>
      </div>
    </div>

    <div class="set d-lg-flex wow animate__animated animate__fadeInUp">
      <div class="photo"><img src="@/assets/img/blog04.jpg" alt="" /></div>
      <div class="text">
        <p>
          此外，我們提供專業的按摩服務，不僅是身體上的享受，更是滋潤心靈的體驗。我們的按摩師具備豐富的經驗和技巧，針對您的需求提供量身訂造的按摩療程，讓您在輕柔的觸摸中釋放壓力，重拾活力。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// import { MyHeader, MyFooter, AppMain } from '@/views/layout/components'
export default {
  name: 'AboutIndex'
}
</script>

<style>
.about-title {
      background-color: #475449;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      /* border-top: 5px rgb(132, 141, 134) solid */
    }

    .about-title h1 {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      font-weight: 200;
      color: white;
      font-size: min(calc(1rem + 1.5vw), 20px);
      letter-spacing: 5px;
    }

    .photo {
      width: 100%;
      /* height: 30vh; */
      img {
        width: 100%;
        height: 70vh;
        object-fit: cover;
      }
    }

    .text {
      width: 50%;
      margin: auto;
      padding: 10%;
      p {
        color: rgba(255, 255, 255, 0.75);
        font-size: min(calc(6px + 1.1vw), 16px);
        line-height: calc(6px + 2vw);
        letter-spacing: 3px;
      }
    }

      </style>
