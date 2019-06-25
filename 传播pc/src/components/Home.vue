<template>

  <div class="page" v-if="slideData.length>0" id="toTop">
    <nav-bar nowId="2"></nav-bar>

    <div class="banner" id="banner">
      <div class="tit_shadow">
        <div class="swiper-container" id="swp1">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="val in slideData">
              <!--<a :href="val.url" target="_blank" class="link_wrap">-->
              <a class="outLink" :href="val.url" target="_blank">
                <div class="imgBox" :style="{backgroundImage:'url('+val.pic_url+')'}">

                  <!--<img :src="val.pic_url" class="img1">-->

                </div>
              </a>
              <!--蒙版-->
              <a class="bannerMask" :href="val.url" target="_blank">
                <div class="imgDesc">
                  <h1>{{val.title}}</h1>
                  <div v-if="val.relate_ids==255">
                <span class="banner_air">
                  <img src="static/img/banner_fly.png"/>
                </span>
                    <span class="banner_score">{{val.score}}分</span>
                    <!--<time-trans :timeTap="val.posttime"></time-trans>-->
                    <!--<span class="banner_dot"></span>-->
                    <span>{{val.relate}}</span>
                  </div>

                  <div v-if="val.relate_ids==257">
                    <img src="static/img/banner_zan1.png" class="banner_zan"/>
                    <span class="banner_score">{{val.zan}}</span>
                    <span class="banner_score">动态</span>
                  </div>
                </div>
              </a>
            </div>

          </div>
          <div class="swiper-pagination page1"></div>
          <div class="swiper-button-prev prev1"></div>
          <div class="swiper-button-next next1"></div>
        </div>
      </div>

    </div>


    <!--主体-->
    <div class="mainContent">
      <!--最新内容-->

      <div class="pd1">

        <!--标题-->
        <div class="m_tl ">
          <span class="m_tl_t">最新内容</span>
          <span class="m_tl_c">Lastest Content</span>
          <router-link to="/hotNews" class="m_tl_i"><img src="static/img/more.png">更多</router-link>
        </div>

        <!--主体-->
        <ul class="m_c t_m_c">
          <li v-for="v in newContentData.slice(0,4)">
            <a :href="v.url" target="_blank">

              <div class="m_c_item">
                <!--<img :src="v.pic_small_url" class="img1">-->
                <div class="m_c_item_box img1" :style="{backgroundImage:'url('+v.pic_url+')'}"></div>
                <div class="l_tag">
                  {{v.relate_ids==255?v.relate:'动态'}}
                </div>
              </div>
              <div class="bottomBox">
                <h3>{{v.title}}</h3>
                <time-trans :timeTap="v.posttime"></time-trans>
              </div>
            </a>
          </li>
        </ul>
      </div>


      <!--精选作品-->

      <div class="pd1">

        <!--标题-->
        <div class="m_tl">
          <span class="m_tl_t">精选作品</span>
          <span class="m_tl_c">Selected Cases</span>
          <router-link to="/cases" class="m_tl_i"><img src="static/img/more.png">更多</router-link>
        </div>

        <!--主体-->
        <ul class="m_c m_c1 pro_mc">
          <li v-for="(v,index) in goodProData" :class="(index+1)%3==0?'noMrg':''" @mouseover="showDesc(index)"
              @mouseout="hideDesc(index)">
            <a :href="v.url" target="_blank">
              <div class="m_c_item" :style="{backgroundImage:'url('+v.pic_url+')'}">
                <!--<img :src="v.pic_url">-->
              </div>
              <div class="bottomBox bottomBox_pro">
                <p class="m_c_tg">
                  <span class="m_c_tg_content">{{v.content_type}}</span>
                  <!--<span class="timeTap m_c_tg_time">2019-01-20</span>-->
                  <time-trans :timeTap="v.posttime" class="tmp1"></time-trans>
                </p>
                <h3>{{v.title}}</h3>
                <p class="m_c_desc hd">
                  <span class="desc_content" v-if="v.intr">{{v.intr}}</span>
                  <a href="" class="desc_more">&gt;&gt;&gt;更多</a>
                </p>
                <p class="m_c_score">
                        <span class="air_icon">
                            <img src="static/img/air.png">
                            <span>{{v.score}}分</span>
                        </span>
                  <a  class="score_num">评分</a>
                </p>
              </div>
            </a>
          </li>

        </ul>
      </div>
      <!--品牌营销-->
      <div class="pd1">
        <!--标题-->
        <div class="m_tl">
          <span class="m_tl_t">品牌营销</span>
          <span class="m_tl_c">Brand Marketing </span>
          <router-link to="/news" class="m_tl_i"><img src="static/img/more.png">更多</router-link>
        </div>
        <!--主体-->
        <ul class="m_c m_c1">
          <li v-for="(val,index) in brandMarking" :class="(index+1)%3==0?'noMrg':''">
            <a :href="val.url" target="_blank">
              <div class="m_c_item">
                <div class="m_c_item_box img1" :style="{backgroundImage:'url('+val.pic_url+')'}"></div>
                <!--<img :src="val.pic_url" class="img1">-->
              </div>
              <div class="bottomBox">
                <p class="m_c_tg">
                  <span class="m_c_tg_content">{{val.content_type}}</span>
                </p>
                <h3>{{val.title}}</h3>
                <p class="m_c_zan">
                        <span class="air_icon ">
                            <img src="static/img/zan.png">
                            <span>{{val.zan}}</span>
                        </span>
                  <time-trans :timeTap="val.posttime" class="tmp1"></time-trans>
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <!--传播指数-->
      <div class="pd1" id="spread_level">
        <!--标题-->
        <div class="m_tl">
          <span class="m_tl_t">传播指数</span>
          <span class="m_tl_c">CACI </span>
          <a href="https://caci.carnoc.com/" class="m_tl_i" target="_blank"><img src="static/img/more.png">更多</a>
        </div>
        <div class="swiper-container" id="swp2">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="sp_wrap">
                <div class="sp_item" v-for="val in transIndex">
                  <p class="sp_tl">{{val.title}}</p>
                  <p class="sp_from">{{val.tc}}</p>
                  <!--<p><span class="ft12 sp_type type_1"></span></p>-->
                  <div class="sp_list">
                    <p class="sp_list_item ft16" v-for="(vt,index) in val.info">
                      <span class="sp_order">{{index+1}}</span><span class=" sp_cname">{{vt.name}}</span><span
                      class="cb_num">{{(vt.caci_index*100).toFixed(2)}}</span>
                    </p>
                    <p class="sp_bg">
                      <img src="static/img/lunbo_bg.png">
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
    <ToTop :scrollControl="scrollControl"></ToTop>
    <Footer></Footer>
  </div>
