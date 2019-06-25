<template>
  <div class="common_arc" id="doComment">
    <p class="l_d r_tl_t">说点什么</p>
    <form id="comment">
      <textarea name="comment" placeholder="发表您的看法..." v-model="commentContent" class="comment_box"
                v-if="isLogin"></textarea>
      <p :class="{'cmt_box':true,'cmt_box_center':!isLogin}" id="cmt_box">
        <span v-if="!isLogin">
           <a :href="returnLink" >
        <span ><img src="static/img/default_preson.png"/></span>
       <span class="s_login">登录</span>
        <span >参与评论</span>
           </a>
          </span>

        <span v-if="userData.userName" class="user_logo">
              <img :src="userData.user_img"/>
          <span class="nikeName">{{userData.userName}}</span>
        </span>

        <span class="to_comment" @click="pushComment()" v-if="isLogin">发布评论</span>
      </p>
      <div v-if="showResult">
        <alert :type="type" :isShow="showResult" :msg="msg">
        </alert>
      </div>
    </form>
    <p class="cmt_box_1">
      共有<span class="cor_fc">{{lookComment.comment_total}}</span>条评论
      <span class="pullR" v-if="lookComment.comment_total>0">
  <a :class="isHot?'cor_fc':''" @click="getHotNews()">最热</a>
  <span>|</span>
  <a @click="getLastComment()" :class="isHot?'':'cor_fc'">最新</a>
</span>
    </p>

    <!--评论列表，默认只显示最新最热的那条-->
    <ul class="commentList">
      <li v-for="(val,index) in commentList">
        <div class="ct_box">
          <div class="touxingBox">
            <img :src="val['photo-url']" class="touxiang" v-if="val['photo-url']"/>
            <img src="https://res.variflight.com/icarnoc/static/images/default_photo.png" class="touxiang" v-else/>
          </div>
          <div class="comment_top">
            <p class="c_p_1">
              <span class="nikeName">{{val.usernamebak?val.usernamebak:val.username}}</span>
              <span class="putTime">{{val.posttime_format}}</span>
              <!--<time-trans :timeTap="val.posttime" class="putTime"></time-trans>-->
              <span class="pullR leve1Comment level1 " @click="doCommentZan(val.postid,index,0,0)">
              <!--<img src="static/img/icon/zan_com.png"/>-->
              <span>{{val.top}}</span>
            </span>
            </p>
            <p class="c_content">{{val.content}}</p>
            <p class="c_tag">
              <span class="reply" @click="reply(val.postid,index)">回复</span>
              <!--举报暂时隐藏-->
              <!--<span class="jubao">-->
              <!--<img src="static/img/jubao.png"/>举报-->
              <!--</span>-->
            </p>
            <!--回复的文本框-->
            <div class="reply_pop hd">
              <textarea name="comment" class="cm_txt" v-model="comment_msg"></textarea>
              <div class="reply_btn">
                <span @click="pushReply(val.postid,index,1)">提交回复</span>
              </div>
            </div>
            <div class="replyTip hd">
              <alert :type="cm_type" :isShow="replyRes" :msg="cm_msg">
              </alert>
            </div>
            <!--回复的二级内容-->
            <ul class="reply_wrap" v-if="val.child&&val.child.length>0">
              <li v-for="(v,i) in val.child">
                <div class="ct_box">
                  <!--<div class="touxingBox"><img :src="v['photo-url']" class="touxiang"/></div>-->

                  <div class="comment_top leve2_top">
                    <p class="c_p_1">
                      <span class="nikeName">{{v.usernamebak?v.usernamebak:v.username}}</span>
                      <span>回复</span>
                      <span class="nikeName">{{v.re_to}}</span>
                      <span class="pullR leve1Comment level2"
                            @click="doCommentZan(v.postid,index,i,1)"><span>{{v.top}}</span></span>

                      <span class="putTime putTime_level2">{{v.posttime_format}}</span>
                      <!--<time-trans :timeTap="v.posttime" class="putTime"></time-trans>-->
                    </p>
                    <p class="c_content">{{v.content}}</p>
                    <p class="c_tag">
                      <span class="reply" @click="reply1($event)">回复</span>
                    </p>
                    <div class="reply_pop1 hd" v-show="Level2_mode">
                      <textarea name="comment" class="cm_txt cm_txt_level2" v-model="comment_msg"></textarea>
                      <div class="reply_btn">
                        <span @click="pushReply(v.postid,index,2,i,val.postid)">提交回复</span>
                      </div>
                      <div class="replyTip1">
                        <alert :type="cm_type" :isShow="replyRes" :msg="cm_msg">
                        </alert>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

            </ul>

          </div>
        </div>


      </li>

    </ul>

    <p class="lookMore" v-if="lookComment.comment_total>0">
      <span @click="getMore()" v-if="hasMore">查看更多评论</span>
      <span v-if="!hasMore" class="hasnodata">我是有底线的~~</span>

    </p>

    <p class="lookMore" v-else>
      <span>期待你打破沉默~~</span>
    </p>
  </div>
