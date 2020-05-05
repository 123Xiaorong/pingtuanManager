<template>
    <div id="app">
        <div>
            <el-row style="margin-bottom: 0px;margin-top: 5px;margin-bottom: 5px">
                <router-link to="/goodsAdd" active-class="active" style="margin-right: 10px">
                    <el-button
                            type="primary"
                            icon="el-icon-plus"
                    >添加商品
                    </el-button>
                </router-link>
                <el-button
                        type="info"
                        icon="el-icon-delete-solid" @click="multidelete">批量回收
                </el-button
                >
                <!--<el-button @click="toggleSelection()" icon="el-icon-close" style="margin-right: 10px">取消选择</el-button>-->

                <router-link to="/goodsRecycle" active-class="active" style="margin-right: 10px">
                    <el-button style="float: right;margin-top: 2px" size="small"
                               type="primary">查看回收列表
                    </el-button>
                </router-link>
            </el-row>
            <goodsList @func="getArr"/>
        </div>
    </div>
</template>

<script>
  import goodsList from "./goodsManage/goodsList";
  import goodsAdd from "./goodsManage/goodsAdd";
  import goodsRecycle from "./goodsManage/goodsRecycle";

  export default {
    name: "goodsManage",
    components: {
      goodsList: goodsList,
      goodsAdd: goodsAdd,
      goodsRecycle: goodsRecycle
    },
    data() {
      return {
        goodsManageShow: true,
        goodsAddShow: false,
        goodsRecycleShow: false
      };
    },
    methods: {
      getArr(data){
        this.multiDelete=data;
        console.log(this.multiDelete);
      },
      multidelete(){
        this.$axios({
          method:'post',
          url: this.$host+'/groupmall/power/product/deleteBatch',
          headers:{"Content-Type":"application/x-www-form-urlendcoded"},
          access_token:this.token,
          params:{ids:this.multiDelete}
        }).then((resp)=>{
          console.log(resp);
        });
        this.$router.go(0);
      }
      },

    }
</script>

<style scoped>
    #app {
        padding: 10px;
        color: #606266;
    }
</style>
