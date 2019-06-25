<template>

<div class="totop">
<div class="top1 top2" v-if="scrollControl.toTop">
  <a @click="doTop('toTop')" >
    <img src="static/img/totop.png"/>
  </a>
  回顶部
</div>
<div class="top1" v-if="scrollControl.doComment">
<a  @click="doTop('doComment')" >
    <img src="static/img/toComment.png"/>
  </a>
  写评论

</div>

</div>

</template>

<script>
  /**
 * @author minchangjun
 * @since 2019/3/14
 * @title 回到顶部与评论
 */
    export default {
        name: "ToTop",
    props:['scrollControl'],
    methods:{
      doTop(id) {
        document.getElementById(id).scrollIntoView();
        if (id == 'toTop') {
          if (document.documentElement && document.documentElement.scrollTop) {
            document.documentElement.scrollTop = 0;
          } else if (document.body) {
            document.body.scrollTop = 0;
          }
        }
      }
    }
    }
</script>

<style scoped>
.totop{
  position: fixed;
right: 20px;
  bottom: 10px;
  z-index: 999;
}
  .top1{
    background-color: #eee;
    width: 55px;
    height: 55px;
    margin-bottom: 10px;
    font-size: 12px;
    cursor: pointer;
  }
  .top1:hover{background-color: #f5c243;}
  .top1 img{
    margin-top: 5px;
    margin-bottom: 5px;
  }
.top2 img{
  margin-top: 10px;
  margin-bottom: 5px;
}
  .top1 a{
    display: block;

  }
</style>
