<template>
  <p class="timeTap">
    {{dateString}}
  </p>
</template>

<script>
  export default {
    name: "TimeTrans",
    data() {
      return {
        dateString: "",
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    },
    mounted() {
      this.years = new Date(parseInt(this.timeTap) * 1000).getFullYear();
      this.months = new Date(parseInt(this.timeTap) * 1000).getMonth() + 1 >= 10 ? new Date(parseInt(this.timeTap) * 1000).getMonth() + 1 : '0' + (new Date(parseInt(this.timeTap) * 1000).getMonth() + 1)
      this.days = new Date(parseInt(this.timeTap) * 1000).getDate() >= 10 ? new Date(parseInt(this.timeTap) * 1000).getDate() : '0' + new Date(parseInt(this.timeTap) * 1000).getDate();
      this.dateString = this.years + '-' + this.months + '-' + this.days;
      if (this.dateType == 1) {
        this.hours = this.days = new Date(parseInt(this.timeTap) * 1000).getHours() >= 10 ? new Date(parseInt(this.timeTap) * 1000).getHours() : '0' + new Date(parseInt(this.timeTap) * 1000).getHours();
        this.minutes = this.days = new Date(parseInt(this.timeTap) * 1000).getMinutes() >= 10 ? new Date(parseInt(this.timeTap) * 1000).getMinutes() : '0' + new Date(parseInt(this.timeTap) * 1000).getMinutes();
        this.seconds = this.days = new Date(parseInt(this.timeTap) * 1000).getSeconds() >= 10 ? new Date(parseInt(this.timeTap) * 1000).getSeconds() : '0' + new Date(parseInt(this.timeTap) * 1000).getSeconds();
        this.dateString +=' '+ this.hours+':' + this.minutes +':'+ this.seconds
      }


    },
    props: ["timeTap","dateType"]
  }
</script>

<style scoped>

</style>
