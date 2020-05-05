<template>
  <div id="app">
    <el-row>
      <router-link to="/sortAdd" active-class="active" style="margin-right: 10px">
        <el-button
                type="primary"
                icon="el-icon-plus"
        >添加分类
        </el-button
        >
      </router-link>
      <el-button
              type="danger"
              icon="el-icon-delete" @click="multidelete">批量删除
      </el-button
      >
      <!--<el-button @click="toggleSelection()" icon="el-icon-close" style="margin-right: 10px">取消选择</el-button>-->
    </el-row>
    <feileiguanli @func="getArr"/>
  </div>
</template>

<script>
import feileiguanli from "./sortManagezujian/feileiguanli";
import addfeilei from "./sortManagezujian/tianjiafeilei";
export default {
  name: "sortManage",
  data() {
    return {
      sortManageShow: true,
      sortAddShow: false,
      tableData: []
    };
  },
  components: {
    addfeilei: addfeilei,
    feileiguanli: feileiguanli
  },
  methods: {
    toSortManage() {
      this.$data.sortManageShow = true;
      this.$data.sortAddShow = false;
    },
    toSortAdd() {
      this.$data.sortManageShow = false;
      this.$data.sortAddShow = true;
    },
    getArr(data){
      this.multiDelete=data;
      console.log(this.multiDelete);
    },
    multidelete(data){
      this.$axios({
        method:'post',
        url: this.$host+'/groupmall/power/category/deleteBatch',
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
#app {
  /* margin-left: 20px; */
  padding: 10px;
  color: #606266;
}
.inputSize {
  width: 40%;
}
.TitleB {
  float: left;
  width: 100px;
}
.Row > div {
  padding: 10px 0;
}
</style>
