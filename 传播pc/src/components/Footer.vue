<template>


  <div class="footerBox">

    <div class="footer_mid">
      <div class="mid_content">

        <p class="mid_item">
          <img src="static/img/carnoc_logo.png"/>
          <span class="pullR linkgroup">
    <a href="#/contribute/" target="_blank">投稿须知</a>
    <a href="http://www.carnoc.com/suggest.html" target="_blank">意见建议</a>
    <a href="http://news.carnoc.com/hot/templet/2018CACS/" target="_blank">传播峰会</a>
    <a href="http://www.carnoc.com/job.html" target="_blank">加入我们</a>

  </span>
        </p>
        <div class="mid_item">
          <p class="mid_item_c">传递航旅品牌好声音，分享行业品牌营销资讯、作品案例、观点、洞察，
            为全球航旅品牌人、营销人提供交流平台。
          </p>
          <div class="mid_item_r">
            <!--订阅提示框-->
            <div :class="{'notic':true,'notic_move':showNotic}" >
              {{msg}}
            </div>
            <span class="order_desc">邮件订阅</span>
            <p class="dyue">
              <input type="text" class="subVal" v-model="subVal" placeholder="请输入您的邮箱"><span class="doSub" @click="doSubscription()">订阅</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer_bottom">
      <div class="footer_bottom_container">
        <p>
          © 1999-{{nowYear}} 民航资源网版权所有 增值电信业务经营许可证：皖B2-20080030-1 皖公网安备：34010402700199
        </p>

        <p class="pullR">
          <a target="_blank" href="https://weibo.com/carnoc">
            <img src="static/img/sina.png"/>
          </a>
          <a target="_blank" class="c_wx">
            <img src="static/img/weixin1.png"/>
            <div class="ewmBox">
              <img src="../../static/img/icon/zyw.jpg"/>
            </div>
          </a>
          <a target="_blank" href="https://i.youku.com/i/UMTI4OTc4MDYzNg">
            <img src="static/img/youku.png"/>
          </a>
        </p>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Footer",
    data() {
      return {
        nowYear: new Date().getFullYear(),
        subVal: "",
        msg: '订阅成功',
        showNotic: false
      }
    },
    methods: {
      doSubscription() {
        var that = this;
        var val = this.subVal;
        if (this.showNotic) {
          return
        }
        if (!val || val.trim() == '') {
          this.msg = '邮箱不能为空';
          this.showNotic = true;

        }
        else {
          var url="https://service.carnoc.com/tools/web/index.php/mail/subscription";
          var option={
            type:2,
            email:val
          };
          $.post(url,option,function (res) {
            if(res.code==2063005){
              that.msg="该邮箱已订阅，要不换一个？";
              that.showNotic=true;
              return
            }
            if(res.code==1063001){
              that.msg="订阅成功!";
              that.showNotic=true;
              return
            }
            that.msg=res.msg;
            that.showNotic=true;
          })

        }
        setTimeout(function () {
          that.showNotic = false;
        }, 2200)

      }
    }
  }
</script>

<style scoped>
  .footerBox {
    min-width: 1140px;
    background: url("../../static/img/footer_bg.png") no-repeat;
    background-size: cover;
    overflow: hidden;
    position: relative;
  }

  .footerMain {
    width: 1140px;
    margin: 30px auto;
    /*min-height: 600px;*/
    text-align: left;
  }

  div.f_item1 {
    overflow: hidden;
    height: 50px;
    font-size: 20px;
    color: #fff;
  }

  .btm_line {
    padding-bottom: 6px;
    color: #fff;
    border-bottom: 5px solid #f3b53f;
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
  }

  div.bottomBox {
    background-color: #fff;
  }

  .m_c_item img {
    min-width: 100%;
    min-height: 100%;
    height: auto;
  }

  p.m_c_score {
    height: 40px;
  }

  .mid_content {
    margin: 0 auto;
    width: 1140px;
    padding: 45px 0;
    position: relative;
  }

  .footer_mid {
    width: 100%;
    height: 260px;
    background-color: #202020;
    text-align: left;

  }



  .mid_item img {
    width: 22%;
    height: auto;
  }

  .linkgroup a {
    font-size: 14px;
    line-height: 60px;
    color: #fff;
    margin: 0 20px;
  }

  .mid_item_c {
    font-size: 14px;
    float: left;
    width: 50%;
    color: #999;
    margin: 26px 0;
    line-height: 35px;
  }

  .mid_item_r {
    float: left;
    width: 50%;
    color: #999;
    text-align: right;
    position: relative;
  }

  .mid_item_r span.order_desc {
    text-align: left;
    width: 376px;
    display: inline-block;
    padding: 15px 0;
  }

  .mid_item_r p input {
    padding-left: 10px;
    width: 280px;
    height: 42px;
    border: none;
    font-size: 16px;
    outline: none;
    border-radius: 25px 0 0 25px;
    vertical-align: top;
  }

  .mid_item_r p span {
    display: inline-block;
    width: 85px;
    height: 42px;
    line-height: 42px;
    background-color: #f5c243;
    color: #000;
    text-align: center;
    vertical-align: top;
    border-radius: 0 25px 25px 0;
  }

  .footer_bottom {
    width: 100%;
    height: 64px;
    background-color: #161616;
    font-size: 12px;
    color: #999;
  }

  .footer_bottom_container {
    width: 1140px;
    position: relative;
    height: 100%;
    /*overflow: hidden;*/
    margin: 0 auto;
    line-height: 64px;
    text-align: left;
  }

  .footer_bottom_container p {
    float: left;
    height: 100%;
    line-height: 64px;
  }

  .footer_bottom_container p.pullR {
    float: right;
    margin-top: 4px;
  }

  .footer_bottom_container p a {
    cursor: pointer;
    margin: 10px;
    width: 36px;
    height: 36px;
    background-color: #535353;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
  }

  .footer_bottom_container p a:hover {
    background-color: #f5c243;
  }

  .footer_bottom_container p a.selectd_icon {
    background-color: #f5c243;
  }

  .footer_bottom_container p a img {
    margin-top: 8px;
  }
  .ewmBox {
    position: absolute;
    right: 34px;
    top: -140px;
    width: 120px;
    height: 120px;
    border: 1px solid #eee;
    border-radius: 5px;
    background-color: #fff;
    visibility: hidden;
  }
  .ewmBox img {
    width: 120px;
    height: auto;
    margin-top: 0 !important;
  }
  .c_wx:hover .ewmBox {
    visibility: visible;
  }
  .doSub {
    cursor: pointer;
  }
  .notic {
    position: absolute;
    left: 197px;
    bottom:-50px;
    min-width: 250px;
    padding: 0 10px;
    height: 45px;
    text-align: left;
    line-height: 45px;
    color: #ffc800;

   visibility: hidden;
    z-index: 100;
  }
  .notic_move {
  visibility: visible;
    transition: visibility 2000ms;
  }
</style>
