<template>
  <div class="collection_group">
    <div :class="{'collectionBox':true,'collectionBox_ed':hasCollection}" @click="storeNews()">
      <span  >
        <!--<img src="static/img/icon/store.png"/>-->
        <span class="num">{{colNum}}</span>
      </span>
    </div>
    <div class="reply_num" @click="scrollToComment()">
      {{replyNum}}
    </div>

    <div class="data_notic" :class="{'success':state.notic1,'warnning':state.notic2,'error':state.notic3,'showMes':showMes}">
      {{msg}}

    </div>
  </div>
</template>

<script>
  import Fn from '../../static/js/comment'

  export default {
    name: "Collection",
    inject: ['app'],
    props: ['collectionNum','replyNum','scoreStatus'],
    data() {
      return {
        hasCollection: false,
        msg: '请登录后进行收藏！',
        showMes: false,
        showTimer: null,
        islogins: false,
        newsId: 0,
        colNum: 0,
        userInfo: null,
        state: {
          notic1: true,
          notic2: false,
          notic3: false,
        },
        /**
         * 可进行收藏的标志防止用户点击过快
         * */
        collection_flag: true
      }
    },
    mounted() {
      this.islogins = this.app.isLogin;
      this.colNum = this.collectionNum;
      this.userInfo = Fn.getUserInfo();
      var id = this.$route.params.id;
      this.newsId = id;
      this.judgeCollection();

    },
    methods: {
      storeNews() {

        window.event.stopPropagation ? window.event.stopPropagation() : window.event.cancelBubble = false;
        var that = this;
        if (this.collection_flag) {
          this.collection_flag = false
        }
        else {
          return
        }
        var method = 'add';
        if (this.showTimer) {
          clearTimeout(that.showTimer);
        }
        if (!this.islogins) {
          var url='https://u.carnoc.com/?url='+escape('http://bbs.feeyo.com/plugin.php?id=carnoc_login&return=http://www.carnoc.com/spread/loginReturn.html');
          window.open(url, '_blank');
          // that.state.notic1 = false;
          // that.state.notic2 = true;
          // that.state.notic3 = false;
          // this.msg = '请登录后进行收藏!';
          // this.showMes = true;
          that.collection_flag = true;
          // this.showTimer = setTimeout(function () {
          //   that.showMes = false
          // }, 1500)
          return
        }
        else {

          if (this.hasCollection) {
            method = 'remove'
          }
          else {
            method = 'add'
          }

          var url = this.app.BASEURL + 'pc/action/collection';
          var obj = {};
          obj['news-id'] = this.newsId;
          obj.jwt = this.userInfo.jwt;
          obj.method = method;
          obj['user-id'] = this.userInfo.userId;
          $.post(url, obj, function (res) {
            /**
             * 请求成功，增加或删除变红样式，并把结果存缓存
             */
            if (res.code == 1000000) {
              that.hasCollection = !that.hasCollection;
              if (method == 'add') {
                that.msg = '收藏成功！';
                that.colNum++;
              }
              else {
                that.msg = '取消成功！';
                that.colNum--;
              }
              that.showMes = true;
              that.state.notic1 = true;
              that.state.notic2 = false;
              that.state.notic3 = false;
              that.storeCollectionInfo();
            }
            else {
              that.msg = '网络出现故障，请稍后再试！';
              that.state.notic1 = false;
              that.state.notic2 = true;
              that.state.notic3 = false;
              that.showMes = true;
            }
            that.collection_flag = true;
            that.showTimer = setTimeout(function () {
              that.showMes = false
            }, 1500)
          })
        }

      },

      getLocalCom() {
        var store = window.localStorage;
        var data = store.getItem('houseInfo');
        if (data) {
          return JSON.parse(data)
        }
        else {
          return false
        }
      },
      judgeCollection() {
        // var data = this.getLocalCom();
        //
        // //不存在本地缓存直接返回
        // if (!data) {
        //   this.hasCollection = false;
        //   return false;
        // }
        // else {
        //   if (data.infoList.indexOf(this.newsId) != -1) {
        //     this.hasCollection = true;
        //   }
        //   else {
        //     this.hasCollection = false;
        //   }
        // }

        if(this.scoreStatus.collection){
          this.hasCollection = false;
          return false
        }
        else {
          this.hasCollection = true;
          return true
        }
      },

      storeCollectionInfo() {
        var store = window.localStorage;
        var data = this.getLocalCom();

        //临时的obj
        var t_obj = {};
//本来就不存在数据,新建数组
        if (!data) {
          var lists = [];
          lists.push(this.newsId);
          var obj = {
            infoList: lists,
          };
          store.setItem('houseInfo', JSON.stringify(obj))
        }
//存在本地收藏数据，判断该code是否存在，存在直接返回否则add
        else {
          var oldList = [];
          oldList = oldList.concat([], data.infoList);
          var index = oldList.indexOf(this.newsId);
          if (index != -1) {
            oldList.splice(index, 1);
          } else {
            oldList.push(this.newsId)
          }

          var obj = {
            infoList: oldList,
          };
          store.removeItem('houseInfo');
          store.setItem('houseInfo', JSON.stringify(obj));
        }


      },
      scrollToComment(){
        document.getElementById('doComment').scrollIntoView();
      }
    }
  }
</script>

<style scoped>
  .collectionBox {
    position: relative;
    display: inline-block;
    padding: 10px 5px 8px 28px;
    border-radius: 20px;
    color: #9ca2a5;
    border: 1px solid #9ca2a5;
    width: 90px;
    box-sizing: border-box;
    line-height: 18px;
    text-align: center;
    background: url("../../static/img/icon/star.png") no-repeat;
    background-position: 24px 9px;
    background-size: 18px 18px;
    cursor: pointer;
  }

  .collectionBox_ed {
    background: url("../../static/img/icon/star_red.png") no-repeat;
    background-position: 24px 9px;
    background-size: 18px 18px;
    color: #d82406;
    border: 1px solid #d82406;
  }

  .data_notic {
    position: absolute;
    left: 206px;
    top: 0;
    color: #f3b53f;
    padding: 8px 18px;
    text-align: center;
    width: 250px;
    height: 24px;
    line-height: 24px;
    border-radius: 5px;
    transition: all 1000ms;
    opacity: 0;
  }

  .success {

    border: 1px solid #999999;
    background-color: #fff;
    color: #333;
  }

  .warnning {
    background-color: #fff9e6;
    border: 1px solid #ffd77a;
  }

  .error {

    background-color: #ffefe6;
    border: 1px solid #ffb08f;
  }

  .showMes {
    opacity: 1;
  }
  .collection_group{
    position: relative;
  }
  .reply_num{
    display: inline-block;
    padding: 10px 5px 8px 28px;
    border-radius: 20px;
    color: #9ca2a5;
    border: 1px solid #9ca2a5;
    width: 90px;
    background: url("../../static/img/comment.png") no-repeat;
    box-sizing: border-box;
    line-height: 18px;
    text-align: center;
    background-position: 24px 9px;
    background-size: 18px 18px;
    cursor: pointer;
    margin-left: 15px;


  }
</style>
