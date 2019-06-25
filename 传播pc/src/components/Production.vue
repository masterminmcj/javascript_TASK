<template>
  <div class="page" v-if="loadEnded" id="toTop">

    <div class=" nav_active ">
      <nav-bar now-id="4"></nav-bar>
    </div>


    <!--主体-->

    <div class="mainContent mt60">
      <div class="ct_top">
        <p class="pro_box">
          <span class="pro_tl">汇聚探索</span>
          <span class="pro_ltl">全球航旅品牌线上线下创意营销作品和案例</span>

        </p>

        <p class="spLine"></p>



        <p class="pro_type pro_type1" v-if="contentType">
        <span>
        内容类型
        </span>

          <span class="c_category_item">
            <a @click="sortType(0)" :class="{'now':active_tag==0}">全部</a>
            <a v-for="(val,key) in contentType" @click="sortType(key)" :class="{'now':active_tag==key}">{{val}}</a>
            </span>
        </p>
        <div class="c_category">
          <p class="pro_type" v-show="workType">
        <span>
        作品类型
        </span>
            <span class="c_category_item">
            <a @click="sortType1(1)" :class="{'now':active_tag1==1}">全部</a>
            <a v-for="(val,key) in workType" @click="sortType(key)" :class="{'now':active_tag1==key}">{{val}}</a>
            </span>
          </p>
        </div>


        <p class="pro_like">
<span @click="doSort(0)" :class="{'nowSelect':selectList.select1}">
    <img :src="selectImgList.clock">
    最新
</span>


          <span @click="doSort(1)" :class="{'nowSelect':selectList.select2}">
    <img :src="selectImgList.fly">
    最佳
</span>

          <span @click="doSort(2)" :class="{'nowSelect':selectList.select3}">
    <img :src="selectImgList.eye">
    最多阅读
</span>

          <span @click="doSort(3)" :class="{'nowSelect':selectList.select4}">
    <img :src="selectImgList.heart">
    最多收藏
