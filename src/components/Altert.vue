<template>
  <div class="alertBox" v-show="isShow">
    <p :class="type">
      {{msg}}
    </p>
  </div>
</template>

<script>
  export default {
    name: "Altert",
    props: ['type', 'isShow','msg'],
    data() {
      return {
        timer: null
    }
    },
    mounted() {


    },
    watch: {

    },
    methods: {
      handleType() {

      }

    }
  }
</script>

<style scoped>

  .isShow {

  }
.alterTip{
  border-radius: 5px;
}
  .alertBox p {
    width: 100%;
    border-radius: 5px;
    padding: 20px 50px;
    padding-left: 70px;
    box-sizing: border-box;
    animation: opc 1000ms;
  }

  .success {
    background-color: #edfff3;
    border: 1px solid #999;
    background: url("../../static/img/icon/success.png") no-repeat;
    background-position: 20px 50%;
  }

  .warn {
    background-color: #fff9e6;
    border: 1px solid #ffd77a;
    background: url("../../static/img/icon/dp.png") no-repeat;
    background-position: 20px 50%;
    color: #f3b53f;

  }

  .error{
    background-color: #ffefe6;
    border: 1px solid #ffb08f;
    background: url("../../static/img/icon/error.png") no-repeat;
    background-position: 20px 50%;
    color: #f3b53f;
  }

  @keyframes opc {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }

  }
</style>
