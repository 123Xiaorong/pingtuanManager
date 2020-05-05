<template>
  <div class="promotionBox">
    <!-- <promotionNav /> -->
    <el-row>
      <!--<el-button @click="toList" :type="listShow===false?'':'primary'">管理员列表</el-button>-->
      <!--<el-button @click="toAdd" :type="addShow===false?'':'primary'">添加管理员</el-button>-->
      <router-link
        to="/managerAdd"
        active-class="active"
        style="margin-right: 10px"
      >
        <el-button type="primary" icon="el-icon-plus">添加管理员 </el-button>
      </router-link>
    </el-row>
    <promotionList v-if="listShow === true" />
    <!--<promotionAdd v-if="addShow===true"/>-->
  </div>
</template>

<script>
import promotionList from "./promotionSecond/managerList";
import promotionAdd from "./promotionSecond/managerAdd";
export default {
  components: {
    promotionList: promotionList,
    promotionAdd: promotionAdd
  },
  props: {},
  data() {
    return {
      listShow: true,
      addShow: false
      // managerData:[]
    };
  },
  methods: {
    // toList(){
    //   this.$data.listShow=true;
    //   // this.$data.addShow=false;
    //   // console.log(this.$data.listShow,this.$data.addShow)
    // },
    // toAdd(){
    //   this.$data.listShow=false;
    //   this.$data.addShow=true;
    //   // console.log(this.$data.listShow,this.$data.addShow)
    // }
  },
  created() {
    // this.$axios.get('http://172.16.14.10:8080/groupmall/admin/selectAllAdmin')
    //   .then(response=>{
    //     console.log(response.data)
    //     this.$data.managerData=response.data;
    //     // console.log(this.$data.managerData)
    //     })
    //   .catch(error=>{console.log(error)})
    // console.log(sessionStorage.getItem("promotion"))
    if(sessionStorage.getItem("promotion")===null){
      let power = [
      {
        num: "1000000",
        title: "商品管理"
      },
      {
        num: "0100000",
        title: "促销管理"
      },
      {
        num: "0010000",
        title: "订单管理"
      },
      {
        num: "0001000",
        title: "广告管理"
      },
      {
        num: "0000100",
        title: "会员管理"
      },
      {
        num: "0000010",
        title: "权限管理"
      },
      {
        num: "0000001",
        title: "设置管理"
      }
    ];
    sessionStorage.setItem("promotion", JSON.stringify(power));
    };
  }
};
</script>
<style scoped>
.promotionBox {
  margin-top: 5px;
  padding: 10px;
}
</style>
