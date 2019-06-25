<template>
  <div class="nav">
    <div class="nav_l">

      <router-link to="/home" class="carnoc_logo">
        <img src="static/img/carnoc_logo.png">
      </router-link>
      <router-link to="/home" :class="activeList.id2">首页</router-link>
      <router-link to="/news" :class="activeList.id3">资讯</router-link>
      <router-link to="/cases" :class="activeList.id4">作品<span class="sp_new"></span></router-link>
      <a :href="cacsLink" target="_blank">指数</a>
    </div>
    <div class="nav_r">
      <div class="searchBtn hide">
        <input type="text" class="search_text" @keydown="listenEnter($event,1)" ref="searchVal" autofocus="true"
               placeholder="请输入关键词">
        <img src="static/img/search_move.png" class="search_img_move" @click="listenEnter($event,2)">
      </div>
      <img src="static/img/search.png" class="search_img ">
      <a v-if="!isLogin" target="_blank" :href="loginUrl">登录</a>
      <a v-if="!isLogin" target="_blank" :href="loginUrl">注册</a>
      <a v-if="isLogin" class="welcome">&nbsp;

        <span :style="{backgroundImage:'url('+user_img+')'}">
          <!--<img src="https://cdn.feeyo.com/bbshead/3/30028.jpg"/>-->
        </span>

        <div class="userInfo">
          <ul>
            <li>
              <a>{{userName}}</a>
            </li>
            <li>
              <a @click="quitLogin()">退出登录</a>
            </li>
          </ul>

        </div>
      </a>


      <div class="tougaoBox">

        <router-link to="/contribute" class="tougao">
          <img src="static/img/icon/pen.png"/>
          投稿
        </router-link>
      </div>
    </div>

    <!--<div class="loginBox">-->
    <!--<div class="close">-->
    <!--<img src="static/img/icon/x.png"/>-->
    <!--</div>-->
    <!--<iframe runat="server" src="https://u.carnoc.com/" frameborder="no" border="0" marginwidth="0" marginheight="0"-->
    <!--scrolling="no" allowtransparency="yes"-->
    <!--style="width: 800px; max-width: 800px; height: 700px;margin: 0 auto"></iframe>-->
    <!--</div>-->
  </div>


</template>

<script>
  import Fn from '../../static/js/comment'

  export default {
    name: "NavBar",
    inject: ['app'],
    data() {
      return {
        activeList: {
          id1: "",
          id2: "",
          id3: "",
          id4: "",
        },
        loginUrl: "",
        cacsLink:'',
        isLogin: false,
        userName: '',
        user_img: '',
        //判断是否是搜索页面，搜索页结果是在当前页打开的
        isSearch: false

      }
    },
    created() {
      var isPC = Fn.judgeDevice();
      //移动端直接跳转到移动页面
      if (!isPC) {
       this.cacsLink='https://i.carnoc.com/spread/caci'
      }
      else {
        this.cacsLink='https://caci.carnoc.com/'
      }
    },
    watch: {
      '$route'(from, to) {
        //回到顶部
        document.getElementById("toTop").scrollIntoView();
        location.reload();
      }
    },
    mounted() {
      var url = 'https://u.carnoc.com/?url=' + escape('http://bbs.feeyo.com/plugin.php?id=carnoc_login&return=http://www.carnoc.com/spread/loginReturn.html');
      this.loginUrl = url;
     this.Login();
      var result = location.href.match('keywords');
      if (result) {
        this.isSearch = true
      }
      else {
        this.isSearch = false
      }
      // this.userIsLogin();
      this.addEvent();
      this.nowId == 1 ? this.activeList.id1 = "active" : "";
      this.nowId == 2 ? this.activeList.id2 = "active" : "";
      this.nowId == 3 ? this.activeList.id3 = "active" : "";
      this.nowId == 4 ? this.activeList.id4 = "active" : "";
      this.isLogin = this.app.$data.isLogin;
      this.userName = this.app.$data.UserInfo.userName;
      this.user_img = this.app.$data.UserInfo.user_img;

    },
    props: ["nowId"],
    methods: {

      /**
       * @title  监听enter键
       * @author minchangjun
       * @since 2019/3/25
       * @param
       * @return
       * @desc   若监听到enter键则跳转到搜索结果页面,点击搜索图标可直接进行跳转
       */
      listenEnter(e, type) {

        var that = this;
        var val = this.$refs.searchVal.value;
        //搜索内容为空直接返回
        if (val.trim() == '') {
          return
        }
        var url = '#/search?keywords=' + val;
        var url1 = encodeURI(url);
        if (type == 1) {
          if (e.keyCode == 13) {
            if (this.isSearch) {
              window.open(url1, '_self');
            }
            else {
              window.open(url1, '_blank');
            }

          }
          else {
            return
          }
        }
        if (type == 2) {
          if (this.isSearch) {
            window.open(url1, '_self');

          }
          else {
            window.open(url1, '_blank');
          }
        }

      },

      quitLogin() {
        var store = window.localStorage;
        if (store) {
          store.removeItem('nowLink');
        }
        document.cookie = 'jwt=null;path=/spread';
        document.cookie = 'jwt=null;path=/';
        document.cookie = 'jwt=null;path=/;domain=carnoc.com';
        location.reload();
      },
      addEvent() {

        $('.search_img').click(function () {
          $('.search_img').addClass('hide');
          $('.searchBtn').removeClass('hide');
        });
      },
      Login() {
        var store = window.localStorage;
        if (store) {
          var link = store.getItem('nowLink');
          if (link) {
            store.removeItem('nowLink');
            store.setItem('nowLink', location.href);
          }
          else {
            store.setItem('nowLink', location.href);
          }
        }



      }

    }
  }
