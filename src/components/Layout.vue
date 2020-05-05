<template>
<div>
    <!-- 头部区域 -->
    <app-header/>
    <!-- 左侧导航 -->
    <app-navbar/>
    <!-- 中间主要区域 -->
    <app-main/>
  
</div>
  
</template>

<script>
import AppHeader from './AppHeader'
import AppMain from './AppMain'
import AppNavbar from './AppNavBar'
export default {
  data () {
    return {
    }
  },

  components: {
      AppHeader,
      AppMain,
      AppNavbar
  },

  methods: {}
}
</script>

<style scoped>

.header{
    position: absolute;
    line-height: 50px;
    padding: 0px;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #2d3a4b;
}
.navbar {
    position: absolute;
    width: 230px;
    top: 50px;
    left: 0px;
    bottom: 0px;
    overflow-y:auto;
    background-color: #545c64;
}
.main {
    position: absolute;
    top: 50px;
    left: 230px;
    right: 0px;
    bottom: 0px;
    padding: 10px;
    overflow-y: auto;
    /* background-color: red; */
    }
</style>