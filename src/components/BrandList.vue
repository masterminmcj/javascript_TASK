<template>

  <div class="page" id="toTop">


    <div class=" nav_active ">
      <nav-bar nowId="1"></nav-bar>
    </div>

    <div class="mainContent mt60">

      <div class="containerTop">
        <div class="containerTop_c">
          <div class="brand_company">
            <!--<div class="b_modle">-->
            <!--<div class="b_modle_c">-->
            <!--<p class="b_m_title">获赞</p>-->
            <!--<p>{{enityInfo.zan_num}}</p>-->
            <!--</div>-->
            <!--</div>-->
            <div class="b_modle">
              <div class="b_modle_c">
                <p class="b_m_title">获飞机</p>
                <p class="b_m_num">{{enityInfo.score_num}}</p>
              </div>
            </div>
            <div class="b_modle b_modle_logo">
              <div class="logo_area">
                <div class="b_logoBox">
                  <img :src="enityInfo.entity_logo"/>
                </div>

                <p class="c_name">{{enityInfo.entity_name}}</p>
                <p class="desc">{{enityInfo.entity_outline}}</p>
                <div class="share_btn">
              <span :class="{'c_btn':true,'c_btn_active':hasCollection,'c_btn_ht':!hasCollection}"
                    @click="doCollection()" title="点击进行实体点赞">
                <img src="static/img/icon/share_heart.png" v-if="!hasCollection"/>
                <img src="static/img/icon/share_heart_active.png" v-else/>
                喜欢
              </span>
                  <span @click="showWin()" class="c_btn c_btn_share c_btn_ht" title="点击进行分享">
                <img src="static/img/icon/share_arrow.png"/>分享

      </span>

                  <div class="c_popup">
                    <div class="c_t_l">
                      <img :src="share_img" class="share_ewm"/>
                      <p>微信扫一扫分享到朋友圈</p>
                    </div>
                    <div class="c_t_r">
                      <div class="share_right_item" @click="handleShare(0)">
                        <a class="item_xl"></a>
                        <p>新浪微博</p>
                      </div>
                      <div class="share_right_item" @click="handleShare(1)">
                        <a class="item_frend"></a>
                        <p>QQ好友</p>
                      </div>
                      <div class="share_right_item" @click="handleShare(2)">
                        <a class="item_zone"></a>
                        <p>QQ空间</p>
                      </div>
                    </div>
                    <div class="close" @click="close()">&times;</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="b_modle">
              <div class="b_modle_c">
                <p class="b_m_title">被喜欢</p>
                <p class="b_m_num">{{likeNum}}</p>
              </div>
            </div>
            <!--<div class="b_modle">-->
            <!--<div class="b_modle_c">-->
            <!--<p class="b_m_title">粉丝</p>-->
            <!--<p>1680</p>-->
            <!--</div>-->
            <!--</div>-->


          </div>
          <div class="share_area">
            <a class="wx_share" v-if="enityInfo.entity_wx_qrcode">
              <div class="shart_popup1">
                <div class="ewmBox">
                  <img :src="enityInfo.entity_wx_qrcode"/>
                  <p>扫一扫关注品牌公众号</p>
                </div>

              </div>
            </a>
            <a :href="enityInfo.entity_wb" class="wb_share" v-if="enityInfo.entity_wb" target="_blank">
            </a>
            <a :href="enityInfo.entity_facebook" class="fb_share" v-if="enityInfo.entity_facebook" target="_blank">
            </a>
            <a :href="enityInfo.entity_twitter" v-if="enityInfo.entity_twitter" class="tw_share" target="_blank">
            </a>

            <a :href="enityInfo.entity_instagram" v-if="enityInfo.entity_instagram" class="ins_share"
               target="_blank"></a>

            <a :href="enityInfo.entity_youtube" v-if="enityInfo.entity_youtube" class="youtube_share"
               target="_blank"></a>

            <a :href="enityInfo.entity_linkedin" class="link_share" v-if="enityInfo.entity_linkedin"
               target="_blank"></a>

            <a :href="enityInfo.entity_url" class="websiteshare" target="_blank" v-if="enityInfo.entity_url"></a>

            <a :href="c_blog" v-if="c_blog" class="blog_share" target="_blank"></a>

          </div>

        </div>
        <div class="content_nav">
  <span :class="{'yellow_line':tbctrl==0}" @click="controlTab(0,255)">
    热门作品<span class="b_num">{{hotTotal}}</span>
  </span>

          <!--<span :class="{'yellow_line':tbctrl==1}" @click="controlTab(1)">-->
          <!--荣获奖项<span class="b_num">23</span>-->
          <!--</span>-->
          <span :class="{'yellow_line':tbctrl==2}" @click="controlTab(2,257)">
     最新动态<span class="b_num">{{enityInfo.news_total}}</span>
  </span>
        </div>
      </div>

      <div class="containerBottom">
        <div class="containerBottom_c">
          <div class="brand_container">

            <div class="proList">
              <!--主体-->
              <ul class="m_c">
                <li v-for="(val,index) in showDataList" @mouseover="showDesc(index)" @mouseout="hideDesc(index)">

                  <a :href="val.url">
                    <div class="m_c_item">
                      <!--<img :src="val.pic_url">-->
                      <div class="m_c_item_box" :style="{backgroundImage:'url('+val.pic_url+')'}"></div>
                    </div>
                    <div class="bottomBox bottomBox_pro">
                      <p class="m_c_tg">
                        <span class="m_c_tg_content" v-if="relateId==255">{{val.content_type}}</span>
                        <span class="m_c_tg_content" v-else>动态</span>


                      </p>
                      <h3>{{val.title}}</h3>
                      <p class="m_c_desc hd" v-if="relateId==255">
                        <span class="desc_content" v-if="val.intr">{{val.intr}}</span>
                        <a href="" class="desc_more">&gt;&gt;&gt;更多</a>
                      </p>
                      <p class="m_c_score" v-if="relateId==255">
                        <span class="air_icon">
                            <img src="static/img/air.png">
                            <span>{{val.score.toFixed(1)}}</span>
                        </span>
                        <a :href="val.url" class="score_num">评分</a>
                      </p>

                      <p class="m_c_zan" v-else>
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
              <div class="loadMore" v-show="hasMoreInfo" @click="getMore()">
                加载更多
              </div>
              <div class="loadMore nodata" v-show="!hasMoreInfo&&page>1">
                没有更多了~
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="qcodeMask"></div>
    </div>
    <ToTop :scrollControl="scrollControl"></ToTop>
    <Footer></Footer>


  </div>