</span>

        </p>
        <p class="spLine"></p>


      </div>


      <!--品牌营销-->

      <div class="pd1 newsList mt30">


        <!--主体-->
        <ul class="m_c m_c1">
          <li v-for="(val,index) in showDataList" @mouseover="showDesc(index)" @mouseout="hideDesc(index)">
            <a :href="val.url" target="_blank">
              <div class="m_c_item">
                <!--<img :src="val.pic_url">-->
                <div class="m_c_item_box" :style="{backgroundImage:'url('+val.pic_url+')'}" ></div>
              </div>
              <div class="bottomBox bottomBox_pro">
                <p class="m_c_tg">
                  <span class="m_c_tg_content">{{val.content_type}}</span>
                  <time-trans :timeTap="val.posttime" class="tmp1"></time-trans>
                </p>
                <h3>{{val.title}}</h3>
                <p class="m_c_desc hd">
                  <span class="desc_content" v-if="val.intr">{{val.intr}}</span>
                  <a href="" class="desc_more">&gt;&gt;&gt;更多</a>
                </p>
                <p class="m_c_score">
                        <span class="air_icon">
                            <img src="static/img/air.png">
                            <span>{{val.score.toFixed(1)}}</span>
                        </span>
                  <a :href="val.url" class="score_num">评分</a>
                </p>
              </div>
            </a>
          </li>


        </ul>

        <div class="loadMore" v-show="hasMoreInfo" @click="getMore()">
          更多好看
        </div>
        <div class="loadMore nodata" v-show="!hasMoreInfo">
          已经被你看光了~
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
  import Fn from '../../static/js/comment'
  import ToTop from './ToTop'

  export default {
    name: "production",
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

      /**
       * 暂时隐藏
       */
      this.getContentType();
      this.getData();

    },

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
        active_tag: 0,
        //第二排分类标签
        active_tag1: 0,
        //文字选择
        selectList: {
          select1: true,
          select2: false,
          select3: false,
          select4: false
        },
        //图片切换
        selectImgList: {
          clock: 'static/img/icon/clock_active.png',
          fly: 'static/img/icon/fly.png',
          eye: 'static/img/icon/eye.png',
          heart: 'static/img/icon/heart.png',
        },
        //当前排序依据,默认按id排序
        nowRule: 'id',

        loadEnded: false,
        //回到顶部控制按钮
        scrollControl: {
          toTop: false,
          doComment: false
        },
        //内容分类
        contentType: [],
        //判断是否点击了加载更多操作
        dohasMore:false,
        // 作品分类
        workType: [],
        totalNews: 0
      }
    },
    inject: ['app'],
    methods: {
      /**
       * 获取分类标签
       */
      getContentType() {
        var url = this.app.BASEURL + 'pc/list/type';
        var that = this;
        $.get(url, function (res) {
          that.contentType = res.list.contentType;
          that.workType = res.list.workType
        })
      },
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
        var re_tag = "";
if(!this.dohasMore){
  that.totalNews=0
}

        //内容类型的全部被选中
        if (this.active_tag==0) {

          var url = this.app.BASEURL + 'pc/list/works-list?is_pic=1&page=' + this.nowPage + '&pagesize=' + this.pageSize + '&order=' + this.nowRule + '&hot_ids=' + 0 + '&sort=desc';

        }
        //作品类型的全部被选中
        if (this.active_tag1) {
          re_tag = this.active_tag1;
          var url = this.app.BASEURL + 'pc/list/works-list?is_pic=1&page=' + this.nowPage + '&pagesize=' + this.pageSize + '&order=' + this.nowRule + '&hot_ids=' + 0 + '&sort=desc';

        }
        if (this.active_tag) {
          re_tag = this.active_tag;
          var url = this.app.BASEURL + 'pc/list/works-list?is_pic=1&page=' + this.nowPage + '&pagesize=' + this.pageSize + '&order=' + this.nowRule + '&hot_ids=' + re_tag + '&sort=desc';
        }


        $.get(url, function (res) {
          var lists = res.list.list;
          var len = lists.length;
          for (var i = 0; i < len; i++) {
            lists[i].url = '#/cases/' + lists[i].id
          }
          that.totalNews += len;

          that.showDataList = [].concat(that.showDataList, lists);

          if (len < 12 || that.totalNews >= res.list.total) {
            that.hasMoreInfo = false;
          }
          else {
            that.hasMoreInfo = true;
          }
          that.loadEnded = true;
          setTimeout(function () {
            that.app.$data.loadingEnd = true;
          }, 200);

        })
      },
      getMore() {
        this.dohasMore=true;
        this.nowPage++;
        this.getData();
      },
      showDesc(index) {
        $('.m_c_desc').eq(index).removeClass('hd');
      },
      hideDesc(index) {
        $('.m_c_desc').eq(index).addClass('hd');
      },
      doSort(index) {
        var that = this;
        this.nowPage = 1;
        switch (index) {
          case 0:
            (function () {
              that.selectList.select1 = true;
              that.selectList.select2 = false;
              that.selectList.select3 = false;
              that.selectList.select4 = false;
              that.selectImgList.clock = 'static/img/icon/clock_active.png';
              that.selectImgList.fly = 'static/img/icon/fly.png';
              that.selectImgList.eye = 'static/img/icon/eye.png';
              that.selectImgList.heart = 'static/img/icon/heart.png';
              that.nowRule = 'id';

            })();
            break;
          case 1:
            (function () {
              that.selectList.select1 = false;
              that.selectList.select2 = true;
              that.selectList.select3 = false;
              that.selectList.select4 = false;
              that.selectImgList.clock = 'static/img/icon/clock.png';
              that.selectImgList.fly = 'static/img/icon/fly_active.png';
              that.selectImgList.eye = 'static/img/icon/eye.png';
              that.selectImgList.heart = 'static/img/icon/heart.png';
              that.nowRule = 'score';

            })();
            break;
          case 2:
            (function () {
              that.selectList.select1 = false;
              that.selectList.select2 = false;
              that.selectList.select3 = true;
              that.selectList.select4 = false;
              that.selectImgList.clock = 'static/img/icon/clock.png';
              that.selectImgList.fly = 'static/img/icon/fly.png';
              that.selectImgList.eye = 'static/img/icon/eye_active.png';
              that.selectImgList.heart = 'static/img/icon/heart.png';
              that.nowRule = 'click';

            })();
            break;
          case 3:
            (function () {
              that.selectList.select1 = false;
              that.selectList.select2 = false;
              that.selectList.select3 = false;
              that.selectList.select4 = true;
              that.selectImgList.clock = 'static/img/icon/clock.png';
              that.selectImgList.fly = 'static/img/icon/fly.png';
              that.selectImgList.eye = 'static/img/icon/eye.png';
              that.selectImgList.heart = 'static/img/icon/heart_active.png';
              that.nowRule = 'collection';

            })();
            break;
          default:


        }
        this.showDataList = [];
        this.getData();

      },
      sortType(hot_id) {
        this.dohasMore=false;
        this.nowPage = 1;
        this.active_tag = hot_id;
        this.active_tag1 = hot_id;
        this.showDataList = [];
        this.getData();
      },
      sortType1(hot_id) {
        this.dohasMore=false;
        this.nowPage = 1;
        this.active_tag = hot_id;
        this.active_tag1 = hot_id;
        this.showDataList = [];
        this.getData();
      }

    },
    components: {
      NavBar, TimeTrans, Footer, ToTop
    }
  }
