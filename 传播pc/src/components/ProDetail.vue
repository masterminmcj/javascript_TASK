<template>
  <div class="page" id="toTop" v-if="showDataInfo.article">

    <div class=" nav_active ">
      <nav-bar nowId="4"></nav-bar>
    </div>
    <div class="mainDetail">
      <div class="leftDetail">
        <h2 class="l_d_tl">
          {{showDataInfo.article.title}}
        </h2>

        <p class="l_d_basicinfo">
          <time-trans :timeTap="showDataInfo.article.posttime" class="l_d_time"></time-trans>
          <span>民航资源网</span>

          <span>{{showDataInfo.article.writer}}</span>

          <!--<time-trans :timeTap="showDataInfo.article.posttime" class="l_d_time"></time-trans>-->

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
          <!--<video :src="firstVideo" autoplay controls preload="auto" :poster="firstPic"></video>-->

          <iframe :src="'http://player.youku.com/embed/'+firstVideo" width="700" height="400" v-if="isYouku"></iframe>

          <object type="application/x-shockwave-flash" data="http://www.carnoc.com/video/play.swf" width="700"
                  height="400" v-else>
            <param name="movie" value="http://www.carnoc.com/video/play.swf">
            <param name="allowFullScreen" value="true">
            <param name="FlashVars" :value="baseStr">
          </object>

        </p>
        <div class="article_content" v-html="c_content"></div>
        <p class="pd20 endLine">
          完
        </p>
        <!--<p class="ft12 bqinfo">-->
        <!--本文已标注文章出处和作者，版权归原作者所有，报道中出现的所有图像版权属于其其合法持有人，本站只供传递信息之用，非商务用途。如涉及版权问题，请作者或相关单位与我们联系，本站将及时删除或撤换，联系方式：news@carnoc.com。-->
        <!--</p>-->
        <!--<p :class="{'zan_ctn':true,'mg30':true,'zan_ctn_active':isActive,'zanMove':isMove}" @click="doZan()"-->
        <!--id="doComment">-->
        <!--<img src="static/img/zan1.png"/><br>-->
        <!--<span class="zan_num">{{zanNum}}</span>-->
        <!--</p>-->
        <p class="sp_line"></p>
        <div class="mg30 l_d_share share_art">
          <div class="coll_wrap">
            <Collection :collectionNum="colNum" :replyNum="newsCommentInfo.comment_total" :scoreStatus="optionResult"
                        v-if="optionResult.qsOver||!islogins"></Collection>
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
          <div class="scoreBox" title="点击下方小飞机即可进行评分">
            <p class="s_item1"><span class="r_score">{{showDataInfo.article.score}}</span>分</p>
            <p class="s_item2" v-if="showDataInfo.article.total_score>0">
              <span>(<span class="s_tg">{{showDataInfo.article.total_score}}人评分</span>)</span></p>
            <div class="s_item3">
              <score :userInfo="storeUserInfo" @upDateScore="handleUpdate" @hasScore="handleScore"
                     @scoreResult="scoreResult" :scoreStatus="optionResult"
                     v-if="optionResult.qsOver||!islogins"></score>
            </div>
          </div>
          <p class="sp_line sp_line_little"></p>
          <!--实体-->
          <p class="mg30 fc999 c_zan" v-if="showDataInfo.entity.entity_code">
            <a :href="'#/brandlist/'+showDataInfo.entity.entity_code">
          <span class="com_logo_box">
          <img :src="showDataInfo.entity.entity_logo" class="com_logo"/>
          </span>
              <span class="do_score">
          <span class="f_company">{{showDataInfo.entity.entity_name}}</span><br/>
          作品<span class="c_num">{{showDataInfo.entity.works_total}}</span>
          </span>
            </a>
            <span :class="{'pullR':true,'heartBox':true,'heartBox_active':hasCollection}" @click="doCollection()"><img
              src="static/img/heart2.png"/></span>
          </p>

          <div class="mg30 fc999 share_art share_art1">

            <span class="share_to">分享：</span>
            <div class="bdsharebuttonbox">
              <a class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
              <a class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
              <a class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
              <a class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
            </div>
          </div>

          <!--使用百度分享-->
        </div>
        <div v-if="storeRelatePro.length>0">
          <p class="r_tl_t">
            相关作品

          </p>

          <div>
            <div class="r_item" v-for="val in storeRelatePro">
              <a :href="val.url" class="link_box">
                <div class="r_box">
                  <img :src="val.pic_url"/>
                </div>
                <div class="r_item_bottom">
                  <p class="m_c_tg"><span class="m_c_tg_content">{{val.content_type}}</span></p>
                  <h3>{{val.title}}</h3>
                  <p class="m_c_score">
                        <span class="air_icon ">
                            <img src="static/img/air.png">
                            <span>{{val.score}}</span>
                        </span>
                    <time-trans :timeTap="val.posttime" class="tmp1"></time-trans>
                  </p>
                </div>
              </a>
            </div>
          </div>
          <!--暂无推荐-->
          <!--<div class="no_recomment" v-else>-->
          <!--暂无相关作品-->
          <!--</div>-->
          <p class="show_more">
            <a :href="en_link" class="link_en"><img src="static/img/more.png">查看更多</a>
          </p>
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
              <div class="m_c_item" :style="{backgroundImage:'url('+val.pic_url+')'}">
                <!--<img :src="val.pic_url">-->
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
                  <a  class="score_num">评分</a>
                </p>
              </div>
            </a>
          </li>

        </ul>
      </div>
    </div>
    <Footer></Footer>

    <!--评分弹窗-->
    <div :class="{'alterTip':true,'showAlert':showResult}">
      <alert :type="type" :isShow="showResult" :msg="msg"></alert>
    </div>
  </div>