</template>
<script>
  import NavBar from './NavBar'
  import TimeTrans from './TimeTrans'
  import Footer from './Footer'
  import Fn from '../../static/js/comment'
  import ToTop from './ToTop'

  export default {
    name: "Home",
    data: function () {
      return {
        //轮播图
        slideData: [],
        //最新新闻
        newContentData: [],
        //精选作品
        goodProData: [],
        //品牌
        brandMarking: [],
        //传播指数数组
        transIndex: [],

        //通过id区分是作品还是资讯
        type_id: 0,
        //回到顶部控制按钮
        scrollControl: {
          toTop: false,
          doComment: false
        },
      }
    },
    inject: ['app'],
    components: {
      NavBar, TimeTrans, Footer, ToTop
    },
    watch: {
      '$route'(from, to) {
        //到达传播指数
        if (location.href.indexOf('spread_level') != -1) {
          document.getElementById("spread_level").scrollIntoView();
        }
        else {
          document.getElementById("banner").scrollIntoView();
        }
      }

    },
    created() {
    },
    mounted() {
      var that = this;
      that.app.$data.loadingEnd = false;
      this.getAjax();
      window.onscroll = function () {
        var sTop = that.getScrollTop();
        if (sTop > 60) {
          that.scrollControl.toTop = true;
          $('.nav').addClass('nav_active')
        }
        else {
          that.scrollControl.toTop = false;
          $('.nav').removeClass('nav_active')
        }
      };
      var timer = null;
      window.onresize = function () {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(function () {
          that.CW = window.innerWidth;
          if (that.CW < 1140) {
            that.CW = 1140;
          }
          that.CH = that.CW / 3.2;

          if (that.CH >= 750) {
            that.CH = 750
          }
          if (that.CH <= 430) {
            that.CH = 430
          }
          $('.imgBox').css({'width': that.CW, 'height': that.CH})
        }, 100)

      }

    },
    methods: {

      getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        return scrollTop;
      },
      getAjax() {
        var that = this;
        var url = this.app.BASEURL + 'pc/index/index?is_pic=1';
        $.get(url, function (res) {
          var news = res.list.news;
          that.slideData = news.slide;
          that.addLinkUrl(that.slideData, '#/cases/', 1);
          that.newContentData = news.latest_news;
          that.addLinkUrl(that.newContentData, '#cases/', 1);
          that.goodProData = news.selected_works;
          that.addLinkUrl(that.goodProData, '#/cases/', 0);
          that.brandMarking = news.brand_marketing;
          that.addLinkUrl(that.brandMarking, '#/news/', 0);
          that.transIndex.push({info: res.list['airline-wb-company'], title: '航空公司', tc: '微博传播指数'});
          that.transIndex.push({info: res.list['airline-wx-company'], title: '航空公司', tc: '微信传播指数'});
          that.transIndex.push({info: res.list['airport-wb'], title: '机场', tc: '微博传播指数'});
          that.transIndex.push({info: res.list['airport-wx'], title: '机场', tc: '微信传播指数'});
          that.$nextTick(function () {
            setTimeout(function () {
              that.app.$data.loadingEnd = true;
              var mySwiper1 = new Swiper('#swp1', {
                // autoplay: 3000,//可选选项，自动滑动,
                preventClicks: false,
                prevButton: '.prev1',
                nextButton: '.next1',
                pagination: '.page1',
                paginationClickable: true,
                loop: true
              });
              $('#swp1').mouseover(function () {
                $('.prev1').addClass('prev1_hover');
                $('.next1').addClass('next1_hover');

              });
              $('#swp1').mouseout(function () {
                $('.prev1').removeClass('prev1_hover');
                $('.next1').removeClass('next1_hover');
              })
            }, 300)

            setTimeout(function () {
             var CW = window.innerWidth;
              if (CW < 1140) {
               CW = 1140
              }
             var CH = CW / 3.2;
              CH > 400 ? CH : CH = 400;
              $('.imgBox').css({'width': CW, 'height': CH});
            },100)
          })
        })

      },
      /**
       * @title 给获得的字段增加跳转url
       * @author minchangjun
       * @since 2019/3/22
       * @param array $list 信息数组 string $url 跳转的基础url number
       * @return
       * @desc 点击资讯或作品跳转到对应的详情页
       */
      addLinkUrl(list, url, type) {
        if (type == 1) {
          for (var i = 0; i < list.length; i++) {
            //255为作品
            if (list[i].relate_ids == 255) {
              list[i].url = url + list[i].id
            }
            else {
              list[i].url = '#/news/' + list[i].id;
            }
          }
        }
        else {
          for (var i = 0; i < list.length; i++) {
            list[i].url = url + list[i].id
          }
        }

      },
      showDesc(index) {
        $('.m_c_desc').eq(index).removeClass('hd');

      },
      hideDesc(index) {
        $('.m_c_desc').eq(index).addClass('hd');

      }
    }

  }
