<template>

  <div class="page" id="toTop" v-if="showDataInfo.article">

    <div class=" nav_active ">
      <nav-bar nowId="3"></nav-bar>
    </div>

    <div class="mainDetail">

      <div class="leftDetail">
        <h2 class="l_d_tl">
          {{showDataInfo.article.title}}
        </h2>
        <p class="l_d_basicinfo">
          <time-trans :timeTap="showDataInfo.article.posttime" class="l_d_time" ></time-trans>
          <span>民航资源网</span>
          <span>{{showDataInfo.article.writer}}</span>


          <!--<span class="l_d_comment">-->
          <!--<img src="static/img/comment.png"/>-->
          <!--<span class="l_d_cnum">{{showDataInfo.article.reply}}</span>-->
          <!--</span>-->

          <span class="l_d_tag">{{showDataInfo.article.content_type}}</span>
        </p>


        <p class="l_d_desc" v-if="showDataInfo.article.intr">
          <span class="l_d_d1"></span>
          {{showDataInfo.article.intr}}
          <span class="l_d_d2"></span>
        </p>
        <p v-if="firstPic&&!firstVideo" class="c_firstPic">
          <img :src="firstPic"/>
        </p>
        <p v-if="firstVideo">
          <iframe :src="'http://player.youku.com/embed/'+firstVideo" width="700" height="400" v-if="isYouku"></iframe>

          <object type="application/x-shockwave-flash" data="http://www.carnoc.com/video/play.swf" width="700"
                  height="400" v-else>
            <param name="movie" value="http://www.carnoc.com/video/play.swf">
            <param name="allowFullScreen" value="true">
            <param name="FlashVars" :value="baseStr">
          </object>
        </p>
        <div class="article_content" v-html="c_content">


        </div>

        <p class="pd20 endLine">
          完
        </p>
        <!--<p class="ft12 bqinfo">-->
        <!--本文已标注文章出处和作者，版权归原作者所有，报道中出现的所有图像版权属于其其合法持有人，本站只供传递信息之用，非商务用途。如涉及版权问题，请作者或相关单位与我们联系，本站将及时删除或撤换，联系方式：news@carnoc.com。-->
        <!--</p>-->
        <p :class="{'zan_ctn':true,'mg30':true,'zan_ctn_active':isActive,'zanMove':isMove}" @click="doZan()"
           id="doComment">

          <img src="static/img/zan1.png"/><br>
          <span class="zan_num">{{zanNum}}</span>
        </p>
        <p class="sp_line"></p>
        <div class="mg30 l_d_share share_art ">
          <div class="coll_wrap">
            <Collection :collectionNum="colNum" :replyNum="newsCommentInfo.comment_total" :scoreStatus="optionResult"
                        v-if="optionResult.qsOver||!app.isLogin"></Collection>
          </div>
          <span>分享至：</span>
          <div class="bdsharebuttonbox sharebox">
            <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
            <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
            <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
            <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
          </div>
        </div>
        <p class="sp_line"></p>


        <comment :lookComment="newsCommentInfo"></comment>

      </div>


      <div class="rightDetail">
        <div class="zan_area">
          <p :class="{'zan_ctn':true,'mg30':true,'zan_ctn_active':isActive,'zanMove':isMove}" @click="doZan()">
            <img src="static/img/zan1.png"/><br>
            <span class="zan_num">{{zanNum}}</span>
          </p>
          <p class="sp_line sp_line_little"></p>
          <p class="mg30 fc999 share_ite">分享这篇文章</p>

          <div class="bdsharebuttonbox">
            <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信">
            </a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
            <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
            <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
          </div>

        </div>
        <div v-if="!storeRelateWorks.msg">
          <p class="r_tl_t">相关推荐</p>
          <div>
            <ul class="r_item">

              <!--<a :href="val.url">-->
              <!--<div class="r_box">-->
              <!--<img :src="val['picture-url']" alt=""/>-->
              <!--</div>-->
              <!--<div class="r_item_bottom">-->
              <!--<p class="m_c_tg"><span class="m_c_tg_content">{{val.relate}}</span></p>-->
              <!--<h3>{{val.title}}</h3>-->
              <!--<p class="m_c_zan">-->
              <!--<span class="air_icon ">-->
              <!--<img src="static/img/zan.png">-->
              <!--<span>{{val.zan}}</span>-->
              <!--</span>-->
              <!--<time-trans :timeTap="val.posttime" class="tmp1"></time-trans>-->
              <!--</p>-->
              <!--</div>-->
              <!--</a>-->

              <li v-for="val in storeRelateWorks" class="c_list">
                <a :href="'#/news/'+val.id">
                  <span class="leftDot"></span>

                  <span class="leftTitle">{{val.title}}</span>
                  <time-trans :timeTap="val.posttime" class="tmp1" :dateType="1"></time-trans>
                </a>
              </li>
            </ul>

          </div>
          <!--暂无推荐-->
          <!--<div class="no_recomment" v-else>-->
          <!--暂无相关推荐-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <to-top :scrollControl="scrollControl"></to-top>
    <div class="footerBox">
      <div class="footerMain">

        <div class="f_item1">
          <span class="btm_line">热门作品</span>
          <router-link to="/cases" class="pullR">
            <img src="../../static/img/more.png"/>
            <span>更多</span>
          </router-link>

        </div>

        <!--主体-->
        <ul class="m_c">
          <li v-for="val in hotProList" class="no_shadow">
            <a :href="val.url">
              <div class="m_c_item">
                <img :src="val.pic_url">
              </div>
              <div class="bottomBox">
                <p class="m_c_tg">
                  <span class="m_c_tg_content">{{val.content_type}}</span>
                  <time-trans :timeTap="val.posttime" class="tmp1"></time-trans>
                  <!--<time-trans :timeTap="v.posttime" class="tmp1"></time-trans>-->
                </p>
                <h3>{{val.title}}</h3>
                <p class="m_c_score">
                        <span class="air_icon">
                            <img src="static/img/air.png">
                            <span>{{val.score}}</span>
                        </span>
                  <a href="" class="score_num">评分</a>
                </p>
              </div>
            </a>
          </li>


        </ul>


      </div>
    </div>
    <Footer></Footer>

  </div>