</template>

<script>
  import Footer from './Footer'
  import NavBar from './NavBar'
  import TimeTrans from './TimeTrans'
  import Fn from '../../static/js/comment'
  import ToTop from './ToTop'

  export default {
    name: "TransHome",

    components: {
      Footer, NavBar, TimeTrans, ToTop
    },

    data() {
      return {
        // 控制三个tab样式
        tbctrl: 0,
        //列表页数
        page: 1,
        //每页数量
        pagesize: 20,
        //渲染的数据
        showDataList: [],
        //三个tab默认的是热门作品
        relateId: 255,
        code: 0,
        //热门作品
        hotTotal: 0,
        // 最新动态
        newTotal: 0,
        //是否还有数据
        hasMoreInfo: true,
        //实体信息
        enityInfo: {},
        share_img: "",
        //保存各tab的条数
        storeNewsNumer: {
          //热门作品
          hotpro: 0,
          //最新动态
          lastnews: 0
        },
        hasCollection: false,
        islogins: false,
        //切换收藏图片状态
        share_url: 'static/img/icon/share_heart.png',
        optionResult: {
          //收藏
          collection: 1,
          //喜欢
          entity_far: 1,
          //评分
          star: 1,
          qsOver: false
        },
        optionData: {},
        c_blog: "",
        //回到顶部控制按钮
        scrollControl: {
          toTop: false,
          doComment: false
        },
        //喜欢数量

        likeNum: 0
      }
    },
    watch: {
      '$route'(from, to) {
        //回到顶部
        document.getElementById("toTop").scrollIntoView();
      },

    },
    mounted() {
      this.islogins = this.app.isLogin;
      this.app.$data.loadingEnd = false;
      document.getElementById("toTop").scrollIntoView();
      var data = Fn.getUserInfo();
      this.optionData['h5-token'] = data.h5Token;
      this.optionData['user-id'] = data.userId;
      this.optionData['jwt'] = data.jwt;
      var l_url = location.href.replace(/\#/g, '%23');
      this.share_img = 'https://service.carnoc.com/tools/web/index.php/qrcode/url?url=' + l_url;
      var code = this.$route.params.code;
      this.code = code;
      this.com_code = code;
      this.judgeCollection(code);
      this.getData(code, data);
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
      $('.qcodeMask').click(function () {
        that.close();
      })
    },
    inject: ['app'],
    methods: {
      controlTab(index, relateid) {
        this.tbctrl = index;
        //当前tab点击不重新请求数据
        if (relateid == this.relateId) {
          return
        }
        else {
          this.relateId = relateid;
          this.showDataList = [];
          this.page = 1;
          this.getData(this.code);
        }
      },
      showDesc(index) {
        $('.m_c_desc').eq(index).removeClass('hd');
      },
      hideDesc(index) {
        $('.m_c_desc').eq(index).addClass('hd');
      },
      getData(code, Data) {
        var that = this;
        var c_time = new Date().getTime();
        var url = this.app.BASEURL + 'pc/list/brand-list?is_pic=1&' + 'page=' + this.page + '&pagesize=' + this.pagesize + '&code=' + code + '&relate=' + this.relateId + '&time=' + c_time;
        $.get(url, function (res) {
          that.showDataList = [].concat(that.showDataList, res.list.list);
          if (that.relateId == 255) {
            that.storeNewsNumer.hotpro += res.list.list.length;
            for (var i = 0; i < that.showDataList.length; i++) {
              that.showDataList[i].url = '#/cases/' + that.showDataList[i].id
            }
          }
          else {
            that.storeNewsNumer.lastnews += res.list.list.length;
            for (var i = 0; i < that.showDataList.length; i++) {
              that.showDataList[i].url = '#/news/' + that.showDataList[i].id
            }
          }
          if (that.relateId == 255) {
            that.hotTotal = res.list.total;
          }
          else {
            that.newTotal = res.list.total;
          }
          if (that.islogins) {
            that.checkStatus(Data.jwt, code, Data.userId, that.code);
          }
          else {
            that.judgeCollection();
          }
          that.getEnityInfo();

        })
      },
      getMore() {
        this.page++;
        this.getData(this.code)
      },
      /**
       * @title
       * @author minchangjun
       * @since 2019/3/25
       * @param
       * @return
       * @desc 获取实体信息
       */
      getEnityInfo() {
        var that = this;
        var code = this.$route.params.code;
        var c_time = new Date().getTime();
        var url = this.app.BASEURL + 'pc/detail/entity?code=' + code + '&time=' + c_time;
        $.get(url, function (res) {

            that.enityInfo = res.list;
            that.likeNum = res.list.entity_far;
            if (res.list.entity_blog) {
              that.c_blog = JSON.parse(res.list.entity_blog)[0]
            }
            document.title = res.list.entity_name + '-民航资源网';
            /**
             * 255为作品，257为资讯，
             * */
            if (that.relateId == 255) {
              that.hotTotal = that.hotTotal > 0 ? that.hotTotal : that.enityInfo.works_total;
              if (that.storeNewsNumer.hotpro >= that.hotTotal) {
                that.hasMoreInfo = false;
              }
              else {
                that.hasMoreInfo = true;
              }
            }
            else {
              that.newTotal = that.newTotal > 0 ? that.newTotal : that.enityInfo.news_total;
              if (that.storeNewsNumer.lastnews >= that.newTotal) {
                that.hasMoreInfo = false;
              }
              else {
                that.hasMoreInfo = true;
              }
            }


            that.app.$data.loadingEnd = true;


          }
        )
      },
      doCollection() {
        var that = this;
        var method = 'add';
        var userinfo = Fn.getUserInfo();
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
        var obj = {};
        obj['h5-token'] = userinfo.h5Token;
        obj['user-id'] = userinfo.userId;
        obj.jwt = userinfo.jwt;
        obj.method = method;
        obj.code = this.com_code;
        var url = this.app.BASEURL + 'pc/action/entity-zan';
        $.post(url, obj, function (res) {
          /**
           * 操作成功，爱心点亮或点灭,本地没有此code需保存到本地
           */
          if (res.code = 1000000) {
            if (that.islogins) {
              that.hasCollection = !that.hasCollection;
              if (that.hasCollection) {
                that.likeNum++;
              }
              else {
                that.likeNum--;
              }
            }
            else {
              console.log(that.likeNum)
              that.hasCollection = true;
              that.likeNum++;
            }

            that.storeCollectionInfo(that.com_code)

          }

        })


        // }
      }
      ,
      /**
       * @author minchangjun
       * @since 2019/3/20
       * @param
       * @return {boolean}
       * @desc  判断是否收藏过
       */
      judgeCollection() {

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
              //未登录判断是否在有效期内，若在则直接返回，不在则添加更新数据
              var c_date = time - data.lists[index].storeTime;
              if (c_date < this.app.ExpireTime) {
                return
              }
              else {
                oldList.splice(index, 1);
                t_obj.code = code;
                t_obj.storeTime = time;
                oldList.push(t_obj);
              }

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
       * @title  获取url生成分享
       * @author minchangjun
       * @since 2019/4/12
       * @param
       * @return
       * @desc
       */
      handleShare(type) {
        var title = encodeURI(this.enityInfo.entity_name);
        var title1 = this.enityInfo.entity_name;
        var desc = encodeURI(this.enityInfo.entity_outline);
        var desc1 = this.enityInfo.entity_outline;
        var allDesc = '【' + title + '】' + desc + encodeURI('@民航资源网');
        var allDesc1 = '【' + title1 + '】' + desc1 + '@民航资源网';
        var urls = "";
        //新浪微博
        if (type == 0) {
          urls = 'http://service.weibo.com/share/share.php?title=' + allDesc1 + '&url=' + escape(location.href) + '&desc=' + desc1;
          window.open(urls, '_blank');
        }
        //qq好友
        if (type == 1) {
          urls = "http://connect.qq.com/widget/shareqq/index.html?url=" + escape(location.href) + "&title=" + title + "&desc=" + desc;
          window.open(urls, '_blank');
        }

        //qq空间
        if (type == 2) {
          urls = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + escape(location.href) + '&title=' + title1 + '&desc=' + desc1;
          window.open(urls, "_blank");
          return false;
        }

      },
      close() {
        $('.c_popup').css({'visibility': 'hidden'});
        $('.qcodeMask').css({'visibility': 'hidden'});


      },
      showWin() {
        $(".c_popup").css({'visibility': 'visible'});
        $('.qcodeMask').css({'visibility': 'visible'});
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

    },

  }
</script>

<style scoped>
  .brand_company {
    text-align: left;
    min-height: 195px;
    display: flex;
    justify-content: center;

  }

  .brand_company:after {
    content: "";
    display: block;
    clear: both;
  }

  .brand_l img {
    width: 100%;
  }

  .brand_r a, .brand_r span {
    vertical-align: middle;
  }

  .brand_r a img {
    vertical-align: middle;
  }

  div.b_modle {
    float: left;
    vertical-align: middle;
    min-height: 195px;
    position: relative;
    width: 15%;
  }

  .b_modle_c {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
  }

  .b_modle_c p img {
    width: 35px;
  }

  .b_item_tag span {
    padding: 3px;
    border: 1px solid #000;
    border-radius: 3px;
    margin: 3px;
    color: #7c7d7d;
  }

  .b_item_tag span.ftred {
    color: #e06654;
    border: 1px solid #e06654;
  }

  .brand_container {
    text-align: left;

  }

  .content_nav {
    font-size: 16px;
    color: #666;
    padding: 20px 0;
    /*border-bottom: 2px solid #eee;*/
    border-top: 1px solid #eeeff2;
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
  }

  .page {
    background-color: #f5f7f6;
  }

  .content_nav span {
    margin: 0 5px;
    cursor: pointer;

  }

  span.yellow_line {
    padding: 10px 5px;
    /*border-bottom: 5px solid #f3b53f;*/
    font-weight: bold;
  }

  .mainContent {
    width: auto;
    margin-bottom: 60px;
    min-height: 650px;
  }

  span.b_num {
    margin-left: 5px;
  }

  .m_c li:nth-child(4n) {
    margin-right: 0;
  }

  div.nodata {
    background-color: #eee;
    cursor: auto;
  }

  .heartBox {
    cursor: pointer;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #999;
  }

  .heartBox_active {
    background-color: #fd494e;
  }

  .heartBox img {
    text-align: center;
    line-height: 35px;
    margin-top: 11px;
    margin-left: 8px;
  }

  span.share {
    float: right;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #333;
    margin-left: 20px;
    cursor: pointer;
  }

  span.share img {
    width: 17px;
    margin-top: 9px;
    margin-left: 9px;
  }

  div.b_modle_logo {
    width: 40%;
    position: relative;
  }

  .b_modle p {
    color: #333;
    margin-top: 30%;
    font-weight: 500;
    text-align: center;
  }

  .b_modle p.b_m_title {
    color: #666;
    font-size: 14px;
  }

  .b_modle p.b_m_num {
    font-size: 24px;
  }

  .b_modle_logo .logo_area {

    text-align: center;
    margin-top: 30px;
  }

  .logo_area {
    max-width: 100%;
  }

  .logo_area img {
    max-height: 100%;
    max-width: 100%;
  }

  .logo_area p {
    font-size: 18px;
    margin: 20px auto;
    text-align: center;

  }

  .logo_area p.c_name {
    min-height: 25px;
  }

  .logo_area p.desc {
    font-size: 14px;
    color: #8c8c8c;

  }

  .share_area {
    padding: 15px 0;
    text-align: center;
    position: relative;
  }

  .share_area a {
    margin-right: 5px;
    display: inline-block;
    width: 35px;
    height: 35px;
    background: url("../../static/img/icon/share_xg.png") no-repeat;
    cursor: pointer;
    position: relative;
  }

  .share_area a.wx_share {
    background-position: 0;
  }

  .share_area a.wb_share {
    background-position: -43px 0;
  }

  .share_area a.fb_share {
    background-position: -87px 0;
  }

  .share_area a.tw_share {
    background-position: -130px 0;
  }

  .share_area a.ins_share {
    background-position: -172px 0;
  }

  .share_area a.youtube_share {
    background-position: -216px 0;
  }

  .share_area a.link_share {
    background-position: -258px 0;
  }

  .share_area a.websiteshare {
    background-position: -302px 0;
  }

  .share_area a.blog_share {
    background-position: -342px 0;
  }

  .shart_popup {
    position: absolute;
    left: 120px;
    /*width: 350px;*/
    box-sizing: border-box;
    padding: 10px;
    top: -80px;

    border-radius: 5px;
    box-shadow: 0 0 15px #ccc;
    z-index: 999;
    background-color: #fff;

  }

  div.shart_popup .ewmBox img {
    max-width: 150px;
    max-height: 150px;
  }

  .shart_popup .share_right {
    width: 170px;
    height: 120px;
  }

  .ewmBox, .h_split, .h_split, .share_right {
    float: left;

  }

  .ewmBox p {
    font-size: 12px;
    color: #9f9f9f;
    text-align: center;
    margin-top: 10px;
  }

  .h_split {
    width: 1px;
    height: 150px;
    background-color: #e5e5e5;
    margin: 0 20px;
  }

  .shart_popup1 {
    position: absolute;
    right: 120px;
    top: -118px;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 15px #ccc;
    z-index: 999;
    background-color: #fff;
    visibility: hidden;
  }

  .share_right_item {
    float: left;
    margin: 0 5px;
    height: 70px;
    margin-right: 10px;
  }

  .share_right_item a {
    width: 50px;
    height: 50px;
    display: inline-block;
    overflow: hidden;
    background: url("../../static/img/icon/share1.png") no-repeat;
    background-size: auto 100%;
    cursor: pointer;
  }

  .share_right_item a.item_frend {
    background-position: -80px 0;
  }

  .share_right_item a.item_zone {
    background-position: -160px 0;
  }

  .share_right_item p {
    font-size: 12px;
    color: #9f9f9f;
    margin-top: 5px;
  }

  .close {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0 10px;
    font-size: 28px;
    color: #999;
    line-height: 35px;
    cursor: pointer;
  }

  .share_btn {
    position: relative;
    margin: 30px 0 20px 0;

  }

  .share_btn .c_btn {
    display: inline-block;
    cursor: pointer;
    width: 100px;
    height: 30px;
    border-radius: 5px;
    background-color: #f0f0f0;
    font-size: 14px;
    color: #73767a;
    text-align: center;
    line-height: 30px;
    align-items: center;
    position: relative;
    padding: 2px;
    opacity: 1;
  }

  .share_btn .c_btn_ht:hover {
    opacity: 0.8;
  }

  .c_btn_share {
    margin-left: 15px;
  }

  .share_btn span img {
    width: 15px;
    height: auto;
    margin-top: 9px;
    margin-right: 15px;
  }

  a.wx_share:hover .shart_popup1 {
    visibility: visible;
  }

  .shart_popup1 img {
    width: 180px;
    height: 180px;
  }

  div.c_btn {
    display: inline-block;
  }

  .share_btn .c_btn_active {
    background-color: #ffc800;
    color: #333;
    opacity: 1;
  }

  .c_popup {
    position: absolute;
    width: 375px;
    left: 350px;
    top: -60px;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 15px #ccc;
    z-index: 999;
    background-color: #fff;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    visibility: hidden;
  }

  .c_t_l, .c_t_r {
    float: left;

  }

  .c_t_l {

    padding-right: 10px;
    border-right: 1px solid #eee;

  }

  .c_t_l img {
    max-width: 120px;
    max-height: 120px;
  }

  .c_t_l p {
    text-align: center;
    font-size: 12px;
    color: #999;
    margin-top: 8px;
    margin-bottom: 0;
  }

  .c_t_r {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    margin-left: 8px;
  }

  .containerTop_c, .containerBottom_c {
    width: 1140px;
    margin: 0 auto;
  }

  .containerTop {
    background-color: #fff;
  }

  .b_logoBox {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: 0 0 15px #eee;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .b_logoBox img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .qcodeMask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #000;
    opacity: 0.3;
    visibility: hidden;
  }

  .m_c_item {
    height: 150px;
  }

  ul.m_c li {
    min-height: 296px !important;
    background-color: #fff;
  }

  .bottomBox_pro {
    bottom: 3px;
  }
</style>
