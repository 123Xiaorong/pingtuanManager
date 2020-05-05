<template>
     <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="商店信息" name="first" :key="'first'">
      <tabone/>
    </el-tab-pane>
    <el-tab-pane label="基本设置" name="second" :key="'second'">
      <tabtwo/>
    </el-tab-pane>
    <el-tab-pane label="显示设置" name="third" :key="'third'">
      <tabthree/>
    </el-tab-pane>
    <el-tab-pane label="购物流程" name="fourth" :key="'fourth'">
      <tabfour/>
    </el-tab-pane>
    <el-tab-pane label="接口设置" name="five" :key="'five'">
      <tabfive/>
    </el-tab-pane>
    <el-tab-pane label="商品显示设置" name="six" :key="'six'">
      <tabsix/>
    </el-tab-pane>
    <el-tab-pane label="分享设置" name="seven" :key="'seven'">
      <tabseven/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import tabone from './shangdiansetup/tab1'
import tabtwo from './shangdiansetup/tab2'
import tabthree from './shangdiansetup/tab3'
import tabfour from './shangdiansetup/tab4'
import tabfive from './shangdiansetup/tab5'
import tabsix from './shangdiansetup/tab6'
import tabseven from './shangdiansetup/tab7'
export default {
  data () {
    return {
      activeName: "first"
    }
  },

  components: {
    tabone,tabtwo,tabthree,tabfour,tabfive,tabsix,tabseven
  },

  methods: {
     handleClick(tab,event){
      console.log(tab,event)
    }
  }
}
</script>

<style scoped>
el-tab-pane{
  font-size: 20px;
}
</style>