</template>

<script>
  import TimeTrans from './TimeTrans'
  import Alert from './Altert';
  import Fn from '../../static/js/comment';

  export default {
    name: "Comment",
    data() {
      return {
        //提交评论结果提示
        showResult: false,

        commentList: [],
        //默认排序按最新,postid为最新
        order: 'top',
        //页码,默认为1条
        page: 1,
        //每页数量,默认为5条
        limit: 10,
        //最新还是最热
        isHot: true,
        hasMore: true,
        zanResult: false,
        //是否是第一次请求
        isFirst: true,
        lastPostid: 0,
        lastTop: 0,
        initOffset: {
          lastPostids: 0,
          lastTops: 0
        },
        //用户头像昵称信息
        userData: {},
        //两张图片的src
        zanImgSrc: 'static/img/icon/zan_com.png',
        zanImgSrc_active: 'static/img/icon/zan_com_active.png',
        //用户是否登录
        isLogin: false,
        /**
         * 评论内容
         * @todo 需要加防xss攻击
         */
        commentContent: '',

        /**
         *回复内容
         **/

        commentContent_reply: '',

        /**
         * 启用定时器。3s后自动关闭提示框
         */
        timerTip: null,

        /**
         * 提交评论后的提示信息
         * success(提交成功),warning(未登录),error(提交失败)
         */
        type: 'success',
        msg: '提交评论成功',

        /**
         * 用户登录信息
         */
        userInfo: {},
        replyRes: false,
        /**
         * 类似于评论
         */
        cm_msg: '回复成功！',
        cm_type: 'success',

        comment_msg: "",
        //二级回复的输入框无法提供jq来进行隐藏
        Level2_mode: true,
        /**
         * 回复的内容
         */
        reply_content: '',
        /**
         * 回复的postid
         */
        reply_id: 0,
        /**
         * 请求的数据与其实际的渲染dom直接存在偏移量，偏移量为上一次请求数据的总长度
         * */
        baseOffset: 0,
        //是否加载完毕
        isloadEnd: false,
        //评论和回复点赞标志防止用户点赞过快出现bug
        comment_zan_flag: true,
        reply_zan_flag: false,
        //防止回复点击过快造成多次回复
        reply_speed_control: true,
        //已经获取的评论数量
        nowTotal: 0,
        returnLink:''
      }
    },
    inject: ['app'],
    props: ["lookComment"],
    returnLink: "",
    watch: {
      '$route'(from, to) {
        //回到顶部
        document.getElementById("toTop").scrollIntoView();
        this.reloadViews();

      }
    },
    mounted() {
      var url = 'https://u.carnoc.com/?url=' + escape('http://bbs.feeyo.com/plugin.php?id=carnoc_login&return=http://www.carnoc.com/spread/loginReturn.html');
      this.returnLink = url;
      this.isLogin = this.app.isLogin;
      this.userInfo = Fn.getUserInfo();
      this.userData = this.app.$data.UserInfo;
      //没有评论不需要获取评论数据
      if (this.lookComment.comment_total == 0) {
        return
      }
      this.getCommentData();
    },
    methods: {
      reloadViews() {
        this.getCommentData()
      },
      getCommentData() {
        var that = this;
        var url = "";
        if (this.isFirst) {
          url = this.lookComment.comment_url + 'id=' + this.lookComment.comment_id + '&limit=' + this.limit + '&order=' + this.order + '&sort=desc';
        }
        else {
          if (this.order == 'top') {
            url = this.lookComment.comment_url + 'id=' + this.lookComment.comment_id + '&limit=' + this.limit + '&offset=' + this.lastTop + '&order=' + this.order + '&sort=desc';

          }
          else {
            url = this.lookComment.comment_url + 'id=' + this.lookComment.comment_id + '&limit=' + this.limit + '&offset=' + this.lastPostid + '&order=' + this.order + '&sort=desc';
          }
        }
        var c_time = new Date().getTime();
        url += '&time=' + c_time;
        this.isFirst = false;
        $.get(url, function (res) {
          //没有评论
          if (res.list.comment.length < 1) {
            return
          }
          that.commentList = [].concat(that.commentList, res.list.comment);
          var len = that.commentList.length;
          that.lastPostid = that.commentList[len - 1].postid;
          that.lastTop = that.commentList[len - 1].top;
          that.initOffset.lastPostids = that.commentList[0].postid;
          that.initOffset.lastTops = that.commentList[0].top;
          that.isloadEnd = true;
          that.getNextPage(res.list.comment);
          that.renderAllZan(res.list.comment);
        })

      },
      getLastComment() {
        /**
         * @author minchangjun
         * @since 2019/3/14
         * @title 切换最新最热时要把所有的状态重置到初始状态再去ajax()
         * @vesion
         */
        this.order = 'postid';
        this.resetStatus();
        this.getCommentData();
        this.isHot = false;
      },
      getHotNews() {
        this.order = 'top';
        this.resetStatus();
        this.getCommentData();
        this.isHot = true;
      },
      getMore() {
        this.limit = 10;
        this.page++;
        this.getCommentData();
      },
      //获取下一页，用来显示还有更多评论或者已经没有下一页信息了
      getNextPage(res) {
        for (var i = 0; i < res.length; i++) {
          this.nowTotal++;
          if (res[i].child) {
            this.nowTotal += res[i].child.length;
          }

        }
        if (this.nowTotal < this.lookComment.comment_total) {
          this.hasMore = true;
        }
        else {
          this.hasMore = false;
        }
      },
      resetStatus() {
        this.limit = 10;
        this.commentList = [];
        this.lastPostid = this.initOffset.lastPostids;
        this.lastTop = this.initOffset.lastTops;
        this.isFirst = true;
        this.hasMore = true;
        this.baseOffset = 0;
      },
      /**
       * @author minchangjun
       * @since 2019/3/21
       * @param
       * @return
       * @desc   提交评论内容，内容为空不能提交,未登录不能进行评论
       */
      pushComment() {
        var that = this;
        if (!this.isLogin) {
          this.type = 'warn';
          this.msg = '参与讨论请先登录！';
        }
        else {
          var comment = this.commentContent.trim();
          /**
           * 提交评论不能为空
           */
          if (comment == '') {
            this.type = 'warn';
            this.msg = '内容空空如也呢！';
          }
          else {
            /**
             * 有效评论，提交接口
             * @type {string}
             */
            var data = {};
            data.jwt = this.userInfo.jwt;
            data['user-id'] = this.userInfo.userId;
            data.comment = comment;
            data['news-id'] = this.lookComment.comment_id;
            var url = this.app.BASEURL + 'pc/action/comments';

            $.post(url, data, function (res) {
              //登录超过有效期，需重新登录
              if (res.code == 2000020) {
                window.open(that.returnLink, '_blank')
              }
              if (res.code == 2000000) {
                that.type = 'error';
                that.msg = '提交评论失败！请检查网络';
              }
              if (res.code == 1000000) {
                that.type = 'success';
                that.msg = '提交评论成功！';
                if (that.timerTip) {
                  clearTimeout(that.timerTip)
                }
                that.showResult = true;
                that.timerTip = setTimeout(function () {
                  that.showResult = false;
                }, 2000);
                that.commentContent = '';
                that.lookComment.comment_total++;
                that.isFirst = true;
                that.commentList = [];
                that.reloadViews();
              }
            });
          }
        }
        if (this.timerTip) {
          clearTimeout(that.timerTip)
        }
        this.showResult = true;
        this.timerTip = setTimeout(function () {
          that.showResult = false;
        }, 2000);
      },

      reply(postid, index) {
        if (!this.isLogin) {
          window.open(this.returnLink, '_blank');
          return
        }
        this.comment_msg = "";
        $('.reply_pop').addClass('hd');
        $('.reply_pop1').addClass('hd');
        $('.reply_pop').eq(index).removeClass('hd');
      },
      reply1(e) {
        if (!this.isLogin) {
          window.open(this.returnLink, '_blank');
          return
        }
        this.Level2_mode = true;
        this.comment_msg = "";
        $('.reply_pop1').addClass('hd');
        $('.reply_pop').addClass('hd');
        $(e.target).parent().next().removeClass('hd')
      },
      /**
       * @author minchangjun
       * @since 2019/3/21
       * @param {number} 要回复的postid {string} 评论内容
       * @return
       * @desc   提交回复函数逻辑几乎和提交评论一致 type=1是一级评论  type=2是二级回复 cIndex有值时表示来自二级回复的内容,p_postid保存三级以及以下回复时它的父postid
       */
      pushReply(postid, index, type, cIndex, p_postid) {
        if (!this.reply_speed_control) {
          return
        }
        else {
          this.reply_speed_control = false
        }
        var that = this;
        if (type == 1) {
          var content = $('.cm_txt').eq(index).val();
        }
        else {
          var content = $('.cm_txt_level2').eq(cIndex).val();
        }

        if (!this.isLogin) {
          this.cm_type = 'warn';
          this.cm_msg = '请登录后参与评论！';
          this.replyRes = true;

        }
        else {
          /**
           * 提交评论不能为空
           */
          if (this.comment_msg == '' || this.comment_msg.length < 2) {

            this.cm_type = 'warn';
            this.cm_msg = '内容不能为空或者不能小于2个字符';
            this.replyRes = true;
            if (type == 1) {
              $('.replyTip').eq(index).removeClass('hd');
            }
            else {

              $('.replyTip1').eq(cIndex).removeClass('hd');
            }
          }
          else {

            /**
             * 有效评论，提交接口
             * @type {string}
             */
            var data = {};
            data.jwt = this.userInfo.jwt;
            data['user-id'] = this.userInfo.userId;
            data.comment = content;
            data['news-id'] = this.lookComment.comment_id;
            data['post-id'] = postid;
            var url = this.app.BASEURL + 'pc/action/comments';
            $.post(url, data, function (res) {
              // //登录超过有效期，需重新登录
              if (res.code == 2000020) {
                window.open(that.returnLink, '_blank')
              }
              if (res.code == 2000000) {
                that.cm_type = 'error';
                that.cm_msg = '提交回复失败！请检查网络';
              }
              if (res.code == 1000000) {
                that.cm_type = 'success';
                that.cm_msg = '回复成功！';
                that.comment_msg = "";
                if (type == 1) {
                  $('.replyTip').eq(index).removeClass('hd');
                }
                else {
                  $('.replyTip1').eq(cIndex).removeClass('hd');
                }

                setTimeout(function () {

                  if (type == 1) {
                    $('.reply_pop').eq(index).addClass('hd');
                    that.lookComment.comment_total++;
                    that.addReplyToList(postid)
                  }
                  else {
                    $('.reply_pop1').eq(cIndex).addClass('hd');
                    that.lookComment.comment_total++;
                    that.addReplyToList(p_postid)
                  }
                }, 1000);
              }
            });
          }
        }
        if (this.timerTip) {
          clearTimeout(that.timerTip)
        }
        this.replyRes = true;
        this.timerTip = setTimeout(function () {
          that.replyRes = false;
          $('.replyTip').addClass('hd');
          $('.replyTip1').addClass('hd');
          that.Level2_mode = false;
          that.reply_speed_control = true;
        }, 2000);
      },
      /**
       * @title  回复成功后，将回复内容加入到当前回复列表
       * @author minchangjun
       * @since 2019/3/26
       * @param postid 当前评论的postid
       * @return
       * @desc
       */
      addReplyToList(postid) {
        var that = this;
        var url = "";
        var c_time = new Date().getTime();
        url = this.lookComment.comment_url + 'id=' + this.lookComment.comment_id + '&order=' + this.order + '&sort=asc' + '&time=' + c_time;
        var c_time = new Date().getTime();
        url += '&time=' + c_time;
        $.get(url, function (res) {
          var lists = res.list.comment;
          for (var i = 0; i < lists.length; i++) {
            if (lists[i].postid == postid) {
              var L = lists[i].child.length;
              var arr = lists[i].child.slice(L - 1, L);
              for (var j = 0; j < that.commentList.length; j++) {
                if (that.commentList[j].postid == postid) {
                  that.commentList[j].child.push(arr[0])
                }
              }
            }
          }
        })
      },
      /**
       * @title
       * @author minchangjun
       * @since 2019/3/27
       * @param number $pid 点赞评论的pid $indexs ->该条评论的索引 $c_index 二级评论的索引  $type->区分是一级评论还是二级评论
       * @return
       * @desc 对评论的内容进行点赞
       */
      doCommentZan(pid, indexs, c_index, type) {

        if (this.comment_zan_flag) {
          this.comment_zan_flag = false;
          this.reply_zan_flag = false;
        }
        else {
          return
        }
        window.event.stopPropagation();
        var url = this.BASEURL + 'pc/action/comment-zan';
        var method = 'add';
        var isCommentZan = this.isDoCommentZan(pid);
        /**
         * 已经登录可以进行取消赞操作,未登录只能点赞不能取消点赞
         */
        if (this.isLogin) {
          if (isCommentZan) {
            method = 'remove'
          }
          else {
            method = 'add'
          }
        }
        else {
          if (isCommentZan) {
            return
          }
        }
        var obj = {};
        obj['post-id'] = pid;
        obj['h5-token'] = this.userInfo.h5Token;
        obj['user-id'] = this.userInfo.userId;
        if (this.isLogin) {
          obj.jwt = this.userInfo.jwt;
        }
        obj.method = method;
        var that = this;
        var url = this.app.BASEURL + 'pc/action/comment-zan';
        $.post(url, obj, function (res) {
          if (res.code == 1000000) {
            if (type == 0) {
              if (method == 'add') {
                that.commentList[indexs].top = that.commentList[indexs].top * 1 + 1;
              }
              else {
                that.commentList[indexs].top = that.commentList[indexs].top * 1 - 1;
              }
              $('.level1').eq(indexs).toggleClass('commentZanActive');
            }
            else {
              if (method == 'add') {
                that.commentList[indexs].child[c_index].top = that.commentList[indexs].child[c_index].top * 1 + 1;
              }
              else {
                that.commentList[indexs].child[c_index].top = that.commentList[indexs].child[c_index].top * 1 - 1;
              }
              $('.comment_top').eq(indexs).find('.level2').eq(c_index).toggleClass('commentZanActive');
            }
            that.storeCommentZanInfo(pid);
            that.comment_zan_flag = true;
            that.reply_zan_flag = true;
          }
        })

      },


      /**
       * @title 获取本地有关评论点赞的缓存
       * @author minchangjun
       * @since 2019/3/27
       * @param
       * @return
       * @desc
       */

      getCommentZanInfo() {
        var store = window.localStorage;
        var data = JSON.parse(store.getItem('commentZan'));

        if (data) {
          return data.zanList
        }
        else {
          return false
        }

      },

      /**
       * @title  判断是否该评论是否点过赞
       * @author minchangjun
       * @since 2019/3/27
       * @param
       * @return {boolean} true已点 false 未点
       * @desc
       */
      isDoCommentZan(postid) {
        var data = this.getCommentZanInfo();
        if (data) {

          if (data.indexOf(postid) != -1) {
            return true
          }
          else {
            return false
          }
        }
        else {
          return false
        }
      },

      /**
       * @title 存储点赞postid到缓存，用来表示该用户以及点赞过此评论
       * @author minchangjun
       * @since 2019/3/27
       * @param
       * @return
       * @desc
       */

      storeCommentZanInfo(postid) {
        //data存在，则加入到数组中，没有则新建数组
        var store = window.localStorage;
        var list = [];
        var data = this.getCommentZanInfo();

        if (data) {
          list = list.concat([], data);
          var index = list.indexOf(postid);
          if (index != -1) {
            list.splice(index, 1)
          } else {
            list.push(postid)
          }
        }
        else {
          list.push(postid);
        }
        var obj = {
          zanList: list
        };
        store.removeItem('commentZan');
        store.setItem('commentZan', JSON.stringify(obj))
      },

      /**
       * @title  加载页面后把已经赞过的评论后面的图标高亮显示
       * @author minchangjun
       * @since 2019/3/27
       * @param
       * @return
       * @desc
       * 本地存有已点赞的postid，通过循环里面的信息来判断是否已经被点赞了，然后把对应的图标高亮
       */
      renderAllZan(dataList) {
        var that = this;
        var localList = this.getCommentZanInfo();
        if (!localList) {
          return
        }
        else {
          var lenData = dataList.length;
          for (var i = 0; i < lenData; i++) {
            var postid = dataList[i].postid;

            if (localList.indexOf(postid) != -1) {

              /**
               * 等待页面渲染后才进行dom操作
               */

              (function (j, t) {
                that.$nextTick(function () {
                  $('.level1').eq(j).addClass('commentZanActive');
                  /**
                   * 查看内部child是否有postid
                   */
                  if (dataList[t].child && dataList[t].child.length > 0) {
                    for (var s = 0; s < dataList[t].child.length; s++) {
                      var postids = dataList[t].child[s].postid;
                      if (localList.indexOf(postids) != -1) {
                        (function (s) {
                          that.$nextTick(function () {
                            $('.comment_top').eq(j).find('.level2').eq(s).addClass('commentZanActive')
                          });
                        })(s);
                      }
                    }
                  }
                });
              })(i + that.baseOffset, i);
            }
            else {
              /**
               * 查看内部child是否有postid
               */
              if (dataList[i].child && dataList[i].child.length > 0) {
                for (var s = 0; s < dataList[i].child.length; s++) {
                  var postids = dataList[i].child[s].postid;
                  if (localList.indexOf(postids) != -1) {
                    (function (i, s) {
                      that.$nextTick(function () {
                        $('.comment_top').eq(i).find('.level2').eq(s).addClass('commentZanActive')
                      });
                    })(i + that.baseOffset, s);
                  }
                }
              }
            }
          }
        }
        that.baseOffset += lenData;
      },


      /**
       * @title  获取用户头像信息
       * @author minchangjun
       * @since 2019/4/11
       * @param
       * @return
       * @desc
       */

      // getUserMess() {
      //   var userInfo = this.userInfo;
      //   var url = 'https://service.carnoc.com/spread/index.php/pc/action/check-login';
      //   var obj = {};
      //   var that = this;
      //   obj.jwt = userInfo.jwt;
      //   obj['user-id'] = userInfo.userId;
      //   var mes = {};
      //   $.post(url, obj, function (res) {
      //     if (res.code == 1000000) {
      //       mes.userName = res.list.username;
      //       mes.user_img = res.list.avatar;
      //       that.userData = mes;
      //     }
      //     else {
      //       return false
      //     }
      //   })
      // }
    },
    components: {
      TimeTrans, Alert
    },





  }
