var md5=require('js-md5');
var tools = {
  getUserInfo: getUserInfo,
  getCookie:function () {
    var info=cookieToObj();
    return info
  },
  isLogin:isLogin(),
  hanldeUrl:hanldeUrl,
  setShare:setShare,
  shareControl:shareControl,
  getUserMess:getUserMess,
  judgeDevice:judgeDevice
};

function mdH5Token() {
  var num = Math.random();
  var time = new Date().getTime();
  var info = "" + num + time;

  var haslocalh5=hasH5Token();
  if(haslocalh5){
    return haslocalh5
  }
  else {
    var data=createH5Token();
    return data
  }
}


function cookieToObj() {
  var cookieArr = document.cookie.split(";");
  var obj = {};
  cookieArr.forEach(function (i) {
    var arr = i.split("=");
    var key = arr[0].trim();
    obj[key] = arr[1];
  });
  return obj;
}


/**
 * 产生并存储h5-token
 * @return {boolean}
 */

function createH5Token(){
  var num = Math.random();
  var time = new Date().getTime();
  var info = "" + num + time;
  var md5Info=md5(info);
  var store=window.localStorage;
  store.setItem('h5Token',md5Info);
  return md5Info;
}

/**
 * 判断本地是否含有h5 token
 */
function hasH5Token(){
  var store=window.localStorage;
  var data=store.getItem('h5Token');
  if(!data){
    return false
  }
  else {
    return data
  }
}



//判断是否登录
function isLogin(){

  var data=cookieToObj();
  if(data.jwt&&data.userid){
    var obj={};
    obj.jwt=data.jwt;
    obj['user-id']=data.userid;
    return true
  }
  else {
    return false
  }

}


function hanldeUrl(list,url) {
  for(var i=0;i<list.length;i++){
    list[i].url=url+list[i].id
  }
}

function setShare() {
  //分享相关代码
  var urls=location.href;
  window._bd_share_config={
    "common":{
      "bdSnsKey":{},
      "bdText":urls,
      "bdSign":'normal',
      "bdUrl":"",
      "bdMini":"1",
      "bdMiniList":false,
      "bdPic":"",
      "bdStyle":"2",
      "bdSize":"16"},
    "share":{},
    "selectShare":{"bdContainerClass":null,"bdSelectMiniList":["weixin","tsina","qzone","sqq"]}
  };
  var  s = document.createElement("script");
  s.type = "text/javascript";
  s.src =
    "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" +
    ~(-new Date() / 36e5);
  document.getElementsByTagName('head')[0].appendChild(s);
  // with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
  document.getElementsByTagName('head')[0].appendChild(s)

  }


  function getUserInfo() {
    var h5Token = mdH5Token();
    var cookie = cookieToObj();
    var jwt = cookie["jwt"] || "";
    var userId = cookie["userid"] || '';
    var userInfo = {
      jwt: jwt,
      userId: userId,
      h5Token: h5Token
    };
    return userInfo;
  }

function getUserMess(that) {

  var userInfo =getUserInfo();
  var url = 'https://service.carnoc.com/spread/index.php/pc/action/check-login';
  var obj = {};
  obj.jwt = userInfo.jwt;
  obj['user-id'] = userInfo.userId;

  $.post(url, obj, function (res) {
    if (res.code == 1000000) {
      that.userData.userName = res.list.username;
      that.userData.user_img = res.list.avatar;
    }
    else {
      return false
    }
  })

}
  function shareControl(lists){
    /**
     * 微信分享二维码鼠标移入展示
     * @type {boolean}
     */

    $('.shareContent').attr('content',lists.article.intr);
    $('.bds_weixin').mouseover(function () {
      $('.bds_weixin')[0].click();
    });
    $('.bds_weixin').mouseout(function () {
      $('.bd_weixin_popup_close')[0].click();
    });

    var title=encodeURI(lists.article.title.trim());
    var title1=lists.article.title.trim();
    var desc=encodeURI(lists.article.intr?lists.article.intr:"");
    var desc1=lists.article.intr?lists.article.intr:"";
    var allDesc='【'+title+'】'+desc+encodeURI('@民航资源网');
    var allDesc1='【'+title1+'】'+desc1+'@民航资源网';


    // QQ空间
    $(".bds_qzone").click(function(){
      var url='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+escape(location.href)+'&title='+title+'&desc='+desc1;
      window.open(url,"_blank");
      return false;
    });

    //QQ好友
    $(".bds_sqq").click(function(){
      var url='https://connect.qq.com/widget/shareqq/index.html?url='+escape(location.href)+'&title='+title+'&summary='+desc;
      window.open(url,"_blank");
      return false;
    });

    //新浪微博
    $(".bds_tsina").click(function(){
      var url='http://service.weibo.com/share/share.php?title='+allDesc1+'&url='+escape(location.href)+'&desc='+desc1;

      window.open(url,'_blank');
      return false;
    })

  }

/**
 * 判断设备信息，是pc还是移动页面,
 * @return {boolean} true-pc页面  false-移动页面
 */

function judgeDevice() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc || bIsAndroid || bIsCE || bIsWM){
      return false
    }
    else {
      return true
    }


  }

export default tools;