</template>

<script>
  // 资讯详情页
  import NavBar from './NavBar'
  import Comment from './Comment'
  import Footer from './Footer'
  import TimeTrans from './TimeTrans'
  import ToTop from './ToTop'
  import Fn from '../../static/js/comment'
  import Collection from './Collection'

  export default {
    name: "NewsDetail",
    data() {
      return {
        //区分能否点赞，防止一个人点赞多次
        canZan: true,
        zanNum: 0,
        //所有显示信息数组
        showDataInfo: {},
        //用于查看评论的新闻id及url
        newsCommentInfo: {},
        isActive: false,
        isMove: false,
        // 存储相关作品
        storeRelateWorks: {},
        articleId: 0,
        //热点作品
        hotProList: [],
        colNum: 0,
        firstPic: "",
        /**
         * 能否进行点赞的标志主要是防止用户点赞速度过快，接口反应不过来
         * */
        zanFlag: true,
        //首视频
        firstVideo: "",
        //回到顶部控制按钮
        scrollControl: {
          toTop: false,
          doComment: true
        },
        optionResult: {
          //收藏
          collection: 1,
          //喜欢
          entity_far: 1,
          //评分
          star: 1,
          qsOver: false
        },
        baseStr: '',
        isYouku: false

      }
    },
    created() {
    },
    mounted() {
      this.app.$data.loadingEnd = false;
      var ids = this.$route.params.id;
      var data = Fn.getUserInfo();
      this.articleId = ids;
      this.collectClick(ids);
      this.getData(ids, data);
      var isZaned = this.hasZaned(ids);
      if (isZaned) {
        this.canZan = false;
        this.isActive = true;
      }
      else {
        this.canZan = true
      }
      this.getHotPro();

      this.baseStr = 'xml=\n' +
        '             <vcastr>\n' +
        '              <channel>\n' +
        '\t\t\t\t\t\t<item><source>videoSrc</source><title>视频:维珍航玩超能力 每个维珍人都天赋异禀</title></item>\n' +
        '                        </channel>\n' +
        '                        <config>\n' +
        '\t\t\t\t\t\t<controlPanelBgColor>0x0099ff</controlPanelBgColor>\n' +
        '\t\t\t\t\t\t<isAutoPlay>false</isAutoPlay>\n' +
        '                        </config>\n' +
        '  <plugIns>\n' +
        '  <logoPlugIn>\n' +
        '  <url>http://www.carnoc.com/video/logo.swf</url>\n' +
        '  <logoTextAlpha>0.75</logoTextAlpha>\n' +
        '  <logoTextLink>http://www.carnoc.com</logoTextLink>\n' +
        '  <logoTextFontSize>16</logoTextFontSize>\n' +
        '  <logoTextColor>0xffffff</logoTextColor>\n' +
        '  <textMargin>10 5 auto auto</textMargin>\n' +
        '  <logoClipUrl>http://www.carnoc.com/video/carnocnew.png</logoClipUrl>\n' +
        '  <logoClipLink>http://www.carnoc.com</logoClipLink>\n' +
        '  <logoClipAlpha>0.5</logoClipAlpha>\n' +
        '  <clipMargin>5 auto auto 5</clipMargin>\n' +
        '  </logoPlugIn></plugIns></vcastr>';


    },
    inject: ['app'],
    watch: {

      '$route'(from, to) {
        //回到顶部
        document.getElementById("toTop").scrollIntoView();
        this.reloadViews();
      }
    },
    methods: {
      getData(ids, Data) {
        var b_t = true;
        var that = this;
        var c_time = new Date().getTime();
        var url = this.app.BASEURL + 'pc/detail/info?id=' + ids + '&time=' + c_time;
        $.get(url, function (res) {
          var lists = res.list;

          that.showDataInfo = lists;
          that.colNum = lists.article.collection;
          that.zanNum = lists.article.zan;
          that.c_content = lists.article.content.replace(/\s{2}/g, '');
          that.newsCommentInfo.comment_url = that.app.BASEURL + 'pc/detail/comments?';
          that.newsCommentInfo.comment_id = ids;
          that.newsCommentInfo.comment_total = lists.comment.total;
          that.checkStatus(Data.jwt, ids, Data.userId, lists.entity.entity_code);
          that.getRecomment(lists.article.hot_ids);
          if (lists.article.picture) {
            that.firstPic = 'http://pic.carnoc.com/file/' + lists.article.picture.slice(0, 6) + '/' + lists.article.picture;
          }
          that.firstVideo = lists.article.vedio;
          if (/http:|https:/.test(that.firstVideo)) {
            that.isYouku = false;
            that.baseStr = that.baseStr.replace(/videoSrc/g, that.firstVideo);
          }
          else {
            that.isYouku = true;
          }

          document.title = lists.article.title + '-民航资源网';
          setTimeout(Fn.setShare, 100);
          setTimeout(function () {

            Fn.shareControl(lists)
          }, 100);
          that.$nextTick(function () {
            setTimeout(function () {
              var oldTop = 0;
              //单次滚动的最小距离，小于此距离的不进行处理，降低cpu损耗
              var minDis = 20;
              var C_H = $(window).height();
              var collect_offset = 0;
              var zan_offset = 0;
              var maxTop = $('.footerBox').offset().top - 300;
              if ($('.l_d_share').offset()) {
                collect_offset = $('.l_d_share').offset().top - C_H;
                if (C_H < collect_offset) {
                  $('.l_d_share').addClass('collectFixed');
                }
              }
              if ($('.r_item:last-child').offset()) {
                zan_offset = $('.r_item:last-child').offset().top + 300;
              }
              window.onscroll = function () {
                var sTop = $(this).scrollTop();
                maxTop = $('.footerBox').offset().top - 350;
                //滚动高度超过60显示回到顶部按钮
                if (sTop > 60) {
                  that.scrollControl.toTop = true
                }
                else {
                  that.scrollControl.toTop = false
                }


                /**
                 * 计算滚动高度,悬浮分享收藏框
                 */
                if (!collect_offset) {
                  collect_offset = $('.l_d_share').offset().top - C_H;
                }
                if (!zan_offset) {
                  if ($('.r_item:last-child').offset()) {
                    zan_offset = $('.r_item:last-child').offset().top + 300;
                  }
                }
                if (sTop < collect_offset) {
                  $('.l_d_share').addClass('collectFixed');
                }
                else {
                  $('.l_d_share').removeClass('collectFixed');
                }

                if ((sTop < maxTop) && (sTop > zan_offset)) {
                  $('.zan_area').addClass('zanFixed');
                }
                else {
                  $('.zan_area').removeClass('zanFixed');

                }
                var c_dis = sTop - oldTop;
                if (Math.abs(c_dis) < minDis) {
                  oldTop = sTop;
                  return
                }
                else {
                  if (c_dis > 0) {
                    $('.nav_active').addClass('nav_active_hide');
                  }
                  else {
                    $('.nav_active').removeClass('nav_active_hide');
                  }
                }
                oldTop = sTop

              };

              that.app.$data.loadingEnd = true;
            }, 200);
          })

        })
      },
      /**
       * @author minchangjun
       * @since 2019/3/14
       * @param code 通过code得到相关推荐
       * @return
       * @desc   获取右侧相关推荐图文信息
       */
      getRecomment(hotid) {
        var that = this;

        var url = this.app.BASEURL + 'pc/detail/relevant?&is_pic=1&tag=' + that.showDataInfo.article.tag +
          '&news_id=' + that.newsCommentInfo.comment_id + '&entity_code=' + that.showDataInfo.entity.entity_code + '&num=8' + '&hot_ids=' + hotid;
        $.get(url, function (res) {
          that.storeRelateWorks = res.list;
        })

      },
      doZan() {
        var method = 'add';
        var that = this;
        if (!this.zanFlag) {
          return
        }
        this.zanFlag = false;

        if (this.canZan) {
          method = 'add'
        }
        else {
          method = 'remove'
        }
        var obj = {};
        obj['news-id'] = this.articleId;
        obj.method = method;
        var url = this.app.BASEURL + 'pc/action/news-zan';
        $.post(url, obj, function (res) {
          if (res.code == 1000000) {
            if (method == 'add') {
              that.zanNum++;
            }
            else {
              that.zanNum--;
            }
            that.storeZanInfo(that.articleId);
            that.canZan = !that.canZan
          }
          that.zanFlag = true
        })
      },
      //点击量获取
      collectClick(id) {

        var url = this.app.BASEURL + 'pc/detail/view?news-id=' + id;
        $.get(url, function (res) {

        })
      },
      /**
       * @author minchangjun
       * @since 2019/3/18
       * @param
       * @return boolean/object
       * @desc 得到本地点赞信息，若不存在返回false否则返回信息对象
       */
      getZanInfo() {
        var store = window.localStorage;
        var data = store.getItem('zanInfo');
        if (data) {
          return JSON.parse(data);
        }
        else {
          return false
        }


      },
      /**
       * @author minchangjun
       * @since 2019/3/18
       * @param {number}
       * @return
       * @desc  将id存到本地，防止重复点赞
       */
      storeZanInfo(id) {
        //该id新闻已经被点赞过了
        var hasData = this.getZanInfo();
        var store = window.localStorage;
        var list = hasData.datalist;
        //该id的作品已经被评分
        var zanList = [];
        zanList = zanList.concat([], list);
        var index = zanList.indexOf(id);
        if (index != -1) {
          zanList.splice(index, 1);
          this.isActive = false;
          this.isMove = false;
        } else {
          zanList.push(id);
          this.isActive = true;
          this.isMove = true;
        }

        var stData = {
          datalist: zanList
        };
        var stDataJson = JSON.stringify(stData);
        store.setItem('zanInfo', stDataJson)


      },
      /**
       * @author minchangjun
       * @since 2019/3/18
       * @param
       * @return boolean
       * @desc 判断该条新闻是否被点赞
       */
      hasZaned(id) {
        var lists = this.getZanInfo().datalist;
        if (lists && lists.indexOf(id) !== -1) {
          return true
        }
        else {
          return false
        }
      },
      /**
       * @author minchangjun
       * @since 2019/3/19
       * @param
       * @return
       * @desc 热门作品 ，获得相关作品列表
       */
      getHotPro() {
        var that = this;
        var url = this.app.BASEURL + 'pc/detail/hot-brand';
        $.get(url, function (res) {
          that.hotProList = res.list;
          //组装得到的每个作品的跳转链接
          for (var i = 0; i < res.list.length; i++) {
            that.hotProList[i].url = '#/cases/' + res.list[i].id
          }


        })

      },
      /**
       * @author minchangjun
       * @since 2019/3/14
       * @param
       * @return
       * @desc  点击右侧的路由需要重新加载相应的推荐页面
       */
      reloadViews() {
        var ids = this.$route.params.id;
        this.collectClick(ids);
        this.getData(ids);
      },
      /**
       * 检查该条资讯是否被打分，收藏，喜欢
       */

      checkStatus(jwt, id, userId, code) {
        var that = this;
        var obj = {};
        obj['jwt'] = jwt;
        obj['user-id'] = userId;
        obj['newsid'] = id;
        obj['code'] = code;
        if(jwt&&userId) {
          var url = this.app.BASEURL + '/pc/action/check-status';
          $.post(url, obj, function (res) {
            if (res.code == 1000000) {
              that.optionResult.collection = res.list.collection;
              that.optionResult.entity_far = res.list.entity_far;
              that.optionResult.star = res.list.star;
              that.optionResult.qsOver = true;
            }
          })

        }
      }

    },
    components: {
      NavBar, Comment, Footer, TimeTrans, ToTop, Collection
    }
  }
