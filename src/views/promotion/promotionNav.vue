<template>
  <div class="promotionNav">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="管理员列表" name="first"><managerList/></el-tab-pane>
      <el-tab-pane label="添加管理员" name="second"><managerAdd/></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import managerList from './promotionSecond/managerList'
import managerAdd from './promotionSecond/managerAdd'
export default {
  name: "promotionNav",
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  components:{
    managerList:managerList,
    managerAdd:managerAdd
  },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>
<style scoped>
  .promotionNav{
    padding: 10px;
  }
</style>
