<template>

  <div class="doScore" @mouseout="handleScore()">
    <span class="score_icon " title="2分，无力吐槽" @mouseover="getScore(0)" @click="finalScore(1)"></span>
    <span class="score_icon" title="4分，平庸之作" @mouseover="getScore(1) " @click="finalScore(2)"></span>
    <span class="score_icon" title="6分，质量尚可" @mouseover="getScore(2)" @click="finalScore(3)"></span>
    <span class="score_icon" title="8分，良心推荐" @mouseover="getScore(3)" @click="finalScore(4)"></span>
    <span class="score_icon" title="10分，霸屏佳作" @mouseover="getScore(4)" @click="finalScore(5)"> </span>

    <div>

    </div>
    <div>


    </div>
  </div>


</template>

<script>
    export default {
      name: "Score",
      props: ['userInfo','scoreStatus'],
    inject: ['app'],
    data() {
      return {
        canScore: true,
        score_num: 0,
        islogins:false
      }
    },


    mounted() {
      this.islogins=this.app.isLogin;
        var scoreRes = this.hasScored(this.userInfo.id);

      var score = this.userInfo.score;
      if (scoreRes) {
        this.canScore = false;
      }
      else {
        this.canScore = true
      }
      this.setStar(score)
    },
    inject: ['app'],
    methods: {
      getScore(index) {
        if (this.canScore) {
          $('.score_icon').removeClass('score_icon_active');
          for (var i = 0; i <= index; i++) {
            $('.score_icon').eq(i).addClass('score_icon_active')
          }
        }

      },
      finalScore(index) {
        var that = this;

        if (!this.canScore) {
          this.$emit('hasScore', false);
          return
        }
        else {

          this.canScore = false;
          //数据传接口，计算平均分
          this.storeInfoLocal(this.userInfo.id);
          //组装要提交到接口的数据
          var info = {
            jwt: this.userInfo.jwt,
            id: this.userInfo.id,
          };
          info['user-id']=this.userInfo.userId;
          info['h5-token'] = this.userInfo.h5Token;
          info['star-num'] = index;
          var url = this.app.BASEURL + 'pc/action/score';
          /**
           * 未登录不传jwt
           */
          if(!this.islogins){
            console.log(this.islogins)
            delete info.jwt
          }

          $.post(url, info, function (res) {
            if (res.code==1000000) {
              var scoreResult={};
              scoreResult.total=res.list[0].total;
              scoreResult.score=res.list[0].score;
              that.setStar(index * 2);
              that.$emit('hasScore', true);
              that.$emit('scoreResult', scoreResult);
            }
            else {
              that.$emit('hasScore', false);
            }
          });
        }
      },
      handleScore() {
        if (this.canScore) {
          if (window.event.layerX < 0 || window.event.layerX > 290 || window.event.layerY < 0 || window.event.layerY > 48) {

            this.setStar(this.userInfo.score)
          }
        }
      },


      /**
       * @author minchangjun
       * @since 2019/3/15
       * @param
       * @return
       * @desc 存储特定信息到本地，作为用户是否评过分的依据
       */

      storeInfoLocal(id) {
        var time = new Date().getTime();
        //存储用户已经打过分的信息(id)
        var hasData = this.getLocalInfo();
        var s_obj={};

        var store = window.localStorage;
        var list = hasData.datalist;

        //没有被评过分
        var scoreList = [];
        if(!hasData){
          s_obj.id=id;
          s_obj.storeTime=time;
          scoreList.push(s_obj);
        }
        else {

          scoreList = scoreList.concat([], list);
          s_obj.id=id;
          s_obj.storeTime=time;
          scoreList.push(s_obj)
        }
        var stData = {
          datalist: scoreList
        };
        var stDataJson = JSON.stringify(stData);
        store.setItem('scoreInfo', stDataJson)

      },

      /**
       * @author minchangjun
       * @since 2019/3/15
       * @param
       * @return null/object-返回进行判断的信息
       * @desc   若存在该id数据则返回数据否则返回null
       */
      getLocalInfo() {
        var store = window.localStorage;
        var data = store.getItem('scoreInfo');
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
       * @param {string} 作品id
       * @return boolean
       * @desc   通过id判断该作品是否被评分了
       */
      hasScored(id) {

        if(!this.app.isLogin) {

          var nowTime = new Date().getTime();
          var info = this.getLocalInfo();
          var oldTime = 0;
          var s_time = 0;
          var stored = false;
          if (!info) {
            return false
          }
          for (var i = 0; i < info.datalist.length; i++) {
            if (info.datalist[i].id == id) {
              oldTime = info.datalist[i].storeTime;
              stored = true;
            }
          }
          s_time = nowTime - oldTime;
          if (stored) {
            //已经评过分且登录用户，不可重复打分
            if (this.app.isLogin) {
              return true
            }
            //已经评过分且未登录用户，24小时之内不能打分，24小时后可打分
            else {

              if (s_time < this.app.ExpireTime) {
                return true
              }
              else {
                return false
              }

            }

          }
          else {
            return false
          }
        }
        else {
          if(this.scoreStatus.star){
            return false
          }
          else {
            return true
          }
        }
      },
      /**
       * @author minchangjun
       * @since 2019/3/18
       * @param {number}
       * @return
       * @desc  将从接口中获取的分数渲染到页面
       */
      setStar(num) {
        var index = parseInt(num / 2);
        $('.score_icon').removeClass('score_icon_active');
        for (var i = 0; i < index; i++) {
          $('.score_icon').eq(i).addClass('score_icon_active')
        }
        this.$emit('upDateScore', num);

      },


    },

  }
</script>

<style scoped>
  .doScore span.score_icon {
    display: inline-block;
    width: 36px;
    height: 36px;
    cursor: pointer;
    background: url("../../static/img/fly1.png") no-repeat;
    background-size: 90%;
    margin: 0 3px;
    margin-top: 6px;
  }

  .doScore span.score_icon_active {
    background: url("../../static/img/fly2.png") no-repeat;
    background-size: 90%;
  }

  .doScore {
    z-index: 100;
  }


</style>
