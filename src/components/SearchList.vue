<template>
  <div class="page" id="toTop" v-if="loadEnd">

    <div class=" nav_active ">
      <nav-bar nowId="3"></nav-bar>
    </div>


    <!--主体-->
    <div class="mainContent" v-if="allList.length>0">
      <!--搜索结果展示-->
      <div class="pd1 newsList">
        <div class="navbar">
          <div class="navbar_top">

            <input type="text" v-model="searchRes" @keydown="listenEnter($event,1)" ref="searchVal" autofocus="true">
            <img src="static/img/icon/searchbar.png" alt="搜索" @click="listenEnter($event,2)"/>
          </div>
          <div class="navbar_bottom">
            <span>共搜到<span class="res_number">{{totalResult}}</span>条</span>
            <div class="sort_bar">
              <span :class="{'sort_active':sortBar.ts1}" @click="sortNews('')">全部</span>
              <span @click="sortNews('257')" :class="{'sort_active':sortBar.ts2}">资讯</span>
              <span @click="sortNews('255')" :class="{'sort_active':sortBar.ts3}">作品</span>
            </div>
          </div>

        </div>
        <!--主体-->
        <ul class="m_c t_m_c">
          <li v-for="val in allList">
            <a :href="val.url" target="_blank">
              <div class="m_c_item">
                <!--<img :src="val.pic_small_url">-->
                <div class="m_c_item_box" :style="{backgroundImage:'url('+val.pic_url+')'}" ></div>
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

        <div class="moreView nodata" v-show="!hasMoreInfo&&page>1">
          没有更多了
        </div>
      </div>


    </div>
    <div class="mainContent" v-else>
      <!--搜索结果展示-->
      <div class="pd1 newsList">
        <div class="navbar">
          <div class="navbar_top">

            <input type="text" v-model="searchRes" @keydown="listenEnter($event,1)" ref="searchVal" autofocus="true">
            <img src="static/img/icon/searchbar.png" alt="搜索" @click="listenEnter($event,2)"/>
          </div>
          <div class="navbar_bottom">
            <span>共搜到<span class="res_number">{{totalResult}}</span>条</span>
            <div class="sort_bar">
              <span :class="{'sort_active':sortBar.ts1}" @click="sortNews('')">全部</span>
              <span @click="sortNews('257')" :class="{'sort_active':sortBar.ts2}">资讯</span>
              <span @click="sortNews('255')" :class="{'sort_active':sortBar.ts3}">作品</span>
            </div>
          </div>

        </div>

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
  import ToTop from './ToTop'
  import Fn from '../../static/js/comment'

  export default {
    name: "SearchList",

    data() {
      return {
        //页数
        page: 1,
        //条数
        pageSize: 12,
        //搜索结果数组
        allList: [],
        hasMoreInfo: true,
        keyword: "",
        //转换为正常字符后
        keyword_res: "",
        loadEnd: false,
        searchRes: "",
        totalResult: 0,
        //回到顶部控制按钮
        scrollControl: {
          toTop: false,
          doComment: false
        },
        sortType: '',
        sortBar: {
          ts1: true,
          ts2: false,
          ts3: false,
        }
      }
    },
    inject: ['app'],
    created() {

    },
    mounted() {
      this.app.$data.loadingEnd = false;
      var that = this;
      window.onscroll = function () {
        var sTop = that.getScrollTop();
        if (sTop > 60) {
          that.scrollControl.toTop = true;
        }
        else {
          that.scrollControl.toTop = false;
        }
      };
      var urlInfo = location.href.split('keyword')[1].split('=')[1];
      var that = this;
      this.keyword = urlInfo;
      this.keyword_res = decodeURI(urlInfo);
      this.searchRes = this.keyword_res;
      this.getSearchResult();
    },
    components: {
      NavBar, TimeTrans, Footer, ToTop
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
      /**
       * @title
       * @author minchangjun
       * @since 2019/3/25
       * @param {string} $keyword 搜索的关键词，需要先经过解编码
       * @return
       * @desc
       */
      getSearchResult() {
        var that = this;

        var url = "";
        if (!this.sortType) {
          url = this.app.BASEURL + 'pc/index/search?&is_pic=1&keyword=' + this.keyword + '&page=' + this.page + '&pagesize=' + this.pageSize;
        }
        else {

          url = this.app.BASEURL + 'pc/index/search?&is_pic=1&keyword=' + this.keyword + '&page=' + this.page + '&pagesize=' + this.pageSize + '&relate=' + this.sortType;
        }
        $.get(url, function (res) {
          var lists = res.list.list;
          that.totalResult = res.list.total;
          for (var i = 0; i < lists.length; i++) {
            //255作品，257资讯
            if (lists[i].relate_ids == 255) {
              lists[i].url = '#/cases/' + lists[i].id
            }
            else {
              lists[i].url = '#/news/' + lists[i].id
            }

          }
          that.allList = [].concat(that.allList, lists);
          if (lists.length < 12) {
            that.hasMoreInfo = false;
          }
          else {
            that.getNextInfo();
          }
          that.loadEnd = true;
          setTimeout(function () {
            that.app.$data.loadingEnd = true;
          }, 200);

        })
      },
      getMore() {
        this.page++;
        this.getSearchResult();
      },
      getNextInfo() {
        var that = this;
        var url = "";
        if (!this.sortType) {
          url = this.app.BASEURL + 'pc/index/search?&is_pic=1&keyword=' + this.keyword + '&page=' + this.page + '&pagesize=' + this.pageSize;
        }
        else {
          url = this.app.BASEURL + 'pc/index/search?&is_pic=1&keyword=' + this.keyword + '&page=' + this.page + '&pagesize=' + this.pageSize + '&relate=' + this.sortType;
        }
        $.get(url, function (res) {
          var lists = res.list.list;
          if (lists.length < 1) {
            that.hasMoreInfo = false;
          }
        })
      },
      listenEnter(e, type) {
        var val = this.$refs.searchVal.value;
        //搜索内容为空直接返回
        if (val.trim() == '') {
          return
        }
        var url = '#/search?keywords=' + val;
        var url1 = encodeURI(url);
        if (type == 1) {
          if (e.keyCode == 13) {
            window.open(url1, '_self');
          }
          else {
            return
          }
        }
        if (type == 2) {
          window.open(url1, '_self');
        }
      },
      /**
       * 分类，不传或为空显示全部，255作品，257资讯
       * @param sortType
       */
      sortNews(sortType) {
        if (sortType == "") {
          this.sortBar.ts1 = true;
          this.sortBar.ts2 = false;
          this.sortBar.ts3 = false;
        }
        if (sortType == "257") {
          this.sortBar.ts1 = false;
          this.sortBar.ts2 = true;
          this.sortBar.ts3 = false;
        }

        if (sortType == "255") {
          this.sortBar.ts1 = false;
          this.sortBar.ts2 = false;
          this.sortBar.ts3 = true
        }

        this.totalResult = "";
        this.allList = [];
        this.page = 1;
        this.hasMoreInfo = true;
        this.sortType = sortType;
        this.getSearchResult()
      }
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
    background-color: #e9e9e9;
    color: #000;
    line-height: 40px;
    margin: 20px auto;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;

  }

  .nodata {
    background-color: #efefef;
    cursor: auto;
  }

  .m_c li:nth-child(4n) {
    margin-right: 0;
  }

  .blank_area {
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blank_area p {
    font-size: 15px;
    color: #999;
    text-align: center;

  }

  .ps1 {
    margin-top: 100px;
  }

  .navbar_top {
    position: relative;
    box-sizing: border-box;
    padding-right: 50px;
    border-bottom: 1px solid #f0f0f0;
  }

  .navbar_top input {
    width: 100%;
    height: 45px;
    text-align: center;
    outline: none;
    border: none;
    font-size: 18px;
    font-weight: bold;
  }

  .navbar_top img {
    position: absolute;
    right: 10px;
    top: 0px;
    cursor: pointer;
    padding: 10px;
  }

  .navbar_bottom {
    overflow: hidden;
    padding: 15px 0;
  }

  .sort_bar {
    display: flex;
    float: right;
    justify-content: center;
  }

  .sort_bar span {
    border: 1px solid #9f9d9d;
    color: #9f9d9d;
    padding: 2px 10px;
    border-radius: 15px;
    font-size: 12px;
    margin: 0 5px;
    cursor: pointer;
  }

  .sort_bar span.sort_active {
    border: 1px solid #f28f44;
    color: #f28f44;
  }

  .navbar_bottom span {
    font-size: 14px;
  }

  .navbar_bottom span span.res_number {
    padding: 0;
    color: #db4019;
  }
</style>
