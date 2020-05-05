<template>
  <div class="cardManage">
    <div class="divFirst">
      <el-row>
        <router-link to="/seckillAdd" active-class="active" style="margin-right: 10px">
          <el-button type="primary" style="margin-left: 10px" icon="el-icon-plus">添加卡券</el-button>
        </router-link>
        <el-button
                type="danger"
                icon="el-icon-delete">批量删除
        </el-button
        >
        <el-button @click="toggleSelection()" icon="el-icon-close" style="margin-right: 10px">取消选择</el-button>
           <!--<el-button @click="toList" :type="listShow===false?'':'primary'">卡券管理</el-button>-->
        <!--<el-button @click="toAdd" :type="addShow===false?'':'primary'">添加卡券</el-button>-->
      </el-row>
    </div>
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
      <!--<el-tab-pane label="卡券列表" name="first"><cardList/></el-tab-pane>-->
      <!--<el-tab-pane label="添加卡券" name="second"><cardAdd/></el-tab-pane>-->
    <div style="margin-top: 10px">
      <cardList v-if="listShow===true"/>
      <!--<cardAdd v-if="addShow===true"/>-->
    </div>

    <!--</el-tabs>-->

  </div>
</template>

<script>
import cardList from './cardList'
import cardAdd from './cardAdd'
export default {
  components: {
      cardList:cardList,
      cardAdd:cardAdd
  },
  props: {},
  data() {
    return {
      // activeName: "first"
      listShow:true,
      addShow:false,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    toList(){
      this.$data.listShow=true;
      this.$data.addShow=false;
    },
    toAdd(){
      this.$data.listShow=false;
      this.$data.addShow=true;
    },
  }
};
</script>
<style scoped>
.cardManage{
    padding: 10px;
}
.divFirst{
  margin-top: 10px;
  margin-left: 10px;
}
</style>