</template>

<script>
  // 资讯详情页
  import NavBar from './NavBar'
  import Comment from './Comment'
  import Score from './Score'
  import Footer from './Footer'
  import TimeTrans from './TimeTrans'
  import ToTop from './ToTop'
  import Fn from '../../static/js/comment'
  import Alert from './Altert'
  import Collection from './Collection'

  export default {
    name: "NewsDetail",
    beforeCreate() {
      window._bd_share_main = ""
    },
    data() {
      return {
        //区分能否点赞，防止点击过快造成多次点赞
        canZan: true,
        //用来统计点赞数的
        zanNum: 0,
        //用来保存主体数据渲染
        showDataInfo: {},
        //用于保存查看评论的新闻id及url，通过props传给评论组件
        newsCommentInfo: {},
        //获取相关作品
        storeRelatePro: [],
        //存储取得的用户信息,传给评分组件score使用
        storeUserInfo: {},
        //存储底部热门作品列表
        hotProList: [],
        //控制是否显示点赞成功动画
        isActive: false,
        isMove: false,
        //用户是否登录
        islogins: false,
        //保存实体code
        com_code: "",
        //用户是否收藏过
        hasCollection: false,
        // 保存jwt,h5token等信息供后面请求接口使用
        optionData: {},
        //弹窗配置项
        type: 'success',
        showResult: false,
        msg: '评分成功！',
        firstPic: '',
        firstVideo: "",
        // 提示框定时器
        tipTimer: null,
        //收藏数目
        colNum: 0,
        c_content: '',
        //回到顶部控制按钮
        scrollControl: {
          toTop: false,
          doComment: true
        },
        currentNewsId: 0,
        baseStr: '',
        isYouku: false,
        optionResult: {
          //收藏
          collection: 1,
          //喜欢
          entity_far: 1,
          //评分
          star: 1,
          qsOver: false
        },
        en_link: ""

      }
    },
    inject: ['app'],
    created() {

    },
    mounted() {

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


      this.app.$data.loadingEnd = false;
      this.islogins = this.app.isLogin;


      //判断是否被点赞过，传改资讯id，查看本地是否含有该id，有则表示已经点赞过
      // var isZaned = this.hasZaned(ids);
      //调用comment.js里面封装的方法得到用户的相关信息
      var data = Fn.getUserInfo();
      this.optionData['h5-token'] = data.h5Token;
      this.optionData['user-id'] = data.userId;
      this.optionData['jwt'] = data.jwt;
      // if (isZaned) {
      //   this.canZan = false;
      //   this.isActive = true;
      //   this.isMove = true;
      // }
      // else {
      //   this.canZan = true;
      // }
      var ids = this.$route.params.id;
      this.currentNewsId = ids;
      this.collectClick(ids);
      this.getData(ids, data);
      this.storeUserInfo = Fn.getUserInfo();
      this.storeUserInfo.id = ids;
      this.getHotPro();
      //顶部搜索框显示或隐藏事件

    },


    /**
     *监听路由，不然只通过?id方法切换路由页面不会刷新
     * */

    watch: {
      '$route'(from, to) {
        //回到顶部
        document.getElementById("toTop").scrollIntoView();
        this.reloadViews();

      },

    },
    methods: {
      /**
       * @title  获取主体部分数据
       * @author minchangjun
       * @since 2019/3/22
       * @param
       * @return
       * @desc 数据分三大块，content-》主体新闻数据  entity->实体信息 comment：提供评论总数量
       * this.app.BASEURL 保存基础URL，方便开发接口，本地接口，线上接口切换
       */
      getData(ids, Data) {
        var that = this;
        var time = new Date().getTime();
        var url = this.app.BASEURL + 'pc/detail/info?id=' + ids + '&time=' + time;
        $.get(url, function (res) {
          var lists = res.list;
          that.showDataInfo = lists;
          document.title = lists.article.title + '-民航资源网';
          that.c_content = lists.article.content.replace(/\s{2}/g, '');
          that.zanNum = lists.article.zan;
          that.colNum = lists.article.collection;
          that.optionData.code = lists.entity.entity_code;
          that.newsCommentInfo.comment_url = that.app.BASEURL + 'pc/detail/comments?';
          that.newsCommentInfo.comment_id = ids;
          that.newsCommentInfo.comment_total = lists.comment.total;
          that.storeUserInfo.score = lists.article.score;
          that.com_code = lists.entity.entity_code;
          that.en_link = "#/brandlist/" + lists.entity.entity_code;
          if (that.islogins) {
            that.checkStatus(Data.jwt, ids, Data.userId, that.com_code);
          }
          else {
            that.judgeCollection()
          }
          if (lists.article.picture) {
            that.firstPic = 'http://pic.carnoc.com/file/' + lists.article.picture.slice(0, 6) + '/' + lists.article.picture;
          }
          that.firstVideo = lists.article.vedio;
          if (/http:|https:/g.test(that.firstVideo)) {
            that.isYouku = false;
            that.baseStr = that.baseStr.replace(/videoSrc/g, that.firstVideo);
          }
          else {
            that.isYouku = true;
          }

          setTimeout(Fn.setShare, 100);
          setTimeout(function () {
            Fn.shareControl(lists)
          }, 100);

          that.getRelatePro(lists.entity.entity_code);


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
                if (sTop > 60) {
                  that.scrollControl.toTop = true;
                }
                else {
                  that.scrollControl.toTop = false;
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
      //点击量获取
      collectClick(id) {
        var url = this.app.BASEURL + 'pc/detail/view?news-id=' + id;
        $.get(url, function (res) {
        })
      },
      doZan() {
        var that = this;
        var method = 'add';
        if (this.canZan) {
          method = 'add'
        }
        else {
          method = 'remove'
        }
        this.canZan = false;
        var obj = {};
        var id = that.newsCommentInfo.comment_id;
        obj['news-id'] = id;
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
            that.storeZanInfo(id);
          }
        })
      },
      doCollection() {
        var that = this;
        var method = 'add';
        var isCollect = this.hasCollection;
        //已经登录，但之前已经收藏过,点击则为取消喜欢
        if (isCollect && this.islogins) {
          method = 'remove'
        }
        //未登录且在24小时内重复点击，直接返回
        else if (isCollect && !this.islogins) {
          return
        }
        //未喜欢，增加喜欢
        else if (!isCollect) {
          method = 'add'
        }
        var obj = this.optionData;
        obj.method = method;
        /**
         * 未登录的用户不需要验证jwt
         * */

        if (!this.islogins) {
          delete obj.jwt
        }
        if (that.tipTimer) {
          clearTimeout(that.tipTimer);
        }

        var url = this.app.BASEURL + 'pc/action/entity-zan';
        $.post(url, obj, function (res) {
          /**
           * 操作成功，爱心点亮或点灭,本地没有此code需保存到本地
           */
          if (res.code == 1000000) {
            if (that.islogins) {
              that.hasCollection = !that.hasCollection;

            }
            else {
              that.hasCollection = true
            }
            that.storeCollectionInfo(that.com_code);
          }
          if (res.code == 2000000)
            that.tipTimer = setTimeout(function () {
              that.showResult = false;
            }, 2000);
        })


        // }
      },


      /**
       * @author minchangjun
       * @since 2019/3/14
       * @param code string 通过code取得相关作品
       * @return
       * @desc  获取右侧相关作品的数据
       */
      getRelatePro(code) {
        var that = this;
        var url = this.app.BASEURL + 'pc/detail/relate-works?is_pic=1&code=' + code + '&pagesize=4' + '&not_id=' + this.currentNewsId;
        $.get(url, function (res) {

          var lists = res.list;
          //组装得到的每个作品的跳转链接
          for (var i = 0; i < lists.length; i++) {
            lists[i].url = '#/cases/' + lists[i].id
          }
          that.storeRelatePro = lists;

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
        // var ids = window.location.href.split('?')[1];
        var ids = this.$route.params.id;
        this.collectClick(ids);
        this.getData(ids);
      },
      handleUpdate(data) {
        var obj = this.showDataInfo.article;
        obj.score = data;
        this.$forceUpdate();
        this.$set(this.showDataInfo, 'article', obj);

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
       * @since 2019/3/20
       * @param
       * @return
       * @desc 获取本地关于收藏的数据 若存在则返回数据,否则返回false
       */
      getLocalCom() {
        var store = window.localStorage;
        var data = store.getItem('collectionInfo');
        if (data) {
          return JSON.parse(data)
        }
        else {
          return false
        }

      },
      /**
       * @author minchangjun
       * @since 2019/3/20
       * @param
       * @return {boolean}
       * @desc  判断是否收藏过
       */
      judgeCollection() {
        //未登录的用户通过本地缓存判断是否进行操作
        if (!this.islogins) {
          var data = this.getLocalCom();
          var oldTime = 0;
          //缓存是否存在此实体操作信息标志
          var likeTag = false;
          var nowTime = new Date().getTime();
          //不存在本地缓存直接返回
          if (!data) {
            this.hasCollection = false;
            return false;
          }
          for (var i = 0; i < data.lists.length; i++) {
            if (data.lists[i].code == this.com_code) {
              likeTag = true;
              oldTime = data.lists[i].storeTime
            }
          }
          var c_date = nowTime - oldTime;
          //已经点过喜欢
          if (likeTag) {
            //已经登录，显示红色按钮
            if (this.islogins) {
              this.hasCollection = true;
              return true
            }
            else {
              //未登录，在24小时内显示红色按钮
              if (c_date < this.app.ExpireTime) {
                this.hasCollection = true;
                return true
              }
              else {
                //未登录，在24小时外显示灰色按钮，可以进行收藏
                this.hasCollection = false;
                return false
              }
            }
          }
          else {
            this.hasCollection = false;
            return false;
          }
        }
        //已经登录的用户通过接口判断状态
        else {
          if (this.optionResult.entity_far) {
            this.hasCollection = false;
            return false
          }
          else {
            this.hasCollection = true;
            return true
          }
        }


      },
      /**
       * @author minchangjun
       * @since 2019/3/20
       * @param
       * @return
       * @desc 存储实体收藏信息到本地，本地没有改实体code直接存储，有则删除该条实体code
       * 这样才能通过本地是否有code来判断用户有没有收藏
       */
      storeCollectionInfo(code) {
        var store = window.localStorage;
        var data = this.getLocalCom();
        var time = new Date().getTime();
        //临时的obj
        var t_obj = {};
//本来就不存在数据,新建数组
        if (!data) {
          var lists = [];
          t_obj.code = code;
          t_obj.storeTime = time;
          //是否已经喜欢的标志
          var collect_tag = false;
          //记录本地信息的索引
          var index = 0;

          lists.push(t_obj);
          var obj = {
            lists: lists,
          };
          store.setItem('collectionInfo', JSON.stringify(obj))
        }
//存在本地收藏数据，判断该code是否存在，存在直接返回否则add
        else {
          var oldList = [];
          oldList = oldList.concat([], data.lists);
          //登录后才可取消实体喜欢
          for (var i = 0; i < oldList.length; i++) {
            /**
             * 该实体信息已经存在于缓存列表中，判断若已登录则删除
             * 该条，未登录不做操作
             *
             * 若改实体不存在于缓存列表中，无论有无登录直接写入本地缓存
             */
            if (oldList[i].code == this.com_code) {
              collect_tag = true;
              index = i;
            }
          }

          if (collect_tag) {
            if (this.islogins) {
              oldList.splice(index, 1);
            }
            else {

            }
          }
          else {
            t_obj.code = code;
            t_obj.storeTime = time;
            oldList.push(t_obj);
          }

          var obj = {
            lists: oldList,
          };
          store.removeItem('collectionInfo');
          store.setItem('collectionInfo', JSON.stringify(obj));
        }
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


      handleScore(data) {
        var that = this;
        if (this.tipTimer) {
          clearTimeout(that.tipTimer)
        }
        if (data) {

          this.msg = '评分成功！';
          this.type = 'success'

        }
        else {
          this.msg = '你已经评过分了哦！';
          this.type = 'warn'
        }
        this.showResult = true;
        this.tipTimer = setTimeout(function () {
          that.showResult = false;
        }, 2000)


      },


      /**
       * @title  获取评分结果，更新评分分数和评分人数
       * @author minchangjun
       * @since 2019/3/28
       * @param object $res-->评分结果数据
       * @return
       * @desc
       */
      scoreResult(res) {
        this.showDataInfo.article.score = res.score;
        this.showDataInfo.article.total_score = res.total;
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
              that.judgeCollection(code);
            }
          })
        }

      }


    },
    components: {
      Collection,
      NavBar, Comment, Score, Footer, TimeTrans, ToTop, Alert, Collection
    },


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
    overflow: hidden;
    font-size: 32px;
    font-weight: 540;
    line-height: 50px;
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
  }

  .l_d_basicinfo span.l_d_comment img {
    vertical-align: middle;
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
    /*height: 100px;*/
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
    margin-bottom: 20px;
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

    margin-bottom: 50px;

  }

  p.zan_ctn {
    margin: 50px auto;
    width: 125px;
    height: 45px;
    padding: 15px 0;
    border-radius: 35px;
    background-color: #ddd;
    text-align: center;
    color: #333;
    opacity: 0.4;
    cursor: pointer;
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

  p.mg30 {
    margin: 20px auto;
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

    margin: 12px;

  }

  .share_art a img {
    vertical-align: middle;
  }

  .zan_area {
    border: 1px solid #e3e3e3;
    box-shadow: 2px 2px 8px #e3e3e3;
  }

  .r_tl_t {
    display: table;
    padding-left: 0px;
    padding-bottom: 4px;
    border-bottom: 4px solid #f5c243;
    margin: 20px 0;
    margin-top: 40px;
    font-weight: bold;
    position: relative;
  }

  p.show_more {
    text-align: right;
  }

  .link_en {
    display: inline-block;
    width: 120px;
    font-size: 14px;
    line-height: 24px;
    font-weight: normal;
  }

  .link_en img {
    margin-right: 8px;
    margin-top: 5px;

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
  }

  .r_item img {
    width: 100%;
    height: auto;
  }

  .r_item .r_item_bottom h3 {
    margin-bottom: 10px;
    line-height: 30px;
  }

  p.l_d_share {
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

  div.scoreBox {
    width: 100%;
    height: 170px;
    background: url("../../static/img/bg2.png") no-repeat;
    position: relative;
    background-position-y: -1px;
  }

  .share_art1 {
    background-color: #f7f7f7;
    margin-bottom: 0;
    text-align: center;
  }

  .s_item1 {
    position: absolute;
    left: 83px;
    top: 10px;
    border-bottom: 1px solid #eee;
    width: 140px;
    text-align: center;
    padding-bottom: 8px;
    font-size: 16px;
  }

  .s_item1 span.r_score {
    color: #e27d38;
    font-size: 32px;
    font-family: Georgia;
    margin-right: 5px;
  }

  .s_item2 {
    position: absolute;
    left: 83px;
    top: 70px;
    width: 140px;
    text-align: center;
    color: #666;
    font-size: 14px;
  }

  .s_item3 {
    position: absolute;
    bottom: 10px;
    text-align: center;
    width: 100%;
  }

  .c_zan {
    text-align: left;
    padding: 0px 25px;
    min-height: 40px;
  }

  .c_zan span, .c_zan img {
    vertical-align: middle;

  }

  .c_zan span.com_logo_box {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    box-shadow: 0px 0px 10px #efefef;
    position: relative;
  }

  img.com_logo {
    width: 50px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }

  span.do_score {
    display: inline-block;
    height: 100%;
    font-size: 12px;
    color: #999;
    margin-left: 10px;
    line-height: 20px;
  }

  span.f_company {
    font-size: 14px;
    font-weight: bold;
    max-width: 145px;
    display: inline-block;
    color: #333;
  }

  span.c_num {
    margin-left: 5px;
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

  /*底部公共样式*/

  .footerMain {
    width: 1140px;
    margin: 30px auto;
    text-align: left;
  }

  .m_c li div.m_c_item {
    height: 150px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }

  .m_c li div.m_c_item img {
    height: 100%;
    /*min-width: 100%;*/
  }

  div.f_item1 {
    overflow: hidden;

    font-size: 20px;
    color: #fff;
    margin-top: 80px;
  }

  .btm_line {
    padding-bottom: 10px;
    color: #fff;
    display: inline-block;
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

  .heartBox {
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    margin-top: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .heartBox_active {
    background-color: #fd494e;
  }

  .heartBox img {
    text-align: center;
  }

  .f_item1 a.pullR span {
    vertical-align: middle;
    display: inline-block;
    margin-top: 2px;
  }

  p.l_d_time {
    display: inline-block;
    vertical-align: middle;
    margin-left: 0;
  }

  .l_d_comment img {
    width: 14px;
  }

  >>> .article_content p {
    margin: 30px 0;
    line-height: 36px;
    font-size: 18px;
  }

  >>> .article_content p a {
    color: #004A9C;
  }

  >>> .article_content p a:hover {
    text-decoration: underline #d00;
    color: #d00;
  }

  .article_content p img {
    max-width: 100%;
  }

  >>> .article_content img {
    max-width: 100%;
  }

  div.no_recomment {
    width: 100%;
    height: 300px;
    background-color: #efefef;
    text-align: center;
    line-height: 300px;
  }

  .m_c_score .tmp1 {
    font-size: 12px;
    color: #999;
    display: inline-block;
    float: right;
    line-height: 22px;
  }

  a.link_box {
    display: inline-block;;
  }

  .bottomBox {
    box-shadow: none;
  }

  .m_c li h3 {
    margin: 10px 0;
  }

  .s_tg {
    margin: 0 3px;
  }

  .alterTip {
    position: fixed;
    left: 40%;
    top: 60px;
    border-radius: 5px;
    background-color: #fff;
    transform: translateY(0px);
    transition: all 1500ms;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);
  }

  .showAlert {
    transform: translateY(100px);
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

  >>> p object, >>> p iframe {
    max-width: 100%;
    margin: 0 auto;
    display: block;
  }

</style>
