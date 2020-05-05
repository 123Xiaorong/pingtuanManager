<template>
  <div id="app">
    <el-row>
      <router-link to="/goodLableAdd" active-class="active" style="margin-right: 10px">
        <el-button
                type="primary"
                icon="el-icon-plus"
        >添加标签
        </el-button
        >
      </router-link>
      <el-button
              type="danger"
              icon="el-icon-delete" @click="multidelete">批量删除
      </el-button>
      <!--<el-button @click="toggleSelection()" icon="el-icon-close" style="margin-right: 10px">取消选择</el-button>-->
    </el-row>
    <labelManage @func="getArr" v-if="labelManageShow===true"/>
  </div>
</template>

<script>
import labelManage from "./goodsLable/lableManage";
import labelAdd from "./goodsLable/labelAdd";
export default {
  name: "goodsLable",
  components: {
    labelAdd: labelAdd,
    labelManage: labelManage
  },
  data() {
    return {
      labelManageShow: true,
      labelAddShow: false,
      multiDelete:[],
    };
  },
  methods: {
    toLabelManage() {
      this.$data.labelManageShow = true;
      this.$data.labelAddShow = false;
    },
    toLabelAdd() {
      this.$data.labelManageShow = false;
      this.$data.labelAddShow = true;
    },
    toggleSelection(){

    },
    getArr(data){
      this.multiDelete=data;
      console.log(this.multiDelete);
    },
    multidelete(data){
      this.$axios({
        method:'post',
        url: this.$host+'/groupmall/power/tags/deleteBatch',
        headers:{"Content-Type":"application/x-www-form-urlendcoded"},
        access_token:this.token,
        params:{ids:this.multiDelete}
      }).then((resp)=>{
        console.log(resp);
      });
      this.$router.go(0);
    }
  }
};
</script>

<style scoped>
#app{
    padding: 10px;
    color: #606266;
}
</style>
