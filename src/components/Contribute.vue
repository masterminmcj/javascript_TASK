<template>
  <div class="page">

    <div class=" nav_active ">
      <nav-bar nowId="2"></nav-bar>
    </div>

    <div class="mainContent">

      <div class="outBox">
        <div class="listBox">

          <h2 class="h_title">投稿须知</h2>
          <div class="f_item">
            感谢您投稿，请发送至：<a href="mailto:wq@carnoc.com">wq@carnoc.com。</a>
          </div>

          <div class="f_item">
            您的文章可以是：
            <p class="f_item_fp">
              您参与的品牌营销案例；
            </p>
            <p class="f_item_fp">
              您在品牌营销领域的经验分享；
            </p>
            <p class="f_item_fp">
              您对时下品牌营销的看法和评论；
            </p>
            <p class="f_item_fp">
              您对品牌营销趋势的分析和预测；
            </p>
            <p class="f_item_fp">
              您所在公司最新品牌营销动态;
            </p>
            <p class="f_item_fp">
              您翻译的航旅品牌营销文章。
            </p>
          </div>


          <div class="f_item">
            我们的选择标准：
            <p>正能量、详实、有趣的原创作品（案例）或文章。</p>
          </div>
          <div class="f_item">
            邮件格式：
            <p><span class="ft16">邮件标题：</span>传播频道投稿＋稿件标题。</p>
            <div>
              <p><span class="ft16">文稿图片：</span>请以压缩包的形式提供投稿素材（文稿、图片），并以【传播频道投稿+标题】命名压缩包。</p>
              <p class="pdL">图片要求：请提供jpg或gif格式图片。</p>
              <p class="pdL">视频要求：请提供由品牌或代理机构发布在腾讯、优酷或YouTube的视频地址，如果您发送.mp4等格式视频，
                则表示您同意民航资源网代表您将其上传到视频平台。</p>
              <p><span class="ft16">邮件正文：</span>（*为必填项）</p>
              <div class="ft_p">
                <p>1.*投稿人信息：真实姓名，联系方式</p>
                <p>2.*稿件信息：稿件类型（作品/案例或资讯或观点洞察）、标题、概要、署名</p>
                <p>如您投递的是作品/案例类稿件，请提供以下信息：</p>
                <p>*品牌（品牌+产品）、*作品标题、*作品类型、营销类型、上线日期、代理（代理名称，城市，国家），
                  以及创意总监、艺术指导、文案、插画、摄影师等其他信息。</p>
              </div>

              <p class="ft16">请下载<a href="http://pic.carnoc.com/file/190423/1904230342564.doc">“投稿须知”</a>文件，参阅作品类型、营销类型详细说明。</p>
            </div>


          </div>

          <div class="f_item">
            请注意：
            <p>1.并非所有的投稿都一定发布。</p>
            <p>2.您一旦向民航资源网投稿，即视为授权民航资源网使用您提交的素材。</p>
          </div>


          <div class="f_item">
            我们随时期待您的稿件！

          </div>
        </div>

      </div>


    </div>
  </div>


</template>

<script>
  /**
   * @author minchangjun
   * @since 2019/3/26
   * @title 投稿组件
   * @vesion
   */
  import NavBar from './NavBar'

  export default {
    name: "Contribute",
    inject:['app'],
    data() {
      return {}
    },
    methods: {},

    mounted() {
      this.app.$data.loadingEnd = true;
      document.title = '我要投稿-民航资源网'
    },
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .outBox {
    margin-top: 110px;
    box-shadow: 0px 0px 50px #eee;
    color: #333;
    text-align: left;
    line-height: 30px;
    overflow: hidden;
  }

  .f_item {
    font-size: 18px;
    color: #000;
    margin: 30px 0;
    font-weight: bold;
  }

  .f_item a {
    outline: #f3b53f;
    color: #ffc800;
  }

  .listBox {
    width: 860px;
    margin: 110px auto;
  }

  .h_title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 70px;
    font-weight: bold;

  }

  .f_item p {
    font-size: 16px;
    color: #333;
    font-weight: normal;
  }

  .f_item .ft16 {
    font-size: 16px;
    font-weight: bold;
  }

  .pdL {
    box-sizing: border-box;
    padding-left: 80px;
  }

  .ft_p {
    font-weight: normal;
    border: 2px solid #ffc800;
    padding: 35px;
    box-sizing: border-box;
    margin: 10px 0;
    margin-bottom: 30px;
  }
</style>
