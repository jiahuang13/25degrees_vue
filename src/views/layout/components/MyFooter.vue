<template>
  <div class="footer">
    <div class="footer-top">
      <a href="../index.html"><img src="@/assets/img/25degrees_logo.png" height="150" class="logo" /></a>
      <div class="icons d-flex justify-content-center">
          <a href="https://www.facebook.com/profile.php?id=61550127427710"><img src="@/assets/img/fb-logo.png" alt=""></a>
          <a href="https://www.instagram.com/25degrees.tw/">
            <img src="@/assets/img/ig-logo.png" alt=""></a>
          <a href="https://line.me/R/ti/p/@374sfkoe?oat_content=url">
            <img src="@/assets/img/line-logo.png" alt=""></a>
        </div>
    </div>

    <div class="footer-main">
    <el-row type="flex" justify="center">
      <el-col :span="8" class="text-newline">
        <el-link href="#" type="primary">聯絡我們</el-link>
        <el-link href="#" type="primary">週一至週五</el-link>
        <el-link href="#" type="primary">9:00 -12:00 | 13:00 - 18:00</el-link>
        <el-link href="#" type="primary">facebook 粉絲團</el-link>
        <el-link href="#" type="primary">line一對一客服</el-link>
        <el-link href="#" type="primary">25°C社團</el-link>
      </el-col>

      <el-col :span="8" class="text-newline">
        <el-link href="#" type="primary">Shop</el-link>
        <el-link href="#" type="primary">所有商品</el-link>
        <el-link href="#" type="primary">香氛</el-link>
        <el-link href="#" type="primary">精油</el-link>
        <el-link href="#" type="primary">身體保養</el-link>
        <el-link href="#" type="primary">臉部保養</el-link>
      </el-col>

      <el-col :span="8" class="text-newline">
        <el-link href="#" type="primary">顧客服務</el-link>
        <el-link href="#" type="primary">常見問題</el-link>
        <el-link href="#" type="primary">運送與退換貨</el-link>
        <el-link href="#" type="primary">隱私權政策</el-link>
        <el-link href="#" type="primary">條款與細則</el-link>
      </el-col>
    </el-row>
  </div>

  <div class="footer-bottom">
    <p>© 2024 by 25°C. All Rights Reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.footer {
  .footer-top {
    text-align: center;
    img {
      padding: 50px 10px 0 10px;
    }
  }
  .footer-main {
  color: #fff;
  .text-newline {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 0;
    .el-link {
      padding: 5px 0;
    }
  }
}
.footer-bottom {
  text-align: center;
  color: #fff;
  background-color: #091b0c;
  padding: 0.3px 0;
}
}

</style>
