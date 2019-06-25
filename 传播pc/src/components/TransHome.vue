<template>

  <div class="page">

    <div class=" nav_active ">
      <nav-bar nowId="1"></nav-bar>
    </div>

    <div class="mainContent mt60">
<div class="brand_company">
  <div class="brand_l">
    <img src="static/img/ctrip1.png"/>
  </div>
  <div class="brand_r">

      <span class="b_title">携程旅行网</span>
      <a href="">官网</a>
      <a><img src="static/img/wx.png" alt=""></a>
      <a><img src="static/img/sina1.png" alt=""></a>
      <a><img src="static/img/facebook.png" alt=""></a>
      <a><img src="static/img/twitter.png" alt=""></a>
    <p>
      携程酒店预订、机票预订、旅游度假一站式解决，酒店、机票、景点门票低至2折还返现。官网预订有保障，部分热门航线享免费接送机服务，热线全天候为您服务。
    </p>
  </div>
</div>

    </div>

    <Footer></Footer>
  </div>

</template>

<script>
  import Footer from './Footer'
  import NavBar from './NavBar'
    export default {
        name: "TransHome",
      components:{
          Footer,NavBar
      }
    }
</script>

<style scoped>
.brand_company{
  text-align: left;
  overflow: hidden;
}
  .brand_l,.brand_r{
    float: left;
    padding: 50px 0;
  }
  .brand_l{
    width: 130px;
  }
  .brand_r{
    width: 980px;
    margin-left: 30px;
  }
  .b_title{
    font-size: 24px;
    font-weight: bold;
  }

</style>
