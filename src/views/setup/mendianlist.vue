<template>
  <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
    <!--<el-tab-pane label="门店管理" name="first">-->

    <!--</el-tab-pane>-->
    <!--<el-tab-pane label="添加门店" name="second">-->
      <!--<tabtwo />-->
    <!--</el-tab-pane>-->
  <!--</el-tabs>-->
  <div style="margin-bottom: 5px;margin-top: 10px">
    <router-link to="/mendianAdd" active-class="active" >
      <el-button
              type="primary"
              icon="el-icon-plus"
      >添加门店
      </el-button
      >
    </router-link>
    <!--<el-button  icon="el-icon-close" style="margin-left: 10px">取消选择</el-button>-->
    <tabone />
  </div>
</template>

<script>
import tabone from './mendianlist/tab1'
import tabtwo from './mendianlist/tab2'
export default {
  data() {
    return {
      activeName: 'first'
    };
  },

  components: {
    tabone,tabtwo
  },

  methods: {
    handleClick(tab,event){
      console.log(tab,event)
    }
  }
};
</script>

<style scoped>
</style>