</script>

<style>
  .banner {
    min-width: 1200px;
    background: #333;
  }

  .bannerMask {
    width: 100%;
    height: 40%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .7) 100%);
  }

  .imgBox {
    position: relative;
    /*max-height: 750px;*/
    /*min-height: 750px;*/
    overflow: hidden;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    transition: all 2000ms;
  }

  /*.imgBox img {*/
  /*min-width: 100%;*/
  /*min-height: 750px;*/

  /*}*/
  .link_wrap:hover .imgBox {
    transform: scale(1.2);
  }

  #swp1 {
    width: 100%;
    max-height: 750px;
    z-index: 100;
  }

  .imgDesc {
    width: 1140px;
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 14px;
    text-align: left;
  }

  .imgDesc div {
    margin: 10px 4px;
  }

  .imgDesc h1 {
    font-size: 42px;
    color: #fff;
    font-weight: normal;
  }

  span.banner_air {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-color: #ffc800;
    border-radius: 50%;
    vertical-align: middle;
    text-align: center;
    margin-top: -2px;
  }

  span.banner_air img {
    width: 70%;
    height: auto;
    text-align: center;
    margin-top: 2px;
    margin-left: 1px;

  }

  p.timeTap {
    display: inline-block;
    margin-left: 10px;
  }

  span.banner_score {
    margin: 0 10px;
    vertical-align: middle;
  }

  span.banner_dot {
    vertical-align: middle;
    width: 3px;
    height: 3px;
    display: inline-block;
    background-color: #fff;
    border-radius: 50%;
    margin: 0 5px;
  }

  .banner_zan {
    width: 16px;
    height: 16px;
  }

  .pro_mc li .bottomBox_pro {
    transition: all 1000ms;
  }

  .page1 span.swiper-pagination-bullet-active {
    background-color: #ffc800 !important;
    padding: 0 20px;
    transition: .5s;
    border-radius: 40px;
  }

  p.m_c_zan img {
    width: 12px;
  }

  .tit_shadow {
    background: linear-gradient(to bottom, rgba(0, 0, 0, .7) 0, rgba(0, 0, 0, .0) 10%);
  }

  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: #fff;
  }

  .m_tl {
    margin-top: 10px;
  }

  .m_c {
    padding-top: 10px;
  }

  .m_c li {
    margin-bottom: 20px;
  }

  .m_c_item {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  @media screen and (max-width: 1600px) {
    .imgDesc h1 {
      font-size: 35px;
    }
  }

  @media screen and (max-width: 1400px) {
    .imgDesc h1 {
      font-size: 30px;
    }
  }


</style>