</script>

<style scoped>
  .common_arc {
    margin-top: 50px;
  }

  .r_tl_t {
    display: table;
    padding-bottom: 4px;
    border-bottom: 4px solid #f5c243;
    margin: 20px 0;
    font-weight: bold;
  }

  textarea {
    width: 748px;
    height: 120px;
    border: 2px solid #efefef;
    outline: none;
    line-height: 24px;
    resize: none;
    border-radius: 5px;
    padding: 10px;
  }

  textarea.cm_txt {
    width: 696px;
    margin: 10px auto;
    border: 2px solid #f3b53f;
  }

  #comment p.cmt_box {
    margin: 18px 0;
    overflow: hidden;
  }

  #comment p.cmt_box_center {
    text-align: center;
    padding: 30px 0;

    background-color: #fafafa;
  }

  .cmt_box span {
    display: inline-block;
    vertical-align: middle;;
  }

  span.to_comment {
    float: right;
    width: 96px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #f5c243;
    border-radius: 5px;
    color: #000;
    cursor: pointer;
  }

  .pullR a {
    cursor: pointer;
  }

  .pullR a.cor_fc {
    cursor: auto;
  }

  .pullR img {
    width: 18px;
  }

  .s_login {
    color: #f5c243;
    margin-left: 5px;
    vertical-align: middle;
    font-weight: bold;
  }

  .cor_fc {
    color: #f5c243;
    margin: 0px 2px;
  }

  .pullR {
    float: right;
  }

  p.cmt_box_1 {
    overflow: hidden;
    margin: 40px 0;

  }

  .commentList li {
    overflow: hidden;
    border-bottom: 1px solid #e5e5e5;
    margin-top: 30px;
  }

  .commentList li div.comment_top {
    overflow: hidden;
    font-size: 14px;
    float: left;
    vertical-align: middle;
    width: 720px;
    margin-left: 10px;

  }

  .ct_box {
    overflow: hidden;

  }

  .comment_top p.c_p_1 {
    margin-top: 0;
    line-height: 40px;
  }

  .comment_top span, .comment_top img, .comment_top a {
    vertical-align: middle;
    margin-right: 4px;
  }

  span.nikeName {
    font-weight: bold;
    margin-right: 10px;
  }

  .comment_top .putTime {
    color: #999;
    display: inline-block;
    height: auto;
    margin: 0;
  }

  .comment_top .putTime_level2 {
    line-height: 25px;
    display: block;
  }

  .touxingBox {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    position: relative;
    float: left;
  }

  img.touxiang {
    height: auto;
    float: left;
    width: 40px;
    vertical-align: middle;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .comment_top p {
    margin: 10px 0;
    position: relative;

  }

  .comment_top p.c_content {
    height: auto;

  }

  .c_tag span.reply {
    display: inline-block;
    width: 43px;
    height: 20px;
    border-radius: 10px;
    text-align: center;
    line-height: 20px;
    color: #f3b53f;
    border: 1px solid #f3b53f;
    font-size: 12px;
  }

  .c_tag span.jubao {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 14px;
    color: #999;

  }

  .c_tag span.jubao_active {
    color: #f5c243;
  }

  span.jubao img {
    vertical-align: middle;
    margin-right: 5px;
  }

  .lookMore {
    text-align: center;
    margin-top: 30px;
  }

  .lookMore span {
    padding: 5px 10px;
    color: #999;
    font-size: 14px;
    cursor: pointer;
  }

  .lookMore span.hasnodata {
    cursor: auto;
  }

  .reply_btn {
    overflow: hidden;
    margin-bottom: 10px;
  }

  .reply_btn span {
    padding: 3px 5px;
    border-radius: 5px;
    color: #f3b53f;
    float: right;
    border: 1px solid #f3b53f;
    font-size: 14px;
    cursor: pointer;
  }

  span.reply {
    cursor: pointer;
  }

  .hd {
    display: none;
  }

  ul.reply_wrap {
    background-color: #fafafa;
    margin: 5px 0 15px;
    padding: 5px 0;
    border-radius: 5px;
    padding-right: 0px;
  }

  ul.reply_wrap li {
    border-bottom: none;
  }

  .reply_wrap li div.comment_top {
    width: 695px;
    padding-left: 20px;
  }

  .reply_wrap p.c_tag {
    margin: 0;
    margin-bottom: 5px;
    height: 24px;
  }

  .zan_active {
    color: #f5c243;
  }

  .leve1Comment {
    background: url("../../static/img/icon/zan_com.png") no-repeat;
    background-size: 16px 16px;
    background-position: 0px 3px;
    padding-left: 20px;
    cursor: pointer;
    margin-top: 8px;
    line-height: 23px;
  }

  .commentZanActive {
    background: url("../../static/img/icon/zan_com_active.png") no-repeat;
    color: #f5c243;
    background-size: 16px 16px;
    background-position: 0px 3px;
    padding-left: 20px;
  }

  .user_logo img {
    width: 40px;
    vertical-align: middle;
    height: auto;
    border-radius: 50%;
  }

  .user_logo span.nikeName {
    vertical-align: middle;
    font-size: 14px;
    color: #999;
  }
</style>