</script>

<style scoped>
  .page {
    padding-top: 110px;
  }

  .mainDetail {
    overflow: hidden;
    width: 1140px;
    margin: 0 auto;
    text-align: left;
    color: #333;
    font-size: 16px;

  }

  .l_d_basicinfo {
    font-size: 14px;
    color: #999;
  }

  .leftDetail, .rightDetail {
    float: left;

  }

  .leftDetail {
    width: 770px;
    padding-bottom: 50px;
    line-height: 24px;

  }

  .rightDetail {
    width: 300px;
    margin-left: 70px;
    text-align: center;
  }

  p.l_d_basicinfo {
    padding: 10px 0;
    position: relative;
    height: 50px;
  }

  h2.l_d_tl {
    width: 100%;

    font-size: 32px;
    font-weight: 540;
    line-height: 50px;
  }

  >>> .article_content p {

    margin: 30px 0;
    line-height: 36px;
    font-size: 18px;
  }

  >>> .article_content p img {
    max-width: 100%;
  }

  >>> .article_content img {
    max-width: 100%;
  }

  .l_d_basicinfo span {
    padding: 0 5px;
    vertical-align: middle;
  }

  .l_d_basicinfo i {
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: #999;
    vertical-align: middle;
  }

  .l_d_basicinfo span.l_d_comment {
    padding-left: 8px;

    vertical-align: top;
  }

  .l_d_basicinfo span.l_d_comment img {
    vertical-align: middle;
    width: 14px;
  }

  span.l_d_tag {
    color: #f28f44;
    border-bottom: 1px solid #f28f44;
    padding: 0;
    position: absolute;
    right: 5px;
    top: 12px;
    font-size: 13px;
    font-weight: 500;

  }

  .l_d_desc {
    background-color: #f6faff;
    height: 100px;
    position: relative;
    box-sizing: border-box;
    padding: 30px 35px;
    line-height: 30px;
    margin-bottom: 40px;
  }

  span.l_d_d1 {
    width: 45px;
    height: 34px;
    position: absolute;
    left: 10px;
    top: -15px;
    background: url("../../static/img/bg1.png") no-repeat;

  }

  span.l_d_d2 {
    width: 45px;
    height: 34px;
    position: absolute;
    right: 15px;
    bottom: -15px;
    background: url("../../static/img/bg1.png") no-repeat;
    background-position: -72px 0;
  }

  .pd25 img {
    width: 100%;
    margin-bottom: 10px;
  }

  .h_tl {
    font-weight: bold;
  }

  p.endLine {
    position: relative;
    text-align: center;
  }

  p.endLine:before {
    position: absolute;
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #ffc800;
    left: 330px;
    top: 30px;
  }

  p.endLine:after {
    position: absolute;
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    left: 431px;
    top: 30px;
    background-color: #ffc800;
  }

  p.bqinfo {
    color: #999999;

  }

  p.zan_ctn {

    margin: 50px auto;
    width: 125px;
    height: 45px;
    padding: 15px 0;
    border-radius: 35px;
    background-color: #e5e5e5;
    text-align: center;
    color: #333;
    opacity: 0.4;
    cursor: pointer;
  }

  p.zan_ctn img {
    width: 24px;
    height: auto;
  }

  p.zan_ctn_active {
    background-color: #f5c243;
    color: #333;
    opacity: 1;
  }

  p.sp_line {
    width: 100%;
    height: 1px;
    background-color: #d3d3d3;
    margin: 0 auto;
  }

  .mg30 {
    margin: 30px auto;
  }

  p.sp_line_little {
    width: 90%;
  }

  .share_art {
    margin: 15px 0;
    height: 50px;
    line-height: 50px;
    text-align: right;
  }

  .share_art a {

    margin: 8px;

  }

  .share_art a img {
    vertical-align: middle;
  }

  .zan_area {
    border: 1px solid #e3e3e3;
    box-shadow: 2px 2px 8px #e3e3e3;
    padding-bottom:
  }

  .r_tl_t {
    display: table;
    padding-left: 0px;
    padding-bottom: 4px;
    border-bottom: 4px solid #f5c243;
    margin: 20px 0;
    margin-top: 40px;
    font-weight: bold;
  }

  .r_item_bottom {
    padding: 5px 15px 10px;
    border-top: none;
  }

  .r_item {
    margin-bottom: 30px;
    text-align: left;
    border: 1px solid #f0f0f0;
    box-shadow: 2px 2px 8px #f0f0f0;
    padding: 15px 5px 15px 15px;
  }

  .r_item img {
    width: 100%;
  }

  .r_item .r_item_bottom h3 {
    margin-bottom: 10px;
    line-height: 30px;
  }

  .l_d_share {
    text-align: right;
    font-size: 14px;
    color: #999;

  }

  p.l_d_share span {
    vertical-align: middle;
  }

  p.l_d_share img {
    vertical-align: middle;
  }

  p.l_d {
    font-size: 14px;
  }

  .footerMain {
    width: 1140px;
    margin: 30px auto;
    text-align: left;
  }

  .m_c li div.m_c_item {
    height: 150px;
  }

  .m_c li div.m_c_item img {
    /*min-width: 100%;*/
    height: 100%;

  }

  div.f_item1 {
    overflow: hidden;
    font-size: 20px;
    color: #fff;
    margin-top: 80px;
  }

  .btm_line {
    display: inline-block;
    padding-bottom: 10px;
    color: #fff;
    border-bottom: 4px solid #f3b53f;
    font-weight: bold;
  }

  .f_item1 a.pullR {
    font-size: 14px;
    color: #fff;
  }

  .f_item1 a.pullR img {
    vertical-align: middle;
    margin-right: 5px;
  }

  .f_item1 a.pullR span {
    vertical-align: middle;
    display: inline-block;
    margin-top: 2px;
  }

  .l_d_time {
    display: inline-block;
    vertical-align: middle;
  }

  p.timeTap {
    margin-left: 0;
  }

  div.no_recomment {
    width: 100%;
    height: 300px;
    background-color: #efefef;
    text-align: center;
    line-height: 300px;
  }

  .m_c_zan .tmp1 {
    font-size: 12px;
    color: #999;
    display: inline-block;
    float: right;
    line-height: 22px;
  }

  .bottomBox {
    box-shadow: none;
  }

  .m_c li h3 {
    margin: 10px 0;
  }

  .zan_area .bdsharebuttonbox a {
    margin: 12px;
  }

  .bdsharebuttonbox {
    display: inline-block;
    vertical-align: middle;
  }

  .share_to {
    vertical-align: middle;
    line-height: 40px;
  }

  .bdsharebuttonbox a {
    padding-left: 18px;
    float: left;
    font-size: 12px;
    line-height: 18px;
    height: 18px;
    background-repeat: no-repeat;
    cursor: pointer;

  }

  .bdsharebuttonbox a.bds_weixin {
    background-image: url("../../static/img/wx.png");
    background-position: 0 2px;
  }

  .bdsharebuttonbox a.bds_sqq {
    background-image: url("../../static/img/qq.png");
    background-position: 0 0;
  }

  .bdsharebuttonbox a.bds_tsina {
    background-image: url("../../static/img/xl_blog.png");
    background-position: 0 2px;
  }

  .bdsharebuttonbox a.bds_qzone {
    background-image: url("../../static/img/qq_zone.png");
    background-position: 0 0;
  }

  p.share_ite {
    margin-bottom: 0px;
  }

  .coll_wrap {
    float: left;
    margin-left: 15px;
  }

  .collectFixed {
    width: 770px;
    position: fixed;
    bottom: 0;
    border-bottom: 1px solid #d3d3d3;
    border-top: 1px solid #d3d3d3;
    background-color: #fff;
    margin: 0;
    padding: 10px 0;

  }

  .zanFixed {
    position: fixed;
    width: 295px;
    top: 66px;
    z-index: 100;
    background-color: #fff;
  }

  >>> p video {
    max-width: 100%;
    margin: 0 auto;
    display: block;
  }
  >>> .article_content p a{
    color: #004A9C;

  }

  >>> .article_content p a:hover{
    text-decoration: underline #d00;
    color: #d00;
  }
  span.leftDot {

    width: 4px;
    height: 4px;
    background-color: #999;
    border-radius: 50%;
    margin-right: 10px;
    position: absolute;
    left: -3px;
    top: 10px;

  }

  .c_list {
    position: relative;
    padding-left: 10px;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .c_list span {
    vertical-align: middle;
  }

  .leftTitle {
    line-height: 24px;
  }

  .tmp1 {
    font-size: 12px;
    color: #999;
    margin: 5px 0;
    display: block;
  }
</style>