</script>

<style scoped>
  .pro_box {
    text-align: left;
    padding: 45px 0;
  }

  .pro_tl {
    font-size: 40px;
    color: #000;
    font-weight: bold;
    line-height: 40px;
    vertical-align: middle;
  }

  .pro_tl:before {
    content: "";
    width: 6px;
    height: 36px;
    display: inline-block;
    background-color: #ffc800;
    margin-right: 20px;
    margin-top: -6px;
    vertical-align: middle;
  }

  .pro_ltl {
    color: #333;
    font-size: 35px;
    vertical-align: middle;
    line-height: 40px;
    margin-left: 10px;

  }

  .pro_type {
    padding: 20px 0;
    font-weight: normal;
    text-align: left;
  }

  .pro_type span {
    height: 40px;
    padding: 0 18px;
    color: #333;
    background-color: #f3f3f3;
    border-radius: 3px;
    margin-right: 30px;
    font-size: 14px;
    font-weight: bold;
    margin-top: 5px;
    line-height: 40px;
    display: inline-block;
  }

  .pro_type span.c_category_item {

    width: 1000px;
    margin: 0;
    background-color: #fff;
    padding: 0;
    vertical-align: top;

    font-weight: normal;
    margin-top: 0;
  }

  .pro_type a {
    margin-right: 25px;
    color: #333;
    display: inline-block;
    line-height: 40px;
    cursor: pointer;
  }

  .pro_type a.now {
    color: #ec7b30;
    font-weight: bold;
  }

  .pro_type a:hover {
    color: #ec7b30;
    font-weight: bold;
  }

  .now {
    color: #ec7b30;
  }

  .pro_like {
    font-size: 16px;
    color: #333;
    padding: 16px 0;
    text-align: left;
    margin-top: 10px;
  }

  .pro_like span {
    margin-right: 20px;
    cursor: pointer;
    font-size: 14px;
  }

  .pro_like span img {
    vertical-align: middle;
    margin-right: 0px;
    width: 20px;
    margin-bottom: 4px;
    height: auto;
  }

  .m_c li:nth-child(3n) {
    margin-right: 0;
  }

  .nodata {
    background-color: #e9e9e9;
    width: 150px;
    cursor: pointer;
  }

  .pro_like span.nowSelect {
    color: #ec7b30;
  }

  .pro_type1 {
    padding-top: 35px;
  }


</style>
