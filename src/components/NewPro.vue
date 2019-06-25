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
          <router-link to="/">首页</router-link>
          <span>></span>
          <router-link to="/hotNews">最新</router-link>
        </div>


        <!--主体-->
        <ul class="m_c t_m_c">
          <li v-for="val in showDataList">
            <a :href="val.url" target="_blank">
              <div class="m_c_item">
                <!--<img :src="val.pic_small_url" class="img1">-->
                <div class="m_c_item_box img1" :style="{backgroundImage:'url('+val.pic_url+')'}" ></div>
              </div>
              <div class="bottomBox">
                <h3>{{val.title}}</h3>
                <time-trans :timeTap="val.posttime"></time-trans>
              </div>
            </a>
          </li>

        </ul>

        <div class="moreView" @click="getMore()" v-show="hasMoreInfo">
          更多好看
        </div>

        <div class="moreView nodata" v-show="!hasMoreInfo">
          没有更多了
        </div>
      </div>


    </div>
    <Footer></Footer>
    <to-top :scrollControl="scrollControl"></to-top>
  </div>
</template>

<script>
  import NavBar from './NavBar'
  import TimeTrans from './TimeTrans'
  import _FN_ from '../../static/js/comment'
  import ToTop from './ToTop'
  import Footer from './Footer'
  export default {
    name: "NewPro",
    data() {
      return {
        //当前的页码,默认为1
        nowPage: 1,
        //一次显示条数，默认是8条
        pageSize: 20,
        //所有显示信息数组
        showDataList: [],
        //是否有更多信息
        hasMoreInfo: true,
        //回到顶部控制按钮
        scrollControl: {
          toTop: false,
          doComment: false
        }
      }
    },
    inject: ['app'],
    created() {

    },
    mounted() {
      this.app.$data.loadingEnd = false;
      var that=this;
      window.onscroll = function () {
        var sTop = that.getScrollTop();
        if (sTop > 60) {
          that.scrollControl.toTop = true;
        }
        else {
          that.scrollControl.toTop = false;
        }
      };
      this.getData();

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
      getData() {
        var that = this;
        var urls = this.app.BASEURL + 'pc/list/all-list?is_pic=1&page=';
        var url = urls + this.nowPage + '&pagesize=' + this.pageSize;
        $.get(url, function (res) {

          var lists = res.list.list;
          that.showDataList = [].concat(that.showDataList, lists);
          var list = that.showDataList;
          var len = list.length;
          for (var i = 0; i < len; i++) {
            if (list[i].relate_ids == 255) {
              list[i].url = '#/cases/' + list[i].id
            }
            else {
              list[i].url = '#/news/' + list[i].id
            }
          }

          if (lists.length < 8) {
            that.hasMoreInfo = false;
            return
          }
          else {
            that.getNextInfo();
          }
          setTimeout(function () {
            that.app.$data.loadingEnd = true;
          }, 200);

        })
      },
      getMore() {
        this.nowPage++;
        this.getData();
      },
      getNextInfo() {
        var that = this;
        var urls = this.app.BASEURL + 'pc/list/all-list?page=';
        var url = urls + (this.nowPage + 1) + '&pagesize=' + this.pageSize;
        $.get(url, function (res) {
          var lists = res.list.list;
          if (lists.length < 1) {
            that.hasMoreInfo = false;
          }
        })

      }
    },
    components: {
      NavBar, TimeTrans,ToTop,Footer
    }
  }
</script>

<style scoped>
  .navbar {
    font-size: 18px;
    text-align: left;
    margin-top: 50px;
  }

  .navbar a {
    color: #000;
  }

  .navbar span {
    padding: 0 5px;
  }

  .moreView {
    width: 110px;
    height: 40px;
    background-color: #f3f3f3;
    color: #000;
    line-height: 40px;
    margin: 20px auto;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
margin-bottom: 60px;
  }

  .moreView:hover {
    background-color: #ffc800;
  }

  .nodata {
    background-color: #efefef;
    cursor: auto;
  }

  .m_c li:nth-child(4n) {
    margin-right: 0;
  }
</style>