</script>

<style scoped>
  /*头部导航*/
  .nav {
    width: 100%;
    height: 60px;
    /*overflow: hidden;*/
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    min-width: 1140px;
  }

  .nav_l {
    float: left;
  }

  .nav_r {
    float: right;
    height: 100%;
    position: relative;
  }

  .nav_l img.carnoc_logo {
    margin-left: 50px;
    margin-top: 15px;

  }

  .nav a {
    text-align: center;
    display: inline-block;
    color: #fefefe;
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    position: relative;
    vertical-align: top;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, .7);
    margin: 0 15px;
    cursor: pointer;
  }

  .nav a:hover {
    color: #ffc800;
  }

  .nav a.carnoc_logo {
    margin: 0;
    vertical-align: middle;
    margin-top: 6px;
    margin-left: 15px;
    margin-right: 15px;
  }

  .nav a.carnoc_logo img {
    width: auto;
    height: 40px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, .7);

  }

  .nav a.welcome {
    max-width: 192px;
    /*text-overflow: ellipsis;*/
    /*overflow: hidden;*/
    /*white-space: nowrap;*/
    position: relative;
    cursor: pointer;
    margin-top: 13px;
  }

  .welcome:hover .userInfo {
    visibility: visible;
  }

  a.welcome span {
    display: inline-block;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    /*background: url("https://cdn.feeyo.com/bbshead/3/30028.jpg") no-repeat;*/
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  a.welcome span img {
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .nav_l a:hover {
    color: #ffc800;
  }

  .nav_l a.carnoc_logo:hover {
    border-bottom: none;
  }

  .nav_l a.active {
    font-weight: bolder;
  }

  .searchBtn {
    margin-top: 14px;
    display: inline-block;
    vertical-align: top;

  }

  .search_img {
    padding: 22px 10px 0 10px;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  .tc {
    transform: translateX(-220px);
  }

  input.search_text {
    width: 180px;
    height: 35px;
    border: none;
    outline: none;
    border-radius: 0 20px 20px 0;
    vertical-align: middle;
    margin-left: 7px;
  }

  .searchBtn {
    padding-left: 6px;
    border-radius: 20px;
    background-color: #fff;
  }

  .hide {
    display: none;
  }

  .sp_new:after {
    content: 'NEW';
    width: 54px;
    height: 24px;
    line-height: 28px;
    border-radius: 2px;
    background-color: #e74b3b;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    position: absolute;
    top: 5px;
    right: -40px;
    transform: scale(0.5);
    text-align: center;
    text-shadow: none;
  }

  .search_img_move {
    transform: rotateZ(-45deg);
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
  }

  img.search_img:hover {
    opacity: 0.6;
  }

  .tougaoBox {
    width: 90px;
    height: 40px;
    position: relative;
    display: inline-block;
    opacity: 1;
    margin-right: 20px;
    text-shadow: none;
  }

  .tougaoBox:hover {
    opacity: 0.9;
  }

  a.tougao {
    text-shadow: none;
    position: absolute;
    left: 10px;
    padding-left: 22px;
    font-weight: bold;
    top: 12px;
    width: 100%;
    height: 38px;
    background-color: #ffc800;
    margin: 0;
    line-height: 38px;
    color: #333;
    box-sizing: border-box;
  }

  a.tougao:hover {
    color: #000;
  }

  .tougaoBox img {
    position: absolute;
    width: 18px;
    height: 18px;
    left: 18px;
    top: 10px;
    z-index: 1;
  }

  .userInfo {
    width: 120px;
    min-height: 60px;
  }

  .userInfo {
    position: absolute;
    color: #000;
    left: 50%;
    top: 46px;
    z-index: 104;
    padding: 0 10px;
    background-color: #000;
    transform: translateX(-50%);
    visibility: hidden;
  }

  .userInfo ul {
    width: 100%;
    height: 100%;

  }

  .userInfo ul li {
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #333;
    padding-bottom: 10px;
    margin-top: 10px;
  }

  .userInfo ul li:last-child {
    border-bottom: none;

  }

  .userInfo ul li a {
    color: #fff;
    line-height: 20px;
    margin: 0;
  }

  .loginBox {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .close {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
  }

</style>
