<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>

  </div>

</template>

<script>
  export default {
    name: "App",
    provide(){
      return {
        reload: this.reload
      }
    },
    data(){
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        })
      }
    }
  }
</script>

<style lang="less" type="text/less">
  #app {
    width: 100%;
    height: 100%;
  }

  .beian {
    font-size: 14px;
    bottom: 90px;
    right: 400px;
    margin: 0 10px;
    color: #ccc;
  &:hover {
     color: #ccc;
   }
  }
</style>
