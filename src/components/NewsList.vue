<template>

  <div class="page" v-if="showDataList.length>0" id="toTop">

    <div class=" nav_active ">
      <nav-bar nowId="3"></nav-bar>
    </div>


    <!--主体-->
    <div class="mainContent">
      <!--品牌营销-->
      <div class="pd1 newsList">
        <div class="navbar">
          <router-link to="/home">首页</router-link>
          <span>></span>
          <router-link to="/news">资讯</router-link>
        </div>

        <!--主体-->
        <ul class="m_c m_c1">
          <li v-for="val in showDataList">
            <a :href="val.url" target="_blank">
              <div class="m_c_item">
                <!--<img :src="val.pic_url">-->
                <div class="m_c_item_box img1" :style="{backgroundImage:'url('+val.pic_url+')'}" ></div>
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


        <p class="loadMore" v-show="hasMoreInfo" @click="getMore()">
          更多好看
        </p>

        <p class="loadMore nodata" v-show="!hasMoreInfo">
          没有更多了
        </p>
      </div>


    </div>
    <to-top :scrollControl="scrollControl"></to-top>
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
    name: "newList",
    data() {
      return {
        //当前的页码,默认为1
        nowPage: 1,
        //一次显示条数，默认是12条
        pageSize: 12,
        //所有显示信息数组
        showDataList: [],
        //是否有更多信息
        hasMoreInfo: true,
        //回到顶部控制按钮
        scrollControl: {
          toTop: false,
          doComment: false
        },
        totalNews:0
      }
    },
    created() {

    },
    mounted() {
      this.app.$data.loadingEnd = false;
      this.getData();
      var that = this;
      window.onscroll = function () {
        var sTop = that.getScrollTop();
        if (sTop > 60) {
          that.scrollControl.toTop = true;
        }
        else {
          that.scrollControl.toTop = false;
        }
      }
    },
    inject: ['app'],
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
      getData() {
        var that = this;
        var url = this.app.BASEURL + 'pc/list/news-list?&is_pic=1&page=' + this.nowPage + '&pagesize=' + this.pageSize;
        $.get(url, function (res) {
          var lists = res.list.list;
          var len=lists.length;
          for (var i = 0; i < len; i++) {
            lists[i].url = '#/news/' + lists[i].id
          }
          that.totalNews+=len;
          that.showDataList = [].concat(that.showDataList, lists);
          if (len<12||that.totalNews>=res.list.total) {
            that.hasMoreInfo = false;
          }
          else {
            that.hasMoreInfo = true;
          }
          setTimeout(function () {
            that.app.$data.loadingEnd = true;
          }, 200);

        })
      },
      getMore() {
        this.nowPage++;
        this.getData();
      }
    },
    components: {
      NavBar, TimeTrans, Footer, ToTop
    }
  }
</script>

<style scoped>
  .navbar {
    font-size: 18px;
    text-align: left;
    margin-top: 30px;
  }

  .navbar a {
    color: #000;
  }

  .navbar span {
    padding: 0 5px;
  }
  .m_c li:nth-child(3n) {
    margin-right: 0;
  }

  .loadMore {
    cursor: pointer;
  }

  .nodata {
    background-color: #eee;
    cursor: auto;
  }
</style>
