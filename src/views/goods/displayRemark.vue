<template>
  <div id="app">
    <div>
      <el-row style="margin-bottom: 5px">
        <el-button
                type="danger"
                icon="el-icon-delete" @click="multiDelete()">批量删除
        </el-button
        >
        <!--<el-button @click="toggleSelection()" icon="el-icon-close" style="margin-right: 10px">取消选择</el-button>-->
      </el-row>
      <tabone @func="getArr" v-if="listShow === true" />
    </div>
  </div>
</template>

<script>
import tabone from "./displayRemark/tab1";
import tabtwo from "./displayRemark/tab2";
export default {
  name: "displayRemark",
  data() {
    return {
      listShow: true,
      addShow: false,
      multiArr:[],
    };
  },
  methods: {
    toList() {
      this.$data.listShow = true;
      this.$data.addShow = false;
    },
    toAdd() {
      this.$data.listShow = false;
      this.$data.addShow = true;
    },
    getArr(data){
      this.multiArr=data;
    },
    multiDelete(){
      console.log(this.multiArr);
      this.$axios({
        method:'post',
        url: this.$host+'/groupmall/power/comment/deleteBatch',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:{ids:this.multiArr}
      }).then((resp)=>{
        console.log(resp);
      });
      this.$router.go(0);
    }
  },
  components: {
    tabone:tabone,
    tabtwo:tabtwo
  },

};
</script>

<style scoped>
#app{
  padding: 10px;
  color: #606266;
}
</style>
