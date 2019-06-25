<template>
  <div id="app">
<mid-router v-if="isOver"></mid-router>

    <div class="loading" v-show="!loadingEnd">
      <img src="static/img/icon/air.png"/>
    </div>




  </div>


</template>

<script>
  // 使用inject/provide来进行是否登录判断
  import Fn from '../static/js/comment';
import MidRouter from './components/MidRouter'
  export default {
    name: 'App',
    provide() {
      return {
        app: this,

      }
    },
    data() {
      return {
        isLogin: false,
        isOver:false,
        loadingEnd:true,
        //保存用户信息
        UserInfo:{},
        /**
         * 本地缓存有效期，默认是24小时
         */
        ExpireTime:86400*1000,
        // BASEURL: 'http://te.carnoc.com/service/spread/index.php/'
        // BASEURL: 'http://192.168.112.73/service/spread/index.php/'
        BASEURL: 'https://service.carnoc.com/spread/index.php/'
      }
    },
    mounted() {

      this.userIsLogin();

      /**
       * 解决ie下a标签不跳转
       * @return {boolean}
       */
      function checkIE() {
        return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
      }

      if (checkIE()) {
        window.addEventListener('hashchange', () => {
          var currentPath = window.location.hash.slice(1);
          if (this.$route.path !== currentPath) {
            this.$router.push(currentPath)
          }
        }, false)
      }
    },
    methods: {
      /**
       * @author minchangjun
       * @since 2019/3/20
       * @param
       * @return {boolean}
       * @desc   返回布尔值true表示用户已经登录
       * 判断依据；jwt/userId同时存在
       */
      userIsLogin() {
        var that = this;
        var userInfo = Fn.getUserInfo();
        var url = this.BASEURL + 'pc/action/check-login';
        var obj = {};
        obj.jwt = userInfo.jwt;
        obj['user-id'] = userInfo.userId;
        $.post(url, obj, function (res) {
          if (res.code == 1000000) {
            that.isLogin = true;
            that.UserInfo.userName=res.list.username;
            that.UserInfo.user_img = res.list.avatar;
          }
          else {
            that.isLogin = false;
          }
          that.isOver=true
        })

      },



    },
    components:{
      MidRouter
    }

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .loading{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    background-color:rgba(0,0,0,0.5);

  }
.loading img{
  position: absolute;
  left: 50%;
  top: 50%;
  animation:rotate 1000ms infinite ;
}
  @keyframes rotate {
    0%{
      transform: rotateZ(0deg);
    }
    100%{
      transform: rotateZ(360deg);
    }
  }

</style>
